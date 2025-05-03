import React, { useState } from "react";

interface DataTableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  totalRows: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onSearch: (query: string) => void;
  onFilterChange: (withDeleted: boolean) => void;
}

const DataTable = <T,>({
  columns,
  data,
  totalRows,
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
  onSearch,
  onFilterChange,
}: DataTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [withDeleted, setWithDeleted] = useState(false);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Upper Controls */}
      <div className="flex justify-between items-center mb-4">
        {/* Search & Filter */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
            className="border px-2 py-1 rounded"
          />
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={withDeleted}
              onChange={() => {
                setWithDeleted(!withDeleted);
                onFilterChange(!withDeleted);
              }}
            />
            With Deleted
          </label>
        </div>

        {/* Add Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Add
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th key={col.key.toString()} className="border px-3 py-2">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="border">
                {columns.map((col) => (
                  <td key={col.key.toString()} className="border px-3 py-2">
                    {row[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-3">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        {/* Left */}
        <div className="text-sm">
          {`${(currentPage - 1) * perPage + 1}-${Math.min(
            currentPage * perPage,
            totalRows
          )} of ${totalRows}`}
        </div>

        {/* Middle */}
        <div className="flex items-center gap-2">
          <button
            className="border px-2 py-1 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="border px-2 py-1 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
