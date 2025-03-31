

import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { ITarea } from '../../../../types/IBacklog'
import { useTarea } from '../../../../hooks/useTarea';
import { tareaStore } from '../../../../store/tareaStore';

type IEditTarea = {
    tarea : ITarea
    handleCloseEditModal: () => void;
}

export const ModalEditCard: FC<IEditTarea> = ( { tarea , handleCloseEditModal } ) => {

    const [formValues , setFormValues] = useState<ITarea>(tarea)

    const {edicionTarea} = useTarea()

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            
            <button onClick={handleCloseEditModal}>Cerrar</button>
            <button type='submit'>Enviar </button>
        </form>
    </>
  )
}
