import { useState } from "react";
import { createCharacter } from "../api/adminApi";
import { EditCharacterForm } from "../components/EditCharacterForm";


export function AddCharacter (){
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();//prevents page from reloading 

        if (name.trim() === "") {
            setMessage("Name is required.");
            return; //stop the code and don't save the empty title
        }

            //making sure that the number can not be negative
        if ( age !== "" && Number(age) < 0) {
            setMessage("Episode can't be negative.");
            return;
        }

        createCharacter(name, age ? Number(age) : null, gender ? String(gender) : null, description ? String(description) : null)
            .then(() => {
                setMessage("Comic successfully added.");
                setName("");
                setAge("");
                setGender("");
                setDescription("");
            })
            .catch(() => setMessage("Could not add character."));
        }

    return (
        <main>
            <h1>Admin</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input value={name} onChange={e => setName(e.target.value)} />
                </label>

                <label>
                    Age
                    <input value={age} onChange={e => setAge(e.target.value)} />
                </label>

                <label>
                    Gender
                    <input value={gender} onChange={e => setGender(e.target.value)} />
                </label>

                <label>
                    Description
                    <input value={description} onChange={e => setDescription(e.target.value)}/>
                </label>

                <button type="submit">Add my Comic</button>
            </form>

            <EditCharacterForm />

            {message && <p>{message}</p>}

        </main>
    );

    

    
    
}