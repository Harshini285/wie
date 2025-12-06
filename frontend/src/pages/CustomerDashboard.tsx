import { useState, useMemo } from 'react';
import { Search, MapPin, Filter, Bot, ChevronDown, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LawyerCard } from '@/components/cards/LawyerCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import lawyersData from '@/data/lawyers.json';

const cities = ['All Cities', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Mysuru', 'Ahmedabad'];
const specializations = ['All', 'Criminal', 'Civil', 'Family Law', 'Corporate', 'Tax Law', 'Labour Law', 'Property Law', 'Intellectual Property', 'Constitutional Law'];

// Mock user location (Bengaluru)
const userLocation = { lat: 12.9716, lng: 77.5946 };

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function CustomerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [sortBy, setSortBy] = useState('distance');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: string; content: string}[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI Legal Assistant. How can I help you today? You can ask me about legal matters, rights, or help finding the right lawyer.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const filteredLawyers = useMemo(() => {
    let lawyers = lawyersData.map(lawyer => ({
      ...lawyer,
      distance: calculateDistance(userLocation.lat, userLocation.lng, lawyer.lat, lawyer.lng)
    }));

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      lawyers = lawyers.filter(l => 
        l.name.toLowerCase().includes(query) ||
        l.specialization.some(s => s.toLowerCase().includes(query)) ||
        l.city.toLowerCase().includes(query)
      );
    }

    if (selectedCity !== 'All Cities') {
      lawyers = lawyers.filter(l => l.city === selectedCity);
    }

    if (selectedSpec !== 'All') {
      lawyers = lawyers.filter(l => l.specialization.includes(selectedSpec));
    }

    lawyers.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      return 0;
    });

    return lawyers;
  }, [searchQuery, selectedCity, selectedSpec, sortBy]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }]);
    
    // Mock AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Based on your query, I recommend consulting with a lawyer specializing in the relevant area. Under Indian law, you may have certain rights protected by the Constitution of India. Would you like me to help you find a suitable lawyer nearby?' 
      }]);
    }, 1000);
    
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="py-8">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Find Legal Help
            </h1>
            <p className="text-muted-foreground">Search for lawyers, legal issues, or specific acts</p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by issue, act, or lawyer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-[180px] h-12">
                <MapPin className="w-4 h-4 mr-2 text-teal" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="hero" className="h-12">
              <MapPin className="w-4 h-4 mr-2" />
              Use My Location
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Select value={selectedSpec} onValueChange={setSelectedSpec}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
            {(selectedCity !== 'All Cities' || selectedSpec !== 'All') && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => { setSelectedCity('All Cities'); setSelectedSpec('All'); }}
              >
                Clear Filters <X className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lawyers List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-semibold text-lg text-foreground">
                  Lawyers Near You
                </h2>
                <Badge variant="teal">{filteredLawyers.length} found</Badge>
              </div>

              {filteredLawyers.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No lawyers found matching your criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setSelectedCity('All Cities'); setSelectedSpec('All'); setSearchQuery(''); }}>
                    Clear all filters
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLawyers.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      {...lawyer}
                      distance={lawyer.distance}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Assistant Card */}
              <Card className="border-teal/30 glow-teal">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bot className="w-5 h-5 text-teal" />
                    AI Legal Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant answers to your legal questions from our AI assistant.
                  </p>
                  <Dialog open={showChat} onOpenChange={setShowChat}>
                    <DialogTrigger asChild>
                      <Button variant="hero" className="w-full">
                        Start Chat
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg h-[600px] flex flex-col">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Bot className="w-5 h-5 text-teal" />
                          AI Legal Assistant
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-y-auto space-y-4 py-4">
                        {chatMessages.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-xl px-4 py-2 ${
                              msg.role === 'user' 
                                ? 'bg-teal text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground'
                            }`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Input
                          placeholder="Ask a legal question..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button variant="hero" onClick={handleSendMessage}>Send</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Saved Lawyers</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Cases</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Documents</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
