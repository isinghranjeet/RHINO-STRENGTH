import { useApp } from "@/context/AppContext";
import type { AboutCms, CollectionKey, HomepageCms, SiteContent } from "@/lib/gym/types";

type SectionKey = "homepage" | "about";
type SectionField<S extends SectionKey> = S extends "homepage" ? keyof HomepageCms : keyof AboutCms;

/** Shared helpers used by the admin CMS tabs. */
export function useCmsActions() {
  const { setDraftData, publishCollection, showToast } = useApp();

  /** Edit one field of the homepage/about draft (published on "Publish draft live"). */
  const updateDraftSection = <S extends SectionKey>(section: S, key: SectionField<S>, value: string | boolean) => {
    setDraftData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  /** Save a list (facilities, trainers, …) to the draft and publish it right away. */
  const commitCollectionChange = <K extends CollectionKey>(key: K, items: SiteContent[K], successMsg?: string) => {
    publishCollection(key, items);
    if (successMsg) showToast(successMsg);
  };

  /** Read an uploaded image file into a data URL so it can be stored in the browser. */
  const handleFileUploadToDataUrl = (file: File | undefined, onSuccess: (url: string) => void) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file (JPG, PNG, WebP).", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onSuccess(reader.result);
    };
    reader.onerror = () => showToast("Failed to read image file.", "error");
    reader.readAsDataURL(file);
  };

  return { updateDraftSection, commitCollectionChange, handleFileUploadToDataUrl };
}
