import { useState } from 'react';
import { Users, Scale, Clock, CheckCircle, XCircle, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import pendingLawyersData from '@/data/pendingLawyers.json';

export default function AdminDashboard() {
  const { toast } = useToast();
  const [pendingLawyers, setPendingLawyers] = useState(pendingLawyersData);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setPendingLawyers(prev => prev.filter(l => l.id !== id));
    toast({
      title: 'Lawyer Approved',
      description: 'The lawyer has been verified and can now accept clients.',
    });
  };

  const handleReject = (id: string) => {
    if (!rejectReason.trim()) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for rejection.',
        variant: 'destructive',
      });
      return;
    }
    setPendingLawyers(prev => prev.filter(l => l.id !== id));
    setRejectReason('');
    setSelectedLawyer(null);
    toast({
      title: 'Application Rejected',
      description: 'The lawyer has been notified of the rejection.',
    });
  };

  const stats = {
    totalUsers: 1247,
    totalLawyers: 156,
    pendingApprovals: pendingLawyers.length,
    activeConsultations: 42
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="py-8">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage platform users and verify lawyers</p>
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
                    <p className="text-2xl font-heading font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{stats.totalLawyers}</p>
                    <p className="text-sm text-muted-foreground">Verified Lawyers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-amber/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{stats.pendingApprovals}</p>
                    <p className="text-sm text-muted-foreground">Pending Approvals</p>
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
                    <p className="text-2xl font-heading font-bold text-foreground">{stats.activeConsultations}</p>
                    <p className="text-sm text-muted-foreground">Active Consultations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber" />
                Pending Lawyer Verifications
              </CardTitle>
              <CardDescription>Review and verify lawyer registrations</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingLawyers.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">All applications have been processed!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bar Council ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Specialization</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">City</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Documents</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingLawyers.map((lawyer) => (
                        <tr key={lawyer.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-foreground">{lawyer.name}</p>
                              <p className="text-xs text-muted-foreground">{lawyer.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{lawyer.barCouncilId}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1">
                              {lawyer.specialization.map((spec) => (
                                <Badge key={spec} variant="teal" className="text-xs">{spec}</Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">{lawyer.city}</td>
                          <td className="py-4 px-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View ({lawyer.documents.length})
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Uploaded Documents</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2 py-4">
                                  {lawyer.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                                      <FileText className="w-4 h-4 text-teal" />
                                      <span className="text-sm text-foreground">{doc}</span>
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="hero"
                                onClick={() => handleApprove(lawyer.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Dialog open={selectedLawyer === lawyer.id} onOpenChange={(open) => setSelectedLawyer(open ? lawyer.id : null)}>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reject Application</DialogTitle>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <label className="text-sm font-medium text-foreground">Reason for rejection</label>
                                    <Textarea
                                      placeholder="Please provide a reason for rejection..."
                                      value={rejectReason}
                                      onChange={(e) => setRejectReason(e.target.value)}
                                      className="mt-2"
                                    />
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setSelectedLawyer(null)}>Cancel</Button>
                                    <Button variant="destructive" onClick={() => handleReject(lawyer.id)}>
                                      Confirm Rejection
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
