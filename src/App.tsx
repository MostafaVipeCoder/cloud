import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import RetentionPage from './pages/RetentionPage';
import FinancialPage from './pages/FinancialPage';
import DashboardOverview from './pages/DashboardOverview';
import './styles/index.css';

const App: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<DashboardOverview />} />
                    <Route path="/retention" element={<RetentionPage />} />
                    <Route path="/financial" element={<FinancialPage />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default App;
