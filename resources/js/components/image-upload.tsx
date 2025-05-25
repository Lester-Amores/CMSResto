import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { X, User } from 'lucide-react';
import { getFullImageUrl } from '@/lib/helpers';

interface ImageUploadProps {
  initialImageUrl?: string;
  label?: string;
  name: string;
  onChange: (files: File[] | null) => void;
}

export default function ImageUpload({ initialImageUrl, label, name, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const previewData = fileArray.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviews(previewData);
    onChange([fileArray[0]]);
  };

  useEffect(() => {
    if (initialImageUrl) {
      const fullUrl = getFullImageUrl(initialImageUrl);
      if (fullUrl) {
        setPreviews([
          {
            file: new File([], 'existing'),
            url: fullUrl,
          },
        ]);
      }
    }
  }, [initialImageUrl]);


  const removeImage = () => {
    if (previews[0] && previews[0].url.startsWith('blob:')) {
      URL.revokeObjectURL(previews[0].url);
    }
    setPreviews([]);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };



  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <div className="flex items-center gap-4">
        <div className="w-32 aspect-square">
          {previews.length > 0 ? (
            previews.map((preview, index) => (
              <div key={index} className="relative w-full h-full aspect-square rounded overflow-hidden border">
                <img
                  src={preview.url}
                  alt={`Preview ${index}`}
                  className="object-contain w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => removeImage()}
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-500 p-1 rounded-full shadow"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="relative w-full h-full aspect-square rounded border flex items-center justify-center text-gray-400 bg-gray-100">
              <User size={48} />
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          name={name}
          onChange={handleChange}
          className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0 file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

    </div>

  );
}