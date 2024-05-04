// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";
import { Endpoint } from "../../Services/endpoints";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Menu = ({socket}) => {
  const [dataList, setDataList] = useState();
  const [keys, setKeys] = useState();
  const [currentCategory, setCurrentCategory] = useState("");
  const alert = useAlert();
  const endpoints = new Endpoint();
  useEffect(() => {
    async function getData() {
      let response = await endpoints.getCustomerScopeProducts();
      console.log(response);
      if (response !== endpoints.ErrorCode) {
        setDataList(response);
        setKeys(Object.keys(response));
      }
    }
    getData();
  }, []);
  const handleCategory = (category) => {
    setCurrentCategory(category);
  };
  return (
    <div>
      {keys && (
        <>
          <Stack
            direction="row"
            spacing={1}
            style={{
              flexWrap: "wrap",
              columnGap: "10px",
              justifyContent: "center",
            }}
          >
            {keys.map((val,index) => {
              return (
                  <Chip key={index} color={currentCategory===val?"neutral":"default"} onClick={() => handleCategory(val)} label={val} />
              );
            })}
          </Stack>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {currentCategory &&
              dataList[currentCategory].map((val) => {
                return (
                  <ProductCard
                    key={val.productId}
                    data={val}
                    category={currentCategory}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
