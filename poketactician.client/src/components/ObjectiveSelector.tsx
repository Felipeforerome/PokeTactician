import { Select, SelectItem } from '@heroui/react';
import { useEffect, useState } from 'react';
import { ObjectiveFunction } from '../types';

interface ObjectiveSelectorProps {
  handleObjFunChange: (objectiveFunctions: string[]) => void;
}

export function ObjectiveSelector({
  handleObjFunChange,
}: ObjectiveSelectorProps) {
  const [objectiveFunctions, setObjectiveFunctions] = useState<
    ObjectiveFunction[]
  >([]);

  useEffect(() => {
    populateObjFuncData();
  }, []);

  return (
    <Select
      className="max-w-xs"
      items={objectiveFunctions}
      label="Select objective functions"
      placeholder="Select objective functions"
      selectionMode="multiple"
      scrollShadowProps={{
        isEnabled: false,
      }}
      onSelectionChange={(value) => {
        console.log(value);
        handleObjFunChange(Array.from(value) as string[]);
      }}
    >
      {(objectiveFunction) => (
        <SelectItem className="" key={objectiveFunction.value}>
          {objectiveFunction.name}
        </SelectItem>
      )}
    </Select>
  );
  async function populateObjFuncData() {
    const response = await fetch('/api/objectivefunction');
    const data = await response.json();
    setObjectiveFunctions(data);
  }
}
