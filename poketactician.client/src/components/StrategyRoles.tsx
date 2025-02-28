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
import { roles } from '../data/roles';
import { strategies } from '../data/strategies';
interface StrategyRolesProps {
  handleStrategyChange: (key: string) => void;
  handleRoleChange: (roles: string[]) => void;
}

export default function StrategyRoles({
  handleStrategyChange,
  handleRoleChange,
}: StrategyRolesProps) {
  const defaultKey = new Set([strategies[0].key]);

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
}
