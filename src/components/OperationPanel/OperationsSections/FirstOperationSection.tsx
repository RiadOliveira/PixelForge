import { Operations } from 'components/Operations';
import { useImages } from 'hooks/images';
import {
  ARITHMETICS_OPERATIONS,
  ArithmeticOperationKey,
} from 'types/operationsNames/arithmetics';
import {
  DECOMPOSITIONS,
  DecompositionsKey,
} from 'types/operationsNames/decompositions';
import {
  LOGICS_OPERATIONS,
  LogicOperationKey,
} from 'types/operationsNames/logics';
import {
  NOT_LINEAR_GRAYSCALE_OPERATIONS,
  NotLinearGrayscaleOperationKey,
} from 'types/operationsNames/notLinearGrayScale';
import {
  PSEUDOCOLORIZATION_OPERATIONS,
  PseudocolorizationKey,
} from 'types/operationsNames/pseudocolorization';
import { ZOOM_OPERATIONS, ZoomOperationKey } from 'types/operationsNames/zoom';

export const FirstOperationSection = () => {
  const { selectedImages } = useImages();

  const anyImagesSelected = selectedImages.length > 0;
  const oneImageSelected = selectedImages.length === 1;

  return (
    <>
      <Operations.Root title="Aritméticas">
        {Object.entries(ARITHMETICS_OPERATIONS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as ArithmeticOperationKey}
          >
            {oneImageSelected && <Operations.Input />}
          </Operations.Operation>
        ))}
      </Operations.Root>

      <Operations.Root title="Lógicas">
        {Object.entries(LOGICS_OPERATIONS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as LogicOperationKey}
          >
            {oneImageSelected && <Operations.Input />}
          </Operations.Operation>
        ))}
      </Operations.Root>

      <Operations.Root title="Transformações">
        <Operations.Transformations />
      </Operations.Root>

      <Operations.Root title="Zoom">
        {Object.entries(ZOOM_OPERATIONS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as ZoomOperationKey}
          >
            {anyImagesSelected && <Operations.Input />}
          </Operations.Operation>
        ))}
      </Operations.Root>

      <Operations.Root title="Decomposições">
        {Object.entries(DECOMPOSITIONS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as DecompositionsKey}
          />
        ))}
      </Operations.Root>

      <Operations.Root title="Pseudocolorização">
        {Object.entries(PSEUDOCOLORIZATION_OPERATIONS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as PseudocolorizationKey}
          />
        ))}
      </Operations.Root>

      <Operations.Root title="Grayscale - Linear">
        <Operations.LinearGrayscale />
      </Operations.Root>

      <Operations.Root title="Grayscale - Não Linear">
        {Object.entries(NOT_LINEAR_GRAYSCALE_OPERATIONS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as NotLinearGrayscaleOperationKey}
          />
        ))}
      </Operations.Root>
    </>
  );
};
