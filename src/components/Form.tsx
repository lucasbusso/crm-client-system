const Form = () => {
  return (
    <div className="md:w-1/2 w-full">
      <h2 className="font-bold text-2xl my-6">Add new client</h2>
      <form className="bg-white shadow-sm rounded-md py-10 px-5">
        <div className="block mb-6">
          <label htmlFor="name" className="uppercase font-bold text-slate-900">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          />
        </div>
        <div className="block mb-6">
          <label
            htmlFor="business"
            className="uppercase font-bold text-slate-900"
          >
            Business Name
          </label>
          <input
            name="business"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          />
        </div>
        <div className="block mb-6">
          <label htmlFor="date" className="uppercase font-bold text-slate-900">
            Registration
          </label>
          <input
            name="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          />
        </div>
        <div className="block mb-6">
          <label htmlFor="date" className="uppercase font-bold text-slate-900">
            Description (optional)
          </label>
          <textarea
            id="description"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-md"
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full text-white uppercase font-bold hover:bg-indigo-700 transition-colors py-2 rounded-md"
          value="Register"
        />
      </form>
    </div>
  );
};

export default Form;
