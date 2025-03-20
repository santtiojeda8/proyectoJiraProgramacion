import { create } from "zustand";
import { IProduct } from "../Types/IProduct";


interface IProductStore{
    products:IProduct[],
    activeProduct:IProduct|null,
    addProduct: (newProduct:IProduct)=> void,
    setActiveProduct:(activeProductIn:IProduct|null)=>void,
    deleteProduct:(idProduct:number)=>void;
    clearActiveProduct:()=> void
}

export const productStore = create<IProductStore> ((set) => ({
    products:[
    ] ,
    activeProduct : null ,

    addProduct : (newProduct) => 
        set( (state) => ( { products: [...state.products, newProduct]})),

    setActiveProduct : (activeProductIn)=> set(()=> ({activeProduct:activeProductIn})),

    deleteProduct : (idProduct:number) => 
        set( (state) =>{
            const arregloProduct = state.products.filter((product)=>product.id !=idProduct)
            return {products:arregloProduct}
        }),

    clearActiveProduct : () => set ( () => ({
        activeProduct:null
    })),

}))