import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  maxSizeMB?: number;
}

const ImageUploader = ({ value, onChange, maxSizeMB = 5 }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadToCloudinary = async (file: File) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration missing');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'portfolio/projects');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Le fichier doit être une image');
        return;
      }

      // Validate file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`La taille du fichier ne doit pas dépasser ${maxSizeMB} MB`);
        return;
      }

      setUploading(true);
      setProgress(0);

      try {
        // Compress image
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (progress: number) => setProgress(progress),
        };

        const compressedFile = await imageCompression(file, options);
        
        // Upload to Cloudinary
        const url = await uploadToCloudinary(compressedFile);
        onChange(url);
        toast.success('Image téléversée avec succès');
      } catch (error: any) {
        console.error('Upload error:', error);
        toast.error('Erreur lors du téléversement de l\'image');
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [maxSizeMB, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    disabled: uploading,
  });

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      {value ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <img
            src={value}
            alt="Cover preview"
            className="w-full h-64 object-cover rounded-lg border border-border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} className="mr-1" />
            Retirer
          </Button>
        </motion.div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-card'
          } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="w-full max-w-xs">
                  <div className="bg-secondary rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {isDragActive ? (
                    <Upload className="w-8 h-8 text-primary" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {isDragActive
                      ? 'Déposez l\'image ici'
                      : 'Glissez-déposez une image ou cliquez pour sélectionner'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WEBP jusqu'à {maxSizeMB} MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
