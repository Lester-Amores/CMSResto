import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { X, User, Image } from 'lucide-react';
import { getFullImageUrl } from '@/lib/helpers';
import { UseFormSetValue } from 'react-hook-form';

interface ImageUploadProps {
  initialImageUrl?: string;
  label?: string;
  name: string;
  onChange: (file: File | null) => void;
  setValue?: UseFormSetValue<any>;
}

export default function ImageUpload({ initialImageUrl, label, name, onChange, setValue }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setPreviews([{ file, url: previewUrl }]);
    onChange(file);
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
    if (setValue) {
      setValue('img_src', null);
    }
  };



  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <div className="flex items-center gap-4">
        <div className="relative p-2 w-32 aspect-square">
          {previews.length > 0 ? (
            previews.map((preview, index) => (
              <div key={index} className="relative w-full h-full aspect-square">
                <div className="w-full h-full rounded-full overflow-hidden border">
                  <img
                    src={preview.url}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage()}
                  className="absolute -top-2 -right-2 hover:text-red-500 p-1"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="relative w-full h-full aspect-square rounded-full border flex items-center justify-center bg-gray-100 text-gray-400">
              {label === "Profile Image" ? <User size={48}/> : <Image size={48} />}
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