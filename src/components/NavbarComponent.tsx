import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useCookies } from "react-cookie";
import { NavDropdown } from "react-bootstrap";
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
          onClick={() => navigate("/")}
        >
          ✦ Client Manager ✦
        </h1>
        {isAuth ? (
          <NavDropdown title={`Hi ${userData?.name}`} className="text-white">
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <div
            className="font-semibold text-white  cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
