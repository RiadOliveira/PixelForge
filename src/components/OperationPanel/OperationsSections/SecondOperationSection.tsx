import { Operations } from 'components/Operations';
import { useImages } from 'hooks/images';
import {
  BORDERS_DETECTION,
  BordersDetectionKey,
} from 'types/operationsNames/bordersDetection';
import {
  DOTS_LINES_DETECTION,
  DotsLinesDetectionKey,
} from 'types/operationsNames/dotsLinesDetection';
import {
  HALFTONING_FILTERS,
  HalftoningFilterKey,
} from 'types/operationsNames/halftoningFilters';
import {
  HIGH_PASS_FILTERS,
  HighPassFilterKey,
} from 'types/operationsNames/highPassFilters';
import {
  HIGHLIGHTS,
  HighlightOperationKey,
} from 'types/operationsNames/highlight';
import {
  LOW_PASS_FILTERS,
  LowPassFilterKey,
} from 'types/operationsNames/lowPassFilters';
import {
  THRESHOLDING_OPERATIONS,
  ThresholdingOperationKey,
} from 'types/operationsNames/thresholding';
import { isLowFilterEdgePreservingKey } from 'utils/auxiliar/isLowFilterEdgePreservingKey';

export const SecondOperationSection = () => {
  const { selectedImages } = useImages();
  const anyImagesSelected = selectedImages.length > 0;

  return (
    <>
      <Operations.Root title="Realce">
        {Object.entries(HIGHLIGHTS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as HighlightOperationKey}
          >
            {anyImagesSelected &&
              (key as HighlightOperationKey) !== 'HISTOGRAM_EQUALIZATION' && (
                <Operations.Input />
              )}
          </Operations.Operation>
        ))}
      </Operations.Root>

      <Operations.Root title="Filtros passa-baixa">
        {Object.entries(LOW_PASS_FILTERS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as LowPassFilterKey}
          >
            {anyImagesSelected &&
              !isLowFilterEdgePreservingKey(key as LowPassFilterKey) && (
                <Operations.Input placeholder="Tamanho da janela" />
              )}
          </Operations.Operation>
        ))}
      </Operations.Root>

      <Operations.Root title="Filtros passa-alta">
        {Object.entries(HIGH_PASS_FILTERS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as HighPassFilterKey}
          >
            {anyImagesSelected && key === 'HIGHT_BOOST' && (
              <Operations.Input placeholder="Fator de amplificação" />
            )}
          </Operations.Operation>
        ))}
      </Operations.Root>

      <Operations.Root title="Meios-tons">
        {Object.entries(HALFTONING_FILTERS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as HalftoningFilterKey}
          />
        ))}
      </Operations.Root>

      <Operations.Root title="Detecção pontos/linhas">
        {Object.entries(DOTS_LINES_DETECTION).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as DotsLinesDetectionKey}
          >
            {anyImagesSelected && <Operations.Input placeholder="Threshold" />}
          </Operations.Operation>
        ))}
      </Operations.Root>

      <Operations.Root title="Detecção bordas">
        {Object.entries(BORDERS_DETECTION).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as BordersDetectionKey}
          />
        ))}
      </Operations.Root>

      <Operations.Root title="Limiarização">
        {Object.entries(THRESHOLDING_OPERATIONS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as ThresholdingOperationKey}
          >
            {anyImagesSelected && key !== 'GLOBAL' && (
              <>
                <Operations.Input placeholder="Tamanho da janela" />

                {key === 'LOCAL_NIBLACK' && (
                  <Operations.Input placeholder="Fator de ponderação" />
                )}
              </>
            )}
          </Operations.Operation>
        ))}
      </Operations.Root>
    </>
  );
};
