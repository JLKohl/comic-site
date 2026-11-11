import { useState, useEffect } from "react";
import { getCharacters } from "../api/characterAPI";
import { Character } from "../model/character";


export function Characters(){

    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        getCharacters()
            .then(setCharacters);

    }, []);

    return (
        <main>
            {characters.map(character => (
                <p key={character.characterId}>{character.name}</p>
            ))}
        </main>
    );

}