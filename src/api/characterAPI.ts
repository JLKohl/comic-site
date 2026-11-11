import { Character, type CharacterData } from "../model/character";
import { fetchWithRetry } from "./fetchWithRetry";

const API_URL = "http://localhost:5147";

export async function getCharacters(): Promise<Character[]> {

    const response = await fetchWithRetry(`${API_URL}/characters`, 3);

    if (!response.ok) {
        throw new Error(`Not found (${response.status})`);
    }

    const data: CharacterData[] = await response.json();
    return data.map(data=> new Character(data));
}

export async function getCharacter(characterId: number) : Promise<Character> {

    const response = await fetch(`${API_URL}/characters/${characterId}`);

    if (!response.ok) {
        throw new Error(`Not found (${response.status})`);
    }

    const data: CharacterData = await response.json();
    return new Character(data);


}
