import useFlashcardLogic from "@/logic/FlashcardLogic";
import UserLayout from "@/components/layouts/UserLayout";

export default function UserFlashcard() {
  const logic = useFlashcardLogic({ mode: "user" });
  return <UserLayout {...logic} />;
}
