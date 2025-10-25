// CreateGroup.js
import React, { useState, useEffect } from 'react';
import { useUserPresence } from "../../context/UserPresenceContext";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox,
    List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip, Divider, Typography,
} from "@mui/material";
import { SquarePlus, Users } from "lucide-react";
import axios from 'axios';


// Mock user data
const mockUsers = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "3", name: "Carol Davis", email: "carol@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "4", name: "David Wilson", email: "david@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "5", name: "Emma Brown", email: "emma@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "6", name: "Frank Miller", email: "frank@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "7", name: "Grace Lee", email: "grace@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "8", name: "Henry Taylor", email: "henry@example.com", avatar: "/placeholder.svg?height=32&width=32" },
]

function CreateGroup({ userDetails, onGroupCreated }) {
    const { onlinePeople, offlinePeople, allUsers } = useUserPresence();
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groups, setGroups] = useState([]);

    const fetchUsers = async () => {
        try {
            // const res = await axios.get("http://192.168.100.201:5000/api/user/people");
            const res = await axios.get("/api/user/people");
            const usersMap = res.data.reduce((acc, user) => {
                acc[user._id] = user;
                return acc;
            }, {});
            // setUsers(usersMap);
            setUsers(res.data.filter((u) => u._id !== userDetails._id));
            console.log("Users from create group section:", users, res);

        } catch (error) {
            setUsers([]);
            console.error('Error:', error.message);

        }
    };

    useEffect(() => {
        console.log("user detalis:", userDetails);
        console.log("users :", users);

        console.log("all user in create group dailog", allUsers);

        if (isOpen) {
            fetchUsers();
            // setUsers(allUsers.find( (u) => u._id !== userDetails?._id ));
            // setUsers( Object.values(allUsers).filter((u) => u._id !== userDetails?._id));
        }
    }, [isOpen, userDetails]);

    const handleUserToggle = (id) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map((user) => user._id));
        }
    };


    const createGroupApi = async ({ name, members, createdBy }) => {
        // const response = await axios.post("http://192.168.100.201:5000/api/groups/create", { name, members, createdBy, });
         const response = await axios.post("/api/groups/create", { name, members, createdBy, });
        return response.data;
    };


    const handleCreateGroup = async() => {
        if (groupName.trim() && selectedUsers.length > 0) {
            // Always include the creator's ID
            const members = Array.from(new Set([userDetails._id, ...selectedUsers]));
            // Handle group creation logic here
            console.log("Creating group:", { groupName, members });
            const newGroup = {
                _id: `local-${Date.now()}`, // Temporary ID
                name: groupName,
                members,
                isGroup: true,
                avatarLink: null, // or a default group avatar
            };
            setGroups(prev => [newGroup, ...prev]);
            // if (onGroupCreated) onGroupCreated({ groupName, selectedUsers });
            try {
                // Use the API function
                const createdGroup = await createGroupApi({
                    name: groupName,
                    members,
                    createdBy: userDetails._id,
                });

                // Replace temp group with real group from backend
                // setGroups(prev =>
                //     prev.map(g => g._id === tempId ? createdGroup : g)
                // );
            } catch (error) {
                // Remove the temp group if API fails
                // setGroups(prev => prev.filter(g => g._id !== tempId));
                alert("Failed to create group: " + error.message);
            }

            // Reset form and close dialog
            setGroupName("");
            setSelectedUsers([]);
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        setGroupName("");
        setSelectedUsers([]);
        setIsOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<SquarePlus size={20} />}
                onClick={() => setIsOpen(true)}
                sx={{ mb: 2 }}
            >
                Create a group
            </Button>

            <Dialog
                open={isOpen}
                onClose={handleCancel}
                maxWidth="sm"
                fullWidth
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: "#202329",
                        color: "#fff",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        // backgroundColor: "#23272f",
                        backgroundColor: "#898F99",
                        color: "#fff",
                    }}
                >
                    <Users size={20} color="#fff" />
                    Create New Group
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        backgroundColor: "#202329",
                        color: "#fff",
                    }}
                >
                    <Typography variant="body2" sx={{ mb: 2, color: "#b0b0b0" }}>
                        Enter a group name and select users to add to the group.
                    </Typography>
                    <TextField
                        label="Enter group name"
                        fullWidth
                        margin="normal"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        variant="filled"
                        InputLabelProps={{
                            style: { color: "#b0b0b0" },
                        }}
                        InputProps={{
                            style: { color: "#fff", backgroundColor: "#23272f" },
                        }}
                    />
                    {selectedUsers.length > 0 && (
                        <div style={{ margin: "16px 0" }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ color: "#b0b0b0" }}>
                                Selected Users ({selectedUsers.length})
                            </Typography>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {users
                                    .filter((u) => selectedUsers.includes(u._id))
                                    .map((user) => (
                                        // <Chip
                                        //     key={user.id}
                                        //     label={user.name}
                                        //     onDelete={() => handleUserToggle(user.id)}
                                        //     avatar={
                                        //         <Avatar src={user.avatar || "/placeholder.svg"} />
                                        //     }
                                        //     sx={{
                                        //         fontSize: "0.9rem",
                                        //         backgroundColor: "#23272f",
                                        //         color: "#fff",
                                        //         "& .MuiChip-deleteIcon": { color: "#fff" },
                                        //     }}
                                        // />
                                        <Chip
                                            key={user._id}
                                            label={`${user.firstName}(${user.email})`}
                                            onDelete={() => handleUserToggle(user._id)}
                                            avatar={<Avatar src={user.avatarLink || "/placeholder.svg"} />}
                                            sx={{
                                                fontSize: "0.9rem",
                                                backgroundColor: "#23272f",
                                                color: "#fff",
                                                "& .MuiChip-deleteIcon": { color: "#fff" },
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                    <Divider sx={{ my: 2, borderColor: "#444" }} />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ color: "#b0b0b0" }}>
                            Select Users
                        </Typography>
                        <Button
                            size="small"
                            onClick={handleSelectAll}
                            variant="outlined"
                            sx={{
                                borderColor: "#444",
                                // color: "#b0b0b0",
                                // "&:hover": { borderColor: "#fff", color: "#fff" },
                                // backgroundColor: "#23272f",
                                color: "#fff",
                                backgroundColor: "#1295ED",
                            }}
                        >
                            {selectedUsers.length === users.length
                                ? "Deselect All"
                                : "Select All"}
                        </Button>
                    </div>
                    <List sx={{ maxHeight: 300, overflow: "auto", mt: 1 }}>
                        {users.map((user) => (
                            <ListItem
                                key={user._id}
                                button
                                onClick={() => handleUserToggle(user._id)}
                                selected={selectedUsers.includes(user._id)}
                                sx={{
                                    borderRadius: 2,
                                    mb: 0.5,
                                    bgcolor: selectedUsers.includes(user._id)
                                        ? "#23272f"
                                        : "transparent",
                                    color: "#fff",
                                    "&:hover": { bgcolor: "#23272f" },
                                }}
                            >
                                <Checkbox
                                    edge="start"
                                    checked={selectedUsers.includes(user._id)}
                                    tabIndex={-1}
                                    onChange={() => handleUserToggle(user._id)}
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{
                                        color: "#b0b0b0",
                                        "&.Mui-checked": { color: "#fff" },
                                    }}
                                />
                                <ListItemAvatar>
                                    <Avatar src={user.avatarLink || "/placeholder.svg"} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography noWrap fontWeight={500} sx={{ color: "#fff" }}>
                                            {user.firstName}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            noWrap
                                            variant="body2"
                                            sx={{ color: "#b0b0b0" }}
                                        >
                                            {user.email}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#23272f" }}>
                    <Button
                        onClick={handleCancel}
                        variant="outlined"
                        sx={{
                            // borderColor: "#444",
                            borderColor: "#1295ED",
                            // color: "#b0b0b0",
                            color: "#fff",
                            // "&:hover": { borderColor: "#fff", color: "#fff" },
                            backgroundColor: "#1295ED",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateGroup}
                        variant="contained"
                        disabled={!groupName.trim() || selectedUsers.length === 0}
                        sx={{
                            // backgroundColor: "#3b82f6",
                            backgroundColor: "#1295ED",
                            color: "#fff",
                            // "&:hover": { backgroundColor: "#2563eb" },
                            "&.Mui-disabled": {
                                backgroundColor: "#2a2d34", // or a muted blue like "#2a2d34"
                                color: "#fff",
                                opacity: 1, // keep text readable
                            },
                        }}
                    >
                        Create Group ({selectedUsers.length} users)
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export default CreateGroup;