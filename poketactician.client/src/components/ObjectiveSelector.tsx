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
    ObjectiveFunction[] // Objective function already has the same structure as SelectableItem
  >([]);

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
      />
    </>
  );
  async function populateObjFuncData() {
    const response = await fetch('/api/objectivefunction');
    const data = await response.json();
    setObjectiveFunctions(data);
  }
}
