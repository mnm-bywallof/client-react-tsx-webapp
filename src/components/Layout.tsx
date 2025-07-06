import { useRef } from "react";
import { Navbar, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { profileManagement } from "../context/ProfileStateManagement";
// import { User } from "firebase/auth";
import { observer } from "mobx-react";
import LogoWhite from "../assests/ONLY RYAN logo b&w.png";
import { SideNavbar } from "./sidenav";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// Layout component wraps all pages and includes sidebar/offcanvas nav
const _Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [user] = useState<User | undefined>(profileManagement.user);
  // const [width, setWidth] = useState(
  //   window.innerHeight > window.innerWidth ? window.innerWidth : 600
  // );
  const navRef = useRef(null);
  // const navigate = useNavigate();

  // const [collapsed, setCollapsed] = useState(true); // Large screen sidebar collapse

  return (
    <div style={{ display: "flex", flexFlow: "column" }}>
      {/* Sidebar for large screens */}
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        sticky="top"
        ref={navRef}
      >
        <Container>
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <SideNavbar />
          </div>
          <Navbar.Brand href="#">
            <img src={LogoWhite} height={40} alt="OnlyRyan by WallOf logo" />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {/* <Button
                onClick={() => navigate("/wallet")}
                style={{ width: "auto" }}
              >
                <AttachMoneyIcon />
              </Button> */}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div className="p-3">{children}</div>
      </Container>
    </div>
  );
};

const Layout = observer(_Layout);

export default Layout;
