import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    timeout: 30000, //30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to log requests (for debugging)
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.code === 'ECONNABORTED'){
            error.message = 'Request timed out. Please try again.';
        }else if(error.response){
            switch (error.response.status){
                case 400:
                    error.message = 'Invalid request. Please check your input.';
                    break;
                case 500:
                    error.message = 'Server error. Please try again later.';
                    break;
                case 503:
                    error.message = 'Service unavailable. Please try again later.';
                    break;
                default:
                    error.message = 'An unexpected error occurred.';
            }
        }else if(error.request){
            error.message = 'Unable to connect to server. Please check your internet connection.';
        }

        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const symptomAnalysisAPI = {
    analyzeFree: async (symptoms) => {
        const response = await api.post('/free', { message: symptoms });
        return response.data;
    },
    analyzePro: async (symptoms) => {
        const response = await api.post('/pro', { message : symptoms });
        return response.data;
    },
};

export const historyAPI = {
    getHistory: async () => {
        const response = await api.get('/history');
        return response.data;
    },
    deleteHistory: async () => {
        const response = await api.delete('/history');
        return response.data;
    },
};

export default api;