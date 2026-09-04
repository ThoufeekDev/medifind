import { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';

interface Props {
  imageSrc: string;
  onClose: () => void;
  onCropDone: (file: File) => void;
}

export default function ImageCropModal({ imageSrc, onClose, onCropDone }: Props) {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = (_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleSave = async () => {
    const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);

    onCropDone(croppedFile);
  };

  return (
    <div className="crop-modal">
      <div className="crop-container">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="crop-actions">
        <button onClick={onClose}>Cancel</button>

        <button onClick={handleSave}>Save Crop</button>
      </div>
    </div>
  );
}
