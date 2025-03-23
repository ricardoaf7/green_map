
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { Calendar as CalendarIcon, FileDown, BarChart3, PieChart, ListFilter } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

const Reports = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 5, 1),
    to: new Date(),
  });
  
  const [selectedLote, setSelectedLote] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  
  // Mock data for charts
  const barChartData = [
    { name: 'Parque Vila dos Remédios', area: 35000, target: 35000 },
    { name: 'Praça da República', area: 25000, target: 28000 },
    { name: 'Av. Paulista', area: 32000, target: 30000 },
    { name: 'Parque Ibirapuera', area: 45000, target: 50000 },
    { name: 'Parque da Aclimação', area: 28000, target: 27000 },
    { name: 'Parque do Carmo', area: 42000, target: 40000 },
  ];
  
  const pieChartData = [
    { name: 'Giro Zero', value: 25, color: '#EAB308' },
    { name: 'Acabamento', value: 45, color: '#3B82F6' },
    { name: 'Coleta', value: 30, color: '#A855F7' },
  ];
  
  const statusPieData = [
    { name: 'Concluídas', value: 65, color: '#22C55E' },
    { name: 'Em Progresso', value: 25, color: '#3B82F6' },
    { name: 'Pendentes', value: 10, color: '#F59E0B' },
  ];
  
  const productivityData = [
    { day: '01/06', equipeA1: 9800, equipeA2: 9500, equipeB1: 10200, equipeB2: 9900 },
    { day: '02/06', equipeA1: 10100, equipeA2: 9700, equipeB1: 9800, equipeB2: 10300 },
    { day: '03/06', equipeA1: 9900, equipeA2: 10000, equipeB1: 10100, equipeB2: 9700 },
    { day: '04/06', equipeA1: 10200, equipeA2: 9800, equipeB1: 9600, equipeB2: 10100 },
    { day: '05/06', equipeA1: 10300, equipeA2: 10200, equipeB1: 10000, equipeB2: 9800 },
    { day: '06/06', equipeA1: 9700, equipeA2: 10100, equipeB1: 10300, equipeB2: 10200 },
    { day: '07/06', equipeA1: 10000, equipeA2: 9900, equipeB1: 9900, equipeB2: 10000 },
  ];

  return (
    <>
      <Helmet>
        <title>Relatórios | GreenMap Scheduler</title>
      </Helmet>
      
      <div className="container mx-auto px-4 pt-20 pb-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <Button variant="outline" className="mt-4 sm:mt-0">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar Dados
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filtros de Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="grid w-full sm:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className="justify-start w-full sm:w-[300px]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                            {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                          </>
                        ) : (
                          format(date.from, "dd/MM/yyyy", { locale: ptBR })
                        )
                      ) : (
                        <span>Selecione um período</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid w-full sm:w-auto max-w-sm">
                <Select value={selectedLote} onValueChange={setSelectedLote}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um lote" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Lotes</SelectItem>
                    <SelectItem value="1">Lote 1 (Zona Norte)</SelectItem>
                    <SelectItem value="2">Lote 2 (Zona Sul)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid w-full sm:w-auto max-w-sm">
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma equipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Equipes</SelectItem>
                    <SelectItem value="A1">Equipe A1</SelectItem>
                    <SelectItem value="A2">Equipe A2</SelectItem>
                    <SelectItem value="B1">Equipe B1</SelectItem>
                    <SelectItem value="B2">Equipe B2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="productivity">
          <TabsList className="mb-6 w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <TabsTrigger value="productivity">
              <BarChart3 className="h-4 w-4 mr-2" />
              Produtividade
            </TabsTrigger>
            <TabsTrigger value="areas">
              <PieChart className="h-4 w-4 mr-2" />
              Áreas
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <ListFilter className="h-4 w-4 mr-2" />
              Tarefas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="productivity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Produtividade Diária (m²)</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[9000, 11000]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="equipeA1" name="Equipe A1" fill="#22C55E" />
                    <Bar dataKey="equipeA2" name="Equipe A2" fill="#16A34A" />
                    <Bar dataKey="equipeB1" name="Equipe B1" fill="#3B82F6" />
                    <Bar dataKey="equipeB2" name="Equipe B2" fill="#2563EB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Média por Equipe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: 'Equipe A1', value: 10000 },
                          { name: 'Equipe A2', value: 9900 },
                          { name: 'Equipe B1', value: 10100 },
                          { name: 'Equipe B2', value: 10000 },
                        ]}
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[9000, 11000]} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="value" name="Média (m²)" radius={[0, 4, 4, 0]}>
                          <Cell fill="#22C55E" />
                          <Cell fill="#16A34A" />
                          <Cell fill="#3B82F6" />
                          <Cell fill="#2563EB" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Progresso do Ciclo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="w-full max-w-[250px]">
                      <ResponsiveContainer width="100%" height={250}>
                        <RechartsPieChart>
                          <Pie
                            data={statusPieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {statusPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="areas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Áreas Atendidas vs. Planejadas (m²)</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="area" name="Área Atendida" fill="#22C55E" />
                    <Bar dataKey="target" name="Meta" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Tipo de Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="w-full max-w-[250px]">
                      <ResponsiveContainer width="100%" height={250}>
                        <RechartsPieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Lote</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="w-full max-w-[250px]">
                      <ResponsiveContainer width="100%" height={250}>
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Lote 1 (Norte)', value: 52, color: '#22C55E' },
                              { name: 'Lote 2 (Sul)', value: 48, color: '#3B82F6' },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#22C55E" />
                            <Cell fill="#3B82F6" />
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo de Tarefas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <div className="text-5xl font-bold text-green-600">65</div>
                    <div className="text-muted-foreground mt-2">Tarefas Concluídas</div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <div className="text-5xl font-bold text-blue-600">25</div>
                    <div className="text-muted-foreground mt-2">Em Progresso</div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <div className="text-5xl font-bold text-amber-600">10</div>
                    <div className="text-muted-foreground mt-2">Pendentes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tarefas por Tipo</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Giro Zero', complete: 18, pending: 7 },
                        { name: 'Acabamento', complete: 30, pending: 15 },
                        { name: 'Coleta', complete: 17, pending: 13 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="complete" name="Concluídas" fill="#22C55E" />
                      <Bar dataKey="pending" name="Pendentes" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tempo Médio de Conclusão (dias)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: 'Giro Zero', value: 1.2 },
                        { name: 'Acabamento', value: 2.5 },
                        { name: 'Coleta', value: 1.8 },
                      ]}
                      margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" name="Dias" radius={[0, 4, 4, 0]}>
                        <Cell fill="#EAB308" />
                        <Cell fill="#3B82F6" />
                        <Cell fill="#A855F7" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Reports;
