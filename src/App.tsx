import { Container } from "react-bootstrap";
import { ClientProvider } from "./context/client.context";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";

function App() {
  return (
    <ClientProvider>
      <BrowserRouter>
        <Container>
          <AppRouter />
        </Container>
      </BrowserRouter>
    </ClientProvider>
  );
}

export default App;
