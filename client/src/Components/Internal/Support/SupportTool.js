import { Card, CardContent, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SupportTool = () => {
  return (
    <>
      <div>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Link
                  to="/internal/support/user/create"
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Create a User
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Link
                  to="/internal/support/users/view"
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    View Users
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Link
                  to="/internal/support/table/create"
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Create Table
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SupportTool;
