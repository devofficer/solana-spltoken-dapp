import React from "react";

import { Page } from "components";
import { Template } from "views";

// 500 error page
const Page500 = () => {
  return (
    <Page name="500">
      <Template title="500. Internal Server Error" />
    </Page>
  );
};

export default Page500;
