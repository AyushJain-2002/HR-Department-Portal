import  { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, fetchEmployeeById, updateEmployee } from "../../store/Actions/EmployeeAction";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Card,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import { FaUserCheck } from "react-icons/fa";
import Loading from "../Loading";
import { resetEmployee } from "../../store/Reducers/EmployeSlice";
import CreatePospConfig from "./CreatePospConfig";
import FormComponent from "../../components/wizard/FormComponent";
const CreatePosp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // Get state from the Redux store
  const { loading, employee, createSuccess, allEmployee, createError, error } =
    useSelector((state) => state.employee);

  const location = useLocation()
  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id)); // ✅ Fetch employee if editing
    } else {
      dispatch(resetEmployee()); // ✅ Reset when navigating to create
    }
  }, [dispatch, id, location.pathname]);
  
  const userBranchId  = Cookies.get("branchId");
  const userRole   = Cookies.get("role");
  const isRestrictedUser = userBranchId && !["admin","Admin", "superadmin"].includes(userRole);
  const [formData, setFormData] = useState({
    title: "",
    branch_id: isRestrictedUser ? userBranchId : "",
    name:  "",
    mobile_no:  "",
    personal_email:  "",
    login_email: "",
    father_name: "",
    date_of_birth: "",
    gender: "",
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
    current_address_town:"",
    alternative_mobile_number: "",
    education_level: "",
    bank_name: "",
    bank_branch: "",
    ifsc_code: "",
    account_number: "",
    account_type: "",
    nominee_name: "",
    nominee_mobile_number: "",
    nominee_relation: "",
    nominee_address: "",
    bqp: "",
    role: "",
    relationship_manager: "",
    reporting_manager: "",
    same_as_permanent: "1",
    aadhaar_card_front: "",
    aadhaar_card_back: "",
    bank_passbook_or_cancelled_cheque: "",
    passport_size_photo: "",
    pancard_image: "",
    signature_image: "",
    marksheet_image: "",
    joining_date: "",
  });

  const [showDialog, setShowDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    if (createError) {
      // Handle validation errors from createError
      setFormErrors(createError.errors || {}); // Assuming createError.error contains field-level errors
      // toast.error(createError.message || "Please fix the errors and try again.");
    }
  }, [createError, formErrors]);
  const isEditMode = !!id;

  const handleEditt = (formData) => {
    dispatch(updateEmployee( id, formData ));
  };
  
  const handleSubmit = (formData) => {
    // e.preventDefault(); // Prevent the form from refreshing the page
    console.log("Submitting form data:", formData);
    dispatch(createEmployee(formData))
    
    
  };
   useEffect(() => {
      const token = Cookies.get("authToken");
      const userId = Cookies.get("userInfo");
  
      if (!token || !userId) {
        window.location.reload();
        navigate("/login"); // Redirect to login if no token or userId
        return;
      }
      // Fetch user details based on ID if `user` is null
     
      
    }, [dispatch, navigate]);
   
    useEffect(() => {
      if (createSuccess) {
        console.log("Employee created successfully:", createSuccess);
        setShowDialog(true);
        const timer = setTimeout(() => {
          setShowDialog(false);
          dispatch(resetEmployee()); // ✅ Reset when navigating to create
          navigate('/');
        }, 5000); // Hide after 5 seconds
        console.log(createSuccess);
        return () => clearTimeout(timer); // Cleanup the timer
      }
    }, [createSuccess]);
    // console.log(employee)
    // Cleanup on unmount 
useEffect(() => {
  return () => {
    dispatch(resetEmployee());
  };
}, [dispatch]);

  return (
    <div className="relative h-fit pb-10 w-full ">
      {loading && <Loading />}
      <div
        className={`flex justify-between mb-5 items-center w-full px-2 lg:px-5 py-4 border-b border-gray-200 ${
          loading ? "backdrop-blur-sm" : ""
        }`}
      >
        {/* Heading and Subheading */}
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold">
            Employee Entry
          </Typography>
          <Typography variant="small" color="gray" className="mt-1">
            Fill in the details below to proceed
          </Typography>
        </div>

        {/* Logout Button */}
      </div>
      <Card className="lg:mx-10 mb-5 mx-2 px-2 shadow-lg border">
        <FormComponent
          config={CreatePospConfig(formData)}
          onSubmit={isEditMode ? handleEditt : handleSubmit}
          success={createSuccess}
          errors={formErrors}
          initialValues={
              employee && {
                ...employee,
                same_as_permanent: formData.same_as_permanent,
              }
            }
            resetValue={formData}
        />
      </Card>
      <Dialog open={showDialog} >
        <DialogBody>
          <div className="flex flex-col items-center">
            <FaUserCheck className="text-6xl text-blue-500 mb-4" />
            <Typography variant="h6" className="font-bold mb-2 text-center">
            Success
            </Typography>
            <Typography variant="paragraph" className="text-gray-600 text-center">
            Employee created successfully! You can now view the employee details or create another one.
            </Typography>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

//changes
export default CreatePosp;
