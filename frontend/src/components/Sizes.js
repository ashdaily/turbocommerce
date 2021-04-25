import React from "react";

const Sizes = (props) => {
  return (
    <tr>
      <td>Sizes</td>
      <td>
        <ul
          className="sizes-variant"
          style={{
            padding: "0px",
            marginBottom: "10px",
          }}
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
