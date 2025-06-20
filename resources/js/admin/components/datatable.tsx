import React, { useState, useEffect, useRef } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/admin/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/admin/components/ui/select"
import { FilterIcon, Plus } from 'lucide-react';
import { Button } from '@/admin/components/ui/button';
import { Input } from '@/admin/components/ui/input';
import { MultiActions } from '@/admin/components/multi-actions';
import { useDebounce } from '@/admin/hooks/use-debounce';


interface Column {
  key: string;
  header: string;
  sortTable?: boolean;
}

type DataTableProps<T> = {
  columns: Column[];
  data: T[];
  rowsPerPage: number;
  currentPage: number;
  totalPages: number;
  totalRows: number;
  filter: React.ReactNode;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
  onWithDeletedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSort: (colKey: string, sortOrder: string) => void;
  onRowSelect: (selectedRows: T[]) => void;
  onRowsPerPageChange: (rowsPerpage: number) => void;
  onButtonClick: () => void;
  onMultiRestore: () => void;
  onMultiDelete: () => void;
  onMultiSendEmail?: () => void;
};

export default function DataTable<T>({
  columns,
  data,
  currentPage,
  totalPages,
  onSearch,
  onPageChange,
  onSort,
  onWithDeletedChange,
  totalRows,
  rowsPerPage = 15,
  filter,
  onRowSelect,
  onRowsPerPageChange,
  onButtonClick,
  onMultiDelete,
  onMultiRestore,
  onMultiSendEmail,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const search = useDebounce(searchTerm, 1000);
  const previousPageRef = useRef(currentPage);
  const multiActionRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(startItem + rowsPerPage - 1, totalRows);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderCellContent = (value: any, colKey: string) => {
    if (colKey === 'img' && typeof value === 'string') {
      return <img src={value} alt="User" width="50" height="50" />;
    } else if (React.isValidElement(value)) {
      return value;
    }
    return String(value);
  };

  const renderSortIcon = (colKey: string) => {
    if (sortColumn !== colKey) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const handleSort = (column: string) => {
    if (column) {
      if (sortColumn === column) {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        onSort(column, newSortOrder);
      } else {
        setSortColumn(column);
        setSortOrder('asc');
        onSort(column, 'asc');
      }
      setSelectAll(false);
      setSelectedRows([]);
      onRowSelect([]);
    }
  };

  const handleRowSelect = (row: T) => {
    const alreadySelected = selectedRows.find((selected) => selected === row);
    const newSelectedRows = alreadySelected
      ? selectedRows.filter((selected) => selected !== row)
      : [...selectedRows, row];
    setSelectedRows(newSelectedRows);
    onRowSelect(newSelectedRows);
  };


  useEffect(() => {
    if (onSearch) {
      onSearch(search);
    }
  }, [search]);

  useEffect(() => {
    if (currentPage !== previousPageRef.current) {
      setSelectAll(false);
      setSelectedRows([]);
      onRowSelect([]);
      previousPageRef.current = currentPage;
    }
  }, [currentPage, onRowSelect]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedNode = event.target as Node;


      if (
        multiActionRef.current &&
        tableRef.current &&
        !multiActionRef.current.contains(clickedNode) &&
        !tableRef.current.contains(clickedNode)
      ) {
        setSelectedRows([]);
        setSelectAll(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [multiActionRef, tableRef, setSelectedRows, setSelectAll]);


  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {filter && (
          <Button
            variant="outline"
            className="w-9 h-9 mr-4 select-none"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FilterIcon className={`transform transition-transform duration-500 ${showFilter ? 'rotate-180' : 'rotate-0'}`} />
          </Button>
        )}
        <Input
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/5"
        />
        <div className="ml-auto flex space-x-4">
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              className="w-4 h-4"
              onChange={onWithDeletedChange}
            />
            <span>with deleted</span>
          </label>
          <Button onClick={onButtonClick} className="w-40" ><Plus /></Button>
        </div>
      </div>
      <div className={`transition-all duration-500  ease-in-out ${showFilter ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {filter}
      </div>
      {selectedRows.length > 0 && (
        <div ref={multiActionRef} className="absolute left-12 top-34 p-2 bg-white border border-gray-300 shadow-lg z-10 w-96 rounded-lg">
          <MultiActions
            onMultiDelete={onMultiDelete}
            onMultiRestore={onMultiRestore}
            onMultiSendEmail={onMultiSendEmail}
            selectedRows={selectedRows}
          />
        </div>
      )}
      <Table ref={tableRef}>
        <TableHeader className="select-none">
          <TableRow>
            <TableCell className="p-2 dark:bg-gray-200/50 backdrop-blur-md shadow-lg">
              <Input
                type="checkbox"
                className="w-4 h-4 "
                checked={selectAll}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectAll(checked);
                  if (checked) {
                    setSelectedRows(data);
                    onRowSelect(data);
                  } else {
                    setSelectedRows([]);
                    onRowSelect([]);
                  }
                }}
              />


            </TableCell>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                onClick={() => col.sortTable && handleSort(col.key)}
                className={`dark:bg-gray-200/50 backdrop-blur-md shadow-lg ${col.sortTable ? 'cursor-pointer' : ''}`}
              >
                {col.header} {col.sortTable && renderSortIcon(col.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <TableRow
                key={idx}
                className={`${idx % 2 === 0 ? 'bg-gray-100 dark:bg-black' : 'bg-white dark:bg-black'} ${(row as { isDeleted?: boolean }).isDeleted ? 'dark:bg-red-300 bg-red-300 hover:bg-red-400 dark:hover:bg-red-400 text-white' : ''}`}
              >
                <TableCell className="p-2">
                  <Input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleRowSelect(row)}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={col.key} className="text-black dark:text-white">
                    {renderCellContent(row[col.key as keyof T], col.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="text-center text-black dark:text-white">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center font-mono">
        <div>
          <div className="font-mono text-sm text-[#687182] p-2 font-medium">{startItem}-{endItem}  of {totalRows}</div>
        </div>
        <div>
          <span>
            page {currentPage}  of {totalPages}
          </span>
        </div>

        <div className="space-x-4 flex flex-row">
          <div className="mr-10 flex flex-row items-center">
            <span className="whitespace-nowrap">rows per page</span>
            <Select value={rowsPerPage.toString()} onValueChange={(value) => onRowsPerPageChange(Number(value))}>
              <SelectTrigger className="ml-2 border border-gray-300 rounded px-2 py-1">
                <SelectValue placeholder={rowsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            previous
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            next
          </Button>
        </div>
      </div>
    </div>
  );
}
