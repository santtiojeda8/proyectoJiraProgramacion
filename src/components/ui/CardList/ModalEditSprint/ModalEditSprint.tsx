import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ISprint } from "../../../../types/ISprints";
import { useSprints } from "../../../../hooks/useSprints";
import styles from "./ModalEditSprint.module.css"
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




      <div className={styles.modalOverlay} onClick={handleCloseEditModal}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h3>Editar Sprint</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
              />
              <label>Fecha de Inicion</label>
              <input type="date" name="fechaInicio" value={formValues.fechaInicio} onChange={handleChange} />
              <label>Fecha de Cierre</label>
              <input type="date" name="fechaCierre" value={formValues.fechaCierre} onChange={handleChange} />
            
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.cancelButton} onClick={handleCloseEditModal}>Cerrar</button>
              <button type="submit" className={styles.submitButton}>Guardar</button>
            </div>
          </form>
        </div>
      </div>

     
    </>
  );
};
