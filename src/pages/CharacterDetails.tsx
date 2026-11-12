import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCharacter } from "../api/characterAPI";
import type { Character } from "../model/character";

export function CharacterDetails() {
    const {id} = useParams();
    const [character, setCharacter] = useState<Character | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCharacter(Number(id))
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
        </main>
    )
}