"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function ConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-red-600 text-white hover:bg-red-700"
    >
      <Trash2 />
      {pending ? "Deleting…" : "Delete"}
    </Button>
  );
}

export function DeleteButton({
  action,
  id,
  itemType,
  itemName,
}: Readonly<{
  action: (formData: FormData) => Promise<void>;
  id: string;
  itemType: string;
  itemName: string;
}>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this {itemType}?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium text-gray-900">“{itemName}”</span> will
            be removed from the website permanently. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <ConfirmButton />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
