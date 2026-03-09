/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

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
import Automation from './pages/Automation';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/consultants" element={<ConsultantGallery />} />
          <Route path="/consultants/:id" element={<ConsultantProfile />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/method" element={<Method />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/strategy-room" element={<StrategyRoom />} />
          <Route path="/services" element={<Services />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* Consultant Portal */}
        <Route element={<DashboardLayout type="consultant" />}>
          <Route path="/consultant" element={<ConsultantDashboard />} />
          {/* Add other consultant sub-routes here as needed */}
        </Route>

        {/* Enterprise Portal */}
        <Route element={<DashboardLayout type="enterprise" />}>
          <Route path="/enterprise" element={<EnterpriseDashboard />} />
          <Route path="/enterprise/challenge" element={<ChallengeSubmission />} />
          <Route path="/enterprise/match" element={<MatchResults />} />
          <Route path="/enterprise/workspace" element={<Workspace />} />
          {/* Add other enterprise sub-routes here as needed */}
        </Route>
      </Routes>
    </Router>
  );
}
