import { FC } from 'react'
import styles from './TareaCard.module.css'

import { IBacklog, ITarea } from '../../../../types/IBacklog'

type ITareaCard={
    tarea:ITarea
    handleOpenModalEdit:(tarea:ITarea)=>void
}


export const TareaCard:FC<ITareaCard>=({tarea}) =>{
    return(
        <div className={styles.ContainerPrincipal}>
            <div className={styles.ContainerTittle}>
                <h3>Titulo: {tarea.titulo}</h3>
                <p>Descripcion: {tarea.descripcion}</p>
            </div>
            <div className={styles.ContainerButtonSprint}>
                <button className={styles.buttonEnviar}>Enviar a:</button>
                <button className={styles.buttonSprint}>Seleccione un Sprint</button>
            </div>
            <div className={styles.ContainerButtons}>
                <button>Ver</button>
                <button>Editar</button>
                <button>Eliminar</button>
            </div>
        </div>
    )
  

}