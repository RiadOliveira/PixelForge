import { createContext, useCallback, useContext, useState } from 'react';
import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { OperationKey } from 'types/operations';
import { executeOperation } from 'utils/operations/executeOperation';

interface IImagesContext {
  images: HTMLCanvasElement[];
  selectedImages: HTMLCanvasElement[];
  normalizeValues: boolean;
  updateImages: (newImages: HTMLCanvasElement[]) => void;
  setSelectedImages: (selectedImages: HTMLCanvasElement[]) => void;
  setNormalizeValues: (normalizeValues: boolean) => void;
  updateImagesWithOperationOnSelectedImages: (
    operationKey: OperationKey,
    inputValues: number[],
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
    (operationKey: OperationKey, inputValues: number[]) => {
      const newImages = executeOperation(
        selectedImages,
        operationKey,
        inputValues,
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
