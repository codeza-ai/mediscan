const Alert = ({ type = 'info', title, message, onClose }) => {
    const alertStyles = {
        error: {
            container: 'bg-red-50 border-red-200 text-red-800',
            icon: 'text-red-500',
            iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        },
        success: {
            container: 'bg-green-50 border-green-200 text-green-800',
            icon: 'text-green-500',
            iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        warning: {
            container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            icon: 'text-yellow-500',
            iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        },
        info: {
            container: 'bg-blue-50 border-blue-200 text-blue-800',
            icon: 'text-blue-500',
            iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        }
    };

    const currentStyle = alertStyles[type];

    return (
        <div className={`p-4 border rounded-lg ${currentStyle.container}`}>
            <div className="flex items-start">
                <svg
                    className={`w-5 h-5 ${currentStyle.icon} mt-0.5 mr-2 flex-shrink-0`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={currentStyle.iconPath}
                    />
                </svg>
                <div className="flex-1">
                    {title && <h4 className="font-medium text-sm mb-1">{title}</h4>}
                    <p className="text-sm">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alert;