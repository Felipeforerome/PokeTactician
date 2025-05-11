// components/Sidebar.tsx
import Filters from './Filters';
import { FiltersProps } from './Filters';
import StrategyRoles from './StrategyRoles';
import { Button, Divider } from '@heroui/react';
import { ObjectiveSelector } from './ObjectiveSelector';
import { useState } from 'react';
import { Accordion, AccordionItem } from '@heroui/react';
import type { Selection } from '@heroui/react';

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
  const [selectedFilters, setSelectedFilters] = useState<Selection>(
    new Set(['1']),
  );

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
    <>
      {isMobile ? (
        <aside className={sidebarClass}>
          <Accordion
            variant="light"
            selectedKeys={selectedFilters}
            onSelectionChange={(keys) => {
              if (keys instanceof Set) {
                setSelectedFilters(new Set(Array.from(keys) as string[]));
              }
            }}
            keepContentMounted={true}
            showDivider={false}
          >
            <AccordionItem
              key="1"
              title="Filter Pokemon"
              subtitle="Select Pokemon for the optimizer"
            >
              <Filters updateFilters={handleFilterChange} isMobile={isMobile} />
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Optimization Options"
              title="Optimization Options"
              subtitle="Select how to optimize your team"
            >
              <ObjectiveSelector
                handleObjFunChange={selectObjectiveFunctions}
                isMobile={isMobile}
              />
              <StrategyRoles
                handleStrategyChange={selectStrategy}
                handleRoleChange={selectRoles}
                isMobile={isMobile}
              />
            </AccordionItem>
          </Accordion>
          <Button
            color="primary"
            onPress={handleApply}
            className="min-h-[40px]"
          >
            Suggest Team
          </Button>
        </aside>
      ) : (
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
          <Button
            color="primary"
            onPress={handleApply}
            className="min-h-[40px]"
          >
            Suggest Team
          </Button>
        </aside>
      )}
    </>
  );
}
