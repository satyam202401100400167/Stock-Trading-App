import { createContext, useState, useEffect } from 'react';

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <GeneralContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </GeneralContext.Provider>
    );
};
