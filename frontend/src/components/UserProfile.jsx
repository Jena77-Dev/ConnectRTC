import React from "react";
import { useProfile } from "../context/profileContext";
import Nav from "./Chat/Nav";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  Container,
  Stack,
} from "@mui/material";
import {
  Mail as EmailIcon,
  User as PersonIcon,
  Calendar as CalendarIcon,
  FileText as BioIcon,
  Clock as TimeIcon,
} from "lucide-react";

const UserProfile = () => {
  const { userDetails } = useProfile();

  const InfoItem = ({ icon, label, value }) => (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        gap: 4,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {React.cloneElement(icon, { size: 24, className: "text-blue-500" })}
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "gray", fontSize: "0.9rem" }}
        >
          {label}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "white", fontSize: "1.1rem", mt: 0.5 }}
        >
          {value || "Not provided"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        // minHeight: "100vh",
        height: "100vh",
        // bgcolor: "#121212",
        bgcolor: "#202329",
        // overflow: "hidden",
      }}
    >
      <Nav />
      {/* <Container
        // sx={{ width: "91%", py: 8 }}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          p: 0,
        }}
      > */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            py: 8,
            px: 3,
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
              mx: "auto",
            }}
          >
            {/* Profile Header with Avatar */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 6,
              }}
            >
              <Avatar
                src={userDetails?.avatarLink}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: "4px solid",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                {userDetails?.firstName?.[0]}
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  color: "#ffffff",
                  mb: 1,
                }}
              >
                {`${userDetails?.firstName || ""}`}
              </Typography>
            </Box>

            {/* User Information List */}
            <Box sx={{ mt: 2 }}>
              <InfoItem
                icon={<PersonIcon />}
                label="Full Name"
                value={`${userDetails?.firstName || ""} ${
                  userDetails?.lastName || ""
                }`}
              />

              <InfoItem
                icon={<EmailIcon />}
                label="Email Address"
                value={userDetails?.email}
              />

              {/* Added Bio Information */}
              <InfoItem
                icon={<BioIcon />}
                label="Bio"
                // value={userDetails?.bio || "No bio provided yet"}
                value={userDetails?.bio || "---- ----"}
              />

              <InfoItem
                icon={<CalendarIcon />}
                label="Account Created"
                value={
                  userDetails?.createdAt
                    ? new Date(userDetails.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : null
                }
              />
            </Box>
          </Box>
        </Box>
      {/* </Container> */}
    </Box>
  );
};

export default UserProfile;
