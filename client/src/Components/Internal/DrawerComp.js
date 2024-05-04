// @ts-nocheck
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TableBarIcon from '@mui/icons-material/TableBar';
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InternalUserContext } from "./Wrapper";
import { FeatureIds } from "./properties";

const DrawerComp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState();
  const InternalContext = useContext(InternalUserContext);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate(event.currentTarget.getAttribute("value"));
  };
  useEffect(() => {
    let path = location.pathname.split("/")[2];
    // let val=path.charAt(0).toUpperCase()+path.substring(1);
    // // console.log(path.length);
    if (path.length === 0) {
      setSelectedIndex(0);
    } else {
      switch (path) {
        case "category":
          setSelectedIndex(1);
          break;
        case "product":
          setSelectedIndex(2);
          break;
        case "bill":
          setSelectedIndex(3);
          break;
        case "chef":
          setSelectedIndex(4);
          break;
        case "support":
          setSelectedIndex(5);
          break;
        default:
          setSelectedIndex(0);
      }
      // setCurrent(val);
    }
  }, [location]);

  const ButtonList = styled(ListItemButton)({
    "&.Mui-selected,&.Mui-selected:hover": {
      background: "limegreen",
      color: "white",
    },
  });
  return (
    <div>
      <div>
        <Toolbar />
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <ButtonList
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            value="/internal/"
          >
            <DashboardIcon />
            <ListItemText primary="Dashboard" />
          </ButtonList>
          {InternalContext.includes(FeatureIds["Category Manipulation"]) && (
            <ButtonList
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              value="/internal/category"
            >
              <CategoryIcon />
              <ListItemText primary="Category" />
            </ButtonList>
          )}
          {(InternalContext.includes(FeatureIds["Product Manipulation"]) ||
            InternalContext.includes(FeatureIds["Product Toggle"])) && (
            <ButtonList
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
              value="/internal/product"
            >
              <MenuBookIcon />
              <ListItemText primary="Product" />
            </ButtonList>
          )}
          {InternalContext.includes(FeatureIds["Billing"]) && (
            <ButtonList
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
              value="/internal/bill"
            >
              <InventoryIcon />
              <ListItemText primary="Create Bill" />
            </ButtonList>
          )}
          {/* <ButtonList
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
            value="/internal/viewbill"
          >
            <MenuBookIcon />
            <ListItemText primary="View Bill" />
          </ButtonList> */}
          {
            InternalContext.includes(FeatureIds["Chef Console"]) && (
            <ButtonList
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event,4)}
            value="/internal/chef"
            >
            <FoodBankIcon/>
              <ListItemText primary="Chef's Console" />
            </ButtonList>
            )
          }
          {InternalContext.includes(FeatureIds["Support Tools"]) && (
            <ButtonList
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
              value="/internal/support"
            >
              <HelpCenterIcon />
              <ListItemText primary="Support Tools" />
            </ButtonList>
          )}
          <ButtonList>
          <TableBarIcon/>
            <ListItemText primary="Tables Info" />
          </ButtonList>
        </List>
      </div>
    </div>
  );
};

export default DrawerComp;
