import { useState, useEffect } from "react";
import { getCharacters } from "../api/characterAPI";
import { Character } from "../model/character";
import { Link } from "react-router";


export function Characters(){

    const [characters, setCharacters] = useState<Character[]>([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCharacters()
            .then(setCharacters)
            .catch(() => setError("Looks like the kids have run off with the page! Try again later."))
            .finally(() => setLoading(false));
    }, []);

    //creating a search bar that will filter through the charactures.
    //everything is changed to lower case in the search to 
    // allow for less user error
    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <main>
            <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={e => setSearch(e.target.value)} 
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {filteredCharacters.map(character => (
                <p key={character.characterId}>
                    <Link className="char-link" to={`/characters/${character.characterId}`}>{character.name}</Link>
                </p>
            ))}
        </main>
    );

}