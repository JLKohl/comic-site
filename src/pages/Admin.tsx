import { useState } from "react";
import { createComic } from "../api/adminApi";
import { EditComicForm } from "../components/EditComicForm";


export function Admin (){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [episode, setEpisode] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();//prevents page from reloading 

        createComic(title, description ? String(description) : null, episode ? Number(episode) : null)
            .then(() => {
                setMessage("Comic Succesdfully added");
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

            {message && <p>{message}</p>}

        </main>
    );

    

    
    
}