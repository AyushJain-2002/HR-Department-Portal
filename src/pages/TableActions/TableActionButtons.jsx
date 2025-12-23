import React from "react";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { FaFileExcel, FaRegCopy } from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs"; // Import exceljs

const TableActionButtons = ({ tableData, tableColumns, fileName = "Data" }) => {
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const logo = '/assets/images/logo.jpg'; // You should replace this with your actual logo file or base64 string.
    doc.addImage(logo, 'JPG', 14, 10, 50, 25); // Position and size of the logo
    
    doc.text(`Notion Insurance Broker ${fileName} Table`, 70, 20);
    doc.autoTable({
      head: [tableColumns],
      body: tableData.map((row, index) => [...Object.values(row)]),
      startY: 40,
    });
    doc.save(`${fileName}.pdf`);
  };


const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(fileName);
  
    // Define the columns, include "SNO" and other column headers from `tableColumns`
    worksheet.columns = [
      ...tableColumns.map(col => ({
        header: col, 
        key: col.toLowerCase(), 
        width: col.length < 10 ? 10 : col.length + 5,  // Dynamic width for each column
      })),
    ];
  
    // Add the data (rows) to the worksheet, use the `SNO` from `tableDataWithSNO`
    tableData.forEach((row, index) => {
      const rowData = { sno: row.sno }; // Add Serial Number to the row
      tableColumns.forEach((col) => {
        if (col !== "SNO") {  // Skip "SNO" as it's already added
          rowData[col.toLowerCase()] = row[col];  // Add the rest of the data to the row
        }
      });
      worksheet.addRow(rowData);  // Add row to the worksheet
    });
  
    // Generate the Excel file and save it
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };
  
  
  const handleCopyData = () => {
    const copyData = tableData
      .map((row, index) => `${Object.values(row).join("\t")}`)
      .join("\n");

    navigator.clipboard
      .writeText(copyData)
      .then(() => alert("Table data copied to clipboard!"))
      .catch(() => alert("Failed to copy table data."));
  };


  return (
    <ButtonGroup>
      {/* <Button className="inline-flex gap-2 text-sm hover:bg-blue-gray-800" onClick={handleCopyData}>
        COPY <FaRegCopy className="text-white" />
      </Button> */}
      <Button className="inline-flex text-sm font-medium hover:bg-blue-gray-800 gap-2" onClick={handleDownloadExcel}>
        EXCEL <FaFileExcel className="text-white" />
      </Button>
      <Button className="inline-flex text-sm font-medium hover:bg-blue-gray-800 gap-2" onClick={handleDownloadPDF}>
        PDF <BsFileEarmarkPdfFill className="text-white" />
      </Button> 
    </ButtonGroup>
  );
};

export default TableActionButtons;
