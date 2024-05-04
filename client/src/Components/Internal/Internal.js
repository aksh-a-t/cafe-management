import { Box, Drawer } from "@mui/material";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Category from "./Category";
import DrawerComp from "./DrawerComp";
import Navbar from "../Navbar";
import Product from "./Product";
import CreateBill from "./CreateBill";
import ViewBill from "./ViewBill";
import SupportTool from "./Support/SupportTool";
import Users from "./Support/Users";
import {
  FeatureIds,
  INTERNAL_USERS_CREATE_VIEW,
  INTERNAL_USERS_EDIT_VIEW,
} from "./properties";
import { InternalUserContext } from "./Wrapper";
import ChefConsole from "./ChefConsole";
import ViewUsers from "./Support/ViewUsers";
import CreateTable from "./Support/CreateTable";
import TablesInfo from "./TablesInfo";

const Internal = () => {
  const drawerWidth = 240;
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const InternalContext = useContext(InternalUserContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
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
            {<DrawerComp />}
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
            {<DrawerComp />}
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
          <Routes>
            <Route index element={<>Hello</>} />
            {InternalContext.includes(FeatureIds["Category Manipulation"]) && (
              <Route path="/category" element={<Category />} />
            )}
            {(InternalContext.includes(FeatureIds["Product Manipulation"]) ||
              InternalContext.includes(FeatureIds["Product Toggle"])) && (
              <Route path="/product" element={<Product />} />
            )}
            {InternalContext.includes(FeatureIds["Billing"]) && (
              <Route path="/bill" element={<CreateBill />} />
            )}
            {InternalContext.includes(FeatureIds["Support Tools"]) && (
              <Route
                path="/support/*"
                element={
                  <Routes>
                    <Route path="/" element={<SupportTool />} />
                    <Route
                      path="/user/create"
                      element={<Users view={INTERNAL_USERS_CREATE_VIEW} />}
                    />
                    <Route
                      path="/user/edit/:userId"
                      element={<Users view={INTERNAL_USERS_EDIT_VIEW} />}
                    />
                    <Route path="/users/view" element={<ViewUsers/>}/>
                    <Route path="/table/create" element={<CreateTable/>}/>
                  </Routes>
                }
              />
            )}
            {
              InternalContext.includes(FeatureIds["Chef Console"]) && (
                <Route path="/chef" element={<ChefConsole/>}/>
              )
            }
            {
              InternalContext.includes(FeatureIds["Analytics"]) && (
                <Route path="/analytics" element={<></>}/>
              )
            }
            <Route path="/tables" element={<TablesInfo/>}/>
            <Route path="*" element={<Navigate to="/notfound" />} />
            {/* <Route path="/viewbill" element={<ViewBill/>}/> */}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Internal;
