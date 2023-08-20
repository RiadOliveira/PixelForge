import { Operations } from 'components/Operations';
import { useImages } from 'hooks/images';
import {
  EDGE_PRESERVING_LOW_PASS_FILTERS,
  EdgePreservingLowPassFiltersKey,
} from 'types/operationsNames/edgePreservingLowPassFilters';
import {
  HIGHLIGHTS,
  HighlightOperationKey,
} from 'types/operationsNames/highlight';
import {
  LOW_PASS_FILTERS,
  LowPassFiltersKey,
} from 'types/operationsNames/lowPassFilters';

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

      <Operations.Root title="Passa-baixa">
        {Object.entries(LOW_PASS_FILTERS).map(([key, value]) => (
          <Operations.Operation
            key={key}
            title={value}
            operationKey={key as LowPassFiltersKey}
          >
            {anyImagesSelected && (
              <Operations.Input placeholder="Tamanho da janela" />
            )}
          </Operations.Operation>
        ))}
      </Operations.Root>

      <Operations.Root title="Passa-baixas com bordas">
        {Object.entries(EDGE_PRESERVING_LOW_PASS_FILTERS).map(
          ([key, value]) => (
            <Operations.Operation
              key={key}
              title={value}
              operationKey={key as EdgePreservingLowPassFiltersKey}
            />
          ),
        )}
      </Operations.Root>
    </>
  );
};
