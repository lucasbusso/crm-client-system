import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="bg-indigo-500 h-[64px]">
        <Navbar.Brand
          href="#"
          className="font-bold text-white text-center text-3xl w-full flex justify-between"
        >
          <h1 onClick={() => navigate("/")}>✦ Client Manager ✦</h1>
          <Button variant="outline-light" onClick={() => navigate("login")}>
            Login
          </Button>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
