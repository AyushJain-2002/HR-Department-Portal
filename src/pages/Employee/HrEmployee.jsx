import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux"; // Removed useSelector
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, Dialog, DialogBody, Typography } from "@material-tailwind/react";
import { FaUserCheck } from "react-icons/fa";
import Loading from "../Loading";
import HrEmployeeConfig from "./HrEmployeeConfig";
import FormComponent from "../../components/wizard/FormComponent";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useEmployee } from "../../hooks/useEmployee"; // Import the hook

const HrEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // 🟢 CHANGED: Using useEmployee hook instead of Redux directly
  const {
    loading,
    currentEmployee: employee, // 🟢 CHANGED: from employee to currentEmployee
    createSuccess,
    createError,
    error,
    fetchEmployeeById,
    updateEmployee,
    createEmployee,
    resetEmployee,
    resetCreateSuccess // 🟢 ADDED: For resetting success state
  } = useEmployee();
  
  const userBranchId = Cookies.get("branchId");
  const userRole = Cookies.get("role");
  const isRestrictedUser = userBranchId && !["admin", "Admin", "superadmin"].includes(userRole);
  
  const [formData, setFormData] = useState({
    title: "",
    branch_id: isRestrictedUser ? userBranchId : "",
    name: "",
    mobile_no: "",
    personal_email: "",
    login_email: "",
    // father_name: "",
    // date_of_birth: "",
    // gender: "",
    aadhar_no: "",
    designation: "",
    department: "",
    pancard_number: "",
    permanent_address_street: "",
    permanent_address_city: "",
    permanent_address_state: "",
    permanent_address_pincode: "",
    permanent_address_town: "",
    current_address_street: "",
    current_address_city: "",
    current_address_state: "",
    current_address_pincode: "",
    current_address_town: "",
    alternative_mobile_number: "",
    education_level: "",
    bank_name: "",
    bank_branch: "",
    ifsc_code: "",
    account_number: "",
    account_type: "",
    // nominee_name: "",
    // nominee_mobile_number: "",
    // nominee_relation: "",
    // nominee_address: "",
    bqp: "",
    role: "",
    relationship_manager: "",
    reporting_manager: "",
    same_as_permanent: "1",
    aadhaar_card_front: "",
    aadhaar_card_back: "",
    // bank_passbook_or_cancelled_cheque: "",
    passport_size_photo: "",
    pancard_image: "",
    // signature_image: "",
    marksheet_image: "",
    joining_date: "",
  });

  const [showDialog, setShowDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const isEditMode = !!id;

  // 🟢 CHANGED: Fetch employee data when in edit mode
  useEffect(() => {
    if (id) {
      fetchEmployeeById(id);
    } else {
      resetEmployee();
    }
  }, [id, location.pathname]);

  // 🟢 CHANGED: Handle form errors from createError
  useEffect(() => {
    if (createError) {
      setFormErrors(createError.errors || {});
    }
  }, [createError]);

  // 🟢 CHANGED: Handle edit submission
  const handleEdit = (formData) => {
    if (id) {
      updateEmployee(id, formData);
    }
  };

  // 🟢 CHANGED: Handle create submission
  const handleSubmit = (formData) => {
    console.log(formData,"formdata before submit")
    createEmployee(formData);

  };

  // 🟢 CHANGED: Check authentication
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userId = Cookies.get("user");

    if (!token || !userId) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  // 🟢 CHANGED: Handle success state
  useEffect(() => {
    if (createSuccess) {
      console.log("Employee created successfully:", createSuccess);
      setShowDialog(true);
      
      const timer = setTimeout(() => {
        setShowDialog(false);
        resetEmployee();
        resetCreateSuccess(); // 🟢 ADDED: Reset success state
        if (!isEditMode) {
          navigate('/');
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [createSuccess, isEditMode]);

  // 🟢 CHANGED: Cleanup on unmount
  useEffect(() => {
    return () => {
      resetEmployee();
      resetCreateSuccess(); // 🟢 ADDED: Reset success state
    };
  }, []);

  // 🟢 CHANGED: Prepopulate form when employee data is loaded in edit mode
  useEffect(() => {
    if (isEditMode && employee) {
      setFormData(prev => ({
        ...prev,
        ...employee,
        same_as_permanent: prev.same_as_permanent,
      }));
    }
  }, [employee, isEditMode]);

  return (
    <div className="relative h-fit pb-10 w-full pt-2">
      {loading && <Loading />}
      <div className={`${loading ? "backdrop-blur-sm" : ""}`}>
        <PageBreadcrumb 
          pageTitle={isEditMode ? "Edit Employee" : "Employee Entry"} 
          subTitle={isEditMode ? "Update employee details" : "Fill in the details below to proceed"} 
        />
      </div>
      
      <Card className="mb-5 px-2 shadow-inner shadow-blue-gray-100 rounded-2xl  bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <FormComponent
          config={HrEmployeeConfig(formData)}
          onSubmit={isEditMode ? handleEdit : handleSubmit}
          success={createSuccess}
          errors={formErrors}
          initialValues={employee || formData}
          resetValue={formData}
          isEditMode={isEditMode} // 🟢 ADDED: Pass edit mode flag
        />
      </Card>
      
      <Dialog open={showDialog}>
        <DialogBody>
          <div className="flex flex-col items-center">
            <FaUserCheck className="text-6xl text-blue-500 mb-4" />
            <Typography variant="h6" className="font-bold mb-2 text-center">
              {isEditMode ? "Update Successful" : "Success"}
            </Typography>
            <Typography variant="paragraph" className="text-gray-600 text-center">
              {isEditMode 
                ? "Employee details updated successfully!" 
                : "Employee created successfully! You can now view the employee details or create another one."}
            </Typography>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default HrEmployee;
