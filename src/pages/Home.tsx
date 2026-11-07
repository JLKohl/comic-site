import { useState, useEffect } from "react";
import { getComicDetails, getComics } from "../api/comicAPI";
import { Comic } from "../model/comic";
import { Details }  from "../model/details";

export function Home(){
  
  const [comics, setComics] = useState<Comic[]>([]); //makes a state that starts as an empty list
  const [selectedComic, setSelectedComic] = useState<Details | null>(null);

  //runs the code one time when the page first loads
  useEffect(() =>{
    getComics().then(comics => {
      comics.sort((first, second) => (first.episode ?? 0) - (second.episode ?? 0));
      setComics(comics);//fetches the information and then saves the result into a state
    });
  }, []);


  return (
    <main>
      
      <select onChange={e => {
        //if statment to lets the user reselect "pick a comic" 
        // with out it throwing and error. It returns 
        // an empoty string and clears the title and details
        if (!e.target.value){
          setSelectedComic(null);
          return
        }
        getComicDetails(Number(e.target.value))
        .then(setSelectedComic)}}>

      <option value="">Pick a comic</option>
        {/* builds an option for each comic. */}
        {comics.map(comic => (
          <option key={comic.comicId} value={comic.comicId}> {comic.title} </option>
        ))}
      </select>
        {selectedComic && (
          <div>
            <h2>{selectedComic.comic.title}</h2>
            <p>image coming soon</p>
            <p>{selectedComic.comic.description ?? `No description for "${selectedComic?.comic.title}" yet`}</p>
          </div>
        )}
    </main>
  );

}

