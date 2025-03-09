import { Pokemon } from '../types';
interface TeamDashboardProps {
  team: Pokemon[];
}
export function TeamDashboard({ team }: TeamDashboardProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <h1>Other Side</h1>
    </div>
  );
}
