import { useState } from "react";
import { createComic } from "../api/adminApi";
import { EditComicForm } from "../components/EditComicForm";
import { AddCharacter } from "../components/AddCharacterForm";


export function Admin (){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [episode, setEpisode] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();//prevents page from reloading 

        if (title.trim() === "") {
            setMessage("Title is required.");
            return; //stop the code and don't save the empty title
        }

            //making sure that the number can not be negative
        if ( episode !== "" && Number(episode) < 0) {
            setMessage("Episode can't be negative.");
            return;
        }

        createComic(title, description ? String(description) : null, episode ? Number(episode) : null)
            .then(() => {
                setMessage("Comic successfully added.");
                setTitle("");
                setDescription("");
                setEpisode("");
            })
            .catch(() => setMessage("Could not add comic."));
        }

    return (
        <main>
            <h1>Admin</h1>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Add my Comic</button>
            </form>

            <EditComicForm />
            <AddCharacter />

            {message && <p>{message}</p>}

        </main>
    );

    

    
    
}