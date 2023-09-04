import { Container } from "react-bootstrap";
import { Header, ClientsList, Form } from "./components";

function App() {
  return (
    <>
      <Container>
        <Header />
        <div className="w-full md:flex gap-[64px]">
          <Form />
          <ClientsList />
        </div>
      </Container>
    </>
  );
}

export default App;
