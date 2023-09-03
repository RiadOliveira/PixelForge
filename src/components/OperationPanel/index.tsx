import { ChangeSectionButton, Container, OperationsContainer } from './styles';
import { useImages } from 'hooks/images';
import { Checkbox } from 'components/Checkbox';
import { useCallback, useMemo, useState } from 'react';
import { FirstOperationSection } from './OperationsSections/FirstOperationSection';
import { SecondOperationSection } from './OperationsSections/SecondOperationSection';

const SECTIONS = {
  first: {
    name: 'Primeira Unidade',
    Section: FirstOperationSection,
  },
  second: {
    name: 'Segunda Unidade',
    Section: SecondOperationSection,
  },
};

export const OperationPanel = () => {
  const { normalizeValues, setNormalizeValues } = useImages();
  const [selectedSectionKey, setSelectedSectionKey] =
    useState<keyof typeof SECTIONS>('first');

  const { name, Section } = useMemo(
    () => SECTIONS[selectedSectionKey],
    [selectedSectionKey],
  );
  const handleChangeSection = useCallback(
    () =>
      setSelectedSectionKey(previousSelectedKey =>
        previousSelectedKey === 'first' ? 'second' : 'first',
      ),
    [],
  );

  return (
    <Container>
      <h3>Painel de Operações</h3>

      <Checkbox
        label="Normalizar valores"
        checked={normalizeValues}
        handleChange={setNormalizeValues}
      />

      <OperationsContainer>
        <Section />
      </OperationsContainer>

      <ChangeSectionButton type="button" onClick={handleChangeSection}>
        {name}
      </ChangeSectionButton>
    </Container>
  );
};
