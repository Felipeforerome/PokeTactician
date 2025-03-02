// components/Sidebar.tsx
import Filters from './Filters';
import { FiltersProps } from './Filters';
import StrategyRoles from './StrategyRoles';
import { Button } from '@heroui/react';
import { ObjectiveSelector } from './ObjectiveSelector';

interface SidebarProps extends FiltersProps {
  applyFilters: () => void;
  selectStrategy: (strategy: string) => void;
  selectRoles: (roles: string[]) => void;
  selectObjectiveFunctions: (objectiveFunctions: string[]) => void;
}

export default function Sidebar({
  updateFilters,
  applyFilters,
  selectStrategy,
  selectRoles,
  selectObjectiveFunctions,
}: SidebarProps) {
  const handleFilterChange = (id: string, value: any) => {
    updateFilters(id, value);
  };

  const handleApply = () => {
    // Put your filter application logic here
    applyFilters();
  };

  return (
    <aside className="flex flex-col bg-background-500 justify-center w-[250px] min-w-[250px] h-[calc(100vh-64px)] p-4 text-white gap-4 fixed top-16 left-0">
      <ObjectiveSelector handleObjFunChange={selectObjectiveFunctions} />
      <Filters updateFilters={handleFilterChange} />
      <StrategyRoles
        handleStrategyChange={selectStrategy}
        handleRoleChange={selectRoles}
      />
      <Button color="primary" onPress={handleApply}>
        Apply Filters
      </Button>
    </aside>
  );
}
