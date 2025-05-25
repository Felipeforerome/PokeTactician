import { useEffect, useState } from 'react';
import { ObjectiveFunction } from '../types';
import { GenericMultiSelector } from './GenericMultiSelector';

interface ObjectiveSelectorProps {
  handleObjFunChange: (objectiveFunctions: string[]) => void;
  isMobile: boolean;
}

export function ObjectiveSelector({
  handleObjFunChange,
  isMobile,
}: ObjectiveSelectorProps) {
  const [objectiveFunctions, setObjectiveFunctions] = useState<
    ObjectiveFunction[]
  >([{ value: 'attack', name: 'Attack' }]);

  useEffect(() => {
    populateObjFuncData();
  }, []);

  return (
    <>
      <GenericMultiSelector
        title="Objective Functions"
        items={objectiveFunctions}
        onSelectionChange={handleObjFunChange}
        isMobile={isMobile}
        initialSelection={
          objectiveFunctions[0].value ? [objectiveFunctions[0].value] : []
        }
      />
    </>
  );
  async function populateObjFuncData() {
    const response = await fetch('/api/objectivefunction');
    const data = await response.json();
    setObjectiveFunctions(data);
  }
}
