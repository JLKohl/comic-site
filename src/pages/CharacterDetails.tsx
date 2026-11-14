import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getCharacter } from "../api/characterAPI";
import type { Character } from "../model/character";

export function CharacterDetails() {
    const {id} = useParams();
    // useState is a React hook that remembers a value
    // and updates the page when the value changes.
    // This allows React to re-render the component
    // so the page can update itself in real time.
    // "set" functions that come from useState
    // tell React to re-run the component.
    const [character, setCharacter] = useState<Character | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //useEffect runs after the page loads and again when the id changes.
    //useEffect runs code like fetching after the page shows up
    useEffect(() => {
        getCharacter(Number(id))
        //using .then tells the code what to do when the answer arrives
        //does the same job as await
        .then(setCharacter)
        .catch(() => setError("Looks like the kids have run off with the page! Try again later!" ))
        .finally(() => setLoading(false));
    }, [id]);

    return (
        <main>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {character && <h2>{character.name}</h2>}
            {character && <p>Age: {character.age ?? "This person seems to be missing an age."}</p>}
            {character && <p>Description: {character.description ?? "Sorry there is no description yet"}</p>}

            <Link className="char-link" to="/characters">Back to Characters</Link> 
        </main>
    )
}