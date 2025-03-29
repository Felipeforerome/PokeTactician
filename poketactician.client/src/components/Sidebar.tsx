// components/Sidebar.tsx
import Filters from './Filters';
import { FiltersProps } from './Filters';
import StrategyRoles from './StrategyRoles';
import { Button, Divider } from '@heroui/react';
import { ObjectiveSelector } from './ObjectiveSelector';

interface SidebarProps extends FiltersProps {
  applyFilters: () => void;
  selectStrategy: (strategy: string) => void;
  selectRoles: (roles: string[]) => void;
  selectObjectiveFunctions: (objectiveFunctions: string[]) => void;
  onClose?: () => void;
}

export default function Sidebar({
  updateFilters,
  applyFilters,
  selectStrategy,
  selectRoles,
  selectObjectiveFunctions,
  isMobile,
  onClose,
}: SidebarProps) {
  const handleFilterChange = (id: string, value: any) => {
    updateFilters(id, value);
  };

  const handleApply = () => {
    if (onClose) {
      onClose();
    }
    applyFilters();
  };

  const sidebarClass = isMobile
    ? 'flex flex-col bg-background-500 justify-center min-w-[100vw] h-[calc(100vh-64px)] p-4 text-white gap-4 fixed top-16 left-0 overflow-y-auto'
    : 'flex flex-col bg-background-500 justify-center min-w-[250px] h-[calc(100vh-64px)] p-4 text-white gap-4 fixed top-16 left-0';
  return (
    <aside className={sidebarClass}>
      <Divider />
      <h2> Filter Pokemon</h2>
      <Filters updateFilters={handleFilterChange} isMobile={isMobile} />
      <Divider />
      <h2>Optimization Options</h2>
      <ObjectiveSelector
        handleObjFunChange={selectObjectiveFunctions}
        isMobile={isMobile}
      />
      <StrategyRoles
        handleStrategyChange={selectStrategy}
        handleRoleChange={selectRoles}
        isMobile={isMobile}
      />
      <Button color="primary" onPress={handleApply} className="min-h-[40px]">
        Suggest Team
      </Button>
    </aside>
  );
}
