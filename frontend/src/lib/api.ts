import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Create axios instance
const api = axios.create({
   baseURL: `${API_URL}/api`,
   headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
   },
});

// API functions
export const strapiApi = {
   // Get global data (header, footer, etc.)
   async getGlobal() {
      try {
         const response = await api.get('/global?populate=*');
         return response.data;
      } catch (error) {
         console.error('Error fetching global data:', error);
         throw error;
      }
   },

   // Get landing page data
   async getLandingPage() {
      try {
         const response = await api.get('/landing-page?populate=*');
         return response.data;
      } catch (error) {
         console.error('Error fetching landing page:', error);
         throw error;
      }
   },

   // Generic function to fetch any content type
   async get(endpoint: string, params?: Record<string, unknown>) {
      try {
         const response = await api.get(endpoint, { params });
         return response.data;
      } catch (error) {
         console.error(`Error fetching ${endpoint}:`, error);
         throw error;
      }
   },
};

export default api;
