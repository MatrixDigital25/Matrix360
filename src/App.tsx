/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AuthProvider, useAuth } from './utils/AuthContext';

import Home from './pages/Home';
import Platform from './pages/Platform';
import ConsultantDashboard from './pages/ConsultantDashboard';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import ConsultantGallery from './pages/ConsultantGallery';
import ConsultantProfile from './pages/ConsultantProfile';
import Apply from './pages/Apply';
import ChallengeSubmission from './pages/ChallengeSubmission';
import MatchResults from './pages/MatchResults';
import Workspace from './pages/Workspace';
import Industries from './pages/Industries';
import Insights from './pages/Insights';
import Method from './pages/Method';
import About from './pages/About';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Architecture from './pages/Architecture';
import StrategyRoom from './pages/StrategyRoom';
import Services from './pages/Services';
import AutomationSystems from './pages/AutomationSystems';
import AIAgents from './pages/AIAgents';
import Projects from './pages/Projects';
import EnterpriseProfile from './pages/EnterpriseProfile';
import EnterpriseGallery from './pages/EnterpriseGallery';
import NetworkExplorer from './pages/NetworkExplorer';
import Marketplace from './pages/Marketplace';
import AIIntelligenceFeed from './pages/AIIntelligenceFeed';
import Conversations from './pages/Conversations';
import Analytics from './pages/Analytics';

import KnowledgeGraph from './pages/KnowledgeGraph';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import AIReports from './pages/AIReports';
import APIIntegrations from './pages/APIIntegrations';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import AuditLogs from './pages/AuditLogs';
import Admin from './pages/Admin';

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: string }> = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-zinc-900 font-serif">
      <div className="h-12 w-12 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4 animate-pulse">M</div>
      <p className="italic">Initializing Matrix360 Strategic Intelligence OS...</p>
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  if (!user.has_onboarded && window.location.pathname !== '/onboarding') return <Navigate to="/onboarding" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          
          {/* Standalone Full-Page Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/apply" element={<Apply />} />

          <Route element={<AppLayout />}>
            {/* Main Platform Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Insights />} />
            <Route path="/network" element={<NetworkExplorer />} />
            <Route path="/enterprises" element={<EnterpriseGallery />} />
            <Route path="/consultants" element={<ConsultantGallery />} />
            <Route path="/consultants/:id" element={<ConsultantProfile />} />
            <Route path="/enterprise/:id" element={<EnterpriseProfile />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/strategy-room" element={<StrategyRoom />} />
            <Route path="/ai-intelligence" element={<AIIntelligenceFeed />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/automation" element={<AutomationSystems />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
            <Route path="/ai-reports" element={<AIReports />} />
            <Route path="/api-integrations" element={<APIIntegrations />} />
            <Route path="/expert-marketplace" element={<Marketplace />} />
            <Route path="/subscription" element={<Billing />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/audit-logs" element={<ProtectedRoute role="ADMIN"><AuditLogs /></ProtectedRoute>} />
            <Route path="/challenges" element={<ChallengeSubmission />} />
            
            {/* Legacy/Secondary Routes */}
            <Route path="/platform" element={<Platform />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/method" element={<Method />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/services" element={<Services />} />

            {/* Dashboards */}
            <Route path="/dashboard" element={<ProtectedRoute><EnterpriseDashboard /></ProtectedRoute>} />
            <Route path="/consultant" element={<ProtectedRoute><ConsultantDashboard /></ProtectedRoute>} />
            <Route path="/enterprise" element={<ProtectedRoute><EnterpriseDashboard /></ProtectedRoute>} />
            <Route path="/enterprise/challenge" element={<ProtectedRoute><ChallengeSubmission /></ProtectedRoute>} />
            <Route path="/enterprise/match" element={<ProtectedRoute><MatchResults /></ProtectedRoute>} />
            <Route path="/enterprise/workspace" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
