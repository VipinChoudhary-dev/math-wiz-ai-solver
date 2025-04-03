
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, BookOpen, MessageCircle, HelpCircle, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">MathWiz</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center space-x-1">
                <Calculator className="h-4 w-4" />
                <span>Solver</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/topics" className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>Topics</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/chat" className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>Math Tutor</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/help" className="flex items-center space-x-1">
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Link>
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-fade-in">
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <Calculator className="h-5 w-5" />
                <span>Problem Solver</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/topics" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <BookOpen className="h-5 w-5" />
                <span>Math Topics</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/chat" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <MessageCircle className="h-5 w-5" />
                <span>AI Math Tutor</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/help" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <HelpCircle className="h-5 w-5" />
                <span>Help Center</span>
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
