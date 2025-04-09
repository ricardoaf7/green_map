
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TeamData {
  id?: number;
  name: string;
  lote: number;
  manager: string;
  members: number;
  type: string;
  status: string;
  latitude?: number;
  longitude?: number;
}

interface ExcelUploaderProps {
  onUpload: (data: TeamData[]) => void;
}

export const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    
    // Mostrar toast de carregamento
    const loadingToast = toast.loading(`Carregando ${file.name}...`);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });
        
        if (jsonData.length <= 1) {
          toast.dismiss(loadingToast);
          toast.error('Planilha vazia ou sem dados válidos');
          setIsUploading(false);
          return;
        }
        
        // Pegar o cabeçalho (primeira linha)
        const headers = jsonData[0];
        
        // Mapear os dados do Excel para o formato esperado
        const processedData = jsonData.slice(1).map((row: any[], index) => {
          // Verificar se a linha tem dados válidos
          if (!row.length || !row[0]) return null;
          
          // Converter todos os valores para o tipo correto, garantindo que strings sejam strings
          const statusValue = row[5];
          const statusString = statusValue !== undefined && statusValue !== null 
            ? String(statusValue) 
            : 'ativo';
            
          const typeValue = row[4];
          const typeString = typeValue !== undefined && typeValue !== null 
            ? String(typeValue) 
            : 'roçagem';
          
          return {
            id: Date.now() + index, // Usar timestamp + índice para ID único
            name: row[0] ? String(row[0]) : 'Sem nome',
            lote: Number(row[1]) || 1,
            manager: row[2] ? String(row[2]) : 'Sem responsável',
            members: Number(row[3]) || 0,
            type: typeString.toLowerCase(),
            status: statusString.toLowerCase(),
            lastActivity: row[6] ? String(row[6]) : new Date().toISOString().split('T')[0],
            currentArea: row[7] ? String(row[7]) : '-',
            latitude: row[8] ? Number(row[8]) : undefined,
            longitude: row[9] ? Number(row[9]) : undefined,
          };
        }).filter(Boolean); // Remover itens nulos
        
        if (processedData.length === 0) {
          toast.dismiss(loadingToast);
          toast.error('Nenhum dado válido encontrado na planilha');
          setIsUploading(false);
          return;
        }

        // Informar ao usuário quantas equipes foram carregadas
        toast.dismiss(loadingToast);
        toast.success(
          <div className="flex flex-col">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>Planilha carregada com sucesso!</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {processedData.length} equipes importadas de {file.name}
            </p>
          </div>
        );
        
        onUpload(processedData);
      } catch (error) {
        console.error('Erro ao processar planilha:', error);
        toast.dismiss(loadingToast);
        toast.error('Erro ao processar a planilha. Verifique o formato.');
      } finally {
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      toast.dismiss(loadingToast);
      toast.error('Erro ao ler o arquivo');
      setIsUploading(false);
    };
    
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex items-center space-x-4">
      <input 
        type="file" 
        accept=".xlsx,.xls" 
        onChange={handleFileUpload} 
        className="hidden" 
        id="excel-upload" 
        disabled={isUploading}
      />
      <label htmlFor="excel-upload">
        <Button variant="outline" asChild disabled={isUploading}>
          <span>
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-pulse" />
                Carregando...
              </>
            ) : (
              <>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Carregar Planilha Excel
              </>
            )}
          </span>
        </Button>
      </label>
      {fileName && !isUploading && (
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
          <span className="text-sm text-muted-foreground">
            {fileName}
          </span>
        </div>
      )}
    </div>
  );
};
