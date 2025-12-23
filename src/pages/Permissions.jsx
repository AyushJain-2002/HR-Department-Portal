import React, { useState, useEffect } from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  Select,
  Option,
  Checkbox,
} from "@material-tailwind/react";

// Define permission categories
const permissionCategories = ["Employee", "POSP", "MISP"];

const Permissions = () => {
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("Bhopal");
  const [selectedDepartment, setSelectedDepartment] = useState("Admin");

  // Mock data (this would come from your backend)
  const userPermissionsData = [
    {
      name: "John Doe",
      code: "JD123",
      permissions: [
        { id: 1, name: "Employee_Create" },
        { id: 2, name: "Employee_Update" },
        { id: 3, name: "Employee_Delete" },
        { id: 4, name: "Employee_View" },
        { id: 5, name: "POSP_Create" },
        { id: 6, name: "POSP_Update" },
        { id: 7, name: "POSP_Delete" },
        { id: 8, name: "POSP_View" },
        { id: 9, name: "MISP_Create" },
        { id: 10, name: "MISP_Update" },
        { id: 11, name: "MISP_Delete" },
        { id: 12, name: "MISP_View" },
      ],
      department: "Admin",
      branch: "Bhopal",
    },
    {
      name: "John dor",
      code: "JD123",
      permissions: [
        { id: 1, name: "Employee_Create" },
        { id: 2, name: "Employee_Update" },
        { id: 3, name: "Employee_Delete" },
        { id: 4, name: "Employee_View" },
        { id: 5, name: "POSP_Create" },
      ],
      department: "Admin",
      branch: "Bhopal",
    },
    // Add more users as needed
  ];

  useEffect(() => {
    // Mock API call to get data
    setRows(userPermissionsData);
  }, []);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.branch === selectedBranch && row.department === selectedDepartment
  );

  const displayedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const categorizePermissions = (permissions) => {
    // Create an object to store categorized permissions
    const categorized = {
      "Employee Permissions": [],
      "POSP Permissions": [],
      "MISP Permissions": [],
    };

    // Loop through the permissions and group them by prefix
    permissions.forEach((perm) => {
      if (perm.name.startsWith("Employee_")) {
        categorized["Employee Permissions"].push(perm);
      } else if (perm.name.startsWith("POSP_")) {
        categorized["POSP Permissions"].push(perm);
      } else if (perm.name.startsWith("MISP_")) {
        categorized["MISP Permissions"].push(perm);
      }
    });

    return categorized;
  };

  // Function to extract the action part of the permission name
  const getActionFromPermission = (permissionName) => {
    return permissionName.split("_")[1]; // Split by underscore and return the second part
  };

  // Generate the permission headings dynamically based on user data
  const TABLE_HEAD = [
    "Employee Name",
    "Employee Code",
    ...permissionCategories,
    "Action",
  ];

  return (
    <div className="p-4">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                User Permissions Management
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                View and manage permissions for users based on their department
                and branch.
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{" "}
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="pt-0 px-0">
          <div className="px-5 w-fit gap-4">
            <Typography variant="h6" color="blue-gray">
              Filter Data
            </Typography>
            <div className="flex gap-4 py-4">
              <Select
                value={selectedBranch}
                onChange={handleBranchChange}
                label="Select Branch"
              >
                <Option value="Bhopal">Bhopal</Option>
                <Option value="Jabalpur">Jabalpur</Option>
              </Select>
              <Select
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                label="Select Department"
              >
                <Option value="Admin">Admin</Option>
                <Option value="HR">HR</Option>
                <Option value="Operations">Operations</Option>
                <Option value="Sales Support">Sales Support</Option>
                <Option value="POSP">POSP</Option>
                <Option value="Accounts">Accounts</Option>
              </Select>
            </div>
          </div>
          <div className="overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedRows.map((user, index) => {
                  const categorizedPermissions = categorizePermissions(
                    user.permissions
                  );

                  return (
                    <tr key={index}>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.code}</td>

                      {/* Render Employee Permissions */}
                      <td className="p-4">
                        {categorizedPermissions["Employee Permissions"]?.map(
                          (perm) => (
                            <Checkbox
                              key={perm.id}
                              checked={true} // Based on user permissions
                              onChange={() => {}}
                              label={getActionFromPermission(perm.name)} // Only show the action (e.g., "Create")
                            />
                          )
                        )}
                      </td>

                      {/* Render POSP Permissions */}
                      <td className="p-4">
                        {categorizedPermissions["POSP Permissions"]?.map(
                          (perm) => (
                            <Checkbox
                              key={perm.id}
                              checked={true} // Based on user permissions
                              onChange={() => {}}
                              label={getActionFromPermission(perm.name)} // Only show the action (e.g., "Create")
                            />
                          )
                        )}
                      </td>

                      {/* Render MISP Permissions */}
                      <td className="p-4">
                        {categorizedPermissions["MISP Permissions"]?.map(
                          (perm) => (
                            <Checkbox
                              key={perm.id}
                              checked={true} // Based on user permissions
                              onChange={() => {}}
                              label={getActionFromPermission(perm.name)} // Only show the action (e.g., "Create")
                            />
                          )
                        )}
                      </td>

                      <td className="p-4">
                        <Button size="sm" color="blue-gray">
                          Action
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
        <div className="flex justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-2">
            <Typography variant="small">Rows per page:</Typography>
            <Select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(e.target.value)}
            >
              <Option value="5">5</Option>
              <Option value="10">10</Option>
              <Option value="20">20</Option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </Button>
            <Typography variant="small">
              Page {currentPage} of {totalPages}
            </Typography>
            <Button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Permissions;
