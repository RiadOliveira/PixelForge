import { useCallback, useEffect, useState } from 'react';
import { Container, ImagesContainer } from './styles';
import { CanvasImage } from 'components/CanvasImage';
import { ImagesInput } from 'components/ImagesInput';
import { OperationPanel } from 'components/OperationPanel';
import { useImages } from 'hooks/images';

export const Home = () => {
  const { images, setSelectedImages } = useImages();
  const [selectedImagesIndexes, setSelectedImagesIndexes] = useState<number[]>(
    [],
  );

  useEffect(() => {
    setSelectedImages(selectedImagesIndexes.map(index => images[index]));
  }, [images, selectedImagesIndexes, setSelectedImages]);

  const toggleSelectImage = useCallback(
    (imageIndex: number, selected: boolean) => {
      setSelectedImagesIndexes(previousIndexes => {
        if (selected) {
          return previousIndexes.filter(index => index !== imageIndex);
        }

        if (previousIndexes.length === 2) {
          return [previousIndexes[0], imageIndex];
        }

        return [...previousIndexes, imageIndex];
      });
    },
    [],
  );

  return (
    <Container>
      <OperationPanel />

      <ImagesContainer>
        <ImagesInput />

        {images.map((image, index) => (
          <CanvasImage
            key={index}
            element={image}
            selectionPosition={selectedImagesIndexes.indexOf(index)}
            toggleSelectImage={selected => toggleSelectImage(index, selected)}
            someImageSelected={selectedImagesIndexes.length > 0}
          />
        ))}
      </ImagesContainer>
    </Container>
  );
};
