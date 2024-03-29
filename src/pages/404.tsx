import React from "react";

import { Page } from "components";
import { Template } from "views";

// 404 error page
const Page404 = () => {
  return (
    <Page name="404">
      <Template title="404. Page Not Found" />
    </Page>
  );
};

export default Page404;
