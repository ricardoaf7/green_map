
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Users, 
  UserPlus, 
  Search, 
  UserCheck, 
  UserX, 
  Filter 
} from 'lucide-react';

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
  
  // Função para gerar o badge do status da equipe
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ativo':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'inativo':
        return <Badge variant="secondary" className="bg-gray-500">Inativo</Badge>;
      default:
        return null;
    }
  };
  
  // Função para gerar o badge do tipo de equipe
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'roçagem':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Roçagem</Badge>;
      case 'acabamento':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Acabamento</Badge>;
      case 'coleta':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Coleta</Badge>;
      case 'giro-zero':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Giro Zero</Badge>;
      default:
        return null;
    }
  };

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
        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            <Users className="h-4 w-4 mr-2" />
            Todas
          </Button>
          <Button 
            variant={filter === 'lote1' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('lote1')}
            className={filter === 'lote1' ? "bg-green-600" : ""}
          >
            Lote 1
          </Button>
          <Button 
            variant={filter === 'lote2' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('lote2')}
            className={filter === 'lote2' ? "bg-blue-600" : ""}
          >
            Lote 2
          </Button>
          <Button 
            variant={filter === 'active' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('active')}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Ativas
          </Button>
          <Button 
            variant={filter === 'inactive' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('inactive')}
          >
            <UserX className="h-4 w-4 mr-2" />
            Inativas
          </Button>
        </div>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total de Equipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Equipes Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.filter(t => t.status === 'ativo').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Lote 1 (Norte)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.filter(t => t.lote === 1).length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Lote 2 (Sul)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.filter(t => t.lote === 2).length}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabela de equipes */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Equipes</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar equipe..."
                  className="pl-8 h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipe</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead className="text-center">Membros</TableHead>
                    <TableHead>Área Atual</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${team.lote === 1 ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                            {team.name}
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(team.type)}</TableCell>
                        <TableCell>{team.manager}</TableCell>
                        <TableCell className="text-center">{team.members}</TableCell>
                        <TableCell>{team.currentArea}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(team.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Nenhuma equipe encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Teams;
