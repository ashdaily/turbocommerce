import React from "react";

const Sizes = (props) => {
  return (
    <tr>
      <td>Sizes</td>
      <td>
        <ul
          className="sizes-variant p-0 mb-1"
        >
        {props.sizes.map((item) => (
          <li
            className={props.size === item.size.name ? "active mr-2" : "mr-2"}
            variant="outline-primary"
            size="sm"
            onClick={() => props.onClick(item.size.name)}
          >
            {item.size.name}
          </li>
        ))}
        </ul>
      </td>
    </tr>
  );
};

export default Sizes;
