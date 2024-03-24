import { Note } from "../types/note";

const baseURL = "http://localhost:5000/api/notes/"

async function fetchData (input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;

        throw Error(errorMessage)
    }
}

export async function fetchNotes(): Promise<Note[]> {

    const res = await fetchData(baseURL, { method: "GET"});
    return res.json();
}

export interface NoteInput {
    title: string,
    text?: string,
    _id?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
    });

    // Wait for the JSON data to be parsed and return it
    return response.json();
}

export async function updateNote(_id: string, note: NoteInput): Promise<Note> {
    const response = await fetchData(baseURL + `${_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
    });

    // Wait for the JSON data to be parsed and return it
    return response.json();
}

export async function deleteNote(_id: string) {
    await fetchData(baseURL + _id, {
        method: "DELETE"
    });
}
