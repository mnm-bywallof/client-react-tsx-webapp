import { Button, Drawer, Link } from "@mui/material";
import { Nav } from "react-bootstrap";
import { profileManagement } from "../context/ProfileStateManagement";
import { useState } from "react";
import { BigBoldLetterStyle } from "..";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MenuIcon from "@mui/icons-material/Menu";

const _SideNavbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(
    window.innerHeight > window.innerWidth ? window.innerWidth : 600
  );

  const navigator = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);
  const [showOffcanvas, setShowOffcanvas] = useState(false); // Mobile sidebar visibility
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  const SidebarNavLinks = ({ onClick }: { onClick?: () => void }) => (
    <div style={{ padding: "50px" }}>
      <Nav.Link
        as={Link as any}
        to="/"
        className="text-white d-flex align-items-center"
        onClick={() => {
          navigator("/");
          toggleSidebar();
        }}
      >
        <h1 style={BigBoldLetterStyle}>Home</h1>
      </Nav.Link>
      {
        /* <Nav.Link
        as={Link as any}
        to="/profile"
        className="text-white d-flex align-items-center"
        onClick={() => {
          navigator("/profile");
          toggleSidebar();
        }}
      >
        <h1 style={BigBoldLetterStyle}>Profile</h1>
      </Nav.Link>
       */
        <Nav.Link
          as={Link as any}
          to="/wallet"
          className="text-white d-flex align-items-center"
          onClick={() => {
            navigator("/wallet");
            toggleSidebar();
          }}
        >
          <h1 style={BigBoldLetterStyle}>Wallet</h1>
        </Nav.Link>
      }
      {!profileManagement.user ? (
        <Nav.Link
          as={Link as any}
          to="/signup"
          className="text-white d-flex align-items-center"
          onClick={() => {
            navigator("/profile");
            toggleSidebar();
          }}
        >
          <h1 style={BigBoldLetterStyle}>Sign Up</h1>
        </Nav.Link>
      ) : (
        <Nav.Link
          onClick={() => {
            profileManagement.logout();
            onClick?.();
          }}
          className="text-white d-flex align-items-center"
        >
          <h1 style={BigBoldLetterStyle}>Logout</h1>
        </Nav.Link>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
      <Button onClick={() => toggleSidebar()} style={{ width: "20%" }}>
        <MenuIcon />
      </Button>
      <Drawer
        open={collapsed}
        onClose={() => toggleSidebar()}
        style={{ width: width, padding: "50px" }}
      >
        <SidebarNavLinks />
      </Drawer>
    </div>
  );
};

const SideNavbar = observer(_SideNavbar);

export { SideNavbar };
