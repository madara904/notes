import { useEffect, useState } from "react"
import { Note as NoteModel } from "./types/note"
import { ThemeProvider } from "./components/theme-provider"
import Note from "./components/Note"
import * as NotesApi from "./network/notes_api"
import NavBar from "./components/ui/NavBar"
import AddNewNoteDialog from "./components/ui/AddNewNoteDialog"
import { Toaster } from "./components/ui/toaster"
import Loading from "./components/loading"



const App = () => {

  const [notes, setNote]= useState<NoteModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [clickedEdit, setClickedEdit] = useState<NoteModel | null>(null);

  const CARD_NO = 9;


  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        isLoading && await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false)
        setNote(notes)

      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    loadNotes();

  },[]);

  const handleNoteSaved = (newNote: NoteModel) => {
    setNote([...notes, newNote]);
  }

  const handleDeleteNote = async (note: NoteModel) => {
    try {
      setNote(notes.filter((n) => n._id !== note._id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }


  return (   
  <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <header>
      <NavBar/>
    </header>
    <AddNewNoteDialog clickedEdit={undefined} onNoteSaved={handleNoteSaved} />
    <Loading isLoading={isLoading} CardNo={CARD_NO} />
    <main className="container mx-auto grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mb-10">
        {notes.slice(0, CARD_NO)
          .sort((a, b) => {
            const dateA = new Date(b.updatedAt || b.createdAt).getTime();
            const dateB = new Date(a.updatedAt || a.createdAt).getTime();
            return dateA - dateB;
          })
        .map((note) => (
        <Note note={note} key={note._id} onNoteClicked={() => setClickedEdit(note)} onDelete={() => handleDeleteNote(note)}/>
       ))}
    </main>
    <Toaster />
  </ThemeProvider>  
  </>
  )
}

export default App