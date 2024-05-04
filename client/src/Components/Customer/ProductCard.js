// @ts-nocheck

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  ButtonGroup,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CurrencyFormat from "react-currency-format";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CustomerContext } from "./CustomerContextData";
const ProductCard = ({ data, category }) => {
  const { customerData, setCustomerData } = useContext(CustomerContext);
  const [productCount, setProductCount] = useState(1);
  const increaseQnt = () => {
    setProductCount((pre) => pre + 1);
  };
  const decreaseQnt = () => {
    if (productCount > 1) {
      setProductCount((pre) => pre - 1);
    }
  };

  const addProduct = () => {
    let isAdded = customerData.unconfirmedList.find(
      (val) => val["productId"] === data["productId"]
    );
    if (isAdded) {
      return alert.error("Product Already Added");
    }
    setCustomerData((pre) => {
      let ans = [...pre.unconfirmedList];
      ans.push({
        product: data["product"],
        productId: data["productId"],
        price: data.price,
        quantity:productCount,
        category
      });
      return {
        ...pre,
        unconfirmedList: ans,
      };
    });
  };
  // const [height,setHeight] = useState(window.innerWidth);
  // const[description,setDescription] = useState("Loading...");
  // const [toggleMore,setToggleMore] = useState(false);
  // useEffect(()=>{
    // let ele =  
    // function get(){
    //   if(data["discription"].length>45){
    //     if(!toggleMore){
    //       let subString = data["discription"].substr(0,35);
    //       subString= <span>{subString}{ <span style={{cursor:'pointer'}} className="readLink"  onClick={toggleMoreHandler}>Read More</span>}</span>;
    //       // <span>hello{<a href="www.google.com">Hello</a>}yup</span>;
    //       setDescription(subString);
    //     }else{
    //       let subString = data["discription"];
    //       subString = <span>{subString}{<span style={{cursor:'pointer'}} className="readLink" onClick={toggleMoreHandler}>Read Less</span>}</span>
    //       setDescription(subString);
    //     }
    //     console.log(data["discription"].length)
    //   }else{
    //     setDescription(data["discription"]);
    //   }
    //   // console.log({data:data["discription"],length:data["discription"].length})
    // }
    // get()
    // let ele = document.getElementById("description");
    // console.log({clientHeight:ele.clientHeight,offsetHeight:ele.offsetHeight,scrollHeight:ele.scrollHeight,clientWidth:ele.clientWidth});
  // },[height,toggleMore])
  // useEffect(()=>{
  //   window.addEventListener('resize',()=>setHeight(window.innerWidth));
  // })
  // const addProduct=(id)=>{
  //   let isAdded=orderData.find((val)=>val['productId'])
  // }
  // const toggleMoreHandler = () => {
  //   setToggleMore((pre)=>!pre);
  // }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          maxWidth: "700px",
          width: "100%",
          justifyContent: "space-around",
          marginTop:'30px'
        }}
      >
        <CardContent sx={{maxWidth:'500px',width:'100%'}}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ marginBottom: "0px" }}
          >
            {data["product"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <CurrencyFormat
              value={data["price"]}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
            />
          </Typography>
          <div id="description" >
            {data["discription"]}
          </div>
        </CardContent>
        <CardActions>
          <ButtonGroup
            color="success"
            size="small"
            aria-label="small button group"
          >
            <Button onClick={addProduct}>{"ADD"}</Button>
            <Button onClick={() => increaseQnt()}>
              <AddIcon fontSize="small" />
            </Button>
            <Button>{productCount}</Button>
            <Button onClick={() => decreaseQnt()}>
              <RemoveIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
