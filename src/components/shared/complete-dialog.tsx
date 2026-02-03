

import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
interface CompleteDialogProps {
    completeDialogOpen: boolean;
    setCompleteDialogOpen: (open: boolean) => void;
    title: string;
    description: string;  
    hasDoneButton?: boolean;
    hasCancelButton?: boolean;
    doneText?: string;
    cancelText?: string;
    doneHandler?: () => void;
    cancelHandler?: () => void;
}

export const CompleteDialog = ({ completeDialogOpen, setCompleteDialogOpen,title,description,hasDoneButton=true,hasCancelButton=true,doneText,cancelText,doneHandler,cancelHandler }: CompleteDialogProps) => {
    return (
        <AlertDialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}       >
        <AlertDialogContent className="max-w-md w-full rounded-xl p-0 overflow-hidden">
         
          <div className='flex flex-col gap-2 items-center justify-center py-4'>
              <h1 className=' text-2xl font-semibold'>{title}</h1>
              <p className='text-center text-secondary-900 text-lg font-medium'>{description}</p>

          </div>
          {/* Actions */}
          {hasDoneButton && (
            <Button variant="outline" onClick={doneHandler} className={'flex items-center justify-center border-t-2 rounded-none py-2 pt-2 text-primary-500 font-medium hover:bg-secondary-200 rounded-b-lg'}>
            {doneText}
            </Button>
          )}
          {hasCancelButton && (
            <Button variant="outline" onClick={cancelHandler} className="flex items-center gap-2 bg-secondary-200 border-t-2 rounded-none  flex-1 hover:bg-secondary-400 hover:cursor-pointer " >
            {cancelText}
            </Button>
          )}
          
          
        </AlertDialogContent>
      </AlertDialog>
    );
};