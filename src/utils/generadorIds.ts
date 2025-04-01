
import { v4 as uuidv4 } from 'uuid'

export const generadorDeId = () : string => {
    const idGenerado = uuidv4()
    return idGenerado
}