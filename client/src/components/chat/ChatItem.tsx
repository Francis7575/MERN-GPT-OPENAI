import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../context/authContext';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useRef } from 'react';

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```"); // split a string (message) into an array of substrings
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
  loading,
  isNewMessage
}: {
  content: string;
  role: "user" | "assistant";
  loading?: boolean;
  isNewMessage?: boolean;
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  console.log('Loading', loading);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [content, loading]);

  return (
    <>
      {role === 'user' && (
        <Box
          sx={{
            display: "flex",
            p: 2,
            bgcolor: "#004d56",
            gap: 2,
            borderRadius: 2,
            alignItems: "center",
          }}
        >
          <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
            {auth?.user?.fullName[0].toUpperCase()}
            {auth?.user?.fullName.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <Box>
            {!messageBlocks ? (
              <Typography>{content}</Typography>
            ) : (
              messageBlocks.map((block, idx) =>
                isCodeBlock(block) ? (
                  <SyntaxHighlighter
                    key={`${block}-${idx}`}
                    style={coldarkDark}
                    language="javascript"
                    wrapLongLines={true}
                  >
                    {block}
                  </SyntaxHighlighter>
                ) : (
                  <Typography key={`${block}-${idx}`}>
                    {block}
                  </Typography>
                )
              )
            )}
          </Box>
        </Box>
      )}

      {loading && isNewMessage ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: '16px' }}>
          <Avatar sx={{ ml: "0" }}>
            <img src="openai.png" alt="openai" width={"30px"} />
          </Avatar>
          <CircularProgress size={24} sx={{ color: "white", marginLeft: "10px" }} />
        </Box>
      ) : (
        <>
          {role === 'assistant' && (
            <Box
              sx={{
                display: "flex",
                p: 2,
                bgcolor: "#004d5612",
                gap: 2,
                borderRadius: 2,
                my: 1,
                width: "100%",
                maxWidth: "700px"
              }}
            >
              <Avatar sx={{ ml: "0" }}>
                <img src="openai.png" alt="openai" width={"30px"} />
              </Avatar>
              <Box>
                {!messageBlocks ? (
                  <Typography sx={{ maxWidth: "700px" }}>
                    {content}
                  </Typography>
                ) : (
                  messageBlocks.map((block, idx) =>
                    isCodeBlock(block) ? (
                      <SyntaxHighlighter
                        key={`${block}-${idx}`}
                        style={coldarkDark}
                        language="javascript"
                        wrapLongLines={true}
                      >
                        {block}
                      </SyntaxHighlighter>
                    ) : (
                      <Typography key={`${block}-${idx}`}>
                        {block}
                      </Typography>
                    )
                  )
                )}
              </Box>
            </Box>
          )}
        </>
      )}

      <div ref={endOfMessagesRef} />
    </>
  );
};

export default ChatItem;
