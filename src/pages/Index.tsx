import { Database, Bot, BarChart3, GraduationCap, Search, MessageSquare, FileCheck, ArrowRight, Scale, Shield, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/cards/FeatureCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Database className="w-6 h-6 text-primary-foreground" />,
    title: 'Unified Legal Database',
    description: 'Access comprehensive Indian laws, judgments, and legal documents in one searchable platform.',
    accentColor: 'teal' as const
  },
  {
    icon: <Bot className="w-6 h-6 text-primary-foreground" />,
    title: 'AI Lawyer Assistant',
    description: 'Get instant legal guidance powered by AI trained on Indian law with accurate citations.',
    accentColor: 'teal' as const
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-accent-foreground" />,
    title: 'Case Probability Engine',
    description: 'Analyze your case and get AI-powered predictions on likely outcomes based on similar cases.',
    accentColor: 'amber' as const
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-primary-foreground" />,
    title: 'Study Portal',
    description: 'Interactive courses for law students with quizzes, resources, and progress tracking.',
    accentColor: 'teal' as const
  }
];

const steps = [
  {
    step: '01',
    icon: <Search className="w-8 h-8" />,
    title: 'Search or Ask',
    description: 'Search laws, judgments, or ask the AI about your legal situation.'
  },
  {
    step: '02',
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Get Guidance',
    description: 'Receive AI-powered insights with relevant law citations and precedents.'
  },
  {
    step: '03',
    icon: <FileCheck className="w-8 h-8" />,
    title: 'Connect with Lawyers',
    description: 'Find verified lawyers near you for professional legal assistance.'
  }
];

const testimonials = [
  {
    role: 'Lawyer',
    icon: <Scale className="w-6 h-6" />,
    title: 'For Legal Professionals',
    description: 'Streamline case research with instant access to judgments and laws. Manage clients efficiently.'
  },
  {
    role: 'Public',
    icon: <Shield className="w-6 h-6" />,
    title: 'For Citizens',
    description: 'Understand your rights. Get legal guidance without expensive consultations. Find trusted lawyers.'
  },
  {
    role: 'Student',
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'For Law Students',
    description: 'Learn with interactive courses, practice with case studies, and ace your exams.'
  }
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber/10 rounded-full blur-3xl animate-pulse-slow" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
              <Zap className="w-4 h-4 text-amber" />
              <span className="text-sm text-muted-foreground">AI-Powered Legal Platform</span>
            </div>
            
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 animate-fade-in-up">
              <span className="text-gradient-teal">NyayAI</span> — Unified Indian
              <br />Legal Database + AI Lawyer
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Search laws. Ask the AI. Predict outcomes. Connect with verified lawyers.
              Making justice accessible to everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="hero" size="xl" onClick={() => navigate('/customer/dashboard')}>
                Get Legal Help
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="heroOutline" size="xl" onClick={() => navigate('/ai-assistant')}>
                <Bot className="w-5 h-5 mr-2" />
                Ask AI Lawyer
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal" />
                <span>50,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-teal" />
                <span>5,000+ Verified Lawyers</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-teal" />
                <span>1M+ Legal Documents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Everything You Need for Legal Success
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From research to representation, NyayAI provides comprehensive tools for lawyers, citizens, and students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get legal assistance in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass mb-6 group-hover:glow-teal transition-all duration-300">
                    <div className="text-teal">
                      {item.icon}
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-5xl font-heading font-bold text-border/50">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Built for Everyone
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a legal professional, citizen, or student — NyayAI has tools designed for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl glass-card hover:border-teal/50 hover:shadow-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
                <Button variant="ghost" className="mt-4 p-0 h-auto text-teal hover:text-teal-light">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who trust NyayAI for their legal needs. Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => navigate('/auth')}>
              Create Free Account
            </Button>
            <Button variant="heroOutline" size="lg" onClick={() => navigate('/study-portal')}>
              Explore Study Portal
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
