//this function will send the new comic to the API 
//information will be gotten from the front end 
// with a form only accessible from the admin side

const API_URL = "http://localhost:5147";
const TOKEN = "dev-admin";

export async function createComic(title: string, description: string | null, episode: number | null ) {
    
    const response = await fetch(`${API_URL}/comics`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
        //stringify turns the object into a JSON text to send.
        //{title, description, episode} is short for { title : title ... (etc)}
        body: JSON.stringify({title, description, episode}),
    });

    if (!response.ok){
        throw new Error(`Could not add comic (${response.status})`);
    }

    return response.json();

}

export async function updateComic(id: number, title: string, description: string | null, episode: number | null) {
        
    const response = await fetch(`${API_URL}/comics/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
        //stringify turns the object into a JSON text to send.
        //{title, description, episode} is short for { title : title ... (etc)}
        body: JSON.stringify({title, description, episode}),
    });

      if (!response.ok) {
    throw new Error(`Could not update your comic (${response.status})`);
  }

  return response.json();
}