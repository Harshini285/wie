import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CustomerLogin from "./pages/auth/CustomerLogin";
import CustomerSignup from "./pages/auth/CustomerSignup";
import LawyerLogin from "./pages/auth/LawyerLogin";
import LawyerSignup from "./pages/auth/LawyerSignup";
import AdminLogin from "./pages/auth/AdminLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import LawyerDashboard from "./pages/LawyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudyPortal from "./pages/StudyPortal";
import AIAssistant from "./pages/AIAssistant";
import LawyerProfile from "./pages/LawyerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Auth Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/customer/login" element={<CustomerLogin />} />
              <Route path="/auth/customer/signup" element={<CustomerSignup />} />
              <Route path="/auth/lawyer/login" element={<LawyerLogin />} />
              <Route path="/auth/lawyer/signup" element={<LawyerSignup />} />
              <Route path="/auth/admin/login" element={<AdminLogin />} />
              
              {/* Dashboard Routes */}
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Feature Routes */}
              <Route path="/study-portal" element={<StudyPortal />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/lawyer/:id" element={<LawyerProfile />} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
