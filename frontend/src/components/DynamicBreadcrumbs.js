import React from "react";
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';


const routes = {
   '/': 'Home',
   '/:id': ':id',
}


export default ()=> {
    return (
        <Breadcrumbs mappedRoutes={routes} />
    );
}
