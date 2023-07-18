import { useCallback, useState } from 'react';
import { Container } from './styles';
import { Canvas } from 'components/Canvas';
import { convertFileToCanvasImage } from 'utils/convertFileToCanvasImage';

export const Home = () => {
  const [inputedImages, setInputedImages] = useState<HTMLCanvasElement[]>([]);

  const handleImagesInput = useCallback(async (files: FileList | null) => {
    if (files === null) return;

    const imagesPromises = Array.from(files).map(convertFileToCanvasImage);
    const parsedImages = await Promise.all(imagesPromises);

    setInputedImages(previousImages => [...previousImages, ...parsedImages]);
  }, []);

  return (
    <Container>
      <input
        type="file"
        accept=".jpeg, .jpg, .bmp, .png, .gif, .tiff, .pgm"
        multiple
        onChange={({ target: { files } }) => handleImagesInput(files)}
      />

      {inputedImages.map((image, index) => (
        <Canvas key={index} element={image} />
      ))}
    </Container>
  );
};
