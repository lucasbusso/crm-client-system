import { Form } from "../components";
import { ClientsList } from "../components";

export const HomePage: React.FC<{}> = () => {
  return (
    <div className="w-full md:flex gap-[64px]">
      <Form />
      <ClientsList />
    </div>
  );
};
