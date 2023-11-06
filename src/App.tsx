import { Container } from "react-bootstrap";
import { ClientProvider } from "./context/client.context";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RegisterProvider } from "./context/register.context";
import { LoginProvider } from "./context/login.context";
import { NotificationProvider } from "./context/notification.context";
import { FilterProvider } from "./context/filter.context";
import { UpdateProvider } from "./context/update.context";

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <ClientProvider>
          <UpdateProvider>
            <RegisterProvider>
              <LoginProvider>
                <FilterProvider>
                  <BrowserRouter>
                    <Container className="h-[98vh]">
                      <AppRouter />
                    </Container>
                  </BrowserRouter>
                </FilterProvider>
              </LoginProvider>
            </RegisterProvider>
          </UpdateProvider>
        </ClientProvider>
      </NotificationProvider>
    </Provider>
  );
}

export default App;
