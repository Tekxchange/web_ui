import { useEffect } from "react";

const MessengerPage: React.FC = () => {
  useEffect(() => {
    document.title = "Tekxchange - Messenger";
  }, []);
  return <>Messenger</>;
};

export default MessengerPage;
