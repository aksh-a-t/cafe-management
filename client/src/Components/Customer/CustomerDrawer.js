// @ts-nocheck
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CustomerContext } from "./CustomerContextData";
import CurrencyFormat from "react-currency-format";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Customer.css";
import ConfirmOrderList from "./ConfirmOrderList";
import { Endpoint } from "../../Services/endpoints";
import { useParams } from "react-router-dom";
const CustomerDrawer = ({ socket }) => {
  const { customerData, setCustomerData } = useContext(CustomerContext);
  const [unConTotal, setUnConTotal] = useState(0);
  const [conTotal, setConTotal] = useState(0);
  const endpoints = new Endpoint();
  const params = useParams();
  useEffect(() => {
    let temp = 0;
    customerData.unconfirmedList.forEach((element) => {
      temp += element.quantity * element.price;
    });
    setUnConTotal(temp);
  }, [customerData.unconfirmedList]);
  useEffect(() => {
    let temp = 0;
    customerData.confirmedListSet.forEach((element) => {
      element.forEach((val) => {
        temp += val.quantity * val.price;
      });
    });
    setConTotal(temp);
  });
  const confirm = () => {
    socket.emit("confirmOrder", { order: customerData.unconfirmedList });
    setCustomerData((pre) => {
      return {
        ...pre,
        confirmedListSet: [...pre.confirmedListSet, pre.unconfirmedList],
        unconfirmedList: [],
      };
    });
  };
  const checkout = () =>{
    socket.emit("paymentDone");
  }
  return (
    <>
      <Toolbar />
      <Accordion className="DrawerAccordian">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="DrawerAccordianHeader"
        >
          <Typography>Confirm Order</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0px" }}>
          <List>
            {customerData.unconfirmedList.length > 0 && (
              <>
                {customerData.unconfirmedList.map((val, i) => {
                  return (
                    <ListItem key={val.productId} divider>
                      <ConfirmOrderList data={val} template="Unconfirm" />
                    </ListItem>
                  );
                })}

                <ListItem style={{ justifyContent: "space-between" }}>
                  <Typography>
                    Total:
                    <CurrencyFormat
                      value={unConTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                  </Typography>
                  <Button onClick={confirm} variant="outlined" color="neutral">
                    ORDER
                  </Button>
                </ListItem>
              </>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion className="DrawerAccordian">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="DrawerAccordianHeader"
        >
          <Typography>Preparing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="div">
            {customerData.confirmedListSet.map((orderSet, index) => {
              return (
                <div key={index}>
                  <h5 style={{ margin: 0 }}>{`Order ${index + 1}`}</h5>
                  <List>
                    {orderSet.map((val) => {
                      return (
                        <ListItem
                          key={val.productId}
                          style={{ padding: "0px 10px" }}
                        >
                          <ConfirmOrderList data={val} template="Confirm" />
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              );
            })}
            {customerData.confirmedListSet.length > 0 && (
              <>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>
                    Total:
                    <CurrencyFormat
                      value={conTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                  </Typography>
                  <Button onClick={checkout} variant="outlined" color="neutral">
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="DrawerAccordian">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="DrawerAccordianHeader"
        >
          <Typography>Other Guests'</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {customerData.usersList &&
              customerData.usersList.map((val) => {
                return (
                  <ListItem key={val.id} divider>
                    <ListItemText primary={val.name} />
                  </ListItem>
                );
              })}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomerDrawer;
