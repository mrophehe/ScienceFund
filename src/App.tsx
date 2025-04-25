import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { configureClient } from './lib/wallet';
import { ProjectProvider } from './contexts/ProjectContext';

// Layout
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ProfilePage from './pages/ProfilePage';
import CreateProjectPage from './pages/CreateProjectPage';
import DashboardPage from './pages/DashboardPage';

const { config, queryClient } = configureClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ProjectProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/create" element={<CreateProjectPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </Layout>
          </Router>
        </ProjectProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;