import useFlashcardLogic from "@/logic/FlashcardLogic";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminFlashcard() {
  const logic = useFlashcardLogic({ mode: "admin" });
  return <AdminLayout {...logic} />;
}
