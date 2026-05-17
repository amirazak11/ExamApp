import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { PencilLine, X } from "lucide-react"
import EmailStepperPage from "./email-verification-flow"
type EmailModelProps = {
  email: string;
};

export function EmailModel({ email }: EmailModelProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" type="button" className="border-0 text-sm  text-blue-600 bg-transparent font-medium" size="sm">
              <PencilLine/>
              Change
            </Button>
            </AlertDialogTrigger>
      <AlertDialogContent>
      <div className="flex justify-end">
                  <AlertDialogCancel className="border-0" variant="outline">
                    <X className="h-5 w-5" />
                  </AlertDialogCancel>

      </div>
<EmailStepperPage/>
      </AlertDialogContent>
    </AlertDialog>
  )
}
