const ModelInfo = ({ isProModel }) => {
  const freeFeatures = [
    "Basic symptom analysis",
    "General health recommendations", 
    "Standard medical disclaimer",
    "Fast response time"
  ];

  const proFeatures = [
    "Advanced AI symptom analysis",
    "Detailed condition breakdown",
    "Personalized recommendations",
    "Priority processing",
    "Extended medical database",
    "More accurate assessments"
  ];

  const currentFeatures = isProModel ? proFeatures : freeFeatures;
  const modelName = isProModel ? "Pro Model" : "Free Model";
  const iconColor = isProModel ? "text-yellow-500" : "text-blue-500";
  const bgColor = isProModel ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200";

  return (
    <div className={`p-4 rounded-lg border ${bgColor}`}>
      <div className="flex items-center mb-3">
        <svg className={`w-5 h-5 ${iconColor} mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-sm font-semibold text-gray-900">{modelName} Features</h3>
        {isProModel && (
          <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Premium
          </span>
        )}
      </div>
      
      <ul className="space-y-1">
        {currentFeatures.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <svg className={`w-3 h-3 ${iconColor} mt-1 mr-2 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModelInfo;