import { Container } from "react-bootstrap";
import { ClientProvider } from "./context/client.context";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RegisterProvider } from "./context/register.context";
import { LoginProvider } from "./context/login.context";
import { NotificationProvider } from "./context/notification.context";

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <ClientProvider>
          <RegisterProvider>
            <LoginProvider>
              <BrowserRouter>
                <Container className="h-[100vh]">
                  <AppRouter />
                </Container>
              </BrowserRouter>
            </LoginProvider>
          </RegisterProvider>
        </ClientProvider>
      </NotificationProvider>
    </Provider>
  );
}

export default App;
