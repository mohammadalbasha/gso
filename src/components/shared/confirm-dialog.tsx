import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils/utils";
interface ConfirmDialogProps {
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: (open: boolean) => void;
  title: string;
  description: string;
  hasDoneButton?: boolean;
  hasCancelButton?: boolean;
  doneText?: string;
  cancelText?: string;
  doneHandler?: () => void;
  cancelHandler?: () => void;
  isDestructive?: boolean;
  isSubmitting?: boolean;
}

export const ConfirmDialog = ({
  confirmDialogOpen,
  setConfirmDialogOpen,
  title,
  description,
  hasDoneButton = true,
  hasCancelButton = true,
  doneText,
  cancelText,
  doneHandler,
  cancelHandler,
  isDestructive = false,
  isSubmitting = false,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
      <AlertDialogOverlay className="z-[499]" />
      <AlertDialogContent className="max-w-md w-full rounded-xl p-0 overflow-hidden z-[500]">
        <div className="flex flex-col gap-2 items-center justify-center py-4">
          <h1 className=" text-2xl font-semibold">{title}</h1>
          <p className="text-center text-secondary-900 text-lg font-medium">
            {description}
          </p>
        </div>
        {/* Actions */}
        <div className="flex flex-col w-full  justify-center ">
          {hasDoneButton && (
            <Button
              variant={isDestructive ? "destructive" : "outline"}
              onClick={doneHandler}
              className={cn(
                "flex items-center justify-center border-t-2 rounded-none py-2 pt-2  font-medium  rounded-b-lg ",
                isDestructive
                  ? "text-white bg-red-600 hover:bg-red-500"
                  : "text-primary-500 hover:bg-secondary-200",
              )}
              disabled={isSubmitting}
            >
              {doneText}
            </Button>
          )}

          {hasCancelButton && (
            <Button
              variant="outline"
              onClick={cancelHandler}
              className="flex items-center gap-2 bg-secondary-200 border-t-2 rounded-none  flex-1 hover:bg-secondary-400 hover:cursor-pointer "
            >
              {cancelText}
            </Button>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
