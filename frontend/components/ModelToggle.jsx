const ModelToggle = ({ isProModel, onToggle, disabled = false }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-sm font-medium text-gray-900">Analysis Model</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium transition-colors ${!isProModel ? 'text-blue-600' : 'text-gray-500'}`}>
            Free
          </span>

          <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${isProModel ? 'bg-blue-600' : 'bg-gray-300'
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isProModel ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </button>

          <span className={`text-sm font-medium transition-colors ${isProModel ? 'text-blue-600' : 'text-gray-500'}`}>
            Pro
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelToggle;