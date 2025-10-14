const ResultDisplay = ({ result }) => {
    if (!result) return null;

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    Analysis Results
                </h2>
            </div>

            <div className="p-6 space-y-6">
                {result.conditions && result.conditions.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                            Possible Conditions
                        </h3>
                        <div className="grid gap-3">
                            {result.conditions.map((condition, index) => (
                                <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 rounded-lg border border-blue-200 transition-all hover:shadow-md">
                                    <p className="text-blue-900 font-medium">{condition}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {result.next_steps && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                            Recommended Next Steps
                        </h3>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-4 rounded-lg border border-green-200">
                            <p className="text-green-900 leading-relaxed">{result.next_steps}</p>
                        </div>
                    </div>
                )}
                {result.disclaimer && (
                    <div className="border-t border-gray-200 pt-6">
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-4 rounded-lg border border-yellow-200">
                            <div className="flex items-start">
                                <div>
                                    <h4 className="text-sm font-semibold text-yellow-800 mb-1">Important Medical Disclaimer</h4>
                                    <p className="text-sm text-yellow-700 leading-relaxed">{result.disclaimer}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;