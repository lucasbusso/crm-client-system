import { Container } from "react-bootstrap";
import { ClientProvider } from "./context/client.context";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ClientProvider>
        <BrowserRouter>
          <Container>
            <AppRouter />
          </Container>
        </BrowserRouter>
      </ClientProvider>
    </Provider>
  );
}

export default App;
