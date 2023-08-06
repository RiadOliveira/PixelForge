import { createContext, useCallback, useContext, useState } from 'react';
import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { OperationData } from 'types/operations/OperationData';
import { executeOperations } from 'utils/operations/executeOperations';

interface IImagesContext {
  images: HTMLCanvasElement[];
  selectedImages: HTMLCanvasElement[];
  normalizeValues: boolean;
  updateImages: (newImages: HTMLCanvasElement[]) => void;
  setSelectedImages: (selectedImages: HTMLCanvasElement[]) => void;
  setNormalizeValues: (normalizeValues: boolean) => void;
  updateImagesWithOperationOnSelectedImages: (
    operationsData: OperationData[],
  ) => void;
}

const imagesContext = createContext<IImagesContext>({} as IImagesContext);

const ImagesContext = ({ children }: DefaultComponentProps) => {
  const [images, setImages] = useState<HTMLCanvasElement[]>([]);
  const [normalizeValues, setNormalizeValues] = useState(false);
  const [selectedImages, setSelectedImages] = useState<HTMLCanvasElement[]>([]);

  const updateImages = useCallback(
    (newImages: HTMLCanvasElement[]) =>
      setImages(previousImages => [...previousImages, ...newImages]),
    [],
  );

  const updateImagesWithOperationOnSelectedImages = useCallback(
    (operationsData: OperationData[]) => {
      const newImages = executeOperations(
        selectedImages,
        operationsData,
        normalizeValues,
      );

      setImages(previousImages => [...previousImages, ...newImages]);
    },
    [normalizeValues, selectedImages],
  );

  return (
    <imagesContext.Provider
      value={{
        images,
        selectedImages,
        normalizeValues,
        updateImages,
        setSelectedImages,
        setNormalizeValues,
        updateImagesWithOperationOnSelectedImages,
      }}
    >
      {children}
    </imagesContext.Provider>
  );
};

const useImages = (): IImagesContext => useContext(imagesContext);

export { ImagesContext, useImages };
