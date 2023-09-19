import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useCookies } from "react-cookie";
import { Button, NavDropdown } from "react-bootstrap";
import { logout } from "../redux/slices/auth.slice";

const NavbarComponent = () => {
  const navigate: NavigateFunction = useNavigate();
  const { isAuth, userData } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [, , remove] = useCookies();

  function handleLogout() {
    dispatch(logout());
    remove("accessToken");
    navigate("/login");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="bg-indigo-500 h-[64px] w-full flex justify-between">
        <h1
          className="font-bold text-white text-center text-3xl cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          ✦ Client Manager ✦
        </h1>
        {isAuth && (
          <NavDropdown title={`Hi ${userData?.email}`} className="text-white">
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
