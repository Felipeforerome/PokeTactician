// components/Sidebar.tsx
import { useState } from 'react';
import { Button, Checkbox, Input } from '@nextui-org/react';

interface Filter {
  id: string;
  label: string;
  value: boolean;
}

export default function Sidebar() {
  const [filters, setFilters] = useState<Filter[]>([
    { id: 'filter1', label: 'Filter 1', value: false },
    { id: 'filter2', label: 'Filter 2', value: false },
    { id: 'filter3', label: 'Filter 3', value: false },
  ]);

  const handleFilterChange = (id: string) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.id === id ? { ...filter, value: !filter.value } : filter,
      ),
    );
  };

  const applyFilters = () => {
    // Put your filter application logic here
    console.log('Applied Filters:', filters);
  };

  return (
    <aside className="flex flex-col bg-background-500 justify-center w-[250px] min-w-[250px] h-[calc(100vh-64px)] p-4 text-white gap-4 fixed top-16 left-0">
      {filters.map((filter) => (
        <Checkbox
          key={filter.id}
          isSelected={filter.value}
          onValueChange={() => handleFilterChange(filter.id)}
          className="text-white"
        >
          {filter.label}
        </Checkbox>
      ))}

      <Input
        type="search"
        placeholder="Search..."
        variant="bordered"
        className="bg-white text-black mt-2"
      />

      <Button color="primary" onPress={applyFilters}>
        Apply Filters
      </Button>
    </aside>
  );
}
