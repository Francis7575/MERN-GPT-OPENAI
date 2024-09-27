import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
<<<<<<< HEAD
=======
import { Box } from '@mui/material';
>>>>>>> d738dd7d0b2d77d3037aeb7e48b76406f4db92bd
import LogoImg from "/openai.png"

const Logo = () => {
  return (
<<<<<<< HEAD
      <Link to={"/"}
        style={{ display: "flex", alignItems: "center", gap: "15px", marginRight: 'auto' }}>
=======
    <Box
      sx={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
>>>>>>> d738dd7d0b2d77d3037aeb7e48b76406f4db92bd
        <img
          src={LogoImg}
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
<<<<<<< HEAD
        <Typography
          sx={{
            display: { md: "block", sm: "none" },
            mr: "auto",
            fontWeight: "800",
            textShadow: "2px 2px 20px #000",
          }}
        >
          <Typography component="span" sx={{ fontSize: "20px" }}>
            MERN
          </Typography>
          <Typography component="span">-GPT</Typography>
        </Typography>
      </Link>
=======
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <Typography component="span" sx={{ fontSize: "20px" }}>
          MERN
        </Typography>
        <Typography component="span">-GPT</Typography>
      </Typography>
    </Box>
>>>>>>> d738dd7d0b2d77d3037aeb7e48b76406f4db92bd
  );
};

export default Logo;