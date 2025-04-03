import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useSprints } from "../../../../hooks/useSprints";
import { ISprint } from "../../../../types/ISprints";
import { generadorDeId } from "../../../../utils/generadorIds";
import { sprintsStore } from "../../../../store/sprintsStore";
import Swal from "sweetalert2";

type ICreateSprint = {
  handleCloseCreateSprint: () => void;
};

const initialValues = {
  id: generadorDeId(),
  fechaInicio: "",
  fechaCierre: "",
  nombre: "",
  tareas: [],
};

export const ModalCreateSprint: FC<ICreateSprint> = ({
  handleCloseCreateSprint,
}) => {
  const { crearSprint } = useSprints();

  const [formValues, setFormValues] = useState<ISprint>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    if (
      !formValues.nombre.trim() ||
      !formValues.fechaInicio.trim() ||
      !formValues.fechaCierre.trim()
    ) {
      Swal.fire("Rellene los campos con la infromación necesaria");
      return;
    }
    e.preventDefault();
    crearSprint(formValues);
    handleCloseCreateSprint();
  };

  return (
    <>
      <div>
        <form action="">
          <div>
            <label>Ingrese título</label>
            <input
              type="text"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
            />
            <label>Seleccione Fecha de Inicio</label>
            <input type="date" name="fechaInicio" value={formValues.fechaInicio} onChange={handleChange}/>
            <label>Seleccione Fecha de Cierre</label>
            <input type="date" name="fechaCierre" value={formValues.fechaCierre} onChange={handleChange}/>
          </div>

          <div>
            <button onClick={handleSubmit}>Crear</button>
            <button onClick={handleCloseCreateSprint}>Cerrar</button>
          </div>
        </form>
      </div>
    </>
  );
};
