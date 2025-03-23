
import React from 'react';
import { Badge } from "@/components/ui/badge";

// Função para gerar o badge do status da equipe
export const getStatusBadge = (status: string) => {
  switch(status) {
    case 'ativo':
      return <Badge className="bg-green-500">Ativo</Badge>;
    case 'inativo':
      return <Badge variant="secondary" className="bg-gray-500">Inativo</Badge>;
    default:
      return null;
  }
};

// Função para gerar o badge do tipo de equipe
export const getTypeBadge = (type: string) => {
  switch(type) {
    case 'roçagem':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Roçagem</Badge>;
    case 'acabamento':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Acabamento</Badge>;
    case 'coleta':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Coleta</Badge>;
    case 'giro-zero':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Giro Zero</Badge>;
    default:
      return null;
  }
};
