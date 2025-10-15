import { useState } from 'react';
import { historyAPI } from '../src/utils/api';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchHistory = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try{
            const data = await historyAPI.getHistory();
            console.log('Fetched history data:', data);
            const historyArray = Array.isArray(data) ? data : [];
            setHistory(historyArray);
            setSuccess(`Loaded ${historyArray.length} query records`);
        }catch(err){
            console.error('Error fetching history:', err);

            let errorMessage = 'Failed to fetch history. Please try again.';
            if(err.code === 'ECONNABORTED'){
                errorMessage = 'Request timed out. Please check your internet connection.';
            }else if(err.response?.status === 500){
                errorMessage = 'Server error. Please try again later.';
            }else if(err.response?.status === 404){
                errorMessage = 'History endpoint not found. Please contact support.';
            }else if(err.message){
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteAllHistory = async () => {
        if(!window.confirm('Are you sure you want to delete all query history? This action cannot be undone.')){
            return;
        }

        setDeleteLoading(true);
        setError('');
        setSuccess('');

        try{
            const result = await historyAPI.deleteHistory();
            console.log('Delete result:', result); // Debug log

            setHistory([]);
            setSuccess(result?.message || 'All query history has been deleted successfully');
        }catch(err){
            console.error('Error deleting history:', err);
            let errorMessage = 'Failed to delete history. Please try again.';
            if(err.response?.status === 500){
                errorMessage = 'Server error while deleting history. Please try again later.';
            }else if(err.message){
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setDeleteLoading(false);
        }
    };

    const formatDate = (dateValue) => {
        try{
            let date;
            if(dateValue && typeof dateValue === 'object' && dateValue.$date){
                if(dateValue.$date.$numberLong){
                    date = new Date(parseInt(dateValue.$date.$numberLong));
                }else{
                    date = new Date(dateValue.$date);
                }
            }
            else if(dateValue){
                date = new Date(dateValue);
            }
            else{
                return 'Unknown Date';
            }
            if(isNaN(date.getTime())){
                return 'Invalid Date';
            }

            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }catch{
            return 'Invalid Date';
        }
    };

    const truncateText = (text, maxLength = 100) => {
        if(!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Query History</h1>
                    <p className="text-lg text-gray-600">
                        View and manage your symptom analysis history
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <button
                        onClick={fetchHistory}
                        disabled={loading}
                        className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <LoadingSpinner size="sm" text="Loading..." />
                        ):(
                            <>
                                Fetch History
                            </>
                        )}
                    </button>

                    <button
                        onClick={deleteAllHistory}
                        disabled={deleteLoading || history.length === 0}
                        className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {deleteLoading ? (
                            <LoadingSpinner size="sm" text="Deleting..." />
                        ):(
                            <>
                                Delete History
                            </>
                        )}
                    </button>
                </div>
                {error && (
                    <div className="mb-6">
                        <Alert
                            type="error"
                            message={error}
                            onClose={() => setError('')}
                        />
                    </div>
                )}

                {success && (
                    <div className="mb-6">
                        <Alert
                            type="success"
                            message={success}
                            onClose={() => setSuccess('')}
                        />
                    </div>
                )}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    {history.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No query history</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Click "Fetch History" to load your symptom analysis history.
                            </p>
                        </div>
                    ):(
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Query Text
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                                            Conditions
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Next Steps
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Model Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {history.map((query, index) => (
                                        <tr key={query._id || index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatDate(query.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <div className="max-w-xs">
                                                    <p className="break-words" title={query.queryText || 'No query text'}>
                                                        {truncateText(query.queryText || 'No query text available', 80)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <div className="max-w-sm">
                                                    {query.conditions && query.conditions.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {query.conditions.map((condition, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap"
                                                                    title={condition}
                                                                >
                                                                    {condition}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ):(
                                                        <span className="text-gray-400 text-xs">No conditions</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <div className="max-w-xs">
                                                    <p className="break-words" title={query.nextSteps || 'No next steps'}>
                                                        {truncateText(query.nextSteps || 'No recommendations available', 60)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${query.modelType?.includes('Pro')
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {query.modelType || 'Unknown'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {history.length > 0 && (
                    <div className="mt-6 bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{history.length}</div>
                                <div className="text-sm text-gray-500">Total Queries</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {history.filter(q => q.modelType?.includes('Free')).length}
                                </div>
                                <div className="text-sm text-gray-500">Free Model</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {history.filter(q => q.modelType?.includes('Pro')).length}
                                </div>
                                <div className="text-sm text-gray-500">Pro Model</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;