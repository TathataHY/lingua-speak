import { IconMicrophone } from "@tabler/icons-react";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechRecognitionComponent = ({
  setSourceText,
}: {
  setSourceText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript, setSourceText]);

  const handleVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div>
      <IconMicrophone
        size={22}
        className="text-black dark:text-white"
        onClick={handleVoiceRecording}
      />
    </div>
  );
};

export default SpeechRecognitionComponent;
