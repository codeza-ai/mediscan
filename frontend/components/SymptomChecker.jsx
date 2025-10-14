import { useState } from 'react';
import { symptomAnalysisAPI } from '../src/utils/api';
import Alert from './Alert';
import LoadingSpinner from './LoadingSpinner';
import ResultDisplay from './ResultDisplay';

const SymptomChecker = () => {
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!symptoms.trim()) {
            setError('Please describe your symptoms');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const result = await symptomAnalysisAPI.analyzeFree(symptoms.trim());

            if (result) {
                setResult(result);
            }
        } catch (err) {
            console.error('Error analyzing symptoms:', err);
            setError(err.message || 'Failed to analyze symptoms. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSymptoms('');
        setResult(null);
        setError('');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Healthcare Symptom Checker</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Describe your symptoms and get preliminary health information. 
                </p>
                <p className="text-md font-bold text-red-600 max-w-2xl mx-auto">
                    Remember, this is not a substitute for professional medical advice.
                </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                            Describe your symptoms
                        </label>
                        <textarea
                            id="symptoms"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="Please describe your symptoms in detail. For example: 'I have been experiencing a persistent headache for 2 days, along with mild fever and fatigue...'"
                            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <Alert
                            type="error"
                            message={error}
                            onClose={() => setError('')}
                        />
                    )}

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading || !symptoms.trim()}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <LoadingSpinner text="Analyzing..." />
                            ) : (
                                'Submit'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={loading}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
            <ResultDisplay result={result} />
        </div>
    );
};

export default SymptomChecker;