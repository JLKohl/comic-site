import { useState, useEffect } from "react";
import { getCharacters } from "../api/characterAPI";
import { Character } from "../model/character";
import { Link } from "react-router";


export function Characters(){

    const [characters, setCharacters] = useState<Character[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCharacters()
            .then(setCharacters)
            .catch(() => setError("Looks like the kids have run off with the page! Try again later."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {characters.map(character => (
                <p key={character.characterId}>
                    <Link className="char-link" to={`/characters/${character.characterId}`}>{character.name}</Link>
                </p>
            ))}
        </main>
    );

}