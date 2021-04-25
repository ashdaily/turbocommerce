import React from "react";
import Breadcrumbs from "react-router-dynamic-breadcrumbs";

const routes = {
  "/": "Home",
  "/:grandParentCategory": (url, match) => `${match[':grandParentCategory'].replace('-', ' ')[0].toUpperCase()}${match[':grandParentCategory'].replace('-', ' ').slice(1)}`,
  "/:grandParentCategory/:parentCategory": (url, match) => `${match[':parentCategory'].replace('-', ' ')[0].toUpperCase()}${match[':parentCategory'].replace('-', ' ').slice(1)}`,
  "/:grandParentCategory/:parentCategory/:childCategory": (url, match) => `${match[':childCategory'].replace('-', ' ')[0].toUpperCase()}${match[':childCategory'].replace('-', ' ').slice(1)}`,
  "/:grandParentCategory/:parentCategory/:childCategory/:slug": (url, match) => `${match[':slug'].replace('-', ' ')[0].toUpperCase()}${match[':slug'].replace('-', ' ').slice(1)}`,
  "/:id": ":id",
};

export default () => {
  return <Breadcrumbs mappedRoutes={routes} />;
};
