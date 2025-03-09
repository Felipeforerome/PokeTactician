import { useState, useEffect } from 'react';
import { GenericMultiSelector } from './GenericMultiSelector';
import { GenericSingleSelector } from './GenericSingleSelector';
import { Strategy, Role, SelectableItem } from '../types';

interface StrategyRolesProps {
  handleStrategyChange: (key: string) => void;
  handleRoleChange: (roles: string[]) => void;
  isMobile: boolean;
}

export default function StrategyRoles({
  handleStrategyChange,
  handleRoleChange,
  isMobile,
}: StrategyRolesProps) {
  const [strategies, setStrategies] = useState<SelectableItem[]>([
    { value: 'none', name: 'None' },
  ]);

  const [roles, setRoles] = useState<SelectableItem[]>([
    { value: 'none', name: 'None' },
  ]);

  useEffect(() => {
    populateStrategyData();
    populateRoleData();
  }, []);

  const onStrategySelect = (key: string) => {
    handleStrategyChange(key);
  };
  return (
    <div>
      <GenericSingleSelector
        title="Strategies"
        items={strategies}
        initialSelection={strategies[0].value ? [strategies[0].value] : []}
        onSelectionChange={(values) => onStrategySelect(values[0])}
        isMobile={isMobile}
      />
      <div className="p-1.5"></div>
      <GenericMultiSelector
        title="Roles"
        items={roles}
        onSelectionChange={handleRoleChange}
        isMobile={isMobile}
      />
    </div>
  );
  async function populateStrategyData() {
    const response = await fetch('/api/strategies');
    const data = await response.json();
    setStrategies(
      data.map((strategy: Strategy) => ({
        value: strategy.key,
        name: strategy.text,
      })),
    );
  }

  async function populateRoleData() {
    const response = await fetch('/api/roles');
    const data = await response.json();
    setRoles(
      data.map((role: Role) => ({
        value: role.value,
        name: role.text,
      })),
    );
  }
}
