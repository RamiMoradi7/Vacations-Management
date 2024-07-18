import { ChangeEvent } from "react";
import { useForm, useFormState } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";
import { FormLabel } from "@mui/joy";
import { UploadSharp } from "@mui/icons-material";
import "./ImageInput.css";

interface ImageInputProps {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
  errors: ReturnType<typeof useFormState<VacationModel>>["errors"];
  onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  imageUrl?: string;
  required: boolean;
}

function ImageInput({
  register,
  errors,
  onChange,
  imageUrl,
  required,
}: ImageInputProps): JSX.Element {
  const isSelected = !!imageUrl;

  return (
    <>
      {errors.image && !isSelected && (
        <p className="error active">{errors.image.message}</p>
      )}
      <div className="image-container">
        <div className="image-preview">
          {imageUrl && <img src={imageUrl} alt="Vacation" />}
        </div>
        <div className="image-input-container">
          <FormLabel htmlFor="image-upload" className="upload-label">
            <UploadSharp className="upload-icon" />
            {isSelected ? "Change Image" : "Upload Image"}
          </FormLabel>
          <input
            type="file"
            id="image-upload"
            {...register("image", {
              required: required && "Image is missing.",
            })}
            onChange={onChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </>
  );
}

export default ImageInput;
