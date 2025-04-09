
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ExcelUploader } from '@/components/ExcelUploader';
import TeamTable from '@/components/teams/TeamTable';
import TeamStats from '@/components/teams/TeamStats';
import TeamFilters from '@/components/teams/TeamFilters';
import { toast } from 'sonner';

// Definição da interface Team para reutilização
interface Team {
  id: number;
  name: string;
  lote: number;
  manager: string;
  members: number;
  type: string;
  status: string;
  lastActivity: string;
  currentArea: string;
  latitude?: number;
  longitude?: number;
}

const Teams = () => {
  const [teams, setTeams] = useState([
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
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'lote1' && team.lote === 1) ||
        (filter === 'lote2' && team.lote === 2) ||
        (filter === 'active' && team.status === 'ativo') ||
        (filter === 'inactive' && team.status === 'inativo');
      
      const matchesSearch = 
        searchTerm === '' || 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.manager.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm, teams]);

  const handleExcelUpload = (uploadedTeams: Partial<Team>[]) => {
    // Validar dados importados
    if (!uploadedTeams || uploadedTeams.length === 0) {
      toast.error('Nenhum dado válido na planilha');
      return;
    }
    
    // Verificar tipos e formatar dados, se necessário
    const formattedTeams = uploadedTeams.map(team => ({
      ...team,
      id: team.id || Date.now() + Math.floor(Math.random() * 1000),
      lote: Number(team.lote) || 1,
      members: Number(team.members) || 0,
      type: (team.type || 'roçagem').toLowerCase(),
      status: (team.status || 'ativo').toLowerCase(),
      lastActivity: team.lastActivity || new Date().toISOString().split('T')[0],
      currentArea: team.currentArea || '-'
    })) as Team[];
    
    setTeams(prevTeams => [...prevTeams, ...formattedTeams]);
  };

  return (
    <>
      <Helmet>
        <title>Equipes | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Equipes</h1>
          <div className="flex space-x-4">
            <ExcelUploader onUpload={handleExcelUpload} />
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nova Equipe
            </Button>
          </div>
        </div>
        
        <TeamFilters 
          filter={filter} 
          setFilter={setFilter} 
        />
        
        <TeamStats teams={teams} />
        
        <TeamTable 
          teams={filteredTeams} 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
    </>
  );
};

export default Teams;
