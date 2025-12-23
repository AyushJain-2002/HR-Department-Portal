import React, { useState } from "react";
import {
  Typography,
  Select,
  Option,
  IconButton,
  Button,
  ButtonGroup,
  CardBody,
  Card,
  CardHeader,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { MdDeleteForever } from "react-icons/md";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFileExcel,
  FaRegCopy,
  FaRegEdit,
} from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs"; // Import exceljs
// import { useDispatch } from "react-redux";
// import FormDynamic from "./FormDynamic";
// import { updateBranch } from "../../../store/Actions/BranchAction";
import { Link } from "react-router-dom";
import { GrUserManager } from "react-icons/gr";
import Loading from "../Loading";
import { toast } from "react-toastify";

const ReusableTable = ({
  tableData = [],
  handleDelete,
  handleToggle,
  columnKeys,
  fileName,
  idKey,
  handleEditBranch,
  handleEditUser,
  titlename,
  loading,
}) => {
  // Filter the table data based on search query

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = Array.isArray(tableData)
    ? tableData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // const handlePageChange = (newPage) => {
  //   if (newPage > 0 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };
  const handlePageChange = (newPage) => {
    const validatedPage = Math.min(Math.max(newPage, 1), totalPages);
    setCurrentPage(validatedPage);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filteredData.length]);

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = filteredData
    .slice(startIndex, startIndex + rowsPerPage)
    .map((row, idx) => ({
      ...row,
      sno: startIndex + idx + 1, // Add serial number dynamically
    }));
  // Excel download handler
  const handleDownloadExcelAction = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(fileName);

    // Filter out the "actions" column for Excel export
    const filteredColumnKeys = columnKeys.filter(
      (col) => col.key !== "actions" && col.key !== "sno"
    );

    // Define columns, adding "S NO" as the first column
    worksheet.columns = [
      { header: "S NO", key: "sno", width: 10 }, // Adding serial number as the first column
      ...filteredColumnKeys.map((col) => ({
        header: col.label,
        key: col.key,
        width: Math.max(col.label.length + 5, 10), // Adjust column width based on label length
      })),
    ];

    // Add rows with serial numbers dynamically
    tableData.forEach((row, index) => {
      const rowData = {
        sno: index + 1, // Add serial number starting from 1
      };

      // Add data for each column except "actions"
      filteredColumnKeys.forEach((col) => {
        rowData[col.key] = row[col.key]; // Add data for each column
      });

      // Add the row to the Excel sheet
      worksheet.addRow(rowData);
    });

    // Generate the Excel file and trigger the download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  // PDF download handler
  const handleDownloadPDFAction = () => {
    const doc = new jsPDF();
    const logo = "/assets/images/logo.jpg";

    // Add a logo to the PDF (optional)
    doc.addImage(logo, "JPG", 14, 10, 50, 25);

    // Add a title
    doc.text(`${fileName} Table`, 70, 20);

    // Filter out the "Actions" column
    const filteredColumnKeys = columnKeys.filter(
      (col) => col.key !== "actions"
    );

    // Prepare table headers
    const headers = filteredColumnKeys.map((col) => col.label);

    // Prepare table body with serial numbers
    const body = tableData.map((row, index) => {
      const rowData = {};
      filteredColumnKeys.forEach((col) => {
        if (col.key === "sno") {
          rowData[col.key] = index + 1; // Add serial number dynamically
        } else {
          rowData[col.key] = row[col.key];
        }
      });
      return Object.values(rowData); // Convert rowData object into an array
    });

    // Add the table to the PDF
    doc.autoTable({
      head: [headers],
      body: body,
      startY: 40,
    });

    // Save the PDF
    doc.save(`${fileName}.pdf`);
  };








  
  const getNestedValue = (obj, key) => {
    return key.split(".").reduce((acc, part) => {
      return acc ? acc[part] : undefined;
    }, obj);
  };
  const [openPopover, setOpenPopover] = React.useState(null); // Single state for tracking open popover
  const handleConfirmToggle = (toggleId, isChecked) => {
    const actionMessage = isChecked
      ? "Are you sure you want to deactivate this employee's account?" // If checked (true), deactivate
      : "Are you sure you want to activate this employee's account?"; // If unchecked (false), activate

    toast.dismiss();
    toast.info(
      <div>
        <p>{actionMessage}</p>
        <button
          onClick={() => {
            handleToggle(toggleId); // ✅ Call toggle after confirmation
            toast.dismiss();
          }}
          style={{
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          Confirm
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: false,
      }
    );
  };

  const Switcher4 = ({ isChecked, toggleId }) => {
    return (
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative h-5 w-9">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleConfirmToggle(toggleId, isChecked)}
            className="sr-only"
          />
          <div
            className={`block h-full w-full rounded-full ${
              isChecked ? "bg-green-600" : "bg-red-600"
            }`}
          ></div>
          <div
            className={`absolute top-[1.7px] h-4 w-4 rounded-full bg-white transition-all ${
              isChecked ? "translate-x-[100%]" : "left-1"
            }`}
          ></div>
        </div>
      </label>
    );
  };

  const renderActions = (actions, row, rowIndex) => {
    return actions.map((action, actionIndex) => {
      const popoverId = `${rowIndex}-${actionIndex}`; // Unique ID per button
      let icon,
        label,
        onClick,
        link = null;

      if (action === "delete") {
        icon = <MdDeleteForever className="text-2xl text-red-800" />;
        label = "Delete";
        onClick = () => handleDelete(row[idKey] || row.id);
      }
       else if (action === "edit") {
        icon = <FaRegEdit className="text-2xl text-blue-600" />;
        label = "Edit";
        onClick = () => handleEditBranch(row[idKey] || row.id || rowIndex);
      } 
      // else if (action === "editUser") {
      //   icon = <GrUserManager className="text-2xl text-green-700" />;
      //   label = "Edit ";
      //   onClick = () => handleEditUser(row[idKey] || row.id || rowIndex);
      // } 
      else if (action.type === "editOther") {
        icon = <GrUserManager className="text-2xl text-green-700" />;
        label = "Edit Manager";
        link = action.redirectTo.replace(":id", row[idKey] || row.id);
      } 
      
      else if (action.type === "editOtherPage") {
        icon = <FaRegEdit className="text-2xl text-blue-600" />;
        label = "Edit User";
        link = action.redirectTo.replace(":id", row[idKey] || row.id);
      }

      return (
        <div key={popoverId} className="relative group inline-block">
          {link ? (
            <>
              <Link to={link}>
                <button className="bg-transparent p-2  rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
                  {icon}
                </button>
              </Link>
              <Link
                to={link}
                className="opacity-0 -top-full invisible right-0 group-hover:opacity-100 group-hover:visible absolute w-fit bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg   z-10"
              >
                <p className="px-1 py-1 text-xs">{label}</p>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={onClick}
                className="bg-transparent p-2 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                {icon}
              </button>
              <button
                onClick={onClick}
                className="opacity-0 -top-full invisible right-0 group-hover:opacity-100 group-hover:visible absolute w-fit bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg   z-10"
              >
                <p className="px-2 py-2">{label}</p>
              </button>
            </>
          )}

          {/* Popover Content */}
        </div>
      );
    });
  };
  const statusActions = (row, rowIndex) => {
    return (
      <Switcher4
        key={rowIndex}
        isChecked={row.active} // Controlled by `row.active`
        toggleId={row.id} // Pass row.id when toggled
      />
    );
  };

  const renderBoolean = (value) => {
    return value ? "Verified" : "Non Verified";
  };

  // const renderBooleanActive = (value) => {
  //   return value ? "Active" : "De-Activate";
  // };

  const renderBooleanActive = (value) => {
    const isActive = value === "1" || value === 1 || value === true;
    return (
      <span
        className={`font-semibold ${
          isActive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isActive ? "Active" : "De-Activate"}
      </span>
    );
  };

  // Function to render image fields
  const renderImage = (imageUrl) => {
    return imageUrl ? (
      <a href={imageUrl} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt="Image" style={{ width: 50, height: 50 }} />
      </a>
    ) : (
      "No image"
    );
  };

  // sorting

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Sorting logic
  const handleSort = (columnKey) => {
    let direction = "asc";
    if (sortColumn === columnKey && sortDirection === "asc") {
      direction = "desc";
    }
    setSortColumn(columnKey);
    setSortDirection(direction);
  };

  // Sort visibleRows before rendering
  const sortedRows = [...visibleRows].sort((a, b) => {
    const valueA = a[sortColumn] ?? "";
    const valueB = b[sortColumn] ?? "";

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }
  });

  return (
    <Card className="h-full border w-full mt-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Table Action Buttons */}
          <ButtonGroup>
            <Button
              className="inline-flex text-sm font-medium tracking-widest items-center justify-center font-pt_serif hover:bg-blue-gray-800 gap-2"
              onClick={handleDownloadExcelAction}
            >
              EXCEL <FaFileExcel className="text-white mb-0.5" />
            </Button>
            <Button
              className="inline-flex text-sm tracking-widest items-center justify-center font-medium font-pt_serif hover:bg-blue-gray-800 gap-2"
              onClick={handleDownloadPDFAction}
            >
              PDF <BsFileEarmarkPdfFill className="text-white mb-0.5" />
            </Button>
          </ButtonGroup>

          <div className="flex w-full md:w-72">
            <input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 font-pt_serif rounded-md px-3 py-2"
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="pt-0 px-0 ">
        <div
          className={` ${
            columnKeys.length > 9 ? "overflow-x-scroll" : ""
          } overflow-x-scroll `}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {columnKeys.map((col, index) => (
                  <th
                    key={index}
                    className={`border-b border-r text-center border-blue-gray-100 bg-blue-gray-50 py-5 px-4 ${
                      col.label === "Action" ||
                      col.label === "Actions" ||
                      col.label === "Status"
                        ? ""
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (col.label !== "Action" && col.label !== "Status") {
                        handleSort(col.key);
                      }
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="font-extrabold text-[16px] text-black text-center font-pt_serif leading-none opacity-70 flex items-center justify-center gap-1"
                    >
                      {col.label}
                      {col.label === "Action" ||
                      col.label === "Status" ||
                      col.label === "Actions" ? null : sortColumn ===
                        col.key ? (
                        sortDirection === "asc" ? (
                          "▲"
                        ) : (
                          "▼"
                        )
                      ) : (
                        <span className="opacity-50">⇅</span>
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {sortedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columnKeys.length}
                    className="p-4 text-center text-gray-500"
                  >
                    <Typography variant="small">
                      No {fileName} data found
                    </Typography>
                  </td>
                </tr>
              ) : loading ? (
                <tr>
                  <td colSpan={columnKeys.length} className="h-40 text-center">
                    <Loading />
                  </td>
                </tr>
              ) : (
                sortedRows.map((row, index) => {
                  const isLast = index === sortedRows.length - 1;
                  return (
                    <tr key={index}>
                      {columnKeys.map((col, colIndex) => {
                    
                        let trimmedKey = col.key.trim();
                        let cellValue = trimmedKey.includes(".")
                          ? getNestedValue(row, trimmedKey)
                          : row[trimmedKey];
                        let displayValue = cellValue;
                    
                        if (trimmedKey === titlename && row.title) {
                          displayValue = `${row.title} ${cellValue}`;
                        }
                        if (
                          trimmedKey === "email_verification" ||
                          trimmedKey === "documents_verification"
                        ) {
                          displayValue = renderBoolean(cellValue);
                        }
                        if (trimmedKey === "active") {
                          displayValue = renderBooleanActive(cellValue);
                        }
                    
                        return (
                          <td
                            key={colIndex}
                            className="px-4 py-2  text-center border-b border-r border-gray-200"
                          >
                            {trimmedKey === "actions" ? (
                              renderActions(col.actions, row, index)
                            ) : trimmedKey === "statuses" ? (
                              statusActions(row, index) // ✅ Properly renders toggle switch
                            ) : (
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal font-pt_serif text-base"
                              >
                                {(displayValue || displayValue === 0) ? displayValue : "—"}
                                {/* Fallback to em dash if empty */}
                              </Typography>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
        </div>
        <div className="flex justify-between w-full flex-col md:flex-row gap-4 px-6 py-3">
          <div className="md:flex hidden items-center gap-2">
            <Typography className="w-40 font-pt_serif " variant="small">
              Rows per page:
            </Typography>
            <Select
              value={String(rowsPerPage)}
              onChange={handleRowsPerPageChange}
            >
              <Option value="10">10</Option>
              <Option value="30">30</Option>
              <Option value="50">50</Option>
              <Option value="100">100</Option>
              {/* <Option value="500">500</Option>
              <Option value="1000">1000</Option> */}
            </Select>
          </div>
          <div className="flex items-center justify-between font-pt_serif gap-2">
            <Button
              className="font-pt_serif"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <span className="hidden md:inline">Previous</span>
              <span className="md:hidden">
                <FaArrowLeft />
              </span>
            </Button>
            <Typography className="font-pt_serif" variant="small">
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              className="font-pt_serif"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <span className="hidden md:inline">Next</span>
              <span className="md:hidden">
                <FaArrowRight />
              </span>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReusableTable;
