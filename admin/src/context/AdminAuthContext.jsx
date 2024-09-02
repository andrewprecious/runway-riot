import { createContext, useContext } from "react";

// create the context for authentication
const AdminAuthContext = createContext();

// Custom hook to use the AdminAuthContext
export const useAdminAuth = () => useContext(AdminAuthContext);

export default AdminAuthContext;

// Creating an AuthContext and AuthProvider for an admin section in your React application involves setting up context to manage authentication state, handling login and logout operations, and making sure that only authorized users (e.g., admins) can access certain parts of the application. Here’s a step-by-step guide to help you get started:
