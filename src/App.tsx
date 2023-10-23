import { Container } from "react-bootstrap";
import { ClientProvider } from "./context/client.context";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RegisterProvider } from "./context/register.context";
import { LoginProvider } from "./context/login.context";

function App() {
  return (
    <Provider store={store}>
      <ClientProvider>
        <RegisterProvider>
          <LoginProvider>
            <BrowserRouter>
              <Container>
                <AppRouter />
              </Container>
            </BrowserRouter>
          </LoginProvider>
        </RegisterProvider>
      </ClientProvider>
    </Provider>
  );
}

export default App;
