import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Endpoint } from "../../Services/endpoints";
import CircularLoader from "../../SubComponents/CircularLoader";

const ValidateTable = ({ children, ...rest }) => {
  const endpoint = new Endpoint();
  const [state, setState] = useState(0);
  const params = useParams();

  useEffect(() => {
    const getResponse = async () => {
      let response = await endpoint.TableCheck({ table: params.table });
      if (response !== "Error") {
        setState(2);
      } else {
        setState(1);
      }
    };
    getResponse();
  }, []);

  switch (state) {
    case 1:
      return <Navigate to="/notfound" />;
    case 2:
      return children;
    default:
      return (
        <CircularLoader/>
      );
  }

  // contextAccess.user ? children : <Navigate to="/users/login" />
};

export default ValidateTable;
