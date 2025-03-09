import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Selection,
  Select,
  SelectItem,
  Listbox,
  ListboxItem,
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

export function GenericSingleSelector<T extends SelectableItem>({
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
      console.log(title, ' items:', items);
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
      className="max-w-xs"
      items={items}
      label={title}
      placeholder={`Select ${title.toLowerCase()}`}
      selectionMode="single"
      scrollShadowProps={{
        isEnabled: false,
      }}
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
          <Listbox
            selectionMode="single"
            defaultSelectedKeys={
              items.length > 0 ? new Set([items[0].value]) : new Set()
            }
            aria-label={title}
            onSelectionChange={(key: Selection) =>
              handleSelectionChange(new Set([Array.from(key)[0] as string]))
            }
          >
            {items.map((item) => (
              <ListboxItem key={item.value}>{item.name}</ListboxItem>
            ))}
          </Listbox>
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
