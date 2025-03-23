
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Plus, 
  Users, 
  MapPin, 
  Calendar, 
  Truck, 
  Clock,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

const Teams = () => {
  const [activeTab, setActiveTab] = useState('lote-1');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock team data
  const teams = [
    {
      id: 1,
      name: 'Equipe A1',
      lote: 1,
      leader: 'Carlos Silva',
      members: [
        { id: 1, name: 'Carlos Silva', role: 'Líder', phone: '(11) 98765-4321', email: 'carlos@exemplo.com' },
        { id: 2, name: 'Ana Souza', role: 'Roçador', phone: '(11) 98765-4322', email: 'ana@exemplo.com' },
        { id: 3, name: 'Roberto Oliveira', role: 'Capinador', phone: '(11) 98765-4323', email: 'roberto@exemplo.com' },
        { id: 4, name: 'Julia Santos', role: 'Roçador', phone: '(11) 98765-4324', email: 'julia@exemplo.com' },
        { id: 5, name: 'Fernando Lima', role: 'Rastelo', phone: '(11) 98765-4325', email: 'fernando@exemplo.com' },
        { id: 6, name: 'Marcela Costa', role: 'Operador', phone: '(11) 98765-4326', email: 'marcela@exemplo.com' },
      ],
      currentArea: 'Parque Vila dos Remédios',
      nextArea: 'Praça Cornélia',
      progress: 72,
      status: 'acabamento',
      vehicle: 'Pickup XYZ-1234',
      equipment: ['2 Roçadeiras Stihl', '1 Soprador', 'Ferramentas manuais'],
      productivity: 10200,
      lastUpdate: '2023-06-10 14:30'
    },
    {
      id: 2,
      name: 'Equipe A2',
      lote: 1,
      leader: 'Fernanda Almeida',
      members: [
        { id: 7, name: 'Fernanda Almeida', role: 'Líder', phone: '(11) 98765-5321', email: 'fernanda@exemplo.com' },
        { id: 8, name: 'Pedro Mendes', role: 'Roçador', phone: '(11) 98765-5322', email: 'pedro@exemplo.com' },
        { id: 9, name: 'Carla Dias', role: 'Capinador', phone: '(11) 98765-5323', email: 'carla@exemplo.com' },
        { id: 10, name: 'Rodrigo Pereira', role: 'Roçador', phone: '(11) 98765-5324', email: 'rodrigo@exemplo.com' },
        { id: 11, name: 'Beatriz Gomes', role: 'Rastelo', phone: '(11) 98765-5325', email: 'beatriz@exemplo.com' },
      ],
      currentArea: 'Av. Paulista - Canteiro Central',
      nextArea: 'Parque Trianon',
      progress: 68,
      status: 'coleta',
      vehicle: 'Van ABC-5678',
      equipment: ['2 Roçadeiras Stihl', '1 Soprador', 'Ferramentas manuais'],
      productivity: 9800,
      lastUpdate: '2023-06-10 15:15'
    },
    {
      id: 3,
      name: 'Equipe B1',
      lote: 2,
      leader: 'Miguel Santos',
      members: [
        { id: 12, name: 'Miguel Santos', role: 'Líder', phone: '(11) 98765-6321', email: 'miguel@exemplo.com' },
        { id: 13, name: 'Isabel Ferreira', role: 'Roçador', phone: '(11) 98765-6322', email: 'isabel@exemplo.com' },
        { id: 14, name: 'Lucas Martins', role: 'Capinador', phone: '(11) 98765-6323', email: 'lucas@exemplo.com' },
        { id: 15, name: 'Amanda Ribeiro', role: 'Roçador', phone: '(11) 98765-6324', email: 'amanda@exemplo.com' },
        { id: 16, name: 'Gustavo Lopes', role: 'Rastelo', phone: '(11) 98765-6325', email: 'gustavo@exemplo.com' },
        { id: 17, name: 'Daniela Vieira', role: 'Operador', phone: '(11) 98765-6326', email: 'daniela@exemplo.com' },
      ],
      currentArea: 'Parque Ibirapuera - Setor Sul',
      nextArea: 'Av. República do Líbano',
      progress: 56,
      status: 'acabamento',
      vehicle: 'Pickup DEF-9101',
      equipment: ['3 Roçadeiras Stihl', '1 Soprador', 'Ferramentas manuais'],
      productivity: 10100,
      lastUpdate: '2023-06-10 13:45'
    },
    {
      id: 4,
      name: 'Equipe B2',
      lote: 2,
      leader: 'Rafael Costa',
      members: [
        { id: 18, name: 'Rafael Costa', role: 'Líder', phone: '(11) 98765-7321', email: 'rafael@exemplo.com' },
        { id: 19, name: 'Sofia Teixeira', role: 'Roçador', phone: '(11) 98765-7322', email: 'sofia@exemplo.com' },
        { id: 20, name: 'Diego Moreira', role: 'Capinador', phone: '(11) 98765-7323', email: 'diego@exemplo.com' },
        { id: 21, name: 'Laura Cardoso', role: 'Roçador', phone: '(11) 98765-7324', email: 'laura@exemplo.com' },
        { id: 22, name: 'Bruno Alves', role: 'Rastelo', phone: '(11) 98765-7325', email: 'bruno@exemplo.com' },
      ],
      currentArea: 'Praça da República',
      nextArea: '',
      progress: 60,
      status: 'giro-zero',
      vehicle: 'Van GHI-1121',
      equipment: ['2 Roçadeiras Stihl', '1 Soprador', 'Ferramentas manuais'],
      productivity: 9900,
      lastUpdate: '2023-06-10 16:00'
    },
  ];
  
  // Filter teams based on tab and search term
  const filteredTeams = teams.filter(team => {
    const matchesTab = 
      (activeTab === 'lote-1' && team.lote === 1) ||
      (activeTab === 'lote-2' && team.lote === 2) ||
      (activeTab === 'todas');
      
    const matchesSearch = 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.currentArea.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesTab && matchesSearch;
  });
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'giro-zero':
        return <Badge variant="outline" className="bg-yellow-500 text-white">Giro Zero</Badge>;
      case 'acabamento':
        return <Badge variant="outline" className="bg-blue-500 text-white">Acabamento</Badge>;
      case 'coleta':
        return <Badge variant="outline" className="bg-purple-500 text-white">Coleta</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-500 text-white">Em Trânsito</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Equipes | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold">Equipes</h1>
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Nova Equipe
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por equipe, líder ou área atual..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="lote-1" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="lote-1">Lote 1 (Norte)</TabsTrigger>
            <TabsTrigger value="lote-2">Lote 2 (Sul)</TabsTrigger>
            <TabsTrigger value="todas">Todas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lote-1" className="mt-0">
            <TeamGrid teams={filteredTeams} />
          </TabsContent>
          
          <TabsContent value="lote-2" className="mt-0">
            <TeamGrid teams={filteredTeams} />
          </TabsContent>
          
          <TabsContent value="todas" className="mt-0">
            <TeamGrid teams={filteredTeams} />
          </TabsContent>
        </Tabs>
        
        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma equipe encontrada.</p>
          </div>
        )}
      </div>
    </>
  );
};

