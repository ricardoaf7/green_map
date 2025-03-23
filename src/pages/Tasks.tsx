
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Filter, 
  Search, 
  Plus, 
  MapPin, 
  Users, 
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown 
} from 'lucide-react';

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('pendentes');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock task data
  const tasks = [
    {
      id: 1,
      area: 'Parque Vila dos Remédios',
      description: 'Roçagem completa da área principal',
      team: 'Equipe A1',
      lote: 1,
      date: '12/06/2023',
      status: 'in-progress',
      priority: 'high',
      type: 'acabamento',
      progress: 65,
      notes: 'Área com vegetação alta, necessário atenção especial próximo aos bancos'
    },
    {
      id: 2,
      area: 'Praça da República',
      description: 'Roçagem inicial para controle de altura',
      team: 'Equipe B2',
      lote: 2,
      date: '14/06/2023',
      status: 'pending',
      priority: 'medium',
      type: 'giro-zero',
      progress: 0,
      notes: ''
    },
    {
      id: 3,
      area: 'Av. Paulista - Canteiro Central',
      description: 'Acabamento com capinação manual nos canteiros',
      team: 'Equipe A2',
      lote: 1,
      date: '10/06/2023',
      status: 'completed',
      priority: 'medium',
      type: 'acabamento',
      progress: 100,
      notes: 'Concluído dentro do prazo planejado'
    },
    {
      id: 4,
      area: 'Parque Ibirapuera - Setor Sul',
      description: 'Coleta de resíduos após roçagem',
      team: 'Equipe B1',
      lote: 2,
      date: '16/06/2023',
      status: 'pending',
      priority: 'high',
      type: 'coleta',
      progress: 0,
      notes: 'Área com grande volume estimado de resíduos'
    },
    {
      id: 5,
      area: 'Parque da Aclimação',
      description: 'Roçagem de manutenção nas áreas de piquenique',
      team: 'Equipe A1',
      lote: 1,
      date: '18/06/2023',
      status: 'pending',
      priority: 'low',
      type: 'acabamento',
      progress: 0,
      notes: ''
    },
    {
      id: 6,
      area: 'Parque do Carmo',
      description: 'Giro zero na área de eventos',
      team: 'Equipe B2',
      lote: 2,
      date: '08/06/2023',
      status: 'completed',
      priority: 'high',
      type: 'giro-zero',
      progress: 100,
      notes: 'Concluído com antecedência devido a evento programado'
    },
  ];
  
  // Filter tasks based on tab and search term
  const filteredTasks = tasks.filter(task => {
    const matchesTab = 
      (activeTab === 'pendentes' && task.status === 'pending') ||
      (activeTab === 'em-progresso' && task.status === 'in-progress') ||
      (activeTab === 'concluidas' && task.status === 'completed') ||
      (activeTab === 'todas');
      
    const matchesSearch = 
      task.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.team.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesTab && matchesSearch;
  });
  
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
            <Badge variant="outline" className="bg-red-500 text-white">Alta</Badge>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-amber-500 mr-1" />
            <Badge variant="outline" className="bg-amber-500 text-white">Média</Badge>
          </div>
        );
      case 'low':
        return (
          <div className="flex items-center">
            <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
            <Badge variant="outline" className="bg-green-500 text-white">Baixa</Badge>
          </div>
        );
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

  return (
    <>
      <Helmet>
        <title>Gerenciar Tarefas | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Tarefas</h1>
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por área, descrição ou equipe..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex-shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Tabs defaultValue="pendentes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            <TabsTrigger value="em-progresso">Em Progresso</TabsTrigger>
            <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
            <TabsTrigger value="todas">Todas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pendentes" className="mt-0">
            <TasksGrid tasks={filteredTasks} />
          </TabsContent>
          
          <TabsContent value="em-progresso" className="mt-0">
            <TasksGrid tasks={filteredTasks} />
          </TabsContent>
          
          <TabsContent value="concluidas" className="mt-0">
            <TasksGrid tasks={filteredTasks} />
          </TabsContent>
          
          <TabsContent value="todas" className="mt-0">
            <TasksGrid tasks={filteredTasks} />
          </TabsContent>
        </Tabs>
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma tarefa encontrada.</p>
          </div>
        )}
      </div>
    </>
  );
};

// Helper component for rendering task grid
const TasksGrid = ({ tasks }: { tasks: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <Card key={task.id} className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-lg">{task.area}</CardTitle>
              <Badge variant={task.lote === 1 ? "default" : "secondary"} className={task.lote === 1 ? "bg-green-600" : "bg-blue-600"}>
                Lote {task.lote}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {getTaskTypeBadge(task.type)}
                {getTaskPriorityBadge(task.priority)}
                {getTaskStatusBadge(task.status)}
              </div>
              
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{task.team}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{task.date}</span>
              </div>
              
              {task.notes && (
                <div className="text-xs italic text-muted-foreground">
                  "{task.notes}"
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-2">
                {task.status === 'pending' && (
                  <Button size="sm">Iniciar</Button>
                )}
                {task.status === 'in-progress' && (
                  <Button size="sm">Concluir</Button>
                )}
                <Button variant="outline" size="sm">Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper functions for badges
const getTaskStatusBadge = (status: string) => {
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

const getTaskTypeBadge = (type: string) => {
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

const getTaskPriorityBadge = (priority: string) => {
  switch(priority) {
    case 'high':
      return <Badge variant="outline" className="bg-red-500 text-white">Alta</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-amber-500 text-white">Média</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-green-500 text-white">Baixa</Badge>;
    default:
      return null;
  }
};

export default Tasks;
