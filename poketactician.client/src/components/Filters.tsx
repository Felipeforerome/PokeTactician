import { Button, Checkbox, Input } from '@nextui-org/react';

export interface FiltersProps {
  updateFilters: (id: string, value: boolean) => void;
  applyFilters: () => void;
}

function Filters({ updateFilters, applyFilters }: FiltersProps) {
  const handleFilterChange = (id: string, value: any) => {
    updateFilters(id, value);
  };

  const handleApply = () => {
    // Put your filter application logic here
    applyFilters();
  };

  return (
    <>
      <Checkbox
        key={'filter1'}
        defaultSelected={false}
        onValueChange={(value) => handleFilterChange('filter1', value)}
        className="text-white"
      >
        'Filter 1'
      </Checkbox>
      <Checkbox
        key={'filter2'}
        defaultSelected={false}
        onValueChange={(value) => handleFilterChange('filter2', value)}
        className="text-white"
      >
        'Filter 2'
      </Checkbox>
      <Checkbox
        key={'filter3'}
        defaultSelected={false}
        onValueChange={(value) => handleFilterChange('filter3', value)}
        className="text-white"
      >
        'Filter 3'
      </Checkbox>

      <Input
        type="search"
        placeholder="Search..."
        variant="bordered"
        className="bg-white text-black mt-2"
      />

      <Button color="primary" onPress={handleApply}>
        Apply Filters
      </Button>
    </>
  );
}

export default Filters;
