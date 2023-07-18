import { useCallback, useState } from 'react';
import { Container } from './styles';
import { CanvasImage } from 'components/CanvasImage';
import { ImagesInput } from 'components/ImagesInput';

export const Home = () => {
  const [images, setImages] = useState<HTMLCanvasElement[]>([]);
  const [selectedImagesIndexes, setSelectedImagesIndexes] = useState<number[]>(
    [],
  );

  const toggleSelectImage = useCallback(
    (imageIndex: number, selected: boolean) => {
      if (!selected && selectedImagesIndexes.length === 2) {
        alert('Limite de imagens selecionadas!');
        return;
      }

      setSelectedImagesIndexes(previousIndexes => {
        if (!selected) return [...previousIndexes, imageIndex];
        return previousIndexes.filter(index => index !== imageIndex);
      });
    },
    [selectedImagesIndexes.length],
  );

  return (
    <Container>
      <ImagesInput setImages={setImages} />

      {images.map((image, index) => (
        <CanvasImage
          key={index}
          element={image}
          selectionPosition={selectedImagesIndexes.indexOf(index)}
          toggleSelectImage={selected => toggleSelectImage(index, selected)}
          someImageSelected={selectedImagesIndexes.length > 0}
        />
      ))}
    </Container>
  );
};
