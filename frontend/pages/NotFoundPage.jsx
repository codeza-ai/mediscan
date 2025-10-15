import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full text-center">

                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Go to Home
                    </Link>

                    <div className="text-center">
                        <Link
                            to="/history"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            View History
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;