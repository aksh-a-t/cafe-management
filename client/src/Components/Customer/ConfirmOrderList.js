// @ts-nocheck
import { ButtonGroup, Button, Typography, IconButton } from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyFormat from "react-currency-format";
import { CustomerContext } from "./CustomerContextData";

const ConfirmOrderList = ({ data, template }) => {
  const unconfirmTemplate = "Unconfirm";
  const { customerData, setCustomerData } = useContext(CustomerContext);
  const increaseQnt = () => {
    setCustomerData((pre) => {
      let ans = pre.unconfirmedList.map((val) => {
        if (val["productId"] === data["productId"]) {
          return { ...val, quantity: val["quantity"] + 1 };
        } else {
          return { ...val };
        }
      });
      return { ...pre, unconfirmedList: ans };
    });
  };

  const decreaseQnt = () => {
    setCustomerData((pre) => {
      let ans = pre.unconfirmedList.map((val) => {
        if (val["productId"] === data["productId"]) {
          if (val.quantity !== 1) {
            return { ...val, quantity: val["quantity"] - 1 };
          } else {
            return "";
          }
        } else {
          return { ...val };
        }
      });
      ans = ans.filter((val) => val != "");
      return { ...pre, unconfirmedList: ans };
    });
  };
  return (
    <div style={{ width: "inherit" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>{data.product}</div>
        <div>
          {template === unconfirmTemplate ? (
            <CurrencyFormat
              value={data.price * data.quantity}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
            />
          ) : (
            <div>{`x${data.quantity}`}</div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <CurrencyFormat
            value={data.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
          />
        </div>
        {template === unconfirmTemplate && (
          <div style={{ zIndex: "0" }}>
            <ButtonGroup
              color="success"
              size="small"
              aria-label="small button group"
            >
              <Button onClick={() => increaseQnt(data.productId)}>
                <AddIcon fontSize="small" />
              </Button>
              <Button>{data.quantity}</Button>
              <Button onClick={() => decreaseQnt(data.productId)}>
                <RemoveIcon fontSize="small" />
              </Button>
              {/* <Button  onClick={()=>deleteItem(data.productId)}>
              <DeleteIcon fontSize="small" />
            </Button> */}
            </ButtonGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrderList;
