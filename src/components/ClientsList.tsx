import { FilterBy } from ".";
import { useClientContext } from "../context/client.context";
import Client from "./Client";

const ClientsList = () => {
  const { clients } = useClientContext();
  return (
    <div className="md:w-1/2 w-full">
      <div className="flex justify-between my-6">
        <h2 className="font-bold text-2xl text-white">
          Clients list{" "}
          <span className="font-medium text-sm">{`(${clients.length} results)`}</span>
        </h2>
        {clients && <FilterBy />}
      </div>
      <Client />
    </div>
  );
};

export default ClientsList;
