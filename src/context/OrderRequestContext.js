import { createContext, useContext, useState } from "react";

const orderRequestContext=createContext();

export const useOrderRequest=()=>useContext(orderRequestContext);

export const OrderRequestProvider=({children})=>{
const [orderData,setOrderData]=useState(null);

return(
    <OrderRequestProvider value={{orderData,setOrderData}}>
        {children}
    </OrderRequestProvider>
)
}