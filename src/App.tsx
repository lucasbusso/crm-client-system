import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRouter } from "./Router";
import { store } from "./redux/store";
import {
  ClientProvider,
  RegisterProvider,
  LoginProvider,
  NotificationProvider,
  FilterProvider,
  UpdateProvider,
} from "./context/";

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
                    <Container>
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
