
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<TeamData>(worksheet, { header: 1 });
      
      // Mapear os dados do Excel para o formato esperado
      const processedData = jsonData.slice(1).map((row, index) => ({
        id: index + 1,
        name: row[0] as string,
        lote: row[1] as number,
        manager: row[2] as string,
        members: row[3] as number,
        type: row[4] as string,
        status: row[5] as string,
        latitude: row[6] as number,
        longitude: row[7] as number
      }));

      onUpload(processedData);
      toast.success(`Planilha ${file.name} carregada com sucesso!`);
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
      />
      <label htmlFor="excel-upload">
        <Button variant="outline" asChild>
          <span>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Carregar Planilha Excel
          </span>
        </Button>
      </label>
      {fileName && (
        <span className="text-sm text-muted-foreground">
          {fileName}
        </span>
      )}
    </div>
  );
};
