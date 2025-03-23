
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, UserCheck, UserX } from 'lucide-react';

interface TeamFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const TeamFilters: React.FC<TeamFiltersProps> = ({ filter, setFilter }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Button 
        variant={filter === 'all' ? "default" : "outline"} 
        size="sm" 
        onClick={() => setFilter('all')}
      >
        <Users className="h-4 w-4 mr-2" />
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
        variant={filter === 'active' ? "default" : "outline"} 
        size="sm" 
        onClick={() => setFilter('active')}
      >
        <UserCheck className="h-4 w-4 mr-2" />
        Ativas
      </Button>
      <Button 
        variant={filter === 'inactive' ? "default" : "outline"} 
        size="sm" 
        onClick={() => setFilter('inactive')}
      >
        <UserX className="h-4 w-4 mr-2" />
        Inativas
      </Button>
    </div>
  );
};

export default TeamFilters;
