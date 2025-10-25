import { Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import AvatarCl from './AvatarCl';


const UserDetailsDialog = ({ user, open, onClose, selectedUser }) => {
    // const [openDialog, setOpenDialog] = useState(false);
    // const handleCloseDialog = () => {
    //     setOpenDialog(false);
    // };
    // Handler for opening dialog
    // const handleAvatarClick = () => {
    //     setOpenDialog(true);
    // };
    console.log("user",user)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const placeholderInitial = selectedUser.username ? selectedUser.username[0].toUpperCase() : "?";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            // sx={{
            //     className: "rounded-lg shadow-xl max-w-md w-full",
            //     '& .MuiDialog-paper': {
            //         backgroundColor: "#202329",
            //     }
            // }}
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: "#202329",
                    maxWidth: '400px', // Set specific max-width
                    width: '95%', // Take 95% of available width up to maxWidth
                    margin: '16px', // Add some margin
                    borderRadius: '12px', // Optional: if you want rounded corners
                }
            }}
        >
            <DialogTitle className="bg-gray-500 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent">User Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-900 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
            </DialogTitle>
            <DialogContent className="p-6">
                <div className="flex flex-col items-center gap-6 pt-5">
                    <div className="relative">
                        {user?.avatarLink ? (
                            <img
                                src={user?.avatarLink}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />

                        ) : (
                            // <div className="w-12 h-12 flex rounded-full justify-center items-center object-cover border-4 text-white font-semibold font-size uppercase">
                            //    <div className="w-[100px] h-[100px] flex rounded-full justify-center items-center">
                            <AvatarCl
                                // username={user.firstName}
                                username={selectedUser.username}
                                userId={selectedUser.userId}
                                isOnline={true}
                                avatarLink={user?.avatarLink}
                            />
                            //    </div>
                            // {placeholderInitial}
                            // </div>
                        )}
                    </div>

                    <div className="text-center space-y-3">
                        <h2 className="text-white text-2xl font-bold">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-white">{user?.email}</p>

                        <div className="pb-2 border-b">
                            {/* <h3 className="text-lg font-semibold mb-2">Bio</h3> */}
                            <p className="text-white">
                                {user?.bio || "No bio available"}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UserDetailsDialog
