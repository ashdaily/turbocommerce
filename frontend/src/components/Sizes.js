import React from "react";
import { Button } from "react-bootstrap";

const Sizes = (props) => {
  return (
    <tr>
      <td>Sizes</td>
      <td>
        {props.sizes.map((item) => (
          <Button
            className={props.size === item.size.name ? "active mr-2" : "mr-2"}
            variant="outline-primary"
            size="sm"
            onClick={() => props.onClick(item.size.name)}
          >
            {item.size.name}
          </Button>
        ))}
      </td>
    </tr>
  );
};

export default Sizes;
