import { useState } from "react";
import ImageCropModal from "./ImageCropModal";
import './ImageUpload.css'

interface ImageUploadProps {
  label: string;
  onImageSelect: (file: File) => void;
}

export default function ImageUpload({
  label,
  onImageSelect,
}: ImageUploadProps) {
  const [imageSrc, setImageSrc] = useState("");
  const [preview, setPreview] = useState("");
  const [isCropOpen, setIsCropOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropOpen(true);
    };

    reader.readAsDataURL(file);
  };

  const handleCropComplete = (file: File) => {
    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
    setIsCropOpen(false);
  };

  return (
    <div className="image-upload-wrapper">
      <label>{label}</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {preview && (
        <div className="image-preview">
          <img
            src={preview}
            alt="preview"
          />
        </div>
      )}

      {isCropOpen && (
        <ImageCropModal
          imageSrc={imageSrc}
          onClose={() => setIsCropOpen(false)}
          onCropDone={handleCropComplete}
        />
      )}
    </div>
  );
}