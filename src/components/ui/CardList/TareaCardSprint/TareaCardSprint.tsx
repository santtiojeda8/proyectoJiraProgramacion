// TareaCardSprint.tsx
import { FC } from "react";
import { ITarea } from "../../../../types/IBacklog";
import styles from "./TareaCardSprint.module.css";
import { Eye, Pencil, Trash2 } from "lucide-react"; // Si usás iconos, por ejemplo, de lucide-react

type IViewTarea = {
    tarea: ITarea;
};

export const TareaCardSprint: FC<IViewTarea> = ({ tarea }) => {
    return (
        <div className={styles.cardContainer}>
          

            <div className={styles.card}>
                <p><strong>Titulo:</strong> {tarea.titulo}</p>
                <p><strong>Descripción:</strong> {tarea.descripcion}</p>
                <p><strong>Fecha Límite:</strong> {tarea.fechaLimite}</p>
                <div className={styles.actionsRow}>
                    <button className={styles.backlogBtn}>Enviar al backlog</button>
                    <button className={styles.progressBtn}>En progreso</button>

                    <button className={styles.iconBtn}><Eye size={18} /></button>
                    <button className={styles.iconBtn}><Pencil size={18} /></button>
                    <button className={styles.iconBtn}><Trash2 size={18} /></button>
                </div>

            </div>
        </div>
    );
};
