

import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { ITarea } from '../../../../types/IBacklog'
import { useTarea } from '../../../../hooks/useTarea';

type IEditTarea = {
    tarea : ITarea
    handleCloseEditModal: () => void;
}

export const ModalEditCard: FC<IEditTarea> = ( { tarea , handleCloseEditModal } ) => {

    const [formValues , setFormValues] = useState<ITarea>(tarea)

    const {edicionTarea} = useTarea()

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name , value } = e.target

        setFormValues( (prev) => ({...prev , [`${name}`] : value} ) )
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        edicionTarea(formValues)
        handleCloseEditModal()
    }


  return (
    <>
        <form onSubmit={handleSubmit}>
            <label>Titulo : </label>
            <input type="text" name='titulo' value={formValues.titulo} onChange={handleChange} />
            <label>Descripcion</label>
            <textarea name='descripcion' value={formValues.descripcion} onChange={handleChange}></textarea>
            <label>Estado</label>
            <select name='estado' value={formValues.estado} onChange={handleChange}>
                <option value='Pendiente'>Pendiente</option>
                <option value='Finalizado'>Finalizado</option>
            </select>
            <label>Fecha</label>
            <input type='date' name='fechaLimite' value={formValues.fechaLimite} onChange={handleChange}></input>
            <button onClick={handleCloseEditModal}>Cerrar</button>
            <button type='submit'>Enviar </button>
        </form>
    </>
  )
}
