
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Users,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';

interface Task {
  id: number;
  area: string;
  team: string;
  lote: number;
  date: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  type: 'giro-zero' | 'acabamento' | 'coleta';
}

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState<number | null>(null);
  
  // Mock data
  const tasks: Task[] = [
    {
      id: 1,
      area: 'Parque Vila dos Remédios',
      team: 'Equipe A1',
      lote: 1,
      date: '12/06/2023',
      status: 'in-progress',
      priority: 'high',
      type: 'acabamento'
    },
    {
      id: 2,
      area: 'Praça da República',
      team: 'Equipe B2',
      lote: 2,
      date: '14/06/2023',
      status: 'pending',
      priority: 'medium',
      type: 'giro-zero'
    },
    {
      id: 3,
      area: 'Av. Paulista - Canteiro Central',
      team: 'Equipe A2',
      lote: 1,
      date: '10/06/2023',
      status: 'completed',
      priority: 'medium',
      type: 'acabamento'
    },
    {
      id: 4,
      area: 'Parque Ibirapuera - Setor Sul',
      team: 'Equipe B1',
      lote: 2,
      date: '16/06/2023',
      status: 'pending',
      priority: 'high',
      type: 'coleta'
    },
  ];
  
  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500 text-white">Pendente</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-500 text-white">Em Progresso</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-500 text-white">Concluído</Badge>;
      default:
        return null;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'giro-zero':
        return <Badge variant="outline" className="bg-yellow-500 text-white">Giro Zero</Badge>;
      case 'acabamento':
        return <Badge variant="outline" className="bg-blue-500 text-white">Acabamento</Badge>;
      case 'coleta':
        return <Badge variant="outline" className="bg-purple-500 text-white">Coleta</Badge>;
      default:
        return null;
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'low':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Tarefas Recentes</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setFilter('all')} className={filter === 'all' ? 'bg-muted' : ''}>
              Todas
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter('pending')} className={filter === 'pending' ? 'bg-muted' : ''}>
              Pendentes
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter('in-progress')} className={filter === 'in-progress' ? 'bg-muted' : ''}>
              Em Progresso
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter('completed')} className={filter === 'completed' ? 'bg-muted' : ''}>
              Concluídas
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div key={task.id} className="border rounded-lg overflow-hidden transition-all duration-300">
                <div 
                  className="flex justify-between items-center p-3 cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleExpand(task.id)}
                >
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5">{getPriorityIcon(task.priority)}</div>
                    <div>
                      <h3 className="font-medium">{task.area}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{task.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(task.status)}
                    {expanded === task.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>
                
                {expanded === task.id && (
                  <div className="p-3 pt-0 border-t bg-muted/30 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Equipe: </span>
                        <Badge variant={task.lote === 1 ? "default" : "secondary"} className="ml-1">
                          {task.team} (Lote {task.lote})
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm">
                        <Filter className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Tipo: </span>
                        <div className="ml-1">{getTypeBadge(task.type)}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-3 space-x-2">
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                      {task.status !== 'completed' && (
                        <Button variant="default" size="sm">
                          {task.status === 'pending' ? 'Iniciar' : 'Concluir'}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma tarefa encontrada com o filtro selecionado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
