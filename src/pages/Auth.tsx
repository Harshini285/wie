import { useNavigate } from 'react-router-dom';
import { User, Scale, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const roles = [
  {
    id: 'customer',
    icon: <User className="w-8 h-8" />,
    title: 'Customer',
    description: 'Get legal help, find lawyers, and understand your rights',
    loginPath: '/auth/customer/login',
    signupPath: '/auth/customer/signup',
    color: 'teal'
  },
  {
    id: 'lawyer',
    icon: <Scale className="w-8 h-8" />,
    title: 'Lawyer',
    description: 'Manage clients, showcase expertise, and grow your practice',
    loginPath: '/auth/lawyer/login',
    signupPath: '/auth/lawyer/signup',
    color: 'teal'
  },
  {
    id: 'admin',
    icon: <Shield className="w-8 h-8" />,
    title: 'Admin',
    description: 'Manage platform, verify lawyers, and monitor activity',
    loginPath: '/auth/admin/login',
    signupPath: null,
    color: 'amber'
  }
];

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Welcome to <span className="text-gradient-teal">NyayAI</span>
            </h1>
            <p className="text-muted-foreground">
              Select your role to continue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card 
                key={role.id}
                className="group hover:border-teal/50 hover:shadow-glow transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-2xl ${role.color === 'teal' ? 'gradient-teal shadow-glow' : 'gradient-amber shadow-glow-amber'} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <div className="text-primary-foreground">
                      {role.icon}
                    </div>
                  </div>
                  <CardTitle className="font-heading">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={() => navigate(role.loginPath)}
                  >
                    Login
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {role.signupPath && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(role.signupPath)}
                    >
                      Sign Up
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
