import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import HistoryPage from '../pages/HistoryPage';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Layout */}
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/history" element={
          <Layout>
            <HistoryPage />
          </Layout>
        } />
        
        {/* 404 Route without Layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
