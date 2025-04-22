import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useSprints } from "../../../../hooks/useSprints";
import { ISprint } from "../../../../types/ISprints";
import { generadorDeId } from "../../../../utils/generadorIds";
import Swal from "sweetalert2";
import styles from "./ModalCreateSprint.module.css";

type Props = {
  handleCloseCreateSprint: () => void;
};

export const ModalCreateSprint: FC<Props> = ({ handleCloseCreateSprint }) => {
  const { crearSprint } = useSprints();

  const [formValues, setFormValues] = useState<ISprint>({
    id: generadorDeId(),
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
    tareas: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { nombre, fechaInicio, fechaCierre } = formValues;

    if (!nombre.trim() || !fechaInicio.trim() || !fechaCierre.trim()) {
      Swal.fire("Rellene los campos con la información necesaria");
      return;
    }

    crearSprint(formValues);
    handleCloseCreateSprint();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleCloseCreateSprint}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Crear Sprint</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Título</label>
          <input
            type="text"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            required
          />

          <label>Fecha de Inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={formValues.fechaInicio}
            onChange={handleChange}
            required
          />

          <label>Fecha de Cierre</label>
          <input
            type="date"
            name="fechaCierre"
            value={formValues.fechaCierre}
            onChange={handleChange}
            required
          />

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCloseCreateSprint}
            >
              Cerrar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
