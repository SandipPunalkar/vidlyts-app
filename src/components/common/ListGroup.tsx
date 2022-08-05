import React from "react";
import Genre from "../../models/genreTypes";

interface ListGroupProps {
  items: Genre[];
  selectedItem: Genre | string;
  onItemSelect: (genre: Genre) => void;
}
function ListGroup({ items, selectedItem, onItemSelect }: ListGroupProps) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item._id}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
