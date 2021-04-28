import React from "react";
import Breadcrumbs from "react-router-dynamic-breadcrumbs";

import { removeHyphenAndCapitalize } from '../util/Helpers'

const routes = {
  "/": "Home",
  "/:grandParentCategory": (url, match) => removeHyphenAndCapitalize(match[':grandParentCategory']),
  "/:grandParentCategory/:parentCategory": (url, match) => removeHyphenAndCapitalize(match[':parentCategory']),
  "/:grandParentCategory/:parentCategory/:childCategory": (url, match) => removeHyphenAndCapitalize(match[':childCategory']),
  "/:grandParentCategory/:parentCategory/:childCategory/:slug": (url, match) => removeHyphenAndCapitalize(match[':slug']),
  "/:id": ":id",
};

export default () => {
  return <Breadcrumbs mappedRoutes={routes} />;
};
