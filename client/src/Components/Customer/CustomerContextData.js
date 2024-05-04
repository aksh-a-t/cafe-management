import  {createContext, useState} from "react";
export const DefaultCustomerData ={
  unconfirmedList:[],
  confirmedListSet:[],
  customersList:[]
}
export const CustomerContextData = () => {
    const [customerData, setCustomerData] = useState(DefaultCustomerData);
    return {
      customerData,
      setCustomerData,
    };
};

// unconfirmedList =>
// {
//     productId,
//     product,
//     quantity,
//     price,
//     category
// }

export const CustomerContext = createContext(null);

  