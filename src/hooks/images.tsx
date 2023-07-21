import { createContext, useCallback, useContext, useState } from 'react';
import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { OperationKey } from 'types/operations';
import { executeOperation } from 'utils/operations/executeOperation';

interface IImagesContext {
  images: HTMLCanvasElement[];
  selectedImages: HTMLCanvasElement[];
  updateImages: (newImages: HTMLCanvasElement[]) => void;
  setSelectedImages: (selectedImages: HTMLCanvasElement[]) => void;
  updateImagesWithOperationOnSelectedImages: (
    operationKey: OperationKey,
    inputValues: number[],
  ) => void;
}

const imagesContext = createContext<IImagesContext>({} as IImagesContext);

const ImagesContext = ({ children }: DefaultComponentProps) => {
  const [images, setImages] = useState<HTMLCanvasElement[]>([]);
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
      );

      setImages(previousImages => [...previousImages, ...newImages]);
    },
    [selectedImages],
  );

  return (
    <imagesContext.Provider
      value={{
        images,
        selectedImages,
        updateImages,
        setSelectedImages,
        updateImagesWithOperationOnSelectedImages,
      }}
    >
      {children}
    </imagesContext.Provider>
  );
};

const useImages = (): IImagesContext => useContext(imagesContext);

export { ImagesContext, useImages };
