import Client from "./Client";

const ClientsList = () => {
  return (
    <div className="md:w-1/2 w-full md:h-screen md:overflow-y-scroll">
      <h2 className="font-bold text-2xl my-6 text-center">Clients list</h2>
      <Client />
      <Client />
      <Client />
    </div>
  );
};

export default ClientsList;
