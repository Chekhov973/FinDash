import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ReportProvider } from './context/ReportContext';
import { AuthView } from './components/AuthView';
import { Confirm } from './components/Confirm';
import { Dashboard } from './components/Dashboard';
import { ReportsPage } from './components/ReportsPage';
import { PrivateRoute } from './components/PrivateRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <ReportProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthView />} />
              <Route 
                path="/confirm" 
                element={
                  <PrivateRoute>
                    <Confirm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <PrivateRoute>
                    <ReportsPage />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ReportProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;

