import { useMemo } from "react";
import "./Table.scss";

interface IColumn {
  key: string;
  header: string;
  render: Function;
}

interface arrayOfObjects extends Array<{}> {}

interface ITable {
  data: arrayOfObjects;
  columns: IColumn[];
  emptyText?: string;
}

const Table = ({ data, columns, emptyText = "No hay datos" }: ITable) => {
  const head = useMemo(() => {
    return columns.map((column) => <th key={column.key}>{column.header}</th>);
  }, [columns]);

  const body = useMemo(() => {
    return data.map((row, index) => {
      return (
        <tr key={index}>
          {columns.map((column) => {
            return <td key={column.key}>{column.render(row, index)}</td>;
          })}
        </tr>
      );
    });
  }, [data]);

  return (
    <div className="mb-table-container">
      <div className="mb-table-col">
        <table className="table mb-table">
          <thead>
            <tr>{head}</tr>
          </thead>
          {data.length > 0 && <tbody>{body}</tbody>}
        </table>
        {data.length === 0 && <div className="empty-table">{emptyText}</div>}
      </div>
    </div>
  );
};

export default Table;
