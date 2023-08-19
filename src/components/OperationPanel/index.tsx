import { ChangeSectionButton, Container, OperationsContainer } from './styles';
import { useImages } from 'hooks/images';
import { Checkbox } from 'components/Checkbox';
import { useCallback, useState } from 'react';
import { FirstOperationSection } from './OperationsSections/FirstOperationSection';
import { SecondOperationSection } from './OperationsSections/SecondOperationSection';

const SECTIONS = {
  first: {
    name: 'Primeira Unidade',
    section: FirstOperationSection,
  },
  second: {
    name: 'Segunda Unidade',
    section: SecondOperationSection,
  },
};

export const OperationPanel = () => {
  const { normalizeValues, setNormalizeValues } = useImages();
  const [selectedSection, setSelectedSection] =
    useState<keyof typeof SECTIONS>('first');

  const handleChangeSection = useCallback(
    () =>
      setSelectedSection(previousSelected =>
        previousSelected === 'first' ? 'second' : 'first',
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
        {SECTIONS[selectedSection].section()}
      </OperationsContainer>

      <ChangeSectionButton type="button" onClick={handleChangeSection}>
        {SECTIONS[selectedSection].name}
      </ChangeSectionButton>
    </Container>
  );
};
