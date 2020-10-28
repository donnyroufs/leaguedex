import React from "react";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";

const Verify = () => (
  <Loader.Container hide={false} secondary>
    <MoonLoader color="#B8D0EC" />
  </Loader.Container>
);

export default Verify;
