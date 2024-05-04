// @ts-nocheck
import {
  Toolbar,
  Card,
  CardActions,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Switch,
  ButtonGroup,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState, useContext } from "react";
import { useAlert } from "react-alert";
import { Endpoint } from "../../Services/endpoints";
import { InternalUserContext } from "./Wrapper";
import { FeatureIds } from "./properties";
import TableSkeleton from "../../SubComponents/TableSkeleton";

const Product = () => {
  const defaultVal = {
    open: false,
    product: "",
    price: "",
    discription: "",
    category: "",
    categoryId: "",
    type: "",
    productId: "",
    status: "",
  };
  const [dataList, setDataList] = useState([]);
  const [details, setDetails] = useState(defaultVal);
  const [category, setCategory] = useState([]);
  const [checks, setChecks] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: "",
  });
  const alert = useAlert();
  const InternalContext = useContext(InternalUserContext);
  const endpoints = new Endpoint();

  useEffect(() => {
    const getProducts = async () => {
      let response = await endpoints.getInternalScopeProducts();
      if (response !== endpoints.ErrorCode) {
        setDataList(response);
      }
    };
    const getCategories = async () => {
      let response = await endpoints.getCategories();
      if (response !== endpoints.ErrorCode) {
        setCategory(response);
      }
    };
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    if (
      details.categoryId &&
      details.discription &&
      details.price &&
      details.product
    ) {
      setChecks(false);
    } else {
      setChecks(true);
    }
  }, [details]);
  const closeAddDialog = () => {
    setDetails(defaultVal);
    // setChecks(true);
  };
  const addChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "categoryId") {
      let valname = category.filter((val) => val["id"] === value);
      setDetails((pre) => {
        return {
          ...pre,
          category: valname[0]["category"],
        };
      });
      // setChecks(true);
    }
    setDetails((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const createAgree = async () => {
    let data = {
      product: details.product,
      discription: details.discription,
      price: details.price,
      categoryId: details.categoryId,
      category: details.category,
    };
    let response = await endpoints.createNewProduct(data);
    if (response !== endpoints.ErrorCode) {
      setDataList((pre) => [response, ...pre]);
      setDetails(defaultVal);
      alert.success("Product Created");
    }
    // .catch((error)=>{
    //   console.log(error);
    //   alert.error("Error");
    //   setDetails(defaultVal);
    // })
  };

  const editHandler = (val) => {
    const {
      category,
      categoryId,
      discription,
      price,
      product,
      productId,
      status,
    } = val;
    setDetails((pre) => {
      return {
        product,
        productId,
        price,
        discription,
        status,
        category,
        categoryId,
        open: true,
        type: "Edit",
      };
    });
  };
  const confirmEdit = async () => {
    let data = {
      id: details.productId,
      product: details.product,
      price: details.price,
      discription: details.discription,
      categoryId: details.categoryId,
    };
    let response = await endpoints.updateProduct(data);
    if (response !== endpoints.ErrorCode) {
      setDataList((pre) => {
        let ans = pre.filter((val) => val.productId !== details.productId);
        ans.unshift({
          category: details.category,
          categoryId: details.categoryId,
          discription: details.discription,
          price: details.price,
          product: details.product,
          productId: details.productId,
          status: details.status,
        });
        return ans;
      });
      setDetails(defaultVal);
      alert.success("Product Updated");
    }
  };
  const deleteHandler = async () => {
    let response = await endpoints.deleteProduct(deleteDialog);
    if (response !== endpoints.ErrorCode) {
      setDataList((pre) => {
        let ans = pre.filter((val) => val["productId"] !== deleteDialog.id);
        return ans;
      });
      setDeleteDialog({ open: false, id: "" });
      alert.success("Delete Successfull");
    }
    // .catch((error)=>{
    //   console.log(error);
    //   alert.error("Error");
    //   setDeleteDialog({open:false,id:""});
    // })
  };
  const statusHandler = async (id) => {
    let temp = dataList.find((val) => val["productId"] === id);
    if (temp) {
      let response = await endpoints.setProductStatus({
        id: id,
        status: !temp.status,
      });
      if (response !== endpoints.ErrorCode) {
        setDataList((pre) => {
          let ans = pre.map((val) => {
            if (val["productId"] === id) {
              return {
                ...val,
                status: !val.status,
              };
            }
            return val;
          });
          return ans;
        });
        alert.success("Status Updated");
      }
    }
  };
  return (
    <div>
      <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Manage Products</div>
          <Button
            className="button"
            onClick={() => setDetails({ ...details, open: true, type: "Add" })}
          >
            Add Product
          </Button>
        </CardActions>
      </Card>
      <Card className="card">
        <CardActions>
          <TextField
            color="neutral"
            fullWidth
            size="small"
            label="Filter"
            type="search"
          />
        </CardActions>
      </Card>
      <Paper className="card">
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" className="backLime">
                  Product
                </TableCell>
                <TableCell align="center" className="backLime">
                  Category
                </TableCell>
                {!InternalContext.includes(FeatureIds["Product Toggle"]) && (
                  <TableCell align="center" className="backLime">
                    Discription
                  </TableCell>
                )}
                {!InternalContext.includes(FeatureIds["Product Toggle"]) && (
                  <TableCell align="center" className="backLime">
                    Price
                  </TableCell>
                )}
                <TableCell align="center" className="backLime">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.length > 0 ? (
                dataList.map((val, i) => {
                  return (
                    <TableRow hover key={i}>
                      <TableCell align="center">{val["product"]}</TableCell>
                      <TableCell align="center">{val["category"]}</TableCell>
                      {!InternalContext.includes(
                        FeatureIds["Product Toggle"]
                      ) && (
                        <TableCell align="center">
                          {val["discription"]}
                        </TableCell>
                      )}
                      {!InternalContext.includes(
                        FeatureIds["Product Toggle"]
                      ) && <TableCell align="center">{val["price"]}</TableCell>}

                      <TableCell align="center">
                        <ButtonGroup>
                          {!InternalContext.includes(
                            FeatureIds["Product Toggle"]
                          ) && (
                            <>
                              <Tooltip title="Edit Product">
                                <IconButton onClick={() => editHandler(val)}>
                                  <EditIcon color="neutral" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  onClick={() =>
                                    setDeleteDialog({
                                      open: true,
                                      id: val["productId"],
                                    })
                                  }
                                >
                                  <DeleteIcon color="neutral" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip
                            title={val["status"] ? "Dactivate" : "Activate"}
                          >
                            <Switch
                              checked={val["status"]}
                              onChange={() => statusHandler(val["productId"])}
                              color="neutral"
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </Tooltip>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableSkeleton cells={5} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={details.open}
        onClose={closeAddDialog}
        sx={{
          "& .MuiDialogContent-root": { padding: "5px 20px" },
          ".MuiDialogTitle-root+.css-ypiqx9-MuiDialogContent-root": {
            paddingTop: "10px  ",
          },
        }}
      >
        <DialogTitle sx={{ background: "limegreen" }}>
          {details.type} Product
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            color="neutral"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={details.product}
            name="product"
            onChange={addChangeHandler}
          />
        </DialogContent>
        <DialogContent>
          <Box
            sx={{
              display: { xs: "flex" },
              justifyContent: { xs: "space-between" },
            }}
          >
            <TextField
              color="neutral"
              label="Price"
              type="number"
              variant="outlined"
              name="price"
              value={details.price}
              onChange={addChangeHandler}
            />
            <FormControl sx={{ maxWidth: 220, width: "100%" }} color="neutral">
              <InputLabel>Category</InputLabel>
              <Select
                value={details.categoryId}
                name="categoryId"
                label="Category"
                onChange={addChangeHandler}
              >
                {category &&
                  category.map((val, i) => {
                    return (
                      <MenuItem key={i} value={val["id"]}>
                        {val["category"]}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogContent>
          <TextField
            autoFocus
            color="neutral"
            label="Discription"
            type="text"
            fullWidth
            variant="outlined"
            name="discription"
            value={details.discription}
            onChange={addChangeHandler}
          />
        </DialogContent>

        <DialogActions>
          <Button color="neutral" onClick={closeAddDialog}>
            Cancel
          </Button>
          {details.type === "Add" ? (
            <Button disabled={checks} color="neutral" onClick={createAgree}>
              Add
            </Button>
          ) : (
            <Button disabled={checks} color="neutral" onClick={confirmEdit}>
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {/* //delete Alert */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: "" })}
      >
        <DialogTitle>{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete Product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="neutral"
            onClick={() => setDeleteDialog({ open: false, id: "" })}
          >
            Disagree
          </Button>
          <Button color="neutral" onClick={deleteHandler}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Product;
