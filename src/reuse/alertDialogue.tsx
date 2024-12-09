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
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";

interface AlertDialogProps {
  title: string;
  description: string;
  buttonNames: { cancel: string; action: string };
  onCancel: () => void;
  onConfirm: () => void;
  triggerButtonLabel: string;
  classNames?: string; // Optional classNames for custom styling
}

export const ReusableAlertDialog: React.FC<AlertDialogProps> = ({
  title,
  description,
  buttonNames,
  onCancel,
  onConfirm,
  triggerButtonLabel,
  classNames,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={classNames}>
          {triggerButtonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className="rounded">
            {buttonNames.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 text-white hover:text-white hover:bg-red-500 rounded"
          >
            {buttonNames.action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
