import { KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/authContext";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ChatItem from "../components/chat/ChatItem"
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";

type Message = {
  role: "user" | "assistant";
  content: string;
};
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Chat = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleGenerateChats = async (message: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/chats/new`, {
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
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await handleGenerateChats(content)
    setChatMessages([...chatData.chats])
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getUserChats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/chats/all-chats`, {
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
    if (auth?.isLoggedIn && auth.user) {
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
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth?.user]);

  const handleDeleteChats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/chats/delete`, {
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
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.3,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
            py: 4
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
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
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT-4o
        </Typography>
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
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
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
              fontSize: "20px",
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