import { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle, XCircle, Edit, Upload, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const mockRequests = [
  { id: 1, name: 'Rahul Verma', issue: 'Property Dispute', date: '2024-01-20', status: 'pending' },
  { id: 2, name: 'Meera Krishnan', issue: 'Employment Issue', date: '2024-01-19', status: 'pending' },
  { id: 3, name: 'Amit Patel', issue: 'Consumer Complaint', date: '2024-01-18', status: 'accepted' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

export default function LawyerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockRequests);
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    Mon: ['09:00', '10:00', '11:00'],
    Tue: ['09:00', '10:00', '14:00', '15:00'],
    Wed: ['09:00', '10:00', '11:00'],
    Thu: ['14:00', '15:00', '16:00'],
    Fri: ['09:00', '10:00'],
    Sat: [],
    Sun: []
  });

  const handleRequestAction = (id: number, action: 'accept' | 'reject') => {
    setRequests(prev => prev.map(r => 
      r.id === id ? { ...r, status: action === 'accept' ? 'accepted' : 'rejected' } : r
    ));
    toast({
      title: action === 'accept' ? 'Request Accepted' : 'Request Rejected',
      description: `You have ${action}ed the consultation request.`,
    });
  };

  const toggleSlot = (day: string, time: string) => {
    setAvailability(prev => {
      const daySlots = prev[day] || [];
      if (daySlots.includes(time)) {
        return { ...prev, [day]: daySlots.filter(t => t !== time) };
      } else {
        return { ...prev, [day]: [...daySlots, time].sort() };
      }
    });
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                Welcome, {user?.name || 'Advocate'}
              </h1>
              <p className="text-muted-foreground">Manage your practice and client requests</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-muted-foreground text-sm">Profile editing form would go here with fields for bio, specialization, fees, etc.</p>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload certificates or profile photo</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">24</p>
                    <p className="text-sm text-muted-foreground">Total Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{pendingRequests.length}</p>
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">187</p>
                    <p className="text-sm text-muted-foreground">Cases Won</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">4.8</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Client Requests */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal" />
                    Client Requests
                  </CardTitle>
                  <CardDescription>Review and respond to consultation requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                        <div>
                          <h4 className="font-medium text-foreground">{request.name}</h4>
                          <p className="text-sm text-muted-foreground">{request.issue}</p>
                          <p className="text-xs text-muted-foreground mt-1">{request.date}</p>
                        </div>
                        {request.status === 'pending' ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="hero"
                              onClick={() => handleRequestAction(request.id, 'accept')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRequestAction(request.id, 'reject')}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <Badge variant={request.status === 'accepted' ? 'success' : 'destructive'}>
                            {request.status}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Availability Calendar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal" />
                    Availability
                  </CardTitle>
                  <CardDescription>Set your available time slots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weekDays.map((day) => (
                      <div key={day}>
                        <p className="text-sm font-medium text-foreground mb-2">{day}</p>
                        <div className="flex flex-wrap gap-1">
                          {timeSlots.map((time) => (
                            <button
                              key={`${day}-${time}`}
                              onClick={() => toggleSlot(day, time)}
                              className={`text-xs px-2 py-1 rounded transition-colors ${
                                availability[day]?.includes(time)
                                  ? 'bg-teal text-primary-foreground'
                                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
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
