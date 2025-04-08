import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ISprint } from "../../../../types/ISprints";
import { useSprints } from "../../../../hooks/useSprints";

type IEditSprint = {
  sprint: ISprint;
  handleCloseEditModal: () => void;
};

export const ModalEditSprint: FC<IEditSprint> = ({
  sprint,
  handleCloseEditModal,
}) => {
  const { editarUnSprint } = useSprints();

  const [formValues, setFormValues] = useState<ISprint>(sprint);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    editarUnSprint(formValues);
    handleCloseEditModal();
  };

  return (
    <>
      <div>
        <form>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
            />
            <label>Fecha de Inicion</label>
            <input type="date" name="fechaInicio" value={formValues.fechaInicio} onChange={handleChange}/>
            <label>Fecha de Cierre</label>
            <input type="date" name="fechaCierre" value={formValues.fechaCierre} onChange={handleChange}/>
          </div>
          <div>
            <button onClick={handleCloseEditModal}>Cerrar</button>
            <button type="submit" onClick={handleSubmit}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