interface TeamCardProps {
  team: any;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="mb-4 hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-xl">{team.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Líder: {team.leader}</p>
          </div>
          <Badge variant={team.lote === 1 ? "default" : "secondary"} className={team.lote === 1 ? "bg-green-600" : "bg-blue-600"}>
            Lote {team.lote}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-start space-x-1">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Área atual: {team.currentArea}</p>
                  {team.nextArea && (
                    <p className="text-xs text-muted-foreground flex items-center">
                      Próxima: {team.nextArea}
                      <ArrowRight className="h-3 w-3 mx-1" />
                      <span>ETA: 2 dias</span>
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-sm">{team.members.length} membros</p>
              </div>
              
              <div className="flex items-center space-x-1">
                <Truck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-sm">{team.vehicle}</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Progresso do ciclo</span>
                  <span className="font-medium">{team.progress}%</span>
                </div>
                <Progress value={team.progress} className="h-2" />
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-sm">Produtividade: {team.productivity} m²/dia</p>
              </div>
              
              <div className="flex space-x-2 items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                {getStatusBadge(team.status)}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between border-t pt-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Recolher Detalhes' : 'Ver Membros da Equipe'}
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Histórico
              </Button>
              <Button size="sm">
                Visualizar
              </Button>
            </div>
          </div>
          
          {isExpanded && (
            <div className="pt-2 animate-fade-in">
              <h4 className="font-medium mb-2">Membros da Equipe</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {team.members.map((member: any) => (
                  <div key={member.id} className="flex items-center space-x-3 p-2 border rounded-md">
                    <Avatar>
                      <AvatarFallback className={`${member.role === 'Líder' ? 'bg-amber-500' : 'bg-slate-500'} text-white`}>
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <span>{member.role}</span>
                      </p>
                      <div className="flex space-x-2 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {member.phone}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <h4 className="font-medium mb-2">Equipamentos</h4>
                <ul className="list-disc list-inside text-sm">
                  {team.equipment.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Última atualização: {new Date(team.lastUpdate).toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for rendering team grid
const TeamGrid = ({ teams }: { teams: any[] }) => {
  return (
    <div className="space-y-4">
      {teams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default Teams;
