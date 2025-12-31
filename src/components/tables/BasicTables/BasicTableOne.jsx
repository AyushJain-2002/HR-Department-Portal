import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";

// Reusable Basic Table Component
export default function BasicTableOne({ 
  tableData = [], 
  tableHeaders = [], 
  columnKeys = [],
  handleDelete,
  idKey = "id",
  loading = false 
}) {
  
  // Show loading state
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell 
                  colSpan={tableHeaders.length}
                  className="px-5 py-8 text-center text-gray-500"
                >
                  Loading cities...
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!tableData || tableData.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell 
                  colSpan={tableHeaders.length}
                  className="px-5 py-8 text-center text-gray-500"
                >
                  No cities found
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Function to render cell content based on column type
  const renderCellContent = (item, column) => {
    const value = item[column.key];
    
    // Handle actions column
    if (column.key === 'actions' && column.actions) {
      return (
        <div className="flex gap-2">
          {column.actions.includes('edit') && (
            <button 
              onClick={() => console.log('Edit', item[idKey])}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
          {column.actions.includes('delete') && (
            <button 
              onClick={() => handleDelete(item[idKey])}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
          {column.actions.includes('view') && (
            <button 
              onClick={() => console.log('View', item[idKey])}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            >
              View
            </button>
          )}
        </div>
      );
    }
    
    // Handle serial number
    if (column.key === 'sno') {
      return tableData.indexOf(item) + 1;
    }
    
    // Handle status with badges
    if (column.key === 'status') {
      const statusColors = {
        'Active': 'success',
        'Pending': 'warning',
        'Inactive': 'error',
        'Active': 'success',
        'pending': 'warning',
        'inactive': 'error'
      };
      
      return (
        <Badge
          size="sm"
          color={statusColors[value] || 'default'}
        >
          {value}
        </Badge>
      );
    }
    
    // Default case - return the value
    return value || '-';
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((item, index) => (
              <TableRow key={item[idKey] || index}>
                {columnKeys.map((column, colIndex) => (
                  <TableCell 
                    key={colIndex}
                    className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90"
                  >
                    {renderCellContent(item, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
