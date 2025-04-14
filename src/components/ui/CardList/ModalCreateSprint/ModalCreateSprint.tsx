import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useSprints } from "../../../../hooks/useSprints";
import { ISprint } from "../../../../types/ISprints";
import { generadorDeId } from "../../../../utils/generadorIds";
import Swal from "sweetalert2";
import styles from "./ModalCreateSprint.module.css"
type ICreateSprint = {
  handleCloseCreateSprint: () => void;
};

export const ModalCreateSprint: FC<ICreateSprint> = ({
  handleCloseCreateSprint,
}) => {

  const initialValues = {
    id: generadorDeId(),
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
    tareas: [],
  };
  
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
      <div className={styles.modalOverlay} onClick={handleCloseCreateSprint}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h3>Crear Sprint</h3>

          <form className={styles.form} onSubmit={handleSubmit} action="">
            
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
            
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.cancelButton} onClick={handleCloseCreateSprint}>Cerrar</button>
              <button type="submit" className={styles.submitButton} onClick={handleSubmit}>Crear</button>
            </div>
          </form>
        </div>
      </div>

     
    </>
  );
};
