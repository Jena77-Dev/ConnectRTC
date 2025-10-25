// let baseUrl;
// let socketUrl;

if (import.meta.env.VITE_NODE_ENV === "production") {
  // baseUrl = "your-deployed-URL";
  // socketUrl = "wss://your-deployed-url";
} else {
  // baseUrl = "http://localhost:4000";
  // baseUrl = "http://192.168.100.201:4000";
    // For local development, use WebSocket over HTTP
  // socketUrl = "ws://localhost:4000";
  // socketUrl = "ws://192.168.100.201:4000";
  // socketUrl = "ws://192.168.100.201:5000";
  
}

const getApiUrl = () => {
  // In production, use relative URLs
  if (import.meta.env.PROD) {
    return '';
  }
  
  // In development, check if we're on localhost or an IP
  const hostname = window.location.hostname;
  
  // If accessing via IP address (like 192.168.x.x)
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return `http://${hostname}:5000`;
  }
  
  // Default to localhost
  return 'http://localhost:5000';
};

const baseUrl = getApiUrl();

const getSocketUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL;
  }
  
  const base = getApiUrl();
  return base.replace(/^http/, 'ws');
};

// const baseUrl = import.meta.env.VITE_API_URL;
// const socketUrl = import.meta.env.VITE_SOCKET_URL;

const socketUrl = getSocketUrl();

console.log("baseUrl, socketUrl", baseUrl, socketUrl);

export { baseUrl, socketUrl };