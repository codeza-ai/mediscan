import { Link } from 'react-router-dom';

const Header = ({ currentPage = 'home' }) => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
                            <div className="relative">
                                <img src="logo.png" alt="MediScan Logo" className="w-12 h-12" />
                            </div>
                            <div className="ml-3">
                                <span className="text-xl font-bold text-gray-900">MediScan</span>
                                <div className="text-xs text-gray-500 -mt-1">AI Health Assistant</div>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'home'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            <span>Home</span>
                        </Link>

                        <Link
                            to="/history"
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'history'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            <span>History</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;