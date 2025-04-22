import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ISprint } from "../../../../types/ISprints";
import { useSprints } from "../../../../hooks/useSprints";
import styles from "./ModalEditSprint.module.css";

type IEditarSprint = {
  sprint: ISprint;
  manejarCerrarModalEditar: () => void;
};

export const ModalEditarSprint: FC<IEditarSprint> = ({
  sprint,
  manejarCerrarModalEditar,
}) => {
  const { editarUnSprint } = useSprints();

  const [valoresFormulario, setValoresFormulario] = useState<ISprint>(sprint);

  // Maneja el cambio de los valores en el formulario
  const manejarCambio = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValoresFormulario((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario y actualiza el sprint
  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
    editarUnSprint(valoresFormulario);
    manejarCerrarModalEditar();
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={manejarCerrarModalEditar}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h3>Editar Sprint</h3>
          <form className={styles.form} onSubmit={manejarEnvio}>
            
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={valoresFormulario.nombre}
              onChange={manejarCambio}
            />
            <label>Fecha de Inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={valoresFormulario.fechaInicio}
              onChange={manejarCambio}
            />
            <label>Fecha de Cierre</label>
            <input
              type="date"
              name="fechaCierre"
              value={valoresFormulario.fechaCierre}
              onChange={manejarCambio}
            />
            
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={manejarCerrarModalEditar}
              >
                Cerrar
              </button>
              <button type="submit" className={styles.submitButton}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
