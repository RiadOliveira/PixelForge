import { Operations } from 'components/Operations';
import { Container, OperationsContainer } from './styles';
import { useImages } from 'hooks/images';
import { Checkbox } from 'components/Checkbox';
import {
  ARITHMETICS_OPERATIONS,
  ArithmeticOperationKey,
} from 'types/operationsNames/arithmetics';
import {
  LOGICS_OPERATIONS,
  LogicOperationKey,
} from 'types/operationsNames/logics';
import { ZOOM_OPERATIONS, ZoomOperationKey } from 'types/operationsNames/zoom';
import {
  DECOMPOSITIONS,
  DecompositionsKey,
} from 'types/operationsNames/decompositions';
import {
  PSEUDOCOLORIZATION_OPERATIONS,
  PseudocolorizationKey,
} from 'types/operationsNames/pseudocolorization';
import {
  NOT_LINEAR_GRAYSCALE_OPERATIONS,
  NotLinearGrayscaleOperationKey,
} from 'types/operationsNames/notLinearGrayScale';
import {
  ADDITIONAL_GRAYSCALE_OPERATIONS,
  AdditionalGrayscaleOperationKey,
} from 'types/operationsNames/additionalGrayscale';
import {
  GAMMA_AND_EQUALIZATION,
  GammaAndEqualizationKey,
} from 'types/operationsNames/gammaAndEqualization';
import { BIT_SLICING, BitSlicingKey } from 'types/operationsNames/bitSlicing';

export const OperationPanel = () => {
  const { selectedImages, normalizeValues, setNormalizeValues } = useImages();
  const oneImageSelected = selectedImages.length === 1;

  return (
    <Container>
      <h3>Painel de Operações</h3>

      <Checkbox
        label="Normalizar valores"
        checked={normalizeValues}
        handleChange={setNormalizeValues}
      />

      <OperationsContainer>
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
              {selectedImages.length > 0 && <Operations.Input />}
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
          {Object.entries(NOT_LINEAR_GRAYSCALE_OPERATIONS).map(
            ([key, value]) => (
              <Operations.Operation
                key={key}
                title={value}
                operationKey={key as NotLinearGrayscaleOperationKey}
              />
            ),
          )}
        </Operations.Root>

        <Operations.Root title="Grayscale - Adicionais">
          {Object.entries(ADDITIONAL_GRAYSCALE_OPERATIONS).map(
            ([key, value]) => (
              <Operations.Operation
                key={key}
                title={value}
                operationKey={key as AdditionalGrayscaleOperationKey}
              />
            ),
          )}
        </Operations.Root>

        <Operations.Root title="Gama e Equalização">
          {Object.entries(GAMMA_AND_EQUALIZATION).map(([key, value]) => (
            <Operations.Operation
              key={key}
              title={value}
              operationKey={key as GammaAndEqualizationKey}
            >
              {selectedImages.length > 0 &&
                (key as GammaAndEqualizationKey) === 'GAMMA_CORRECTION' && (
                  <Operations.Input />
                )}
            </Operations.Operation>
          ))}
        </Operations.Root>

        <Operations.Root title="Fatiamento de bits">
          {Object.entries(BIT_SLICING).map(([key, value]) => (
            <Operations.Operation
              key={key}
              title={value}
              operationKey={key as BitSlicingKey}
            >
              {selectedImages.length > 0 && <Operations.Input />}
            </Operations.Operation>
          ))}
        </Operations.Root>
      </OperationsContainer>
    </Container>
  );
};
