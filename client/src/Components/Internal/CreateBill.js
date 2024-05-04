// @ts-nocheck
import {
  Toolbar,
  Card,
  CardActions,
  Button,
  Box,
  TextField,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ButtonGroup,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Grid,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Endpoint } from "../../Services/endpoints";

const Order = () => {
  const InitialVal = {
    productId: "",
    product: "",
    categoryId: "",
    quantity: "",
    price: "",
    total: "",
  };
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [current, setCurrent] = useState(InitialVal);
  const [dataList, setDataList] = useState([]);
  const [amount, setAmount] = useState(0);
  const alert = useAlert();
  const endpoints = new Endpoint();

  useEffect(() => {
    const getProducts = async () => {
      let response = await endpoints.getCustomerScopeProducts();
      if (response !== endpoints.ErrorCode) {
        let keys = Object.keys(response);
        setCategory(keys);
        setProducts(response);
      }
    };
    getProducts();
  }, []);

  const selectedCategory = (e) => {
    setCurrent((pre) => {
      return {
        ...InitialVal,
        categoryId: e.target.value,
      };
    });
    setSelectedProducts(products[e.target.value]);
  };
  const productSelect = (e) => {
    let temp = products[current.categoryId];
    let ans = temp.find((val) => e.target.value === val["productId"]);
    console.log(ans);
    setCurrent((pre) => {
      return {
        ...pre,
        product: ans.product,
        productId: e.target.value,
        price: ans.price,
        quantity: 1,
        total: ans.price,
      };
    });
  };
  const quantityHandler = (e) => {
    console.log(current);
    console.log(e.target.value * current.price);
    setCurrent((pre) => {
      return {
        ...pre,
        quantity: e.target.value,
        total: pre.price * e.target.value,
      };
    });
  };
  const addHandler = () => {
    if (current.product && current.quantity > 0 && current.total > 0) {
      let isAdded = dataList.find(
        (val) => val["productId"] === current.productId
      );
      console.log(isAdded);
      if (!isAdded) {
        setDataList((pre) => {
          let ans = [...pre];
          ans.unshift(current);
          // let ans=pre.unshift(current);
          return ans;
        });
        setAmount((pre) => {
          return pre + current.total;
        });
        setCurrent(InitialVal);
      } else {
        alert.error("Product Already Add");
      }
    } else {
      alert.error("Add Products");
    }
  };
  const deleteDialog = (id) => {
    console.log(id);
    let amount;
    setDataList((pre) => {
      let ans = pre.filter((val) => {
        if (val["productId"] !== id) {
          return true;
        } else {
          amount = val["quantity"] * val["price"];
        }
      });
      return ans;
    });
    console.log(amount);
    setAmount((pre) => pre - amount);
  };
  const createBill = async () => {
    if (dataList.length > 0 && amount > 0) {
      let response = await endpoints.createBill({
        productDetails: dataList,
        total: amount,
      });
      if (response !== endpoints.ErrorCode) {
        setDataList([]);
        setAmount(0);
        setCurrent(InitialVal);
        alert.success("Created");
      }
    } else {
      alert.error("Enter Required Info");
    }
  };
  return (
    <div>
      <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Create Bill</div>
          <Button className="button" onClick={createBill}>
            Create
          </Button>
        </CardActions>
      </Card>

      <Card className="card">
        <CardContent>Select Product</CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FormControl sx={{ maxWidth: 240, width: "100%" }}>
                <InputLabel color="neutral" size="small">
                  Category
                </InputLabel>
                <Select
                  value={current.categoryId}
                  name="categoryId"
                  label="Category"
                  size="small"
                  color="neutral"
                  onChange={selectedCategory}
                >
                  {category &&
                    category.map((val, i) => {
                      return (
                        <MenuItem key={i} value={val}>
                          {val}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl sx={{ maxWidth: 240, width: "100%" }}>
                <InputLabel color="neutral" size="small">
                  Product
                </InputLabel>
                <Select
                  value={current.productId}
                  name="productId"
                  label="Product"
                  size="small"
                  color="neutral"
                  onChange={productSelect}
                >
                  {selectedProducts &&
                    selectedProducts.map((val, i) => {
                      return (
                        <MenuItem key={i} value={val["productId"]}>
                          {val["product"]}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                sx={{ maxWidth: 240, width: "100%" }}
                InputProps={{
                  readOnly: true,
                }}
                color="neutral"
                label="Price"
                type="text"
                size="small"
                variant="outlined"
                name="price"
                value={current.price}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                sx={{ maxWidth: 240, width: "100%" }}
                color="neutral"
                label="Quantity"
                type="number"
                size="small"
                variant="outlined"
                name="quantity"
                value={current.quantity}
                onChange={quantityHandler}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                sx={{ maxWidth: 240, width: "100%" }}
                InputProps={{
                  readOnly: true,
                }}
                color="neutral"
                label="Total"
                type="number"
                size="small"
                variant="outlined"
                name="total"
                value={current.total}
              />
            </Grid>
          </Grid>
        </CardActions>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={addHandler} className="button">
            Add
          </Button>
          <Button
            disabled
            className="button"
          >{`Total Amount:${amount}`}</Button>
        </CardActions>
      </Card>

      <Paper className="card">
        <TableContainer sx={{ height: 350 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" className="backLime">
                  Product
                </TableCell>
                <TableCell align="center" className="backLime">
                  Price
                </TableCell>
                <TableCell align="center" className="backLime">
                  Quantity
                </TableCell>
                <TableCell align="center" className="backLime">
                  Total
                </TableCell>
                <TableCell align="center" className="backLime">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((val, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell align="center">{val["product"]}</TableCell>
                    <TableCell align="center">{val["price"]}</TableCell>
                    <TableCell align="center">{val["quantity"]}</TableCell>
                    <TableCell align="center">{val["total"]}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => deleteDialog(val["productId"])}
                        >
                          <DeleteIcon color="neutral" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Order;
