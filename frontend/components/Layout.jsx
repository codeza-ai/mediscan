import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    const location = useLocation();
    const currentPage = location.pathname === '/history' ? 'history' : 'home';
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Header currentPage={currentPage} />
            <main className={currentPage === 'home' ? 'py-8' : ''}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;