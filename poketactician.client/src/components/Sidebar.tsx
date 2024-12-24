// components/Sidebar.tsx
import Filters from './Filters';
import { FiltersProps } from './Filters';

export default function Sidebar({ updateFilters, applyFilters }: FiltersProps) {
  const handleFilterChange = (id: string, value: any) => {
    updateFilters(id, value);
  };

  const handleApply = () => {
    // Put your filter application logic here
    applyFilters();
  };

  return (
    <aside className="flex flex-col bg-background-500 justify-center w-[250px] min-w-[250px] h-[calc(100vh-64px)] p-4 text-white gap-4 fixed top-16 left-0">
      <Filters updateFilters={handleFilterChange} applyFilters={handleApply} />
    </aside>
  );
}
