import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { Textarea } from "../ui/textarea"

import * as NotesApi from "@/network/notes_api"
import { Note } from "@/types/note"
import { NoteInput } from "@/network/notes_api"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "../ui/toast"
import { RefreshCcw } from "lucide-react"
import { useState } from "react"

interface AddNoteProps {
  onNoteSaved: (note: Note) => void,
  clickedEdit?: Note,
  setOpen: (state: boolean) => void,
}
const NoteForm = ( { onNoteSaved, clickedEdit, setOpen }: AddNoteProps ) => {

  const [Loading, setLoading] = useState(false);


  const { toast } = useToast()

  const form = useForm<NoteInput>({ 
    defaultValues: {
      title: clickedEdit?.title || '',
      text: clickedEdit?.text || '',
    },
  })

  async function onSubmit(values: NoteInput) {
    try {
      setLoading(true);
      Loading && new Promise((resolve) => setTimeout(resolve, 3000));
      let noteResponse: Note;
      if (clickedEdit) {
        noteResponse = await NotesApi.updateNote(clickedEdit._id, values);
      } else {
        noteResponse = await NotesApi.createNote(values);
      }
      setLoading(false);
  
      onNoteSaved(noteResponse);
      setOpen(false)
  
      toast({
        variant: "success",
        title: "Success!",
        description: "Your note has been saved.",
      });
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{clickedEdit ? "Edit Note" : "Add Note"}</FormLabel>
            <FormControl>
              <Input placeholder="Please type your title..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
            <FormField
        control={form.control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Text</FormLabel>
            <FormControl>
            <Textarea
                  placeholder="What did you do today?"
                  className="resize-none"
                  {...field}
                />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {
      (Loading) ? <Button type="submit" className="bg-primary" disabled><RefreshCcw size={20} className="mr-1 animate-spin"/>Submit</Button>
      :
      <Button type="submit" className="bg-primary">
        Submit</Button>
      }
    </form>
  </Form>

  )
}



export default NoteForm