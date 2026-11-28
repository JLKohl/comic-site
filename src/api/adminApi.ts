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

export async function deleteComic(id:number) {
    
    const response = await fetch(`${API_URL}/comics/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        },
    });

    if (!response.ok) {
        throw new Error(`Could not delete your comic (${response.status})`);
    }

    return response.json();

}

//character functions
export async function createCharacter(name: string, age: number | null , gender : string | null, description : string | null ) {
    
    const response = await fetch(`${API_URL}/characters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
   
        body: JSON.stringify({name, age, gender, description}),
    });

    if (!response.ok){
        throw new Error(`Could not add character (${response.status})`);
    }

    return response.json();

}

export async function updateCharacter(id: number, name: string, age: number | null , gender : string | null, description : string | null ) {
        
    const response = await fetch(`${API_URL}/characters/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },

        body: JSON.stringify({name, age, gender, description}),
    });

    if (!response.ok) {
        throw new Error(`Could not update your Character (${response.status})`);
    }

  return response.json();
}

export async function deleteCharacter(id:number) {
    
    const response = await fetch(`${API_URL}/characters/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        },
    });

    if (!response.ok) {
        throw new Error(`Could not delete your character (${response.status})`);
    }

    return response.json();

}