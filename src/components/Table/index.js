import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ columns = [], rows = [], rowKey }) => (
  <table>
    <tbody>
      <tr>
        {columns.map((col, idx) => (
          <th key={idx}> {col.headerName} </th>
        ))}
      </tr>
      {rows.map((row, index) => {
        return (
          <tr key={row[rowKey] || index}>
            {columns.map((col, idx) => {
              if (col.renderCell) {
                return <td key={idx}>{col.renderCell({ col, row })}</td>;
              }
              return <td key={idx}>{row[col?.field]}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  </table>
);

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  rowKey: PropTypes.string,
};

export default Table;
