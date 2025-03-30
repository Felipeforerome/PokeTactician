import { Pokemon } from '../types';
interface TeamDashboardProps {
  team: Pokemon[];
}
export function TeamDashboard({ team }: TeamDashboardProps) {
  console.log(team);
  return (
    <div className="flex justify-center items-center h-full">
      <h1>Still in construction</h1>
    </div>
  );
}
