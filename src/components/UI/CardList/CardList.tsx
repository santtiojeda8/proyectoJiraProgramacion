import { FC } from "react";
import { IProduct } from "../../../Types/IProduct"
import { productStore } from "../../../Store/ProductStore";
import { useShallow } from "zustand/shallow";



type ICardList={
    products:IProduct;
    handleOpenModalEdit: (pruduct: IProduct ) => void
}

export const CardList:FC<ICardList> = ({products,handleOpenModalEdit}) => {
 const {products,addProduct,setActiveProduct,clearActiveProduct}=productStore(useShallow((state)=>({
    products:state.products,
    addProduct:state.addProduct,
    setActiveProduct : state.setActiveProduct,
    clearActiveProduct:state.clearActiveProduct,
 })))




  return (
    <div>CardList</div>
  )
}
