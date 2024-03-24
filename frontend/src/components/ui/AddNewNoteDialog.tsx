import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import NoteForm from "../dialogs/NoteForm"
import { useState } from "react";



const AddNewNoteDialog = ({clickedEdit, onNoteSaved}) => {

  const [open, setOpen] = useState(false);

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <div className="grid grid-cols-1 place-items-center mb-5 p-4">
      <DialogTrigger className="w-min place-self-center">
          <div>    
            <PlusCircle size={48} className="hover:text-primary"/>
          </div>
      </DialogTrigger>
      <h1 className="mt-3 font-bold">Create a new Note</h1>
    </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left mb-3">{clickedEdit ? "Edit Note" : "Create a new Note"}</DialogTitle>
        </DialogHeader>
        <NoteForm
            onNoteSaved={onNoteSaved}
            clickedEdit={clickedEdit}
            setOpen={setOpen}
          />
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewNoteDialog

