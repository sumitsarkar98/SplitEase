// Base_API => "http://localhost:3000/api/v1"
import api from "./axios";

// ===== API CALLS =====
export const getCategories = () => api.get("/base/allcategories");
export const getCategoryExpenses = () => api.get("/base/categoryexpenses");