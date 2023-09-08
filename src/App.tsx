import { Container } from "react-bootstrap";
import { Header, ClientsList, Form } from "./components";
import { ClientProvider } from "./context/client.context";

function App() {
  return (
    <ClientProvider>
      <Container>
        <Header />
        <div className="w-full md:flex gap-[64px]">
          <Form />
          <ClientsList />
        </div>
      </Container>
    </ClientProvider>
  );
}

export default App;
