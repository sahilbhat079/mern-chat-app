import { createContext, useContext, useState } from "react";

// Create the Auth context
export const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuthHook = () => {
    return useContext(AuthContext);
}

// Auth context provider component
export const AuthContextProvider = ({ children }) => {
    // const [Authuser, setAuthuser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    const [Authuser, setAuthuser] = useState(() => {
        const user = localStorage.getItem("chat-user");
        return user ? JSON.parse(user) : null;
    });

    return <AuthContext.Provider value={{ Authuser, setAuthuser }}>
            {children}
        </AuthContext.Provider>;
};
