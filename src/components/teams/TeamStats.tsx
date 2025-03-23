
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
}

interface TeamStatsProps {
  teams: Team[];
}

const TeamStats: React.FC<TeamStatsProps> = ({ teams }) => {
  return (
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
  );
};

export default TeamStats;
