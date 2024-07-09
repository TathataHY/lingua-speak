import { OpenAI } from "openai";
import { useEffect, useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface LanguageMappings {
  [key: string]: string;
}

const languageMappings: LanguageMappings = {
  English: "en",
  Spanish: "es",
  French: "fr",
  German: "de",
  Chinese: "zh",
};

const languages = Object.keys(languageMappings);

const useTranslate = (sourceText: string, selectedLanguage: string) => {
  const [targetText, setTargetText] = useState("");

  const getLanguageCode = (language: string): string => {
    return languageMappings[language] || "es";
  };

  useEffect(() => {
    const toLanguageCode = getLanguageCode(selectedLanguage);
    const handleTranslate = async (sourceText: string) => {
      try {
        // const response = await openai.chat.completions.create({
        //   model: "gpt-4o",
        //   messages: [
        //     {
        //       role: "user",
        //       content: `You will be provided with a sentence. This sentence:
        //       ${sourceText}. Your tasks are to:
        //       - Detect what language the sentence is in
        //       - Translate the sentence into ${selectedLanguage}
        //       Do not return anything other than the translated sentence.`,
        //     },
        //   ],
        // });
        // const data = response.choices[0].message.content;
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${toLanguageCode}&dt=t&q=${encodeURIComponent(
          sourceText
        )}`;
        const response = await fetch(url);
        const data = await response.json();
        // Extraer la traducción del formato de respuesta
        if (data && data[0] && data[0][0] && data[0][0][0]) {
          const translatedText = data[0][0][0];
          setTargetText(translatedText);
        } else {
          // Manejar el caso en que no se encuentre la traducción
          console.error("No se pudo obtener la traducción del texto.");
        }
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
