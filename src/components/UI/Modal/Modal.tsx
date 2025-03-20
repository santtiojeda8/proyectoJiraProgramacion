import { FC, useEffect, useState } from "react"
import { IProduct } from "../../../Types/IProduct"
import { productStore } from "../../../Store/ProductStore"
type IModal ={
    handleCloseModal:VoidFunction
}

const initialState: IProduct ={
    id:0,
    name:"",
    price:0,
    category:"",
}
export const Modal:FC<IModal> = ({handleCloseModal}) => {
    const activeProduct=productStore((state)=>state.activeProduct)
    const setActiveProduct=productStore((state)=>state.setActiveProduct)
    const [formValues,setFormValues]= useState<IProduct>(initialState)
    useEffect(()=>{
        if (activeProduct) setFormValues(activeProduct)
    },[])

  return (
    <div>
        <div>
        <div>
            <h2>Crear producto</h2>
        </div>
        <div>
            <form action="">
                <label >ID</label>
                <input type="number" required value={formValues.id} autoComplete="off" name="id"/>
                <label >nombre</label>
                <input type="string" required value={formValues.name} autoComplete="off" name="name"/>
                <label >precio</label>
                <input type="number" required value={formValues.price} autoComplete="off" name="price"/>
                <label >Categoria</label>
                <input type="string" required value={formValues.category} autoComplete="off" name="category"/>
            </form>
        </div>
        </div>
    </div>
  )
}
