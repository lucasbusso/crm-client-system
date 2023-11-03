import { CreateForm } from "../components";
import { ClientsList } from "../components";

export const DashboardPage: React.FC<{}> = () => {
  return (
    <div className="w-full md:flex gap-[64px] md:h-[100%-80px] overflow-y-hidden">
      <CreateForm />
      <ClientsList />
    </div>
  );
};
