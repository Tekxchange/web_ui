import { c } from "@utils";
import template from "./privacy.html?raw";

const PrivacyPage: React.FC = () => {
  return (
    <div className={c`flex justify-center flex-col lg:mx-80 md:mx-40 mx-5`}>
      <section dangerouslySetInnerHTML={{ __html: template }}></section>
    </div>
  );
};

export default PrivacyPage;
