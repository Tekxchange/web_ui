import { c } from "@utils";
import template from "./privacy.html?raw";
import { useEffect } from "react";

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className={c`flex justify-center flex-col bg-gray-100 scroll-smooth`}>
      <section
        dangerouslySetInnerHTML={{ __html: template }}
        className={c`lg:mx-80 md:mx-40 mx-5 scroll-smooth`}
      ></section>
    </div>
  );
};

export default PrivacyPage;
