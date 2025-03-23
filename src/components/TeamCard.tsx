
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Calendar, MapPin, Loader2 } from 'lucide-react';

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    lote: number;
    members: number;
    progress: number;
    area: string;
    nextArea?: string;
    eta?: string;
    status: 'giro-zero' | 'acabamento' | 'coleta' | 'em-transito';
  };
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const getStatusColor = () => {
    switch (team.status) {
      case 'giro-zero': return 'bg-yellow-500';
      case 'acabamento': return 'bg-blue-500';
      case 'coleta': return 'bg-purple-500';
      case 'em-transito': return 'bg-gray-500';
      default: return 'bg-green-500';
    }
  };
  
  const getStatusLabel = () => {
    switch (team.status) {
      case 'giro-zero': return 'Giro Zero';
      case 'acabamento': return 'Acabamento';
      case 'coleta': return 'Coleta';
      case 'em-transito': return 'Em Trânsito';
      default: return 'Ativo';
    }
  };

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{team.name}</CardTitle>
          <Badge variant={team.lote === 1 ? "default" : "secondary"} className={team.lote === 1 ? "bg-green-600" : "bg-blue-600"}>
            Lote {team.lote}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground pt-1">
          <Users className="h-4 w-4 mr-1" />
          <span>{team.members} membros</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center text-sm mb-1">
              <span>Progresso do ciclo</span>
              <span className="font-medium">{team.progress}%</span>
            </div>
            <Progress value={team.progress} className="h-2" />
          </div>
          
          <div className="flex items-start space-x-1">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Área atual: {team.area}</p>
              {team.nextArea && (
                <p className="text-xs text-muted-foreground">
                  Próxima: {team.nextArea}
                  {team.eta && <span> • {team.eta}</span>}
                </p>
              )}
            </div>
          </div>
          
          <Badge variant="outline" className={`${getStatusColor()} text-white`}>
            {getStatusLabel()}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Atualizado: hoje às 14:30</span>
          </div>
          <div className="flex items-center">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            <span>Ao vivo</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
