// @ts-nocheck
import { Box, Drawer, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Endpoint } from "../../Services/endpoints";
import Navbar from "../Navbar";
import CustomerDrawer from "./CustomerDrawer";
import Menu from "./Menu";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext, DefaultCustomerData } from "./CustomerContextData";
import { useNavigate } from "react-router-dom";
const Customer = () => {
  const endpoints = new Endpoint();
  const drawerWidth = 240;
  const params = useParams();
  const navigate = useNavigate();
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { customerData, setCustomerData } = useContext(CustomerContext);
  const [socket, setSocket] = useState(endpoints.getSocketInstance(params));
  useEffect(() => {
    socket.emit("newJoin");
    socket.on("allTableInfo", (response) => {
      console.log(response);
      setCustomerData((pre) => {
        return {
          ...pre,
          usersList: response.usersList,
          confirmedListSet: [...response.orders],
        };
      });
    });
    socket.on("newCustomerInfo", (response) => {
      console.log(response);
      setCustomerData((pre) => {
        return { ...pre, usersList: [...pre.usersList, response] };
      });
    });
    socket.on("customerLeft", (userId) => {
      console.log("left" + userId);
      setCustomerData((pre) => {
        let ans = pre.usersList.filter((val) => val.id != userId);
        return {
          ...pre,
          usersList: ans,
        };
      });
    });
    socket.on("confirmedItems", (response) => {
      console.log(response);
      setCustomerData((pre) => {
        return {
          ...pre,
          confirmedListSet: [...pre.confirmedListSet, [...response]],
        };
      });
    });
    socket.on("gameOver", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("myData");
      setCustomerData(DefaultCustomerData);
      navigate("/");
    });
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            marginTop: "64px",
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              zIndex: 1300,
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {<CustomerDrawer socket={socket} />}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                zIndex: "1000",
              },
            }}
            open
          >
            {<CustomerDrawer socket={socket} />}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "auto",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Menu socket={socket} />
        </Box>
      </Box>
    </div>
  );
};

export default Customer;
