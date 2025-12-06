import { useParams } from 'react-router-dom';
import { Star, MapPin, Briefcase, CheckCircle, Phone, Mail, Calendar, Award, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import lawyersData from '@/data/lawyers.json';

export default function LawyerProfile() {
  const { id } = useParams<{ id: string }>();
  const lawyer = lawyersData.find(l => l.id === id);

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground">Lawyer not found</h1>
          <p className="text-muted-foreground mt-2">The lawyer profile you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="py-8">
            <Card className="overflow-hidden">
              <div className="h-32 gradient-teal" />
              <CardContent className="relative pt-0 pb-6">
                <div className="flex flex-col sm:flex-row gap-6 -mt-16">
                  <div className="relative">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-32 h-32 rounded-2xl border-4 border-background object-cover shadow-lg"
                    />
                    {lawyer.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-teal rounded-full p-1.5 shadow-lg">
                        <CheckCircle className="w-5 h-5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 pt-4 sm:pt-16">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                          {lawyer.name}
                        </h1>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {lawyer.specialization.map((spec) => (
                            <Badge key={spec} variant="teal">{spec}</Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {lawyer.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {lawyer.experience} years experience
                          </span>
                          <span className="flex items-center gap-1 text-amber">
                            <Star className="w-4 h-4 fill-current" />
                            {lawyer.rating} rating
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="hero">
                          Request Consultation
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{lawyer.bio}</p>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <Award className="w-6 h-6 text-teal mx-auto mb-2" />
                    <p className="text-2xl font-heading font-bold text-foreground">{lawyer.cases_won}</p>
                    <p className="text-xs text-muted-foreground">Cases Won</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <Briefcase className="w-6 h-6 text-teal mx-auto mb-2" />
                    <p className="text-2xl font-heading font-bold text-foreground">{lawyer.experience}</p>
                    <p className="text-xs text-muted-foreground">Years Exp.</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <Star className="w-6 h-6 text-amber mx-auto mb-2" />
                    <p className="text-2xl font-heading font-bold text-foreground">{lawyer.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl font-heading font-bold text-foreground">95%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 rounded-lg bg-secondary/50 flex items-center justify-center border border-border">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-muted-foreground">{lawyer.city}, India</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Coordinates: {lawyer.lat.toFixed(4)}, {lawyer.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="border-teal/30">
                <CardHeader>
                  <CardTitle>Consultation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span className="text-xl font-heading font-bold text-foreground">₹{lawyer.consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Availability</span>
                    <Badge variant="success">{lawyer.availability}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Languages</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {lawyer.languages.map(lang => (
                        <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Request Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Request Consultation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Your Name</label>
                    <Input placeholder="Full Name" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <Input placeholder="+91 XXXXX XXXXX" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Describe Your Issue</label>
                    <Textarea 
                      placeholder="Briefly describe your legal matter..." 
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                  <Button variant="hero" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Request Appointment
                  </Button>
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
