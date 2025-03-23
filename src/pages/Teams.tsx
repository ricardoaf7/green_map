
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { UserPlus } from 'lucide-react';
import TeamFilters from '../components/teams/TeamFilters';
import TeamStats from '../components/teams/TeamStats';
import TeamTable from '../components/teams/TeamTable';

const Teams = () => {
  const [filter, setFilter] = useState('all');
  
  // Dados de exemplo para as equipes
  const teams = [
    {
      id: 1,
      name: 'Equipe A1',
      lote: 1,
      manager: 'Carlos Silva',
      members: 6,
      type: 'roçagem',
      status: 'ativo',
      lastActivity: '2023-06-12',
      currentArea: 'Parque Vila dos Remédios'
    },
    {
      id: 2,
      name: 'Equipe A2',
      lote: 1,
      manager: 'Ana Oliveira',
      members: 5,
      type: 'acabamento',
      status: 'ativo',
      lastActivity: '2023-06-14',
      currentArea: 'Av. Paulista - Canteiro Central'
    },
    {
      id: 3,
      name: 'Equipe B1',
      lote: 2,
      manager: 'Roberto Santos',
      members: 6,
      type: 'coleta',
      status: 'ativo',
      lastActivity: '2023-06-11',
      currentArea: 'Parque Ibirapuera - Setor Sul'
    },
    {
      id: 4,
      name: 'Equipe B2',
      lote: 2,
      manager: 'Mariana Costa',
      members: 5,
      type: 'giro-zero',
      status: 'ativo',
      lastActivity: '2023-06-15',
      currentArea: 'Praça da República'
    },
    {
      id: 5,
      name: 'Equipe C1',
      lote: 1,
      manager: 'Pedro Almeida',
      members: 4,
      type: 'roçagem',
      status: 'inativo',
      lastActivity: '2023-05-28',
      currentArea: '-'
    },
  ];
  
  // Filtrar as equipes com base no filtro selecionado
  const filteredTeams = filter === 'all' 
    ? teams 
    : teams.filter(team => {
        if (filter === 'lote1') return team.lote === 1;
        if (filter === 'lote2') return team.lote === 2;
        if (filter === 'active') return team.status === 'ativo';
        if (filter === 'inactive') return team.status === 'inativo';
        return true;
      });

  return (
    <>
      <Helmet>
        <title>Equipes | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciamento de Equipes</h1>
          
          <Button className="mt-4 sm:mt-0">
            <UserPlus className="h-4 w-4 mr-2" />
            Nova Equipe
          </Button>
        </div>
        
        {/* Filtros */}
        <TeamFilters filter={filter} setFilter={setFilter} />
        
        {/* Estatísticas */}
        <TeamStats teams={teams} />
        
        {/* Tabela de equipes */}
        <TeamTable teams={filteredTeams} />
      </div>
    </>
  );
};

export default Teams;
