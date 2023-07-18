import { useCallback, useRef } from 'react';
import { Container } from './styles';
import { convertFileToCanvasImage } from 'utils/convertFileToCanvasImage';
import { FiPlus } from 'react-icons/fi';
import { useImages } from 'hooks/images';

export const ImagesInput = () => {
  const { updateImages } = useImages();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImagesInput = useCallback(
    async (files: FileList | null) => {
      if (files === null) return;

      const imagesPromises = Array.from(files).map(convertFileToCanvasImage);
      const parsedImages = await Promise.all(imagesPromises);

      updateImages(parsedImages);
    },
    [updateImages],
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
