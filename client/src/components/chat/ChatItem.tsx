import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../../context/authContext'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth()
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" }, maxWidth: "400px" }}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, idx) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter key={`${block}-${idx}`}
                style={coldarkDark}
                language="javascript"
                wrapLongLines={true}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={`${block}-${idx}`}
                sx={{ fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" }, maxWidth: "700px" }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
        alignItems: "center"
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.fullName[0].toUpperCase()}
        {auth?.user?.fullName.split(" ")[1][0].toUpperCase()}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" } }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, idx) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter key={`${block}-${idx}`}
                style={coldarkDark}
                language="javascript"
                wrapLongLines={true}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={`${block}-${idx}`}
                sx={{ fontSize: { md: "1.5rem", sm: "1rem", xs: "1rem" } }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  )
}

export default ChatItem