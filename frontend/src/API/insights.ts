// Base_API => "http://localhost:3000/api/v1"
import api from "./axios";

// ===== API CALLS =====
export const getInsights = () => api.get("/base/insights");
