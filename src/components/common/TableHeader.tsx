import React, { Component } from "react";
import ColumnsType from "../../models/columnsType";
import sortColumnType from "../../models/sortColumnType";

interface TableHeaderProps {
  columns: ColumnsType[];
  sortColumn: sortColumnType;
  onSort: (path: sortColumnType) => void;
}

interface TableHeaderState {}

class TableHeader extends Component<TableHeaderProps, TableHeaderState> {
  // state = { :  }
  raiseSort = (path: string) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
