import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useClientContext } from "../context/client.context";

function FilterBy() {
  const { filter, setFilter } = useClientContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) setFilter(filterParam);
  }, [searchParams]);

  const handleHistory = (filter: string) => {
    navigate(`?filter=${filter}`);
    setFilter(filter);
  };

  const removeFilter = () => {
    setFilter(null);
    navigate("/dashboard");
  };

  return (
    <div className="flex gap-4 items-center">
      <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Filtrar
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleHistory("proveedor")}>
            Proveedores
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleHistory("cliente")}>
            Clientes
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {filter && (
        <div className="bg-white hover:bg-slate-300 text-black h-[30px] px-2 rounded-md flex items-center gap-2">
          <p className="text-sm">{filter}</p>
          <span
            className="cursor-pointer text-sm"
            onClick={() => removeFilter()}
          >
            ✕
          </span>
        </div>
      )}
    </div>
  );
}

export default FilterBy;
