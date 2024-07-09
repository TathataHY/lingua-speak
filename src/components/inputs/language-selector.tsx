import { IconLanguage } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}: {
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  languages: string[];
}) => (
  <span
    className="cursor-pointer rounded-full space-x-1 px-2
   dark:bg-[#000000] flex items-center flex-row"
  >
    <IconLanguage size={20} />
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="dark:bg-[#000000] flex flex-row rounded-full py-1
       dark:text-white  text-black bg-[#ffffff]"
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  </span>
);

export default LanguageSelector;
