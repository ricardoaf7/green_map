
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
import { Users as UsersIcon, Search, UserPlus, Edit, Trash2, Key, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Users = () => {
  const { toast } = useToast();
  
  // Dados de exemplo para os usuários
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ana Administradora',
      email: 'admin@greenmap.com',
      role: 'admin',
      lastLogin: '2023-06-15 14:32',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Carlos Silva',
      email: 'carlos.silva@greenmap.com',
      role: 'supervisor',
      lastLogin: '2023-06-14 08:45',
      status: 'ativo'
    },
    {
      id: 3,
      name: 'Roberto Santos',
      email: 'roberto.santos@greenmap.com',
      role: 'supervisor',
      lastLogin: '2023-06-14 10:20',
      status: 'ativo'
    },
    {
      id: 4,
      name: 'Mariana Costa',
      email: 'mariana.costa@greenmap.com',
      role: 'coordenador',
      lastLogin: '2023-06-13 16:15',
      status: 'ativo'
    },
    {
      id: 5,
      name: 'Pedro Almeida',
      email: 'pedro.almeida@greenmap.com',
      role: 'coordenador',
      lastLogin: '2023-05-28 09:30',
      status: 'inativo'
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  
  // Filtrar os usuários com base no filtro selecionado
  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => {
        if (filter === 'admin') return user.role === 'admin';
        if (filter === 'supervisor') return user.role === 'supervisor';
        if (filter === 'coordinator') return user.role === 'coordenador';
        if (filter === 'active') return user.status === 'ativo';
        if (filter === 'inactive') return user.status === 'inativo';
        return true;
      });
  
  // Formulário para adicionar/editar usuário
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'coordenador',
      status: 'ativo'
    }
  });
  
  const onSubmit = (data: any) => {
    // Verificar se as senhas coincidem
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'As senhas não coincidem'
      });
      return;
    }
    
    if (editingUserId) {
      // Editar usuário existente
      setUsers(users.map(user => 
        user.id === editingUserId ? 
        {
          ...user,
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status
        } : user
      ));
      toast({
        title: "Usuário atualizado",
        description: `${data.name} foi atualizado com sucesso.`,
      });
    } else {
      // Adicionar novo usuário
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: data.name,
        email: data.email,
        role: data.role,
        lastLogin: '-',
        status: data.status
      };
      setUsers([...users, newUser]);
      toast({
        title: "Usuário cadastrado",
        description: `${data.name} foi adicionado com sucesso.`,
      });
    }
    
    // Resetar formulário e fechar
    form.reset();
    setIsFormOpen(false);
    setEditingUserId(null);
  };
  
  const editUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        password: '',
        confirmPassword: '',
        role: user.role,
        status: user.status
      });
      setEditingUserId(id);
      setIsFormOpen(true);
    }
  };
  
  const deleteUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      if (user.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1) {
        toast({
          title: "Não é possível remover",
          description: "Deve existir pelo menos um administrador no sistema.",
          variant: "destructive"
        });
        return;
      }
      
      setUsers(users.filter(u => u.id !== id));
      toast({
        title: "Usuário removido",
        description: `${user.name} foi removido com sucesso.`,
      });
    }
  };
  
  // Função para gerar o badge do status do usuário
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
  
  // Função para gerar o badge do papel do usuário
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Administrador</Badge>;
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
        <title>Usuários | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          
          <Button className="mt-4 sm:mt-0" onClick={() => {
            form.reset();
            setEditingUserId(null);
            setIsFormOpen(true);
          }}>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
        
        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            <UsersIcon className="h-4 w-4 mr-2" />
            Todos
          </Button>
          <Button 
            variant={filter === 'admin' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('admin')}
            className={filter === 'admin' ? "bg-red-600" : ""}
          >
            Administradores
          </Button>
          <Button 
            variant={filter === 'supervisor' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('supervisor')}
            className={filter === 'supervisor' ? "bg-blue-600" : ""}
          >
            Supervisores
          </Button>
          <Button 
            variant={filter === 'coordinator' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('coordinator')}
            className={filter === 'coordinator' ? "bg-purple-600" : ""}
          >
            Coordenadores
          </Button>
          <Button 
            variant={filter === 'active' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('active')}
          >
            Ativos
          </Button>
          <Button 
            variant={filter === 'inactive' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('inactive')}
          >
            Inativos
          </Button>
        </div>
        
        {/* Formulário para Adicionar/Editar Usuário */}
        {isFormOpen && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingUserId ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</CardTitle>
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
                            <Input placeholder="Ex: Ana Silva" {...field} />
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
                            <Input type="email" placeholder="Ex: ana.silva@greenmap.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{editingUserId ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                          </FormControl>
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
                              <SelectItem value="admin">Administrador</SelectItem>
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
                      {editingUserId ? 'Salvar Alterações' : 'Adicionar Usuário'}
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
              <CardTitle className="text-sm text-muted-foreground">Total de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.status === 'ativo').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Administradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin' && u.status === 'ativo').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Supervisores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'supervisor' && u.status === 'ativo').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Coordenadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'coordenador' && u.status === 'ativo').length}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabela de usuários */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Usuários</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar usuário..."
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
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {user.role === 'admin' && <Shield className="h-4 w-4 mr-2 text-red-500" />}
                            {user.name}
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => editUser(user.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteUser(user.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum usuário encontrado.
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

export default Users;
