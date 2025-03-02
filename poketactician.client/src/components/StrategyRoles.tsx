import {
  Listbox,
  ListboxItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Selection,
  Checkbox,
  CheckboxGroup,
} from '@heroui/react';
import { useState, useEffect } from 'react';

interface StrategyRolesProps {
  handleStrategyChange: (key: string) => void;
  handleRoleChange: (roles: string[]) => void;
}

export default function StrategyRoles({
  handleStrategyChange,
  handleRoleChange,
}: StrategyRolesProps) {
  const [strategies, setStrategies] = useState<
    {
      key: string;
      text: string;
    }[]
  >([{ key: 'none', text: 'None' }]);

  const [roles, setRoles] = useState<
    {
      text: string;
      value: string;
    }[]
  >([{ value: 'none', text: 'None' }]);

  const defaultKey = new Set([strategies[0].key]);

  useEffect(() => {
    populateStrategyData();
    populateRoleData();
  });

  const onStrategySelect = (key: string) => {
    handleStrategyChange(key);
  };
  return (
    <div>
      <Popover placement="right">
        <PopoverTrigger>
          <Button fullWidth>Strategy</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Listbox
            disallowEmptySelection
            defaultSelectedKeys={defaultKey}
            selectionMode="single"
            aria-label="Strategies"
            onSelectionChange={(key: Selection) =>
              onStrategySelect(Array.from(key)[0] as string)
            }
          >
            {strategies.map((strat) => (
              <ListboxItem key={strat.key}>{strat.text}</ListboxItem>
            ))}
          </Listbox>
        </PopoverContent>
      </Popover>
      <div className="p-1.5"></div>
      <Popover placement="right-end">
        <PopoverTrigger>
          <Button fullWidth>Roles</Button>
        </PopoverTrigger>
        <PopoverContent>
          <CheckboxGroup className="p-2" onValueChange={handleRoleChange}>
            {roles.map((role) => (
              <Checkbox key={role.value} value={role.value}>
                {role.text}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </PopoverContent>
      </Popover>
    </div>
  );
  async function populateStrategyData() {
    const response = await fetch('/api/strategies');
    const data = await response.json();
    setStrategies(data);
  }
  async function populateRoleData() {
    const response = await fetch('/api/roles');
    const data = await response.json();
    setRoles(data);
  }
}
