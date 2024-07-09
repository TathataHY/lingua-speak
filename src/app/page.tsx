"use client";

import "regenerator-runtime/runtime";

import CategoryLinks from "@/components/category-links";
import { DotBackground } from "@/components/dot-background";
import FileUpload from "@/components/inputs/file-upload";
import LanguageSelector from "@/components/inputs/language-selector";
import LinkPaste from "@/components/inputs/link-paste";
import TextArea from "@/components/inputs/text-area";
import SpeechRecognitionComponent from "@/components/speech-recognition";
import SvgDecorations from "@/components/svg-decorations";
import useTranslate from "@/hooks/use-translate";
import { rtfToText } from "@/utils/rtf-to-text";
import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");

  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
    }
  };
  77;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main>
      <DotBackground>
        <div className="relative overflow-hidden h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold  text-neutral-200">
                Lingua<span className="text-[#f87315]">Speak</span>
              </h1>
              <p className="mt-3 text-neutral-400">
                LinguaSpeak: Bridging Voices, Connecting Worlds.
              </p>

              <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20 bg-white border-gray-200">
                    <TextArea
                      id="source-language"
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      placeholder="Source Language"
                    />
                    <div className="flex flex-row justify-between w-full text-black dark:text-white">
                      <span className="cursor-pointer flex space-x-2 flex-row">
                        <SpeechRecognitionComponent
                          setSourceText={setSourceText}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => handleAudioPlayback(sourceText)}
                        />
                        <FileUpload handleFileUpload={handleFileUpload} />
                        <LinkPaste handleLinkPaste={handleLinkPaste} />
                      </span>
                      <span className="text-sm pr-4">
                        {sourceText.length} / 2000
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20 bg-white border-gray-200">
                    <TextArea
                      id="target-language"
                      value={targetText}
                      onChange={() => {}}
                      placeholder="Target Language"
                    />
                    <div className="flex flex-row justify-between w-full text-black dark:text-white">
                      <span className="cursor-pointer flex items-center space-x-2 flex-row">
                        <LanguageSelector
                          selectedLanguage={selectedLanguage}
                          setSelectedLanguage={setSelectedLanguage}
                          languages={languages}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => handleAudioPlayback(targetText)}
                        />
                      </span>
                      <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer ">
                        <IconCopy size={22} onClick={handleCopyToClipboard} />
                        {copied && (
                          <span className="text-xs text-green-500">
                            Copied!
                          </span>
                        )}
                        <IconThumbUp size={22} onClick={handleLike} />
                        <IconThumbDown size={22} onClick={handleDislike} />
                        <IconStar
                          size={22}
                          onClick={handleFavorite}
                          className={favorite ? "text-yellow-500" : ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <SvgDecorations />
              </div>

              <CategoryLinks />
            </div>
          </div>
        </div>
      </DotBackground>
    </main>
  );
}
