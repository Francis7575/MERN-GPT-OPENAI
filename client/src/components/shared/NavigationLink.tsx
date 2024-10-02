import { Link } from "react-router-dom";

type NavLinkProps = {
  to?: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = ({ to, bg, text, textColor, onClick }: NavLinkProps) => {
  const LoggedInOptions =
    text === "Go To Chat" || text === "logout"
      ? { padding: "8px 15px" } // Specific styles for both cases
      : {};

  const secondNavLink = text === "logout" ? { marginRight: "0" } : {}

  return (
    <Link
      onClick={onClick}
      className="nav-link"
      to={to!}
      style={{ background: bg, color: textColor, ...LoggedInOptions, ...secondNavLink, }}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;