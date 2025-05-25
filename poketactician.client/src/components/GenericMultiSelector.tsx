import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Selection,
  Checkbox,
  CheckboxGroup,
  Select,
  SelectItem,
} from '@heroui/react';
import { useEffect, useState } from 'react';
import { SelectableItem } from '../types';

interface GenericSelectorProps<T extends SelectableItem> {
  title: string; // Button/label text
  items?: T[]; // Optional pre-loaded items
  apiEndpoint?: string; // Optional API endpoint to fetch items
  onSelectionChange: (selectedValues: string[]) => void;
  isMobile: boolean;
  initialSelection?: string[];
}

export function GenericMultiSelector<T extends SelectableItem>({
  title,
  items: initialItems,
  apiEndpoint,
  onSelectionChange,
  isMobile,
  initialSelection = [],
}: GenericSelectorProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems || []);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(initialSelection),
  );

  useEffect(() => {
    if (initialItems) {
      setItems(initialItems); // Update items when initialItems prop changes
    }
  }, [initialItems]);

  useEffect(() => {
    if (apiEndpoint && !initialItems) {
      fetchItems();
    }
  }, [apiEndpoint]);

  // When selection changes, update local state and call the parent handler
  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
    onSelectionChange(Array.from(keys) as string[]);
  };

  const selectComponent = (
    <Select
      className="max-w-xs pb-3"
      items={items}
      label={title}
      placeholder={`Select ${title.toLowerCase()}`}
      selectionMode="multiple"
      scrollShadowProps={{
        isEnabled: false,
      }}
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
    >
      {(item) => <SelectItem key={item.value}>{item.name}</SelectItem>}
    </Select>
  );

  const popoverComponent = (
    <Popover placement="right" shouldFlip={true}>
      <PopoverTrigger>
        <Button fullWidth>{title}</Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[70vh] overflow-hidden">
        <div className="p-2 overflow-y-auto h-full max-h-[calc(70vh-20px)]">
          <p
            className="text-xs text-gray-500 text-right cursor-pointer"
            onClick={() => handleSelectionChange(new Set())}
          >
            Clear
          </p>
          <CheckboxGroup
            className="p-2"
            onValueChange={(value) => handleSelectionChange(new Set(value))}
            value={Array.from(selectedKeys) as string[]}
          >
            {items.map((item) => (
              <Checkbox key={item.value} value={item.value}>
                {item.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </PopoverContent>
    </Popover>
  );

  return <>{isMobile ? selectComponent : popoverComponent}</>;

  async function fetchItems() {
    try {
      const response = await fetch(apiEndpoint!);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(`Failed to fetch ${title} data:`, error);
    }
  }
}
