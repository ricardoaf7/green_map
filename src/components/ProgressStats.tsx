
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, Clock, Calendar, Maximize2 } from 'lucide-react';

interface ProgressStatsProps {
  lote: number;
  stats: {
    areaComplete: number;
    totalArea: number;
    daysLeft: number;
    cycleLength: number;
    completionDate: string;
  };
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ lote, stats }) => {
  const { areaComplete, totalArea, daysLeft, cycleLength, completionDate } = stats;
  const percentComplete = Math.round((areaComplete / totalArea) * 100);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        Lote {lote} - {lote === 1 ? 'Zona Norte' : 'Zona Sul'}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <CircleCheck className="h-4 w-4 mr-1 text-green-500" />
              Progresso do Ciclo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{percentComplete}%</span>
              <span className="text-sm text-muted-foreground">
                {areaComplete.toLocaleString()} de {totalArea.toLocaleString()} m²
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1 text-blue-500" />
              Tempo Restante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{daysLeft} dias</span>
              <span className="text-sm text-muted-foreground">
                Ciclo de {cycleLength} dias
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-purple-500" />
              Data de Conclusão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{completionDate}</span>
              <span className="text-sm text-muted-foreground">
                Estimativa atual
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Maximize2 className="h-4 w-4 mr-1 text-amber-500" />
              Produtividade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">10.000 m²</span>
              <span className="text-sm text-muted-foreground">
                Média por dia/equipe
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressStats;
