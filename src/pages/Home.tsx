import { useState, useEffect } from "react";
import { getComics } from "../api/comicAPI";
import { Comic } from "../model/comic";

export function Home(){
  
  const [comics, setComics] = useState<Comic[]>([]); //makes a state that starts as an empty list

  //runs the code one time when the page first loads
  useEffect(() =>{
    getComics().then(comics => {
      comics.sort((first, second) => (first.episode ?? 0) - (second.episode ?? 0));
      setComics(comics);//fetches the information and then saves the result into a state
    });
  }, []);


  return (
    <select>
      <option value="">Pick a comic</option>
      {/* builds and option for each comic. */}
      {comics.map(comic => (
        <option key={comic.comicId} value={comic.comicId}> {comic.title} </option>
      ))}
    </select>
  );

}

