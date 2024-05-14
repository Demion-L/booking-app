import { Alert, AlertTitle } from "@/components/ui/alert";
import { FaInfoCircle } from "react-icons/fa";

interface AlertMessageProps {
  message: string;
  type: string | null;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
  return (
    <Alert
      className={`rounded-none ${
        type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
      }`}>
      <AlertTitle className='text-white'>{message}</AlertTitle>
    </Alert>
  );
};

export default AlertMessage;
