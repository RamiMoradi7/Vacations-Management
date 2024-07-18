import { ChangeEvent, useState } from "react";
import { notify } from "../Utils/Notify";

export function useStartDateChange() {
  const [startDate, setStartDate] = useState<string>();
  const handleStartDateChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setStartDate(event.target.value);
    } catch (err: any) {
      notify.error(err);
    }
  };
  return { startDate, handleStartDateChange };
}

export function useEndDateChange() {
  const [endDate, setEndDate] = useState<string>();
  const handleEndDateChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setEndDate(event.target.value);
    } catch (err: any) {
      notify.error(err);
    }
  };

  return { endDate, handleEndDateChange };
}

export function useImageChange() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const imageFile = event.target.files[0];
      if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);
        setImageUrl(imageUrl);
        setImageFile(imageFile);
      } else {
        setImageUrl("");
        setImageFile(null);
      }
    } catch (err: any) {
      notify.error(err);
    }
  };
  const resetImage = () => {
    setImageFile(null);
    setImageUrl("");
  };
  return { imageUrl, setImageUrl, handleImageChange, imageFile, resetImage };
}
