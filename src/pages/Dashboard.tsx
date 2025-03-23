
import React from 'react';
import { Helmet } from 'react-helmet';
import Map from '@/components/Map';
import ProgressStats from '@/components/ProgressStats';
import TeamCard from '@/components/TeamCard';
import TaskList from '@/components/TaskList';

const Dashboard = () => {
  // Mock data for demonstration
  const stats1 = {
    areaComplete: 250000,
    totalArea: 350000,
    daysLeft: 12,
    cycleLength: 35,
    completionDate: '28/06/2023',
  };
  
  const stats2 = {
    areaComplete: 180000,
    totalArea: 320000,
    daysLeft: 18,
    cycleLength: 35,
    completionDate: '04/07/2023',
  };
  
  const teams = [
    {
      id: 1,
      name: 'Equipe A1',
      lote: 1,
      members: 6,
      progress: 72,
      area: 'Parque Vila dos Remédios',
      nextArea: 'Praça Cornélia',
      eta: '2 dias',
      status: 'acabamento' as const,
    },
    {
      id: 2,
      name: 'Equipe A2',
      lote: 1,
      members: 5,
      progress: 68,
      area: 'Av. Paulista - Canteiro Central',
      nextArea: 'Parque Trianon',
      eta: '1 dia',
      status: 'coleta' as const,
    },
    {
      id: 3,
      name: 'Equipe B1',
      lote: 2,
      members: 6,
      progress: 56,
      area: 'Parque Ibirapuera - Setor Sul',
      nextArea: 'Av. República do Líbano',
      eta: '3 dias',
      status: 'acabamento' as const,
    },
    {
      id: 4,
      name: 'Equipe B2',
      lote: 2,
      members: 5,
      progress: 60,
      area: 'Praça da República',
      status: 'giro-zero' as const,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8 animate-fade-up">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="space-y-8">
          {/* Map Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Localização das Equipes</h2>
            <Map />
          </section>
          
          {/* Progress Stats */}
          <section className="grid grid-cols-1 gap-8">
            <ProgressStats lote={1} stats={stats1} />
            <ProgressStats lote={2} stats={stats2} />
          </section>
          
          {/* Team Status Cards */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Status das Equipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teams.map(team => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>
          
          {/* Recent Tasks */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Tarefas Recentes</h2>
            <TaskList />
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
