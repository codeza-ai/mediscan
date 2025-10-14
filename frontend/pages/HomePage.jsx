import SymptomChecker from '../components/SymptomChecker';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bgs-gray-50">
            <Header />
            <main className="py-8">
                <SymptomChecker />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;