import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../redux/slices/auth.slice";

const NavbarComponent = () => {
  const navigate: NavigateFunction = useNavigate();
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
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
          <Button
            className="bg-white hover:bg-slate-300 text-lg font-semibold uppercase text-indigo-500 hover:text-indigo-500 border-none rounded-md p-2 leading-none"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        ) : (
          <Link
            to="login"
            className="bg-white hover:bg-slate-300 text-lg font-semibold uppercase text-indigo-500 hover:text-indigo-500 border-none rounded-md p-2 leading-none"
          >
            Login
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
