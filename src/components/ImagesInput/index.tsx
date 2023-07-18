import { useCallback, useRef } from 'react';
import { Container } from './styles';
import { convertFileToCanvasImage } from 'utils/convertFileToCanvasImage';
import { FiPlus } from 'react-icons/fi';

interface ImagesInputProps {
  setImages: React.Dispatch<React.SetStateAction<HTMLCanvasElement[]>>;
}

export const ImagesInput = ({ setImages }: ImagesInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImagesInput = useCallback(
    async (files: FileList | null) => {
      if (files === null) return;

      const imagesPromises = Array.from(files).map(convertFileToCanvasImage);
      const parsedImages = await Promise.all(imagesPromises);

      setImages(previousImages => [...previousImages, ...parsedImages]);
    },
    [setImages],
  );

  return (
    <Container type="button" onClick={() => inputRef.current?.click()}>
      <input
        type="file"
        ref={inputRef}
        accept=".jpeg, .jpg, .bmp, .png, .gif, .tiff, .pgm"
        multiple
        onChange={({ target: { files } }) => handleImagesInput(files)}
      />

      <FiPlus size={70} />
    </Container>
  );
};
