import { KeyboardEvent, useLayoutEffect, useRef, useState, useEffect } from "react";
import { Box, Avatar, Typography, Button, IconButton, CircularProgress } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/authContext";
import { IoMdSend } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import ChatItem from "../components/chat/ChatItem"
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";

type Message = {
  role: "user" | "assistant";
  content: string;
};
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isAssistantLoading, setisAssistantLoading] = useState<boolean>(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/users/auth-status`, {
          method: "GET",
          credentials: 'include'
        });

        const data = await response.json()
        if (data) {
          auth?.setUser({ email: data.email, fullName: data.fullName });
          auth?.setIsLoggedIn(true);
          toast.success("Already logged in!");
        }
      } catch (error) {
        console.error("CheckAuthStatus error:", error);
        throw error;
      }
    }
    checkAuthStatus();
  }, [])


  const handleGenerateChats = async (message: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/chats/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Cookies included in the request
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error("Unable to send chat");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error sending chat:", error);
      throw error;
    }
  }

  const handleSubmit = async () => {
    try {
      const content = inputRef.current?.value as string;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      setisAssistantLoading(true)
      const newMessage: Message = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const chatData = await handleGenerateChats(content)
      setChatMessages([...chatData.chats])
    } catch (e) {
      console.log('error submitting-')
    } finally {
      setisAssistantLoading(false)
    }

  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getUserChats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/chats/all-chats`, {
        method: "GET",
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Couldn't get all chats");
      }

      const data = await response.json()
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // fetchAllChats before the UI is render
  useLayoutEffect(() => {
    if (location.pathname === "/chat" && auth?.isLoggedIn) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats().then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Successfully loaded chats", { id: "loadchats" });
      }).catch((err) => {
        console.log(err);
        toast.error("Loading Failed", { id: "loadchats" });
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/chat");
    }
  }, [auth?.isLoggedIn]);

  const handleDeleteChats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/chats/delete`, {
        method: "DELETE",
        credentials: "include"
      })
      toast.loading("Deleting Chats", { id: "deletechats" });
      if (!response.ok) {
        throw new Error("Failed to delete chats");
      }

      const data = await response.json();
      console.log(data)
      setChatMessages([])
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.error(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
        pl: { md: "24px", lg: "0", xs: "0", sm: "0" }
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            py: 4,
          }}
        >
          {auth?.user?.fullName ? (
            <Avatar
              sx={{
                mx: "auto",
                mt: 2,
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
              }}
            >
              {auth?.user?.fullName[0].toUpperCase()}
              {auth?.user?.fullName.split(" ")[1][0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar>F</Avatar>
          )}
          <Box sx={{ px: 4, mt: 4 }}>
            <Typography sx={{ textAlign: 'center', fontFamily: "work sans", }}>
              You are talking to a ChatBOT
            </Typography>
            <Typography sx={{ textAlign: 'center', fontFamily: 'work sans', mt: 4, }}>
              You can ask some questions related to Knowledge, Business, Advices, Education and more.
            </Typography>
          </Box>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
            onClick={handleOpenModal}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { lg: 0.7, md: 0.68, xs: 1, sm: 1 },
          flexDirection: "column",
          pr: { lg: 0, md: 3, xs: 3 },
          pl: { md: 0, sm: 3, xs: 3 },
          mt: { md: 0, sm: 4, xs: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // Vertically center items
            justifyContent: "space-between", // Space items evenly
            width: "100%", // Full width to help with centering
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { md: "2.5rem", sm: "1.5rem", xs: "1.5rem" },
                color: "white",
                mb: 2,
                fontWeight: "600",
              }}
            >
              Model - GPT-4o
            </Typography>
          </Box>
          <Button onClick={handleOpenModal}
            sx={{
              display: { md: "none", sm: "block", xs: "block" },
              padding: 0,
              minWidth: 0,        // Remove default minimum width
              minHeight: 0,       // Remove default minimum height
              width: '30px',
              height: '30px',
            }}
          >
            <CiMenuKebab size="30px" />
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((message, index) => {
            const isNewMessage = index === chatMessages.length - 1;
            return (
              <ChatItem
                content={message.content}
                role={message.role}
                key={index}
                loading={isAssistantLoading}
                isNewMessage={isNewMessage}
              />
            )
          })}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "1.25rem",
            }}
            onKeyDown={handleKeyDown}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
      {isModalOpen && (
        <DeleteModal
          onDelete={handleDeleteChats}
          onCancel={handleCloseModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Box>
  );
};

export default Chat;