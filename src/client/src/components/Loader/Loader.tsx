import React from "react";

import { Dimmer, Loader as BaseLoader } from "semantic-ui-react";

const Loader = () => {
  return (
    <>
      <Dimmer active>
        <BaseLoader>Loading</BaseLoader>
      </Dimmer>
    </>
  );
};

export default Loader;
