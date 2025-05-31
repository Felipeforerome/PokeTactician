'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Tab, Tabs } from '@heroui/react';
import { Radar, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import type { Pokemon } from '../types';
import { formatString, hexToRgba, pokemonTypeColors } from '../utils';

// Register required Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

interface TeamDashboardProps {
  team: Pokemon[];
}

export function TeamDashboard({ team }: TeamDashboardProps) {
  // Store the active tab in a ref to preserve it across re-renders
  const [activeTab, setActiveTab] = useState('stats');

  // Store the team data in state to preserve it
  const [teamData, setTeamData] = useState<Pokemon[]>([]);

  // Update teamData when team prop changes
  useEffect(() => {
    if (team && team.length > 0) {
      setTeamData(team);
    }
  }, [team]);

  // Use teamData for calculations, fallback to team if teamData is empty
  const displayTeam = teamData.length > 0 ? teamData : team;

  // Skip calculations if no team data
  if (displayTeam.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-6">Team Analysis Dashboard</h1>
        <p>Add Pokémon to your team to see analysis.</p>
      </div>
    );
  }

  // Calculate average team stats
  const avgStats = {
    hp: Math.round(
      displayTeam.reduce((sum, pokemon) => sum + pokemon.hp, 0) /
        displayTeam.length,
    ),
    att: Math.round(
      displayTeam.reduce((sum, pokemon) => sum + pokemon.att, 0) /
        displayTeam.length,
    ),
    deff: Math.round(
      displayTeam.reduce((sum, pokemon) => sum + pokemon.deff, 0) /
        displayTeam.length,
    ),
    spAtt: Math.round(
      displayTeam.reduce((sum, pokemon) => sum + pokemon.spAtt, 0) /
        displayTeam.length,
    ),
    spDeff: Math.round(
      displayTeam.reduce((sum, pokemon) => sum + pokemon.spDeff, 0) /
        displayTeam.length,
    ),
    spe: Math.round(
      displayTeam.reduce((sum, pokemon) => sum + pokemon.spe, 0) /
        displayTeam.length,
    ),
  };

  // Calculate total team stats
  const totalStats = {
    hp: displayTeam.reduce((sum, pokemon) => sum + pokemon.hp, 0),
    att: displayTeam.reduce((sum, pokemon) => sum + pokemon.att, 0),
    deff: displayTeam.reduce((sum, pokemon) => sum + pokemon.deff, 0),
    spAtt: displayTeam.reduce((sum, pokemon) => sum + pokemon.spAtt, 0),
    spDeff: displayTeam.reduce((sum, pokemon) => sum + pokemon.spDeff, 0),
    spe: displayTeam.reduce((sum, pokemon) => sum + pokemon.spe, 0),
  };

  // Get all types in the team
  const teamTypes = displayTeam.flatMap((pokemon) =>
    pokemon.type2 ? [pokemon.type1, pokemon.type2] : [pokemon.type1],
  );

  // Count occurrences of each type
  const typeCount = teamTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Type effectiveness data
  const allTypes = [
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy',
  ];

  // Calculate type coverage
  const typeCoverage = allTypes.map((type) => {
    // This is a simplified calculation - in a real app you'd use actual type effectiveness data
    const coverage = teamTypes.includes(type) ? 1 : 0;
    return { type, coverage };
  });

  // Team stats radar chart data
  const statsRadarData = {
    labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
    datasets: [
      {
        label: 'Team Average',
        data: [
          avgStats.hp,
          avgStats.att,
          avgStats.deff,
          avgStats.spAtt,
          avgStats.spDeff,
          avgStats.spe,
        ],
        backgroundColor: hexToRgba('#4F46E5', 0.2),
        borderColor: hexToRgba('#4F46E5', 1),
        borderWidth: 1,
      },
    ],
  };

  // Type distribution chart data
  const typeDistributionData = {
    labels: Object.keys(typeCount),
    datasets: [
      {
        label: 'Type Distribution',
        data: Object.values(typeCount),
        backgroundColor: Object.keys(typeCount).map(
          (type) => pokemonTypeColors[type],
        ),
        borderWidth: 1,
      },
    ],
  };

  // Type coverage chart data
  const typeCoverageData = {
    labels: typeCoverage.map((t) => t.type),
    datasets: [
      {
        label: 'Type Coverage',
        data: typeCoverage.map((t) => t.coverage),
        backgroundColor: typeCoverage.map((t) =>
          hexToRgba(pokemonTypeColors[t.type] || '#808080', 0.6),
        ),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.2)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          backdropColor: 'rgba(0, 0, 0, 0)',
          beginAtZero: true,
        },
        suggestedMin: 0,
        suggestedMax: 150,
      },
    },
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  // Team strengths and weaknesses analysis
  const getTeamStrengths = () => {
    const strengths = [];

    if (avgStats.hp > 80) strengths.push('High HP');
    if (avgStats.att > 90) strengths.push('Strong Physical Attack');
    if (avgStats.deff > 90) strengths.push('Solid Physical Defense');
    if (avgStats.spAtt > 90) strengths.push('Strong Special Attack');
    if (avgStats.spDeff > 90) strengths.push('Solid Special Defense');
    if (avgStats.spe > 85) strengths.push('Good Speed');

    if (Object.keys(typeCount).length > 5)
      strengths.push('Diverse Type Coverage');

    return strengths.length > 0
      ? strengths
      : ['Analysis requires more team data'];
  };

  const getTeamWeaknesses = () => {
    const weaknesses = [];

    if (avgStats.hp < 60) weaknesses.push('Low HP');
    if (avgStats.att < 70) weaknesses.push('Weak Physical Attack');
    if (avgStats.deff < 70) weaknesses.push('Vulnerable to Physical Attacks');
    if (avgStats.spAtt < 70) weaknesses.push('Weak Special Attack');
    if (avgStats.spDeff < 70) weaknesses.push('Vulnerable to Special Attacks');
    if (avgStats.spe < 65) weaknesses.push('Slow Speed');

    if (Object.keys(typeCount).length < 3)
      weaknesses.push('Limited Type Coverage');

    return weaknesses.length > 0
      ? weaknesses
      : ['Analysis requires more team data'];
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Team Analysis Dashboard</h1>
      <br />
      <Tabs
        aria-label="Team Dashboard Tabs"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        className="mb-6"
        destroyInactiveTabPanel={false}
      >
        <Tab key="stats" title="Team Stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-background/60 dark:bg-default-100/50">
              <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Team Stats Overview</h4>
                <small className="text-default-500">
                  Average stats across your team
                </small>
              </CardHeader>
              <CardBody>
                <div className="h-80">
                  <Radar data={statsRadarData} options={radarOptions} />
                </div>
              </CardBody>
            </Card>

            <Card className="bg-background/60 dark:bg-default-100/50">
              <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Type Distribution</h4>
                <small className="text-default-500">
                  Types represented in your team
                </small>
              </CardHeader>
              <CardBody>
                <div className="h-80">
                  <Bar data={typeDistributionData} options={barOptions} />
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="coverage" title="Type Coverage">
          <Card className="bg-background/60 dark:bg-default-100/50">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Type Coverage</h4>
              <small className="text-default-500">
                Types your team can handle
              </small>
            </CardHeader>
            <CardBody>
              <div className="h-80">
                <Bar data={typeCoverageData} options={barOptions} />
              </div>
              <p className="text-sm text-default-500 mt-4">
                Note: This is a simplified view showing which types are present
                in your team. A full type effectiveness analysis would consider
                move types and defensive matchups.
              </p>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="analysis" title="Team Analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-background/60 dark:bg-default-100/50">
              <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Team Strengths</h4>
              </CardHeader>
              <CardBody>
                <ul className="list-disc pl-5 space-y-2">
                  {getTeamStrengths().map((strength, index) => (
                    <li key={index} className="text-green-400">
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-background/60 dark:bg-default-100/50">
              <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Team Weaknesses</h4>
              </CardHeader>
              <CardBody>
                <ul className="list-disc pl-5 space-y-2">
                  {getTeamWeaknesses().map((weakness, index) => (
                    <li key={index} className="text-red-400">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-background/60 dark:bg-default-100/50">
              <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Recommendations</h4>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {displayTeam.length < 6 && (
                    <p>
                      Your team has {displayTeam.length} Pokémon. Consider
                      adding {6 - displayTeam.length} more to complete your
                      team.
                    </p>
                  )}

                  {avgStats.spe < 70 && (
                    <p>
                      Your team's average speed is low. Consider adding faster
                      Pokémon or speed control moves.
                    </p>
                  )}

                  {Object.keys(typeCount).length < 4 && (
                    <p>
                      Your team has limited type diversity. Consider adding
                      Pokémon with different types to improve coverage.
                    </p>
                  )}

                  {displayTeam.length === 0 && (
                    <p>
                      Add Pokémon to your team to see personalized
                      recommendations.
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="details" title="Detailed Stats">
          <Card className="bg-background/60 dark:bg-default-100/50">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Detailed Team Statistics</h4>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Pokémon</th>
                      <th className="text-center">HP</th>
                      <th className="text-center">Attack</th>
                      <th className="text-center">Defense</th>
                      <th className="text-center">Sp. Atk</th>
                      <th className="text-center">Sp. Def</th>
                      <th className="text-center">Speed</th>
                      <th className="text-center">Types</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayTeam.map((pokemon, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-2">{formatString(pokemon.name)}</td>
                        <td className="text-center">{pokemon.hp}</td>
                        <td className="text-center">{pokemon.att}</td>
                        <td className="text-center">{pokemon.deff}</td>
                        <td className="text-center">{pokemon.spAtt}</td>
                        <td className="text-center">{pokemon.spDeff}</td>
                        <td className="text-center">{pokemon.spe}</td>
                        <td className="text-center">
                          {formatString(pokemon.type1)}
                          {pokemon.type2 && `, ${formatString(pokemon.type2)}`}
                        </td>
                      </tr>
                    ))}
                    {displayTeam.length > 0 && (
                      <tr className="bg-gray-900">
                        <td className="py-2 font-bold">Team Average</td>
                        <td className="text-center">{avgStats.hp}</td>
                        <td className="text-center">{avgStats.att}</td>
                        <td className="text-center">{avgStats.deff}</td>
                        <td className="text-center">{avgStats.spAtt}</td>
                        <td className="text-center">{avgStats.spDeff}</td>
                        <td className="text-center">{avgStats.spe}</td>
                        <td className="text-center">-</td>
                      </tr>
                    )}
                    {displayTeam.length > 0 && (
                      <tr className="bg-gray-900">
                        <td className="py-2 font-bold">Team Total</td>
                        <td className="text-center">{totalStats.hp}</td>
                        <td className="text-center">{totalStats.att}</td>
                        <td className="text-center">{totalStats.deff}</td>
                        <td className="text-center">{totalStats.spAtt}</td>
                        <td className="text-center">{totalStats.spDeff}</td>
                        <td className="text-center">{totalStats.spe}</td>
                        <td className="text-center">-</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {displayTeam.length === 0 && (
                <div className="text-center py-8">
                  <p>
                    No Pokémon in your team yet. Add some Pokémon to see
                    detailed statistics.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
