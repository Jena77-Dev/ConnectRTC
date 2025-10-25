import React, { useState } from 'react'
import { MessageSquare, Users, Clock, TrendingUp, Home, Contact } from "lucide-react";
import { Button, ButtonBase, Card, CardContent, CardHeader, } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { RecentChats } from './Chat/RecentChats';
import { ChatStats } from './Chat/ChatStats';



const Dashboard = () => {

    const [timeRange, setTimeRange] = useState("7d");
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated", isAuthenticated);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900">
            {/* <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div> */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-xl p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ConnectRTC
                        </h1>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="unstyled"
                                size="sm"
                                className="flex items-center gap-2 text-gray-50  hover:text-purple-600"
                            >
                                <Home className="h-4 w-4 " />
                                Home
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
                            >
                                <Contact className="h-4 w-4" />
                                Contact
                            </Button>
                        </div>
                    </div>
                    {isAuthenticated &&
                        <Button
                            onClick={() => navigate('/chathome')}
                            className="bg-gradient-to-r from-purple-600 text-white to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            style={{ color: '#ffffff' }}
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat Home
                        </Button>}

                    {!isAuthenticated && <Button
                        onClick={() => navigate('/register')}
                        className="bg-gradient-to-r from-purple-600 text-white to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        style={{ color: '#ffffff' }}
                    >
                        Register
                    </Button>}
                </div>
            </nav>

            <div className="p-8 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Instant Connections, Effortless Conversations
                        </h1>
                        <p className="text-xl text-gray-600">
                            Connect Seamlessly, Chat Effortlessly
                        </p>

                        {!isAuthenticated && <Button
                            onClick={() => navigate("/login")}
                            className="bg-gradient-to-r from-purple-600 text-white to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            style={{ color: '#ffffff' }}
                        >
                            Login
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </Button>}
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex items-center justify-center gap-2 mt-2 mb-1">
                        {["24h", "7d", "30d"].map((range) => (
                            <Button
                                key={range}
                                variant={timeRange === range ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTimeRange(range)}
                                className="bg-white/80 backdrop-blur-sm"
                                sx={{
                                    color: timeRange === range ? '#ffffff' : '#000000',
                                    borderColor: timeRange === range ? '#ffffff' : '#cccccc',
                                    // borderColor: '#ffffff' ,
                                    '&:hover': {
                                        backgroundColor: timeRange === range ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                                        borderColor: timeRange === range ? '#ffffff' : '#cccccc',
                                    },
                                }}
                            >
                                {range}
                            </Button>
                        ))}
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                            <div className="flex items-center justify-center gap-2 mt-2 mb-1">
                                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Total Messages</Typography>
                                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                            </div>
                            
                            <CardContent className="text-center">
                                <div className="text-2xl font-bold">2,847</div>
                                <p className="text-xs text-muted-foreground">
                                    +12% from last week
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Typography className="text-sm font-medium text-black">Active Chats</Typography>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground">
                                    +3 new this week
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Typography className="text-sm font-medium text-black">Avg Response Time</Typography>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2.4m</div>
                                <p className="text-xs text-muted-foreground">
                                    -30s from last week
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Typography className="text-sm font-medium text-black">Engagement Rate</Typography>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">87%</div>
                                <p className="text-xs text-muted-foreground">
                                    +5% from last week
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Activity Chart */}
                        {/* <div className="lg:col-span-2">
                            <ActivityChart timeRange={timeRange} />
                        </div> */}

                        {/* Chat Stats */}
                        {/* <div>
                            <ChatStats/>
                        </div> */}

                        {/* Recent Chats */}
                        <div className="lg:col-span-3">
                            <RecentChats />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard

