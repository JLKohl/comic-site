import { useState, useEffect} from "react";
import { getComics } from "../api/comicAPI";
import { Comic } from "../model/comic";
import { deleteComic, updateComic } from "../api/adminApi";


export function EditCharacterForm(){

    const [comics, setComics] = useState<Comic[]>([]);
    const [editId, setEditID] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [episode, setEpisode] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    function loadComics(){
        getComics()
            .then(comics => {
            comics.sort((first, second) => (first.episode ?? 0) - (second.episode ?? 0));
            setComics(comics);//fetches the information and then saves the result into a state
            })
            .catch(() => setError("Looks like the kids have run off with the page! Try again later!" ))
            .finally(() => setLoading(false));
    }
    
    //useEffect says "run this code after the page loads."
    //this is a built in React function
    useEffect(() =>{
        loadComics();
    }, []);


    function handlePick(comicId: number | null) {
    //nothing is picked so we clear the inputs from the form
    if (comicId === null) {
        setEditID(null);
        setTitle("");
        setDescription("");
        setEpisode("");

        return;
    }

    //find that comic inside of the list
    const comic = comics.find(c => c.comicId === comicId);
    if (!comic) return;

    //fill the inputs
    setEditID(comic.comicId);
    setTitle(comic.title);
    setDescription(comic.description ?? "");
    setEpisode(comic.episode?.toString() ?? "");
    }

    function handleEdit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editId === null) return; // nothing picked yet

    //making sure the title is not empty
    if (title.trim() === "") {
        setMessage("Title is required.");
        return;
    }

    //making sure that the number can not be negative
    if ( episode !== "" && Number(episode) < 0) {
        setMessage("Episode can't be negative.");
        return;
    }

    updateComic(editId, title, description ? String(description) : null, episode ? Number(episode) : null)
        .then(() => {
            setMessage("Comic updated!");
            loadComics();
        })
        .catch(() => setMessage("Could not update comic."));
    }

    function handleDelete(){
        if (editId === null) return;
        if (!confirm("Delete this comic?")) return;

        deleteComic(editId)
            .then(() => {
                setMessage("Comic deleted.");
                handlePick(null);
                loadComics();
            })
            .catch(() => setMessage("Could not delete comic."));
    
    }

    return(
    <div>
        <h2>Edit A Comic</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        
        <ComicSelect comics={comics} onPick={handlePick} />

        <form onSubmit={handleEdit}>
            <label>
                Title
                <input value={title} onChange={e => setTitle(e.target.value)} />
            </label>

            <label>
                Description
                <input value={description} onChange={e => setDescription(e.target.value)}/>
            </label>

            <label>
                Episode
                <input type="number" value={episode} onChange={e => setEpisode(e.target.value)}/>
            </label>

            <button type="submit">Save Changes</button>

            <button type="button" onClick={handleDelete}>Delete</button>
        </form>
            {message && <p>{message}</p>}
    </div>
    )

 

}