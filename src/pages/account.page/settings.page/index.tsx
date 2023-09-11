import { useEffect } from "react";

const SettingsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Tekxchange - Settings";
  }, []);
  return <>Settings</>;
};

export default SettingsPage;
