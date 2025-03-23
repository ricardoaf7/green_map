
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LayoutDashboard, Calendar, FileText, Users, MapPin } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: <LayoutDashboard className="h-4 w-4 mr-2" />, label: 'Dashboard' },
    { path: '/tasks', icon: <Calendar className="h-4 w-4 mr-2" />, label: 'Tarefas' },
    { path: '/reports', icon: <FileText className="h-4 w-4 mr-2" />, label: 'Relatórios' },
    { path: '/teams', icon: <Users className="h-4 w-4 mr-2" />, label: 'Equipes' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <MapPin className="h-6 w-6 text-green-600" />
              <span className="ml-2 text-xl font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                GreenMap
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={location.pathname === item.path ? "default" : "ghost"} 
                  className={`transition-all duration-300 ${location.pathname === item.path 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'}`}
                  size="sm"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  variant={location.pathname === item.path ? "default" : "ghost"} 
                  className={`w-full justify-start ${location.pathname === item.path 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'}`}
                  size="sm"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
