import { productStore } from "../../../Store/ProductStore"


export const ListProduct = () => {
const setActiveProduct=productStore((state)=>state.setActiveProduct)



  return (
    <div>ListProduct</div>
  )
}
