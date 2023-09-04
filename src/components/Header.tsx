import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="bg-indigo-500 h-[64px]">
        <Navbar.Brand
          href="#"
          className="font-bold text-white text-center text-3xl w-full"
        >
          Client Manager
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
