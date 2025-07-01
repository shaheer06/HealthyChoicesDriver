import { createContext, useContext, useState } from "react";

const OrderRequestContext=createContext();

export const useOrderRequest=()=>useContext(OrderRequestContext);

export const OrderRequestProvider=({children})=>{
const [orderData,setOrderData]=useState(null);

return(
    <OrderRequestContext.Provider value={{orderData,setOrderData}}>
        {children}
    </OrderRequestContext.Provider>
)
}