import React, {createContext, useContext, useState, useEffect} from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status when component mounts
    useEffect(() => {
        checkAuth();
    }, []);

    const setAuthenticated = (value) => setIsAuthenticated(value);

    // const token = Cookies.get("authToken");
    const tokens = localStorage.getItem('token');
    const checkAuth = () => {
        const token = Cookies.get("authToken");
        if (token) {
            console.log("Token exists. Setting authenticated to true.");
            setIsAuthenticated(true);
        } else {
            console.log("Token does not exist. Setting authenticated to false.");
            setIsAuthenticated(false);
        }
    };

    const login = (token) => {
        Cookies.set("authToken", token, { expires: 7 }); 
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove("authToken");
        // setAuthenticated(false);
        setIsAuthenticated(false);
      };

      return (
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated, checkAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
}