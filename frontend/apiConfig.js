//Simple configuration with hardcoded URLs
let baseUrl;
let socketUrl;

if (import.meta.env.PROD || import.meta.env.VITE_NODE_ENV === "production") {
  // Production URLs for Render deployment
  baseUrl = "https://connectrtc-zevy.onrender.com";
  socketUrl = "wss://connectrtc-zevy.onrender.com";
} else {
  // Development URLs
  baseUrl = "http://localhost:5000";
  socketUrl = "ws://localhost:5000";
  
  // Uncomment if you need to test from another device on your network
  // baseUrl = "http://192.168.100.201:5000";
  // socketUrl = "ws://192.168.100.201:5000";
}

console.log("Environment:", import.meta.env.MODE);
console.log("baseUrl:", baseUrl);
console.log("socketUrl:", socketUrl);

export { baseUrl, socketUrl };