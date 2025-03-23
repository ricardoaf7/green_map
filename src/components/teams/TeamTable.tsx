
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { getStatusBadge, getTypeBadge } from './TeamBadges';

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

interface TeamTableProps {
  teams: Team[];
}

const TeamTable: React.FC<TeamTableProps> = ({ teams }) => {
  return (
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
              {teams.length > 0 ? (
                teams.map((team) => (
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
  );
};

export default TeamTable;
