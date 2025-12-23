import {
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DynamicForm from "../Tables/DynamicForm";
import TableLayout from "../TableActions/TableLayout";
import Button from "../../components/ui/button/Button";
import {
  createInsurerBranch,
  deleteInsurerBranch,
  fetchInsuranceCompanies,
  fetchInsuranceCompaniesByType,
  fetchInsurerBranchById,
  fetchInsurerBranches,
  fetchInsurerBranchesByType,
  updateInsurerBranch,
} from "../../store/Actions/InsurerBranchAction";
import {
  fetchCitiesByState,
  fetchStates,
} from "../../store/Actions/StateAction";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  fetchDesignation,
} from "../../store/Actions/Department_Designation_Action";
import { fetchInsurerBranchByIdStartForModal } from "../../store/Reducers/InsurerBranchSlice";

const InsurerBranch = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const dispatch = useDispatch();
  const {
    insurerBranches,
    insuranceCompanies,
    insurerBranch,
    insuranceByTypeCompanies,
    editSuccess,
    loading,
    insurerLoading,
    createError,
    editError,
    success,
    error,
  } = useSelector((state) => state.insuranceCompany);
  const { states = [], cities = { cities: [] } } = useSelector(
    (state) => state.states
  );
  const { departments, designations } = useSelector(
    (state) => state.departments
  );

  const [formState, setFormState] = useState({
    insurer_company_id: "",
    insurer_branch_code: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    gst_no: "",
    landline_number: "",
    mobile_number: "",
    email_id: "",
    comments: "",
    broker_code: "",
    type_of_insurance_branch: "",
  });

  const [managerformState, setmanagerFormState] = useState({
    coordinate_persons: [
      {
        title: "",
        coordinate_person: "",
        coordinate_person_number: "",
        email: "",
        designation: "",
        department: "",
        is_relationship_manager: false,
        remark: "",
      },
    ],
  });

  // Fetch initial data
  useEffect(() => {
    if (!departments || departments.length === 0) dispatch(fetchDepartments());
    if (!designations || designations.length === 0) dispatch(fetchDesignation());
    if (!insurerBranches || insurerBranches.length === 0) dispatch(fetchInsurerBranches());
    if (!states || states.length === 0) dispatch(fetchStates());
  }, [dispatch]);

  const insurerTypes = [
    { id: 1, type: "Life Insurance" },
    { id: 2, type: "Non Life Insurance" },
  ];

  useEffect(() => {
    if (formState.type_of_insurance_branch) {
      dispatch(
        fetchInsuranceCompaniesByType(formState.type_of_insurance_branch)
      );
    }
  }, [formState.type_of_insurance_branch, dispatch]);

  const handleEditBranch = (branchId) => {
    dispatch(fetchInsurerBranchById(branchId));
  };

  useEffect(() => {
    if (insurerBranch) {
      setFormState({
        insurer_company_id: insurerBranch.insurer_company_id || "",
        insurer_branch_code: insurerBranch.insurer_branch_code || "",
        address: insurerBranch.address || "",
        country: insurerBranch.country || "",
        state: insurerBranch.state || "",
        city: insurerBranch.city || "",
        pincode: insurerBranch.pincode || "",
        gst_no: insurerBranch.gst_no || "",
        landline_number: insurerBranch.landline_number || "",
        mobile_number: insurerBranch.mobile_number || "",
        email_id: insurerBranch.email_id || "",
        comments: insurerBranch.comments || "",
        broker_code: insurerBranch.broker_code || "",
        type_of_insurance_branch: insurerBranch.type_of_insurance_branch || "",
      });
      setOpenModal(true);
    }
  }, [insurerBranch]);

  // DynamicForm configuration for main branch form
  const branchFormConfig = {
    stepFields: [
      {
        title: "",
        fields: [
          {
            name: "type_of_insurance_branch",
            label: "Type of Insurance Branch",
            type: "select",
            options: insurerTypes.map((type) => ({
              value: type.id,
              label: type.type,
            })),
            placeholder: "Select branch type",
            required: true,
            storeLabel: true,
          },
          {
            name: "insurer_company_id",
            label: "Insurer Company",
            type: "select",
            options: formState.type_of_insurance_branch
              ? (insuranceByTypeCompanies || []).map((company) => ({
                  value: company.id,
                  label: company.company_name,
                }))
              : [],
            placeholder: "Select insurer company",
            required: true,
            storeLabel: false,
          },
          {
            name: "insurer_branch_code",
            label: "Branch Code",
            type: "text",
            placeholder: "Enter branch code",
            required: true,
          },
          {
            name: "state",
            label: "State",
            type: "select",
            options: states.map((state) => ({
              value: state.id,
              label: state.state_name,
            })),
            placeholder: "Select a state",
            required: true,
            storeLabel: true,
          },
          {
            name: "city",
            label: "City",
            type: "select",
            options: formState.state
              ? (cities.cities || []).map((city) => ({
                  value: city.city_id,
                  label: city.city_name,
                }))
              : [],
            placeholder: "Select a city",
            required: true,
            storeLabel: true,
          },
          {
            name: "address",
            label: "Address",
            type: "text",
            placeholder: "Enter address",
            required: true,
          },
          {
            name: "pincode",
            label: "PinCode",
            type: "text",
            placeholder: "Enter pincode",
            required: true,
          },
          {
            name: "landline_number",
            label: "Landline Number",
            type: "text",
            placeholder: "Enter landline number",
          },
          {
            name: "mobile_number",
            label: "Mobile Number",
            type: "text",
            placeholder: "Enter mobile number",
            required: true,
          },
          {
            name: "gst_no",
            label: "GST Number",
            type: "text",
            placeholder: "Enter GST number",
          },
          {
            name: "email_id",
            label: "E-mail Id",
            type: "email",
            placeholder: "Enter email address",
            required: true,
          },
          {
            name: "broker_code",
            label: "Broker Code",
            type: "text",
            placeholder: "Enter broker code",
          },
          {
            name: "comments",
            label: "Comments",
            type: "text",
            placeholder: "Enter comments",
          },
        ]
      },
      {
        title: "Branch Contact Person",
        fields: [
          {
            name: "coordinate_persons.title",
            label: "Title",
            type: "select",
            options: [
              { value: 1, label: "Mr." },
              { value: 2, label: "Mrs." },
              { value: 3, label: "Miss" },
            ],
            placeholder: "Select title",
            required: true,
            storeLabel: true,
          },
          {
            name: "coordinate_persons.coordinate_person",
            label: "Manager Name",
            type: "text",
            placeholder: "Enter manager's name",
            required: true,
          },
          {
            name: "coordinate_persons.coordinate_person_number",
            label: "Mobile Number",
            type: "text",
            placeholder: "Enter mobile number",
            required: true,
          },
          {
            name: "coordinate_persons.email",
            label: "E-mail Id",
            type: "email",
            placeholder: "Enter email",
            required: true,
          },
          {
            name: "coordinate_persons.department",
            label: "Department",
            type: "select",
            options: departments?.map((dep) => ({
              value: dep.id,
              label: dep.department_name,
            })) || [],
            placeholder: "Select Department",
            required: true,
            storeLabel: true,
          },
          {
            name: "coordinate_persons.designation",
            label: "Designation",
            type: "select",
            options: designations?.map((des) => ({
              value: des.id,
              label: des.designation_name,
            })) || [],
            placeholder: "Select Designation",
            required: true,
            storeLabel: true,
          },
          {
            name: "coordinate_persons.is_relationship_manager",
            label: "Is Relationship Manager",
            type: "select",
            options: [
              { value: 1, label: "True" },
              { value: 0, label: "False" },
            ],
            placeholder: "Select true or false",
            required: true,
            storeLabel: false,
          },
          {
            name: "coordinate_persons.remark",
            label: "Remarks",
            type: "text",
            placeholder: "Enter remarks",
          },
        ]
      }
    ]
  };

  // Custom onChange handler for DynamicForm
  const handleFormChange = (value, field) => {
    if (field.name === "state") {
      setFormState((prev) => ({
        ...prev,
        [field.name]: value,
        city: "", // Reset city when state changes
      }));
      // Find state ID by name to fetch cities
      const stateId = states.find(s => s.state_name === value)?.id;
      if (stateId) dispatch(fetchCitiesByState(stateId));
    } else if (field.name === "type_of_insurance_branch") {
      setFormState((prev) => ({
        ...prev,
        [field.name]: value,
        insurer_company_id: "", // Reset insurer_company_id when type changes
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [field.name]: value,
      }));
    }
    
    // Clear errors when user changes field
    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field.name];
      return newErrors;
    });
  };

  const handleCreateBranch = (formData) => {
    console.log("Form Data:", formData);

    const coordinatePersons = [];
    Object.keys(formData).forEach((key) => {
      if (key.startsWith("coordinate_persons.")) {
        const fieldKey = key.replace("coordinate_persons.", "");
        let existingPerson = coordinatePersons[0] || {};
        existingPerson[fieldKey] = formData[key];
        if (coordinatePersons.length === 0) {
          coordinatePersons.push(existingPerson);
        }
      }
    });

    const mainData = Object.keys(formData).reduce((acc, key) => {
      if (!key.startsWith("coordinate_persons.")) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    const combinedData = {
      ...mainData,
      coordinate_persons: coordinatePersons,
    };

    console.log("Final Data to Submit:", combinedData);
    dispatch(createInsurerBranch(combinedData));
  };

  const handleUpdateBranch = (formData) => {
    const coordinatePersons = [];
    Object.keys(formData).forEach((key) => {
      if (key.startsWith("coordinate_persons.")) {
        const fieldKey = key.replace("coordinate_persons.", "");
        let existingPerson = coordinatePersons[0] || {};
        existingPerson[fieldKey] = formData[key];
        if (coordinatePersons.length === 0) {
          coordinatePersons.push(existingPerson);
        }
      }
    });

    const mainData = Object.keys(formData).reduce((acc, key) => {
      if (!key.startsWith("coordinate_persons.")) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    const combinedData = {
      ...mainData,
      coordinate_persons: coordinatePersons,
    };

    dispatch(updateInsurerBranch(insurerBranch.id, combinedData));
  };

  useEffect(() => {
    if (editError) {
      setEditFormErrors(editError.message || {});
      setFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (createError) {
      setFormErrors(createError.message || {});
      toast.error("Please fix the errors and try again.");
    } else if (error) {
      toast.error(error);
    } else if (success) {
      toast.success("Branch created successfully!");
      setFormState({
        insurer_company_id: "",
        insurer_branch_code: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        gst_no: "",
        landline_number: "",
        mobile_number: "",
        email_id: "",
        comments: "",
        broker_code: "",
        type_of_insurance_branch: "",
      });
      setmanagerFormState({
        coordinate_persons: [{
          title: "",
          coordinate_person: "",
          coordinate_person_number: "",
          email: "",
          designation: "",
          department: "",
          is_relationship_manager: false,
          remark: "",
        }],
      });
      setFormErrors({});
      dispatch(fetchInsurerBranches());
    } else if (editSuccess) {
      toast.success("Branch updated successfully!");
      setOpenModal(false);
      setFormState({
        insurer_company_id: "",
        insurer_branch_code: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        gst_no: "",
        landline_number: "",
        mobile_number: "",
        email_id: "",
        comments: "",
        broker_code: "",
        type_of_insurance_branch: "",
      });
      dispatch(fetchInsurerBranches());
    }
  }, [createError, editError, editSuccess, success, error, dispatch]);

  // TableLayout configuration
  const tableColumns = [
    { key: "sno", label: "S NO" },
    { key: "insurer_branch_code", label: "Branch Code" },
    { key: "type_of_insurance_branch", label: "Type of Insurance Company" },
    { key: "insurance_company.company_name", label: "Insurance Company" },
    { key: "mobile_number", label: "Mobile No" },
    { key: "state", label: "State" },
    { key: "city", label: "City" },
    { key: "pincode", label: "Pin Code" },
    { key: "email_id", label: "E-Mail" },
    { 
      key: "actions", 
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditBranch(row.id)}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(row.id)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.location.href = `/master/accounts/insurer-branch-Manager/${row.id}`}
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            See Manager
          </Button>
        </div>
      )
    },
  ];

  // Prepare table data with serial numbers
  const tableData = insurerBranches.map((branch, index) => ({
    ...branch,
    sno: index + 1,
  }));

  let activeToastId = null;

  const handleDelete = (branchID) => {
    if (activeToastId) {
      toast.dismiss(activeToastId);
    }

    activeToastId = toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4">
          <p>Are you sure you want to delete this branch?</p>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                dispatch(deleteInsurerBranch(branchID));
                toast.dismiss(activeToastId);
                toast.success("Branch deleted successfully!");
                activeToastId = null;
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              OK
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast.dismiss(activeToastId);
                activeToastId = null;
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  // Custom submit button for DynamicForm
  const CustomSubmitButton = (handleSubmit) => (
    <div className="flex justify-center gap-4 mt-6">
      <Button 
        size="md"
        variant="primary"
        onClick={handleSubmit}
        className="w-full md:w-auto"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Branch"}
      </Button>
      <Button 
        size="md"
        variant="outline"
        type="button"
        onClick={() => {
          setFormState({
            insurer_company_id: "",
            insurer_branch_code: "",
            address: "",
            country: "",
            state: "",
            city: "",
            pincode: "",
            gst_no: "",
            landline_number: "",
            mobile_number: "",
            email_id: "",
            comments: "",
            broker_code: "",
            type_of_insurance_branch: "",
          });
          setFormErrors({});
        }}
        className="w-full md:w-auto"
      >
        Reset
      </Button>
    </div>
  );

  return (
    <div className="md:py-8 py-3">
      <Card className="w-full border p-5" color="transparent">
        <Typography variant="h4" color="blue-gray" className="font-pt_serif mb-4">
          Add Insurer Branch
        </Typography>

        {/* DynamicForm Integration */}
        <DynamicForm
          config={branchFormConfig}
          formData={formState}
          onChange={handleFormChange}
          onSubmit={handleCreateBranch}
          resetAfterSubmit={success}
          submitButton={CustomSubmitButton}
        />
      </Card>

      {/* TableLayout Integration */}
      <div className="mt-8">
        <TableLayout
          columns={tableColumns}
          data={tableData}
          enableSearch={true}
          enableExcel={true}
          rowsPerPageOptions={[10, 25, 50, 100]}
          defaultRowsPerPage={10}
          loading={insurerLoading}
        />
      </div>

      {/* Edit Modal */}
      <Dialog
        size="lg"
        open={openModal}
        handler={() => {
          setOpenModal(false);
          setEditFormErrors({});
          dispatch(fetchInsurerBranchByIdStartForModal());
        }}
      >
        <DialogHeader className="pb-0">Edit Branch</DialogHeader>
        <DialogBody className="pt-0">
          {/* You can use DynamicForm here too for consistency */}
          <DynamicForm
            config={branchFormConfig}
            formData={formState}
            onChange={handleFormChange}
            onSubmit={handleUpdateBranch}
            submitButton={(handleSubmit) => (
              <div className="flex justify-center gap-4 mt-6">
                <Button 
                  size="md"
                  variant="primary"
                  onClick={handleSubmit}
                  className="w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Branch"}
                </Button>
                <Button 
                  size="md"
                  variant="outline"
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="w-full md:w-auto"
                >
                  Cancel
                </Button>
              </div>
            )}
          />
        </DialogBody>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default InsurerBranch;






// import {
//   Card,
//   Dialog,
//   DialogBody,
//   DialogHeader,
//   Typography,
// } from "@material-tailwind/react";
// import React, { useEffect, useMemo, useState } from "react";
// import FormDynamic from "../TableActions/FormDynamic";
// import { toast, ToastContainer } from "react-toastify";
// import ReusableTable from "../TableActions/ReusableTable";
// import DynamicForm from "../Tables/DynamicForm";
// import TableLayout from "../TableActions/TableLayout";
// import Button from "../../components/ui/button/Button";
// import Loading from "../Loading";
// import {
//   createInsurerBranch,
//   deleteInsurerBranch,
//   fetchInsuranceCompanies,
//   fetchInsuranceCompaniesByType,
//   fetchInsurerBranchById,
//   fetchInsurerBranches,
//   fetchInsurerBranchesByType,
//   updateInsurerBranch,
// } from "../../store/Actions/InsurerBranchAction";
// import {
//   fetchCitiesByState,
//   fetchStates,
// } from "../../store/Actions/StateAction";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDepartments,
//   fetchDesignation,
// } from "../../store/Actions/Department_Designation_Action";
// import { fetchInsurerBranchByIdStartForModal } from "../../store/Reducers/InsurerBranchSlice";

// const InsurerBranch = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [editFormErrors, setEditFormErrors] = useState({});
//   const dispatch = useDispatch();
//   const {
//     insurerBranches,
//     insuranceCompanies,
//     insurerBranch,
//     insuranceByTypeCompanies,
//     editSuccess,
//     loading,
//     insurerLoading,
//     createError,
//     editError,
//     success,
//     error,
//   } = useSelector((state) => state.insuranceCompany);
//   const { states = [], cities = { cities: [] } } = useSelector(
//     (state) => state.states
//   );
//   const { departments, designations } = useSelector(
//     (state) => state.departments
//   ); // Set default values for states and cities
//   const [formState, setFormState] = useState({
//     insurer_company_id: "",
//     insurer_branch_code: "",
//     address: "",
//     country: "",
//     state: "",
//     city: "",
//     pincode: "",
//     gst_no: "",
//     landline_number: "",
//     mobile_number: "",
//     email_id: "",
//     comments: "",
//     broker_code: "",
//     type_of_insurance_branch: "",
//   });
//   const [managerformState, setmanagerFormState] = useState({
//     coordinate_persons: [
//       {
//         title: "",
//         coordinate_person: "",
//         coordinate_person_number: "",
//         email: "",
//         designation: "",
//         department: "",
//         is_relationship_manager: false,
//         remark: "",
//       },
//     ],
//   });

//   // Fetch all states on component mount
//   useEffect(() => {
//     if (!departments || departments.length === 0) dispatch(fetchDepartments());
//     if (!designations || designations.length === 0) dispatch(fetchDesignation());
//     if (!insurerBranches || insurerBranches.length === 0) dispatch(fetchInsurerBranches());
//     if (!states || states.length === 0) dispatch(fetchStates());
//   }, [dispatch]); // Only depend on dispatch
  
  
//   const insurerTypes = [
//     { id: 1, type: "Life Insurance" },
//     { id: 2, type: "Non Life Insurance" },
//   ];
//   // const [branchToEdit, setBranchToEdit] = useState(null);
//   //   useEffect(() => {
//   //     console.log("Updated insuranceCompanies:", insuranceCompanies);
//   //   }, [insuranceCompanies]);
//   //   const handleEditBranch = (branchId) => {
//   //     dispatch(fetchInsurerBranchById(branchId));
//   //     console.log("Branch ID for Edit:", branchId);
//   //     // setTimeout(() => {
//   //     //   // const branch = store.getState().branches.selectedBranch; // Adjust based on your Redux state
//   //     //   if (branch) {
//   //     //     setBranchToEdit(branch);
//   //         setOpenModal(true); // Open modal after setting data
//   //     //   }
//   //     // }, 500);
//   //   };
//   // useEffect(() => {
//   //   console.log("Updated insuranceCompanies:", insuranceCompanies);
//   // }, [insuranceCompanies]);
//   useEffect(() => {
//     if (formState.type_of_insurance_branch) {
//       dispatch(
//         fetchInsuranceCompaniesByType(formState.type_of_insurance_branch)
//       );
//     }
//   }, [formState.type_of_insurance_branch, dispatch]);

//   const handleEditBranch = (branchId) => {
//     dispatch(fetchInsurerBranchById(branchId));
//     // console.log("Branch ID for Edit:", branchId);
//   };
//   useEffect(() => {
//     if (insurerBranch) {
//       // Log the insurerBranch data and open the modal after the data is fetched
//       console.log("Fetched insurerBranch Data:", insurerBranch);
//       setFormState({
//         insurer_company_id: insurerBranch.insurer_company_id || "", // Assuming insurer_company_id is part of insurerBranch
//         insurer_branch_code: insurerBranch.insurer_branch_code || "", // Assuming insurer_branch_code is part of insurerBranch
//         address: insurerBranch.address || "",
//         country: insurerBranch.country || "", // Assuming country is part of insurerBranch
//         state: insurerBranch.state || "", // Assuming state is part of insurerBranch
//         city: insurerBranch.city || "", // Assuming city is part of insurerBranch
//         pincode: insurerBranch.pincode || "", // Assuming pincode is part of insurerBranch
//         gst_no: insurerBranch.gst_no || "", // Assuming gst_no is part of insurerBranch
//         landline_number: insurerBranch.landline_number || "", // Assuming landline_number is part of insurerBranch
//         mobile_number: insurerBranch.mobile_number || "", // Assuming mobile_number is part of insurerBranch
//         email_id: insurerBranch.email_id || "", // Assuming email_id is part of insurerBranch
//         comments: insurerBranch.comments || "", // Assuming comments is part of insurerBranch
//         broker_code: insurerBranch.broker_code || "", // Assuming broker_code is part of insurerBranch
//         type_of_insurance_branch: insurerBranch.type_of_insurance_branch || "", // Assuming type_of_insurance_branch is part of insurerBranch
//       });

//       setOpenModal(true);
//     }
//   }, [insurerBranch]); // This hook runs whenever the `insurerBranch` data is updated

//   const addFields = useMemo(
//     () => [
//       {
//         name: "type_of_insurance_branch",
//         label: "Type of Insurance Branch",
//         type: "select",
//         options: insurerTypes.map((type) => ({
//           value: type.id,
//           label: type.type,
//         })),
//         placeholder: "Select branch type",

//         storeLabel: true,
//       },
//       {
//         name: "insurer_company_id",
//         label: "Insurer Company",
//         type: "select",
//         options: formState.type_of_insurance_branch
//           ? (insuranceByTypeCompanies || []).map((company) => ({
//               value: company.id,
//               label: company.company_name, // Company name will be displayed
//             }))
//           : [],
//         // This will be populated based on selected type_of_insurance_branch
//         placeholder: "Select insurer company",

//         storeLabel: false, // Store the selected label (company name)
//       },
//       {
//         name: "insurer_branch_code",
//         label: "Branch Code",
//         type: "text",
//         placeholder: "Enter branch name",
//       },
//       {
//         name: "state",
//         label: "State",
//         type: "select",
//         options: states.map((state) => ({
//           value: state.id,
//           label: state.state_name,
//         })),
//         placeholder: "Select a state",

//         storeLabel: true,
//       },
//       {
//         name: "city",
//         label: "City",
//         type: "select",
//         options: formState.state
//           ? (cities.cities || []).map((city) => ({
//               value: city.city_id,
//               label: city.city_name,
//             }))
//           : [],
//         placeholder: "Select a city",

//         storeLabel: true,
//       },
//       {
//         name: "address",
//         label: "Address",
//         type: "text",
//         placeholder: "Enter address",
//       },
//       {
//         name: "pincode",
//         label: "PinCode",
//         type: "text",
//         placeholder: "Enter pincode",
//       },
//       {
//         name: "landline_number",
//         label: "Landline Number",
//         type: "text",
//         placeholder: "Enter landline number",
//       },
//       {
//         name: "mobile_number",
//         label: "Mobile Number",
//         type: "text",
//         placeholder: "Enter mobile number",
//       },
//       {
//         name: "gst_no",
//         label: "GST Number",
//         type: "text",
//         placeholder: "Enter GST number",
//       },
//       {
//         name: "email_id",
//         label: "E-mail Id",
//         type: "text",
//         placeholder: "Enter email_id number",
//       },
//       {
//         name: "broker_code",
//         label: "Broker Code",
//         type: "text",
//         placeholder: "Enter broker_code",
//       },
//       {
//         name: "comments",
//         label: "Comments",
//         type: "text",
//         placeholder: "Enter comments",
//       },
//     ],
//     [
//       states,
//       cities,
//       insuranceCompanies,
//       formState.type_of_insurance_branch,
//       insurerTypes,
//       formState.state,
//     ]
//   );
//   const branchManagerFields = useMemo(
//     () => [
//       {
//         name: "coordinate_persons.title",
//         label: "Title",
//         type: "select",
//         options: [
//           { value: 1, label: "Mr." },
//           { value: 2, label: "Mrs." },
//           { value: 3, label: "Miss" },
//         ],
//         placeholder: "Select title",

//         storeLabel: true,
//       },
//       {
//         name: "coordinate_persons.coordinate_person",
//         label: "Manager Name",
//         type: "text",
//         placeholder: "Enter manager's name",
//       },
//       {
//         name: "coordinate_persons.coordinate_person_number",
//         label: "Mobile Number",
//         type: "text",
//         placeholder: "Enter mobile number",
//       },
//       {
//         name: "coordinate_persons.email",
//         label: "E-mail Id",
//         type: "text",
//         placeholder: "Enter email",
//       },
//       {
//         name: "coordinate_persons.department",
//         label: "Department",
//         type: "select",
//         options:
//           departments?.map((dep) => ({
//             value: dep.id,
//             label: dep.department_name,
//           })) || [],
//         placeholder: "Select Department",
//         storeLabel: true,
//       },
//       {
//         name: "coordinate_persons.designation",
//         label: "Designation",
//         type: "select",
//         options:
//           designations?.map((des) => ({
//             value: des.id,
//             label: des.designation_name,
//           })) || [],
//         placeholder: "Select Designation",
//         storeLabel: true,
//       },

//       {
//         name: "coordinate_persons.is_relationship_manager",
//         label: "Is Relationship Manager",
//         type: "select",
//         options: [
//           { value: 1, label: "True" },
//           { value: 0, label: "False" },
//         ],
//         placeholder: "Select true or false",

//         storeLabel: false,
//       },
//       {
//         name: "coordinate_persons.remark",
//         label: "Remarks",
//         type: "text",
//         placeholder: "Enter remarks",
//       },
//     ],
//     [
//       states,
//       cities,
//       managerformState.coordinate_persons?.state,
//       designations,
//       departments,
//     ]
//   );
//   const handleFieldChange = (name, selected) => {
//     if (!selected) return;
//     const value = selected.label;
//     if (addFields.some((field) => field.name === name)) {
//       if (name === "state") {
//         setFormState((prev) => ({
//           ...prev,
//           [name]: value,
//           city: "", // Reset city field when state changes
//         }));
//         // Fetch cities based on the selected state for branch
//         dispatch(fetchCitiesByState(selected.value));
//       } else if (name === "type_of_insurance_branch") {
//         // Handle type_of_insurance_branch change for branch
//         setFormState((prev) => ({
//           ...prev,
//           [name]: value,
//           insurer_company_id: "", // Reset insurer_company_id when type changes
//         }));
//         // Fetch insurer companies based on selected branch type
//         dispatch(fetchInsuranceCompaniesByType(selected.label));
//       } else {
//         setFormState((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       }
//     }
//   };

//   // const handleCreateBranch = (formData) => {
//   //   console.log(formData);
//   //   const branchManager = {};
//   //   Object.keys(formData).forEach((key) => {
//   //     if (key.startsWith("branch_manager.")) {
//   //       // Extract the key part after 'branch_manager.' and assign the value to the nested branchManager
//   //       const fieldKey = key.replace("branch_manager.", "");
//   //       branchManager[fieldKey] = formData[key];
//   //     }
//   //   });
//   //   const mainData = Object.keys(formData).reduce((acc, key) => {
//   //     if (!key.startsWith("branch_manager.")) {
//   //       acc[key] = formData[key];
//   //     }
//   //     return acc;
//   //   }, {});

//   //   const combinedData = {
//   //     ...mainData, // Include other fields like `insurer_company_id`, `insurer_branch_code`, etc.
//   //     branch_manager: branchManager, // Include the nested branch manager data
//   //   };
//   //   console.log("Final Data to Submit:", combinedData);
//   //   dispatch(createInsurerBranch(combinedData));
//   //   setOpenModal(false);
//   //   console.log("Creating new branch");
//   // };

//   const handleCreateBranch = (formData) => {
//     console.log(formData);

//     const coordinatePersons = [];

//     Object.keys(formData).forEach((key) => {
//       if (key.startsWith("coordinate_persons.")) {
//         // Extract field name after "coordinate_persons."
//         const fieldKey = key.replace("coordinate_persons.", "");

//         // Find the existing coordinate person object or create a new one
//         let existingPerson = coordinatePersons[0] || {}; // Assuming single entry for now
//         existingPerson[fieldKey] = formData[key];

//         // Ensure it's added to the array
//         if (coordinatePersons.length === 0) {
//           coordinatePersons.push(existingPerson);
//         }
//       }
//     });

//     // Extract non-coordinate-persons data
//     const mainData = Object.keys(formData).reduce((acc, key) => {
//       if (!key.startsWith("coordinate_persons.")) {
//         acc[key] = formData[key];
//       }
//       return acc;
//     }, {});

//     // Final structured data
//     const combinedData = {
//       ...mainData,
//       coordinate_persons: coordinatePersons, // Assign extracted coordinate persons array
//     };

//     console.log("Final Data to Submit:", combinedData);
//     dispatch(createInsurerBranch(combinedData));
//     setOpenModal(false);
//     console.log("Creating new branch");
//   };
//   const handleUpdateBranch = (formData) => {
//     const branchManager = {};
//     Object.keys(formData).forEach((key) => {
//       if (key.startsWith("branch_manager.")) {
//         // Extract the key part after 'branch_manager.' and assign the value to the nested branchManager
//         const fieldKey = key.replace("branch_manager.", "");
//         branchManager[fieldKey] = formData[key];
//       }
//     });
//     // Remove the branch_manager fields from the top level of formData
//     const mainData = Object.keys(formData).reduce((acc, key) => {
//       if (!key.startsWith("branch_manager.")) {
//         acc[key] = formData[key];
//       }
//       return acc;
//     }, {});

//     const combinedData = {
//       ...mainData, // Include other fields like `insurer_company_id`, `insurer_branch_code`, etc.
//       branch_manager: branchManager, // Include the nested branch manager data
//     };
//     dispatch(updateInsurerBranch(insurerBranch.id, combinedData));
//     console.log(insurerBranch.id);
//     console.log(" for update");
//   };
//   useEffect(() => {
//     if (editError) {
//       setEditFormErrors(editError.message || {});
//       setFormErrors({}); // Display backend validation errors
//       toast.error("Please fix the errors and try again.");
//     } else if (createError) {
//       setFormErrors(createError.message || {});
//       if (formErrors) setOpenModal(false);
//       setEditFormErrors({});
//       // Handle validation errors
//       toast.error("Please fix the errors for and try again.");
//     } else if (error) {
//       toast.error(error);
//     } else if (success) {
//       toast.success("Branch created successfully!");
//       setOpenModal(false);
//       setFormState({
//         insurer_company_id: "", // Assuming insurer_company_id is part of insurerBranch
//         insurer_branch_code: "", // Assuming insurer_branch_code is part of insurerBranch
//         address: "",
//         country: "", // Assuming country is part of insurerBranch
//         state: "", // Assuming state is part of insurerBranch
//         city: "", // Assuming city is part of insurerBranch
//         pincode: "", // Assuming pincode is part of insurerBranch
//         gst_no: "", // Assuming gst_no is part of insurerBranch
//         landline_number: "", // Assuming landline_number is part of insurerBranch
//         mobile_number: "", // Assuming mobile_number is part of insurerBranch
//         email_id: "", // Assuming email_id is part of insurerBranch
//         comments: "", // Assuming comments is part of insurerBranch
//         broker_code: "", // Assuming broker_code is part of insurerBranch
//         type_of_insurance_branch: "",
//       });
//       setmanagerFormState({
//         title: "",
//         coordinate_person: "",
//         coordinate_person_number: "",
//         email: "",
//         designation: "",
//         department: "",
//         is_relationship_manager: "",
//         remark: "",
//       });
//       setFormErrors({});
//       dispatch(fetchInsurerBranches());
//     } else if (editSuccess) {
//       toast.success("Branch update successfully!");
//       setOpenModal(false);
//       setFormState({
//         insurer_company_id: "", // Assuming insurer_company_id is part of insurerBranch
//         insurer_branch_code: "", // Assuming insurer_branch_code is part of insurerBranch
//         address: "",
//         country: "", // Assuming country is part of insurerBranch
//         state: "", // Assuming state is part of insurerBranch
//         city: "", // Assuming city is part of insurerBranch
//         pincode: "", // Assuming pincode is part of insurerBranch
//         gst_no: "", // Assuming gst_no is part of insurerBranch
//         landline_number: "", // Assuming landline_number is part of insurerBranch
//         mobile_number: "", // Assuming mobile_number is part of insurerBranch
//         email_id: "", // Assuming email_id is part of insurerBranch
//         comments: "", // Assuming comments is part of insurerBranch
//         broker_code: "", // Assuming broker_code is part of insurerBranch
//         type_of_insurance_branch: "",
//       });
//       dispatch(fetchInsurerBranches());
//     }
//   }, [createError, editError, editSuccess, success, dispatch]);

//   const columnKeys = [
//     { key: "sno", label: "S NO" },

//     { key: "insurer_branch_code", label: "Branch Code" },
//     { key: "type_of_insurance_branch", label: "Type of Insurance company" },
//     { key: "insurance_company.company_name", label: "Insurance company" },
//     { key: "mobile_number", label: "Mobile No" },
//     { key: "state", label: "State" },
//     { key: "city", label: "City" },
//     { key: "pincode", label: "pin Code" },
//     { key: "email_id", label: "E-Mail" },
//     {
//       key: "actions",
//       label: "Actions",
//       actions: [
//         "delete",
//         "edit",
//         {
//           type: "editOther",
//           text: "See Manager",
//           redirectTo: "/master/accounts/insurer-branch-Manager/:id",
//         },
//       ],
//     },
//   ];
//   let activeToastId = null; // Store the currently active toast ID

//   const handleDelete = (branchID) => {
//     // Dismiss the previous toast if it exists
//     if (activeToastId) {
//       toast.dismiss(activeToastId);
//     }

//     // Show new toast and store its ID
//     activeToastId = toast(
//       ({ closeToast }) => (
//         <div className="flex flex-col items-center gap-4">
//           <p>Are you sure you want to delete this branch?</p>
//           <div className="flex gap-4">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded"
//               onClick={() => {
//                 dispatch(deleteInsurerBranch(branchID)); // Delete action
//                 toast.dismiss(activeToastId); // Dismiss toast
//                 toast.success("Branch deleted successfully!");
//                 activeToastId = null; // Reset the toast ID
//               }}
//             >
//               OK
//             </button>
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//               onClick={() => {
//                 toast.dismiss(activeToastId); // Dismiss toast
//                 activeToastId = null; // Reset the toast ID
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ),
//       {
//         position: "top-right",
//         autoClose: false,
//         closeButton: false,
//         draggable: false,
//       }
//     );
//   };
//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setBranchToEdit(null); // Reset the edited data
//   };

//   return (
//     <div className="md:py-8 py-3">
//       <Card className="w-full border p-5" color="transparent">
//         <Typography
//           variant="h4"
//           className="font-pt_serif font-semibold text-[28px]"
//           color="blue-gray"
//         >
//           Add Insurer Branch
//         </Typography>

//         <FormDynamic
//           fields={addFields}
//           otherFields={branchManagerFields}
//           onSubmit={handleCreateBranch}
//           onChange={handleFieldChange}
//           otherHead="Branch Contact Person"
//           errors={formErrors}
//           success={success}
//         />
//       </Card>
//       <ReusableTable
//         tableHeaders={columnKeys.map((col) => col.label)}
//         tableData={insurerBranches}
//         handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Branch"
//         idKey="id"
//         loading={insurerLoading}
//         handleEditBranch={handleEditBranch}
//       />
//       <Dialog
//         size="lg"
//         open={openModal}
//         handler={() => {
//           setOpenModal(false);
//           setEditFormErrors({});
//           dispatch(fetchInsurerBranchByIdStartForModal());
//         }}
//       >
//         <DialogHeader className="pb-0">Edit Branch</DialogHeader>
//         <DialogBody className="pt-0">
//           <FormDynamic
//             fields={addFields}
//             onSubmit={handleUpdateBranch}
//             onChange={handleFieldChange}
//             storeLabel={true}
//             idKey="id"
//             initialValues={formState}
//             isEditMode={true}
//             errors={editFormErrors}
//           />
//         </DialogBody>
//       </Dialog>

//       <ToastContainer />
//     </div>
//   );
// };

// export default InsurerBranch;
