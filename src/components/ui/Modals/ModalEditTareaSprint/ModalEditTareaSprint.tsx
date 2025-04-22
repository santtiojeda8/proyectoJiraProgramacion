import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./ModalEditTareaSprint.module.css";
import { useParams } from "react-router-dom";
import { useSprints } from "../../../../hooks/useSprints";
import { ITarea } from "../../../../types/IBacklog";
import { ISprint } from "../../../../types/ISprints";

type IEditarTarea = {
  tarea: ITarea;
  manejarCerrarModalEditar: () => void;
  id?: string;
};

export const ModalEditarTareaSprint: FC<IEditarTarea> = ({
  tarea,
  manejarCerrarModalEditar,
}) => {
  // Obtener el id de la URL con useParams
  const { id } = useParams<{ id?: string }>();

  // Estado para manejar los valores del formulario
  const [valoresFormulario, setValoresFormulario] = useState<ITarea>(tarea);

  const { editarUnSprint, sprints } = useSprints();

  // Función para manejar los cambios en los inputs
  const manejarCambio = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValoresFormulario((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();

    if (valoresFormulario) {
      // Buscar el sprint en el que se encuentra la tarea
      const sprintEncontrado = sprints.find((s) => s.id === id);

      if (sprintEncontrado) {
        // Asignar los cambios a la tarea dentro del sprint
        const asignarCambios = sprintEncontrado?.tareas.map((t) =>
          t.id === valoresFormulario.id ? { ...t, ...valoresFormulario } : t
        );

        // Crear un nuevo sprint con la tarea actualizada
        const sprintModificado: ISprint = {
          ...sprintEncontrado,
          tareas: asignarCambios,
        };

        // Actualizar el sprint
        editarUnSprint(sprintModificado);
      }
    }

    // Cerrar el modal después de guardar los cambios
    manejarCerrarModalEditar();
  };

  return (
    <div className={styles.modalOverlay} onClick={manejarCerrarModalEditar}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Editar Tarea</h3>
        <form className={styles.form} onSubmit={manejarEnvio}>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={valoresFormulario.titulo}
            onChange={manejarCambio}
          />

          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={valoresFormulario.descripcion}
            onChange={manejarCambio}
          ></textarea>

          <label>Estado:</label>
          <select
            name="estado"
            value={valoresFormulario.estado}
            onChange={manejarCambio}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Finalizado">Finalizado</option>
          </select>

          <label>Fecha límite:</label>
          <input
            type="date"
            name="fechaLimite"
            value={valoresFormulario.fechaLimite}
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
  );
};
