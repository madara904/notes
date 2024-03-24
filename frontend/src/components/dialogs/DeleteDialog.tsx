import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { Note as NoteModel } from "@/types/note";
import * as NotesApi from "@/network/notes_api";

interface NoteProps {
  note: NoteModel;
  onDelete: () => void;
}

const DeleteDialog = ({ note, onDelete }: NoteProps) => {
  const { toast } = useToast();

  async function deleteNote() {
    try {
      await NotesApi.deleteNote(note._id);
      onDelete();
      toast({
        variant: "deleted",
        title: "Deleted!",
        description: "Your note has been deleted!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again.",
      });
      console.log(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2
          size={20}
          className="mt-3 place-self-end cursor-pointer hover:text-destructive"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete this Note?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/40"
            onClick={deleteNote}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;