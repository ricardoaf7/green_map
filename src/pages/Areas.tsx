
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
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
import { MapPin, Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Areas = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  
  // Dados de exemplo para as áreas
  const [areas, setAreas] = useState([
    {
      id: 1,
      name: 'Parque Vila dos Remédios',
      lote: 1,
      size: 35000,
      type: 'parque',
      giroZero: true,
      lastMaintenance: '2023-06-10',
      nextMaintenance: '2023-07-15',
      status: 'regular'
    },
    {
      id: 2,
      name: 'Av. Paulista - Canteiro Central',
      lote: 2,
      size: 12000,
      type: 'canteiro',
      giroZero: false,
      lastMaintenance: '2023-06-05',
      nextMaintenance: '2023-07-05',
      status: 'atrasado'
    },
    {
      id: 3,
      name: 'Parque Ibirapuera - Setor Sul',
      lote: 1,
      size: 55000,
      type: 'parque',
      giroZero: true,
      lastMaintenance: '2023-06-12',
      nextMaintenance: '2023-07-17',
      status: 'regular'
    },
    {
      id: 4,
      name: 'Praça da República',
      lote: 2,
      size: 8000,
      type: 'praça',
      giroZero: true,
      lastMaintenance: '2023-05-20',
      nextMaintenance: '2023-06-25',
      status: 'atrasado'
    }
  ]);
  
  // Filtrar as áreas com base no filtro selecionado
  const filteredAreas = filter === 'all' 
    ? areas 
    : areas.filter(area => {
        if (filter === 'lote1') return area.lote === 1;
        if (filter === 'lote2') return area.lote === 2;
        if (filter === 'regular') return area.status === 'regular';
        if (filter === 'atrasado') return area.status === 'atrasado';
        return true;
      });
  
  // Formulário para adicionar/editar área
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAreaId, setEditingAreaId] = useState<number | null>(null);
  
  const form = useForm({
    defaultValues: {
      name: '',
      lote: '1',
      size: '',
      type: 'parque',
      giroZero: 'true'
    }
  });
  
  const onSubmit = (data: any) => {
    if (editingAreaId) {
      // Editar área existente
      setAreas(areas.map(area => 
        area.id === editingAreaId ? 
        {
          ...area,
          name: data.name,
          lote: parseInt(data.lote),
          size: parseInt(data.size),
          type: data.type,
          giroZero: data.giroZero === 'true'
        } : area
      ));
      toast({
        title: "Área atualizada",
        description: `${data.name} foi atualizada com sucesso.`,
      });
    } else {
      // Adicionar nova área
      const newArea = {
        id: areas.length > 0 ? Math.max(...areas.map(a => a.id)) + 1 : 1,
        name: data.name,
        lote: parseInt(data.lote),
        size: parseInt(data.size),
        type: data.type,
        giroZero: data.giroZero === 'true',
        lastMaintenance: '-',
        nextMaintenance: '-',
        status: 'regular'
      };
      setAreas([...areas, newArea]);
      toast({
        title: "Área cadastrada",
        description: `${data.name} foi adicionada com sucesso.`,
      });
    }
    
    // Resetar formulário e fechar
    form.reset();
    setIsFormOpen(false);
    setEditingAreaId(null);
  };
  
  const editArea = (id: number) => {
    const area = areas.find(a => a.id === id);
    if (area) {
      form.reset({
        name: area.name,
        lote: area.lote.toString(),
        size: area.size.toString(),
        type: area.type,
        giroZero: area.giroZero.toString()
      });
      setEditingAreaId(id);
      setIsFormOpen(true);
    }
  };
  
  const deleteArea = (id: number) => {
    const area = areas.find(a => a.id === id);
    if (area) {
      setAreas(areas.filter(area => area.id !== id));
      toast({
        title: "Área removida",
        description: `${area.name} foi removida com sucesso.`,
      });
    }
  };
  
  // Função para gerar o badge do status da área
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'regular':
        return <Badge className="bg-green-500">Regular</Badge>;
      case 'atrasado':
        return <Badge variant="destructive">Atrasado</Badge>;
      default:
        return null;
    }
  };
  
  // Função para gerar o badge do tipo de área
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'parque':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Parque</Badge>;
      case 'praça':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Praça</Badge>;
      case 'canteiro':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Canteiro</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Áreas | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciamento de Áreas</h1>
          
          <Button className="mt-4 sm:mt-0" onClick={() => {
            form.reset();
            setEditingAreaId(null);
            setIsFormOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Área
          </Button>
        </div>
        
        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            <MapPin className="h-4 w-4 mr-2" />
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
            variant={filter === 'regular' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('regular')}
          >
            Regular
          </Button>
          <Button 
            variant={filter === 'atrasado' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('atrasado')}
          >
            Atrasado
          </Button>
        </div>
        
        {/* Formulário para Adicionar/Editar Área */}
        {isFormOpen && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingAreaId ? 'Editar Área' : 'Adicionar Nova Área'}</CardTitle>
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
                          <FormLabel>Nome da Área</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Parque Vila dos Remédios" {...field} />
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
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tamanho (m²)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 10000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Área</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="parque">Parque</SelectItem>
                              <SelectItem value="praça">Praça</SelectItem>
                              <SelectItem value="canteiro">Canteiro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="giroZero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giro Zero</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Aplica-se Giro Zero?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="true">Sim</SelectItem>
                              <SelectItem value="false">Não</SelectItem>
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
                      {editingAreaId ? 'Salvar Alterações' : 'Adicionar Área'}
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
              <CardTitle className="text-sm text-muted-foreground">Total de Áreas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{areas.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Áreas Regulares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{areas.filter(a => a.status === 'regular').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Lote 1 (Norte)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{areas.filter(a => a.lote === 1).length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Lote 2 (Sul)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{areas.filter(a => a.lote === 2).length}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabela de áreas */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Áreas Verdes</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar área..."
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
                    <TableHead>Nome da Área</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-center">Tamanho (m²)</TableHead>
                    <TableHead className="text-center">Giro Zero</TableHead>
                    <TableHead>Próxima Manutenção</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAreas.length > 0 ? (
                    filteredAreas.map((area) => (
                      <TableRow key={area.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${area.lote === 1 ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                            {area.name}
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(area.type)}</TableCell>
                        <TableCell className="text-center">{area.size.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{area.giroZero ? 'Sim' : 'Não'}</TableCell>
                        <TableCell>{area.nextMaintenance}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(area.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => editArea(area.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteArea(area.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Nenhuma área encontrada.
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

export default Areas;
