import { createContext, useCallback, useContext, useState } from 'react';
import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { OperationFunction } from 'types/OperationFunction';

interface IImagesContext {
  images: HTMLCanvasElement[];
  selectedImages: HTMLCanvasElement[];
  updateImages: (newImages: HTMLCanvasElement[]) => void;
  setSelectedImages: (selectedImages: HTMLCanvasElement[]) => void;
  updateImagesWithOperationOnSelectedImages: (
    operation: OperationFunction,
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
    (operationFunction: OperationFunction, inputValues: number[]) => {
      const newImages = operationFunction({
        images: selectedImages,
        inputValues,
      });
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
