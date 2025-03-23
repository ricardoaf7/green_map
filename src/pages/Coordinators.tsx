
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { Users, Search, UserPlus, Edit, Trash2, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Coordinators = () => {
  const { toast } = useToast();
  
  // Dados de exemplo para os coordenadores
  const [coordinators, setCoordinators] = useState([
    {
      id: 1,
      name: 'Carlos Silva',
      email: 'carlos.silva@greenmap.com',
      phone: '(11) 98765-4321',
      lote: 1,
      teams: 3,
      role: 'supervisor',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Ana Oliveira',
      email: 'ana.oliveira@greenmap.com',
      phone: '(11) 97654-3210',
      lote: 1,
      teams: 2,
      role: 'coordenador',
      status: 'ativo'
    },
    {
      id: 3,
      name: 'Roberto Santos',
      email: 'roberto.santos@greenmap.com',
      phone: '(11) 96543-2109',
      lote: 2,
      teams: 3,
      role: 'supervisor',
      status: 'ativo'
    },
    {
      id: 4,
      name: 'Mariana Costa',
      email: 'mariana.costa@greenmap.com',
      phone: '(11) 95432-1098',
      lote: 2,
      teams: 2,
      role: 'coordenador',
      status: 'ativo'
    },
    {
      id: 5,
      name: 'Pedro Almeida',
      email: 'pedro.almeida@greenmap.com',
      phone: '(11) 94321-0987',
      lote: 1,
      teams: 0,
      role: 'coordenador',
      status: 'inativo'
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  
  // Filtrar os coordenadores com base no filtro selecionado
  const filteredCoordinators = filter === 'all' 
    ? coordinators 
    : coordinators.filter(coordinator => {
        if (filter === 'lote1') return coordinator.lote === 1;
        if (filter === 'lote2') return coordinator.lote === 2;
        if (filter === 'active') return coordinator.status === 'ativo';
        if (filter === 'inactive') return coordinator.status === 'inativo';
        if (filter === 'supervisor') return coordinator.role === 'supervisor';
        if (filter === 'coordinator') return coordinator.role === 'coordenador';
        return true;
      });
  
  // Formulário para adicionar/editar coordenador
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCoordinatorId, setEditingCoordinatorId] = useState<number | null>(null);
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      lote: '1',
      role: 'coordenador',
      status: 'ativo'
    }
  });
  
  const onSubmit = (data: any) => {
    if (editingCoordinatorId) {
      // Editar coordenador existente
      setCoordinators(coordinators.map(coord => 
        coord.id === editingCoordinatorId ? 
        {
          ...coord,
          name: data.name,
          email: data.email,
          phone: data.phone,
          lote: parseInt(data.lote),
          role: data.role,
          status: data.status
        } : coord
      ));
      toast({
        title: "Coordenador atualizado",
        description: `${data.name} foi atualizado com sucesso.`,
      });
    } else {
      // Adicionar novo coordenador
      const newCoordinator = {
        id: coordinators.length > 0 ? Math.max(...coordinators.map(c => c.id)) + 1 : 1,
        name: data.name,
        email: data.email,
        phone: data.phone,
        lote: parseInt(data.lote),
        teams: 0,
        role: data.role,
        status: data.status
      };
      setCoordinators([...coordinators, newCoordinator]);
      toast({
        title: "Coordenador cadastrado",
        description: `${data.name} foi adicionado com sucesso.`,
      });
    }
    
    // Resetar formulário e fechar
    form.reset();
    setIsFormOpen(false);
    setEditingCoordinatorId(null);
  };
  
  const editCoordinator = (id: number) => {
    const coordinator = coordinators.find(c => c.id === id);
    if (coordinator) {
      form.reset({
        name: coordinator.name,
        email: coordinator.email,
        phone: coordinator.phone,
        lote: coordinator.lote.toString(),
        role: coordinator.role,
        status: coordinator.status
      });
      setEditingCoordinatorId(id);
      setIsFormOpen(true);
    }
  };
  
  const deleteCoordinator = (id: number) => {
    const coordinator = coordinators.find(c => c.id === id);
    if (coordinator) {
      if (coordinator.teams > 0) {
        toast({
          title: "Não é possível remover",
          description: `${coordinator.name} possui equipes associadas.`,
          variant: "destructive"
        });
        return;
      }
      
      setCoordinators(coordinators.filter(c => c.id !== id));
      toast({
        title: "Coordenador removido",
        description: `${coordinator.name} foi removido com sucesso.`,
      });
    }
  };
  
  // Função para gerar o badge do status do coordenador
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
  
  // Função para gerar o badge do papel do coordenador
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'supervisor':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Supervisor</Badge>;
      case 'coordenador':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Coordenador</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Coordenadores | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciamento de Coordenadores</h1>
          
          <Button className="mt-4 sm:mt-0" onClick={() => {
            form.reset();
            setEditingCoordinatorId(null);
            setIsFormOpen(true);
          }}>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Coordenador
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
            Todos
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
            variant={filter === 'supervisor' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('supervisor')}
          >
            Supervisores
          </Button>
          <Button 
            variant={filter === 'coordinator' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('coordinator')}
          >
            Coordenadores
          </Button>
        </div>
        
        {/* Formulário para Adicionar/Editar Coordenador */}
        {isFormOpen && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingCoordinatorId ? 'Editar Coordenador' : 'Adicionar Novo Coordenador'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Carlos Silva" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Ex: carlos.silva@greenmap.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: (11) 98765-4321" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lote</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um lote" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Lote 1 (Norte)</SelectItem>
                              <SelectItem value="2">Lote 2 (Sul)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Função</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma função" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="supervisor">Supervisor</SelectItem>
                              <SelectItem value="coordenador">Coordenador</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ativo">Ativo</SelectItem>
                              <SelectItem value="inativo">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsFormOpen(false);
                        form.reset();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingCoordinatorId ? 'Salvar Alterações' : 'Adicionar Coordenador'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        
        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total de Coordenadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coordinators.filter(c => c.status === 'ativo').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Supervisores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coordinators.filter(c => c.role === 'supervisor' && c.status === 'ativo').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Lote 1 (Norte)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coordinators.filter(c => c.lote === 1 && c.status === 'ativo').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Lote 2 (Sul)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coordinators.filter(c => c.lote === 2 && c.status === 'ativo').length}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabela de coordenadores */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Coordenadores</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar coordenador..."
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
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead className="text-center">Equipes</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoordinators.length > 0 ? (
                    filteredCoordinators.map((coordinator) => (
                      <TableRow key={coordinator.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${coordinator.lote === 1 ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                            {coordinator.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{coordinator.email}</div>
                            <div className="flex items-center text-gray-500">
                              <Phone className="h-3 w-3 mr-1" />
                              {coordinator.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(coordinator.role)}</TableCell>
                        <TableCell className="text-center">{coordinator.teams}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(coordinator.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => editCoordinator(coordinator.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteCoordinator(coordinator.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum coordenador encontrado.
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

export default Coordinators;
