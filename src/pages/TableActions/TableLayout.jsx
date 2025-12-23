import { useState, useMemo, useCallback, useEffect } from "react";
import { Typography, Option } from "@material-tailwind/react";
import { FaArrowLeft, FaArrowRight, FaFileExcel } from "react-icons/fa";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select"
import SearchBar from "../../components/common/SearchBar";
const TableLayout = ({
  heading,
  columns = [],
  defaultRowsPerPage = 10,
  enableSearch,
  onChange,
  onDelete,
  // searchQuery,
  enableExcel = false,
  rowColor = "",
  // visibleRows,
  resetFilters,
  filteredData=[]
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [totalPages,setTotalPages]=useState(Math.ceil(filteredData.length / defaultRowsPerPage))
  const options=[
    {label: 10, value: 10},
    {label: 30, value: 30},
    {label: 50, value: 50}
  ]
  const startIndex = (page - 1) * rowsPerPage;
  const [searchQuery,setSearchQuery]=useState("")
  // console.log(columns)
  const SearchedData = useMemo(() => {
          if (!searchQuery) return filteredData;
        
          const lower = searchQuery.toLowerCase();
        
          return filteredData.filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(lower)
            )
          );
        }, [filteredData, searchQuery]);
        // 1️⃣ Update totalPages when SearchedData or rowsPerPage changes
        useEffect(() => {
          setTotalPages(Math.ceil(SearchedData.length / rowsPerPage));
        }, [SearchedData, rowsPerPage]);

  const visibleRows = useMemo(() => {
      return SearchedData
        .slice(startIndex, startIndex + rowsPerPage)
        .map((row, idx) => ({
          ...row,
          sno: startIndex + idx + 1,
        }));
    }, [SearchedData, startIndex, rowsPerPage]);
  // Sorting
  
  const handleSort = (key) => {
    let dir = sortDir === "asc" ? "desc" : "asc";
    setSortColumn(key);
    setSortDir(dir);
  };
    const sortedData = useMemo(() => {
    return [...visibleRows].sort((a, b) => {
      const valueA = a[sortColumn] ?? "";
      const valueB = b[sortColumn] ?? "";

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDir === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortDir === "asc" ? valueA - valueB : valueB - valueA;
      }
    });
  }, [visibleRows, sortColumn, sortDir]);

  // console.log("SortedData",sortedData)
  // Pagination
  // const totalPage =(SearchedData,defaultRowsPerPage)=> Math.ceil(SearchedData.length / defaultRowsPerPage);
  // const visibleRows = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  
  // Excel export
  const downloadExcel = useCallback(async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Operation Business Report");
  
      // Define columns
      worksheet.columns = [
        { header: "S NO", key: "sno", width: 10 },
        ...columns.filter(col => col.key !== "sno").map((col) => ({
          header: col.label,
          key: col.key,
          width: Math.max(col.label.length + 5, 10),
        })),
      ];
  
      // Add rows with serial numbers
      SearchedData.forEach((row, index) => {
        const rowData = { sno: index + 1 };
        columns.forEach((col) => {
          if (col.key !== "sno") {
            rowData[col.key] = row[col.key];
          }
        });
        worksheet.addRow(rowData);
      });
  
      // Generate and download Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "Operation_Business_Report.xlsx");
    }, [columns, SearchedData]);
    
     const handlePageChange = useCallback(
        (newPage) => {
          const validatedPage = Math.min(Math.max(newPage, 1), totalPages);
          setPage(validatedPage);
        },
        [totalPages]
      );
      const handleRowsPerPageChange = useCallback((value) => {
        if(value!==null){
          setRowsPerPage(Number(value.value));
        }
        setPage(1);
      }, []);
  return (
    <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">     
      <div className="rounded-none px-5 pt-5  bg-white dark:bg-black/[0.03]" >
      <div className="text-center">{heading}</div>
        <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          
          {enableExcel && (
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Button onClick={downloadExcel} className="inline-flex text-sm font-medium tracking-widest items-center justify-center font-pt_serif hover:bg-blue-gray-800 gap-2 w-28">
                      Excel <FaFileExcel className="text-white mb-0.5"/>
                  </Button>

                  {/* {(filters.dateType || filters.branch || searchQuery) && (
                <Button
                    variant="outlined"
                    onClick={resetFilters}
                    className="inline-flex text-sm tracking-widest items-center justify-center font-medium font-pt_serif hover:bg-blue-gray-800 gap-2 md:ml-4 md:inline-flex md:self-center"
                >
                    Clear Filters
                </Button>
                )} 
                 */}
              </div>
          )}
          
        {enableSearch && (
            <div className="flex  md:w-72">
                <SearchBar
                  value={searchQuery}
                  onChange={(value) => setSearchQuery(value)}
                  placeholder="Search..." 
                />  
            </div>
        )}
        </div>
      </div>
        
        <div className="md:flex hidden pb-5 w-1/3 items-center gap-2 px-5">
            <Typography className="w-40  font-pt_serif dark:text-gray-500" variant="small">
              Rows per page:
            </Typography>
            <Select
              defaultValue={String(rowsPerPage)}
              onChange={handleRowsPerPageChange}
              options={options}

            />
              {/* <Option value="10">10</Option>
              <Option value="30">30</Option>
              <Option value="50">50</Option> */}
          </div>
      <div className="overflow-auto no-scrollbar">
        <div className="px-5 flex justify-between flex-col gap-4 max-w-screen-lg min-w-full">
        <table className=" text-sm whitespace-nowrap">
          <thead className="border-y border-gray-200 dark:border-gray-700" >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className=" p-2 cursor-pointer text-center select-none font-semibold text-gray-500  text-theme-xs dark:text-gray-400"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortColumn === col.key && (sortDir === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {sortedData.map((row, i) => (
              <tr key={i} >
                {columns.map((col) => (
                    
                        <td key={col.key} className="px-4 py-3 text-center text-gray-500  text-theme-sm dark:text-gray-400">

                        {/* This line is crucial - it checks for custom render function */}
                          {col.render ? col.render(row) : row[col.key]}
                        </td>
                ))}
              </tr>
            ))}
          </tbody>

        
        </table>

        </div>
      </div>
        {/* Pagination */}
        <div className="p-5 flex items-center justify-between font-pt_serif gap-2 dark:text-gray-600">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="flex items-center gap-2 font-pt_serif"
          >
            <FaArrowLeft /> Prev
          </Button>

            <Typography className="font-pt_serif" variant="small">
              Page {page} of {totalPages}
            </Typography>

          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="flex items-center gap-2 font-pt_serif"
          >
            Next <FaArrowRight />
          </Button>
        </div>
    </div>
  );
};

export default TableLayout;
