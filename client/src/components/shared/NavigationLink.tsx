import { Link } from "react-router-dom";

type NavLinkProps = {
  to?: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = ({to, bg, text, textColor, onClick}: NavLinkProps) => {
  return (
    <Link
      onClick={onClick}
      className="nav-link"
      to={to!}
      style={{ background: bg, color: textColor }}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;