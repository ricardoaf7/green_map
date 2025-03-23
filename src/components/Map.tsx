
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowUp, Loader2 } from 'lucide-react';

// This is a placeholder component until we implement a real map integration
const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock team locations for demonstration
  const teams = [
    { id: 1, name: 'Equipe A1', lote: 1, lat: -23.55, lng: -46.64, status: 'Em andamento' },
    { id: 2, name: 'Equipe A2', lote: 1, lat: -23.53, lng: -46.62, status: 'Coleta' },
    { id: 3, name: 'Equipe B1', lote: 2, lat: -23.58, lng: -46.65, status: 'Acabamento' },
    { id: 4, name: 'Equipe B2', lote: 2, lat: -23.56, lng: -46.67, status: 'Giro Zero' },
  ];

  useEffect(() => {
    // Simulate loading a map
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // In a real implementation, we would use a mapping library like Leaflet, Google Maps, or Mapbox
  
  return (
    <Card className="glass-panel-lg overflow-hidden h-[500px] md:h-[600px] transition-all duration-500 ease-in-out">
      <CardContent className="p-0 relative h-full">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="ml-2 text-muted-foreground">Carregando mapa...</span>
          </div>
        ) : (
          <>
            <div 
              ref={mapRef} 
              className="w-full h-full bg-slate-100 dark:bg-slate-900 relative"
              style={{
                backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=-23.55,-46.64&zoom=12&size=1200x800&scale=2&style=feature:all|element:labels|visibility:off&key=YOUR_API_KEY_HERE')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* This is where we'd normally render the actual map */}
              <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]"></div>
              
              {/* Map team markers */}
              {teams.map((team) => (
                <div 
                  key={team.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"
                  style={{ 
                    left: `${((team.lng + 46.7) / 0.1) * 100}%`, 
                    top: `${((team.lat + 23.6) / 0.1) * 100}%`,
                  }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 blur-sm group-hover:blur transition duration-500"></div>
                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${team.lote === 1 ? 'bg-green-600' : 'bg-blue-600'}`}>
                      <MapPin className="h-6 w-6 text-white" />
                      <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                    </div>
                    
                    {/* Info tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <div className="glass-panel p-2 text-sm min-w-[140px] text-center">
                        <p className="font-medium">{team.name}</p>
                        <Badge variant={team.lote === 1 ? "default" : "secondary"} className={team.lote === 1 ? "bg-green-600" : "bg-blue-600"}>
                          Lote {team.lote}
                        </Badge>
                        <p className="text-xs mt-1">{team.status}</p>
                      </div>
                      <ArrowUp className="text-white/80 h-4 w-4 absolute -bottom-4 left-1/2 transform -translate-x-1/2 rotate-180" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map overlay with legend */}
            <div className="absolute bottom-4 left-4 glass-panel p-2 text-xs">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-600 mr-1"></div>
                  <span>Lote 1 (Norte)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-1"></div>
                  <span>Lote 2 (Sul)</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 glass-panel p-2">
              <p className="text-xs text-muted-foreground">Nota: Este é um mapa de demonstração apenas</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Map;
