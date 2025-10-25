import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { socketUrl } from "../../apiConfig";
import axios from 'axios';
import { useAuth } from './authContext';


const UserPresenceContext = createContext();

// Custom hook
export const useUserPresence = () => {
    const context = useContext(UserPresenceContext);
    if (!context) {
        throw new Error('useUserPresence must be used within a UserPresenceProvider');
    }
    return context;
};


export const UserPresenceProvider = ({ children }) => {
    const [ws, setWs] = useState(null);
    const [allUsers, setAllUsers] = useState({});
    const [onlinePeople, setOnlinePeople] = useState({});
    const [offlinePeople, setOfflinePeople] = useState({});
    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated", isAuthenticated);

    // Fetch all users once on mount
    useEffect(() => {
        const fetchUsers = async () => {
            // const res = await axios.get("http://192.168.100.201:5000/api/user/people");
            const res = await axios.get("/api/user/people");
            const usersMap = res.data.reduce((acc, user) => {
                acc[user._id] = user;
                return acc;
            }, {});
            setAllUsers(usersMap);
        };
        if (isAuthenticated) {
        fetchUsers();
        }
    }, [isAuthenticated]);

    // const connectToWebSocket = () => {
    //     const ws = new WebSocket(socketUrl);
    //     ws.addEventListener("message", handlePresenceUpdate);
    //     setWs(ws);
    // }

    // useEffect(() => {
    //     connectToWebSocket();
    //     ws?.addEventListener("close", () => {
    //         connectToWebSocket();
    //     });
    // }, [ws]);

    const handlePresenceUpdate = useCallback((event) => {
        const data = JSON.parse(event.data);
        if (data.type === "online") {
            setOnlinePeople(prev => {
                const updated = { ...prev };
                data.online.forEach(({ userId }) => {
                    updated[userId] = true;
                });
                return updated;
            });

            setOfflinePeople(prev => {
                const updated = { ...prev };
                data.online.forEach(({ userId }) => {
                    delete updated[userId];
                });
                return updated;
            });
        }
    }, []);

    const connectToWebSocket = useCallback(() => {

        // if (!isAuthenticated) {
        //     console.log('User not authenticated, skipping WebSocket connection');
        //     return;
        // }

        const newWs = new WebSocket(socketUrl);

        newWs.addEventListener("message", handlePresenceUpdate);
        newWs.addEventListener("close", () => {
            // Reconnect after a delay
            setTimeout(connectToWebSocket, 1000);
        });

        setWs(newWs);
    }, [handlePresenceUpdate]);

    useEffect(() => {
        if (isAuthenticated) {
            connectToWebSocket();
        } else {
            // Disconnect and cleanup when not authenticated
            if (ws) {
                ws.close(1000, 'User not authenticated');
                setWs(null);
                setOnlinePeople({});
                setOfflinePeople({});
                // setReconnectAttempts(0);
            }
        }

        // Cleanup on unmount
        return () => {
            ws?.close();
        };
    }, [isAuthenticated]);

    // Function to update online users


    return (
        <UserPresenceContext.Provider value={{ allUsers, onlinePeople, offlinePeople }}>
            {children}
        </UserPresenceContext.Provider>
    );
}