import React from "react";
import Breadcrumbs from "react-router-dynamic-breadcrumbs";

import { removeHyphensAndCapitalize } from '../util/Helpers'

const routes = {
  "/": "Home",
  "/:grandParentCategory": (url, match) => removeHyphensAndCapitalize(match[':grandParentCategory']),
  "/:grandParentCategory/:parentCategory": (url, match) => removeHyphensAndCapitalize(match[':parentCategory']),
  "/:grandParentCategory/:parentCategory/:childCategory": (url, match) => removeHyphensAndCapitalize(match[':childCategory']),
  "/:grandParentCategory/:parentCategory/:childCategory/:slug": (url, match) => removeHyphensAndCapitalize(match[':slug']),
  "/:id": ":id",
};

export default () => {
  return <Breadcrumbs mappedRoutes={routes} />;
};
