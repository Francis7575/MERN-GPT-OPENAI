import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LogoImg from "/openai.png"

const Logo = () => {
  return (
      <Link to={"/"}
        style={{ display: "flex", alignItems: "center", gap: "15px", marginRight: 'auto' }}>
        <img
          src={LogoImg}
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
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
  );
};

export default Logo;