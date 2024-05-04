// @ts-nocheck
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Toolbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { FeatureIds, RoleTemplates } from "../properties";
import {
  INTERNAL_USERS_EDIT_VIEW,
  INTERNAL_USERS_CREATE_VIEW,
} from "../properties";
import "../Internal.css";
import { Endpoint } from "../../../Services/endpoints";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
const Users = ({ view }) => {
  const allFeatures = [...Object.keys(FeatureIds)];
  const defaultInfo = { email: "", password: "", role: "", status: "" };
  const [availableFeatures, setAvailableFeatures] = useState(allFeatures);
  const [currentFeatures, setCurrentFeatures] = useState([]);
  const [info, setInfo] = useState(defaultInfo);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const endpoints = new Endpoint();
  useEffect(() => {
    const getUserData = async () => {
      let response = await endpoints.getInternalUserData(params);
      if (response !== endpoints.ErrorCode) {
        setInfo((pre) => {
          return {
            ...pre,
            email: response.email,
            status: response.status,
          };
        });
        response.features.map((val) => {
          addFeature(
            Object.keys(FeatureIds).find((key) => FeatureIds[key] === val)
          );
        });
        // setCurrentFeatures()
      }
    };
    if (view === INTERNAL_USERS_EDIT_VIEW) {
      getUserData();
    }
  }, []);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInfo((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const addFeature = (id) => {
    setCurrentFeatures((pre) => {
      let toAdd = availableFeatures.filter((val) => val === id);
      return [...pre, ...toAdd];
    });
    setAvailableFeatures((pre) => {
      return pre.filter((val) => val !== id);
    });
  };

  const removeFeature = (id) => {
    setAvailableFeatures((pre) => {
      let toAdd = currentFeatures.filter((val) => val === id);
      return [...pre, ...toAdd];
    });
    setCurrentFeatures((pre) => {
      return pre.filter((val) => val !== id);
    });
  };

  const createUser = async () => {
    let ids = [];
    if (!info.email | !info.password || !info.role) {
      alert.error("Enter all the Fields");
    } else {
      if (info.role === "Custom") {
        if (currentFeatures.length === 0) {
          return alert("error");
        } else {
          ids = currentFeatures.map((val) => FeatureIds[val]);
        }
      } else {
        let currentRoleInfo = RoleTemplates.find(
          (val) => val.template === info.role
        );
        ids = currentRoleInfo.features.map((val) => FeatureIds[val]);
      }
      let response = await endpoints.createInternalUser({
        email: info.email,
        password: info.password,
        features: [...ids],
      });
      if (response !== endpoints.ErrorCode) {
        alert.success("User created");
        setCurrentFeatures([]);
        setAvailableFeatures(allFeatures);
        setInfo(defaultInfo);
      }
    }
  };
  const updateHandler = async () => {
    let payload = {};
    let ids = [];
    if (info.password) {
      payload = { ...payload, password: info.password };
    }
    if (currentFeatures.length === 0) {
      return alert.error("Add Features");
    } else {
      ids = currentFeatures.map((val) => FeatureIds[val]);
    }
    payload = { ...payload, status: info.status, features: ids };

    let response = await endpoints.updateInternalUserData(payload, params);
    if (response !== endpoints.ErrorCode) {
      alert.success("User Updated");
      setTimeout(() => navigate("/internal/support/users/view"), 1000);
    }
  };

  const deleteHandler = () => {
    let response = endpoints.deleteInternalUser(params);
    if (response !== endpoints.ErrorCode) {
      alert.success("User Deleted");
      setTimeout(() => navigate("/internal/support/users/view"), 1000);
    }
  };

  return (
    <>
      <div>
        <Toolbar />
        <Card className="card">
          <CardActions>
            <div>{view} User</div>
          </CardActions>
        </Card>
        <Card className="card">
          {/* <CardActions> */}
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={2} />
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  onChange={changeHandler}
                  value={info.email}
                  name="email"
                  required
                  id="outlined-required"
                  label="Email"
                  color="neutral"
                  type="email"
                  disabled={view === INTERNAL_USERS_EDIT_VIEW}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={2} />
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  onChange={changeHandler}
                  value={info.password}
                  name="password"
                  required={view === INTERNAL_USERS_CREATE_VIEW}
                  id="outlined-required"
                  label="Password"
                  color="neutral"
                />
              </Grid>
              <Grid item xs={2} />
              {view === INTERNAL_USERS_CREATE_VIEW && (
                <>
                  <Grid item xs={2} />
                  <Grid item xs={8}>
                    <FormControl
                      required
                      fullWidth
                      color="neutral"
                      size="small"
                    >
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={info.role}
                        label="Role"
                        onChange={changeHandler}
                        name="role"
                      >
                        {RoleTemplates.map((val, index) => {
                          return (
                            <MenuItem key={index} value={val.template}>
                              {val.template}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>{" "}
                  </Grid>
                  <Grid item xs={2} />
                </>
              )}
              {view === INTERNAL_USERS_EDIT_VIEW && (
                <>
                  <Grid item xs={2} />
                  <Grid item xs={8}>
                    <FormControl
                      required
                      fullWidth
                      color="neutral"
                      size="small"
                    >
                      <InputLabel>Account Status</InputLabel>
                      <Select
                        value={info.status}
                        label="Account Status"
                        onChange={changeHandler}
                        name="status"
                      >
                        <MenuItem value={"Active"}>{"Active"}</MenuItem>
                        <MenuItem value="Disable">Disable</MenuItem>
                      </Select>
                    </FormControl>{" "}
                  </Grid>
                  <Grid item xs={2} />
                </>
              )}

              {(view === INTERNAL_USERS_EDIT_VIEW ||
                info.role === "Custom") && (
                <>
                  <Grid item xs={2} />
                  <Grid item xs={8}>
                    <div>Policies</div>
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item xs={0} sm={2} />
                  <Grid item xs={6} sm={4}>
                    <List className="UserListBorder">
                      <ListItem className="StickyListItem">
                        <ListItemText primary={"Available"} />
                      </ListItem>
                      {availableFeatures.map((val) => {
                        return (
                          <ListItemButton onClick={() => addFeature(val)}>
                            <ListItemText primary={val} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Grid>
                  <Grid item xs={5} sm={4}>
                    <List className="UserListBorder">
                      <ListItem className="StickyListItem">
                        <ListItemText primary={"Current"} />
                      </ListItem>
                      {currentFeatures.map((val) => {
                        return (
                          <ListItem
                            secondaryAction={
                              <DoNotDisturbAltIcon
                                onClick={() => removeFeature(val)}
                                sx={{ color: "gray" }}
                              />
                            }
                          >
                            <ListItemText primary={val} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                  <Grid item xs={0} sm={2} />
                </>
              )}
              {view === INTERNAL_USERS_CREATE_VIEW && (
                <>
                  <Grid item sm={2} />
                  <Grid item sm={2}>
                    <Button
                      onClick={createUser}
                      color="neutral"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item sm={8} />
                </>
              )}
              {view === INTERNAL_USERS_EDIT_VIEW && (
                <>
                  <Grid item sm={2} />
                  <Grid item sm={8}>
                    <div style={{ display: "flex", flexWrap: "nowrap" }}>
                      <Button
                        onClick={updateHandler}
                        color="neutral"
                        variant="outlined"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => navigate(-1)}
                        color="neutral"
                        variant="outlined"
                      >
                        Cancle
                      </Button>
                      <Button
                        onClick={() => setDeleteDialog(true)}
                        color="error"
                        variant="outlined"
                      >
                        Delete User
                      </Button>
                    </div>
                  </Grid>
                  <Grid item sm={2} />
                  {/* </Grid> */}
                  {/* <Grid item sm={6}/> */}
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to Delete User
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setDeleteDialog(false)}>
              Disagree
            </Button>
            <Button color="error" onClick={deleteHandler}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Users;
