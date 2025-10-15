const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <img src="logo.png" alt="MediScan Logo" className="w-10 h-10" />
                            <span className="ml-2 text-lg font-bold text-gray-900">MediScan</span>
                        </div>
                        <p className="text-sm text-gray-600 max-w-xs">
                            AI-powered healthcare symptom analysis tool designed to provide preliminary health insights.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Important</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Not a substitute for medical advice.</li>
                            <li>• Always consult healthcare professionals.</li>
                            <li>• For emergencies, call emergency services.</li>
                            <li>• Results are preliminary only.</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-600">
                        This tool is for educational purposes only and should not replace professional medical advice.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        Always consult with a qualified healthcare provider for medical concerns.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;