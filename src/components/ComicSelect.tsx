import  { Comic } from "../model/comic";

interface ComicSelectProps {
    comics: Comic [];
    onPick: (comicId: number | null) => void;
}

export function ComicSelect({comics, onPick}: ComicSelectProps){
    return(
        <select onChange={e => onPick(e.target.value ? Number(e.target.value) : null)}>
            <option value="">Pick a Comic</option>
            {comics.map(comic =>(
                <option key={comic.comicId} value={comic.comicId}>{comic.title}</option>
            ))}
        </select>
    );
}