import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Sun, Moon, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, role } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const getDashboardPath = () => {
    switch (role) {
      case 'customer': return '/customer/dashboard';
      case 'lawyer': return '/lawyer/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="NyayAI Home">
            <div className="w-12 h-12 rounded-xl bg-[#CD7F32] flex items-center justify-center shadow-lg group-hover:bg-[#B87326] transition-all duration-500">
              <Scale className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-heading font-extrabold text-2xl text-white group-hover:scale-105 transition-transform duration-300">
              Nyay<span className="text-[#FFD700]">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation - Original Features */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-white/90 hover:text-[#FFD700] font-medium transition-all duration-300 hover:scale-105 relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#CD7F32] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/study-portal" className="text-white/90 hover:text-[#FFD700] font-medium transition-all duration-300 hover:scale-105 relative group">
              Study Portal
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#CD7F32] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/ai-assistant" className="text-white/90 hover:text-[#FFD700] font-medium transition-all duration-300 hover:scale-105 relative group">
              AI Lawyer
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#CD7F32] group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Desktop Auth/User */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white hover:text-[#FFD700] hover:bg-white/10"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={() => navigate(getDashboardPath())} className="text-white hover:text-[#FFD700] hover:bg-white/10">
                  <User className="w-4 h-4 mr-2" />
                  {user?.name}
                </Button>
                <Button variant="outline" onClick={handleLogout} className="border-white/30 text-white hover:bg-white/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')} className="text-white hover:text-[#FFD700] hover:bg-white/10">
                  Login
                </Button>
                <Button 
                  variant="hero" 
                  onClick={() => navigate('/auth')}
                  className="bg-[#CD7F32] hover:bg-[#B87326] text-white border-none"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white hover:text-[#FFD700]"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#FFD700]"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/#features"
              className="block px-4 py-2 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/study-portal"
              className="block px-4 py-2 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Study Portal
            </Link>
            <Link
              to="/ai-assistant"
              className="block px-4 py-2 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              AI Lawyer
            </Link>
            <div className="pt-3 border-t border-white/20 space-y-2">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-[#FFD700] hover:bg-white/10"
                    onClick={() => {
                      navigate(getDashboardPath());
                      setIsOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full text-white hover:text-[#FFD700] hover:bg-white/10"
                    onClick={() => {
                      navigate('/auth');
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="hero"
                    className="w-full bg-[#CD7F32] hover:bg-[#B87326] text-white border-none"
                    onClick={() => {
                      navigate('/auth');
                      setIsOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

