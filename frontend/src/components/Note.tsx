import { Note as NoteModel } from "@/types/note";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card";
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils/FormateDate";
import DeleteDialog from "./dialogs/DeleteDialog";


interface NoteProps {
  note: NoteModel,
  onNoteClicked: (note: NoteModel) => void;
  onDelete: (note: NoteModel) => void; 
}

const Note = ({ note, onNoteClicked, onDelete }: NoteProps) => {


  const { 
    title, 
    text,
    createdAt,
    updatedAt
  } = note;

  let date: string; 
  
  if (createdAt || updatedAt === "") 
  {   
    updatedAt > createdAt ?
    date = "Updated: " + formatDate(updatedAt)
    :
    date = "posted: " + formatDate(createdAt)
  } 
  else
  { 
    date = "posted: "
  }


  return (
  <Card className="grid bg-secondary capitalize shadow border truncate" onClick={() => onNoteClicked(note)}>
      <CardHeader className="">
        <CardTitle className="font-bold tracking-tight md:text-3xl text-2xl md:text-2xl text-wrap line-clamp-3 hover:line-clamp-6">
          {title}
        </CardTitle>
  </CardHeader>
  <CardContent className="whitespace-pre text-wrap">
    {text}
  </CardContent>
  <CardFooter className="grid grid-cols-1 normal-case">
    <Separator className="bg-muted-foreground"/>
    <div className="grid grid-cols-2">  
    <CardDescription className="py-2 text-xs">{date}</CardDescription>
    <DeleteDialog note={note} onDelete={onDelete}/>
  </div>
  </CardFooter>
</Card>
  )
}

export default Note;