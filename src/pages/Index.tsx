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
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Lady Justice Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Lady Justice Statue Background Image - positioned on the right */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-right"
          style={{
            backgroundImage: 'url(/lady-justice-statue.jpg)',
            backgroundPosition: 'right center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark gradient overlay - warm golden-brown to dark, allowing statue to show on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B6F47] via-[#6B5A47]/90 to-[#2a2a2a]/80" />
        
        {/* Additional overlay for text readability on left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        
        {/* Golden light from upper right (matching the statue lighting) */}
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 200, 0, 0.4) 30%, transparent 70%)'
          }}
        />
        
        {/* Subtle golden light from upper left for balance */}
        <div 
          className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 200, 0, 0.15) 30%, transparent 70%)'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-[#CD7F32]/30">
              <Zap className="w-5 h-5 text-[#FFD700]" />
              <span className="text-sm font-semibold text-white">AI-Powered Legal Platform</span>
            </div>
            
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
              <span className="text-[#FFD700]">NyayAI</span> — Unified Indian
              <br />Legal Database + AI Lawyer
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Search laws. Ask the AI. Predict outcomes. Connect with verified lawyers.
              Making justice accessible to everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/customer/dashboard')}
                className="bg-[#CD7F32] hover:bg-[#B87326] text-white border-none"
              >
                Get Legal Help
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl" 
                onClick={() => navigate('/ai-assistant')}
                className="border-2 border-[#FFD700] text-white hover:bg-[#FFD700]/20"
              >
                <Bot className="w-5 h-5 mr-2" />
                Ask AI Lawyer
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FFD700]" />
                <span>50,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#FFD700]" />
                <span>5,000+ Verified Lawyers</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#FFD700]" />
                <span>1M+ Legal Documents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black mb-4">
              Everything You Need for Legal Success
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get legal assistance in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#CD7F32]/10 border border-[#CD7F32]/30 mb-6 group-hover:bg-[#CD7F32]/20 transition-all duration-300">
                    <div className="text-[#CD7F32]">
                      {item.icon}
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-5xl font-heading font-bold text-gray-300">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-gray-300 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black mb-4">
              Built for Everyone
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a legal professional, citizen, or student — NyayAI has tools designed for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#CD7F32]/50 hover:shadow-lg transition-all duration-500 hover-lift relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87326] flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>
                <Button variant="ghost" className="mt-4 p-0 h-auto text-[#CD7F32] hover:text-[#B87326] group-hover:translate-x-2 transition-all duration-300">
                  Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#CD7F32] to-[#FFD700] group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-[#8B6F47] via-[#6B5A47] to-[#2a2a2a]">
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 200, 0, 0.2) 30%, transparent 70%)'
          }}
        />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join thousands of users who trust NyayAI for their legal needs. Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-[#CD7F32] hover:bg-[#B87326] text-white border-none"
            >
              Create Free Account
            </Button>
            <Button 
              variant="heroOutline" 
              size="lg" 
              onClick={() => navigate('/study-portal')}
              className="border-2 border-[#FFD700] text-white hover:bg-[#FFD700]/20"
            >
              Explore Study Portal
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
