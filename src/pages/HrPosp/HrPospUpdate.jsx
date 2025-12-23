import { useEffect, useMemo, useState } from "react";
import { sendEmailReset } from "../../store/NewReducers/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import {
  FaAddressBook,
  FaCloudUploadAlt,
  FaHome,
  FaUserCheck,FaEdit
} from "react-icons/fa";
import { FaDiagramProject } from "react-icons/fa6";

import { getDecryptedCookie } from "../../Utils/secureCookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointOfficialsToPosp from "../HrPosp/AppointOfficalsToPosp"
// In your root component

import Loading from "../Loading";
// import {
//   fetchPospById,
//   sendEmailToPosp,
//   toggle_Documents_verification,
//   toggle_can_update_documents
// } from "../../store/Actions/PospSignUpAction";
import { RxCross1 } from "react-icons/rx";
import CkeditorDemo from "./CkeditorDemo";
import { useAuth } from "../../hooks/hookIndex";



const HrPospUpdate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [showRelationshipDialog, setShowRelationshipDialog] = useState(false);
  const{authState,fetchPospById,sendEmailToPosp,toggle_Documents_verification,toggle_can_update_documents}=useAuth();
  const { posp, sendEmailSuccess, sendEmailLoading, loading, error } =authState

    const { hrVerificationSuccess } = useSelector(state => state.assignOfficialPosp || {});

useEffect(() => {
  if (hrVerificationSuccess) {
    dispatch(fetchPospById(id));
  }
}, [hrVerificationSuccess, dispatch, id]);
  useEffect(() => {
    dispatch(fetchPospById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);



  const stepFields = useMemo(
    () => [
      {
        title: "Personal Details",
        icon: FaHome,
        fields: [
          {
            name: "title",
            label: "Title",
            type: "select",
            options: ["Mr.", "Mrs.", "Miss", "Dr.", "Prof."],
            step: 0,
          },
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Name",
            readOnly: true,
            step: 0,
          },
          {
            name: "mobile_no",
            label: "Mobile Number",
            type: "text",
            placeholder: "Mobile Number",
            readOnly: true,
            step: 0,
          },
          {
            name: "email",
            label: "Email ID",
            type: "text",
            placeholder: "Email ID",
            readOnly: true,
            step: 0,
          },
          {
            name: "father_name",
            label: "Father's Name",
            type: "text",
            required: true,
            step: 0,
          },
          {
            name: "date_of_birth",
            label: "Date of Birth",
            type: "date",
            placeholder: "Select your birth date",
            required: true,
            step: 0,
          },
          {
            name: "gender",
            label: "Gender",
            type: "select",
            options: ["Male", "Female", "Other"],
            step: 0,
          },
          {
            name: "education_level",
            label: "Education Level",
            type: "select",
            options: ["High School", "Diploma", "Graduate", "Post Graduate", "PhD"],
            step: 0,
          },
          {
            name: "aadhar_no",
            label: "Aadhar Card Number",
            type: "text",
            placeholder: "Enter Aadhar card number",
            step: 0,
          },
          {
            name: "pancard_number",
            label: "PAN Card Number",
            type: "text",
            placeholder: "Enter PAN card number",
            step: 0,
          },
        ],
      },
      {
        title: "Address Details",
        icon: FaAddressBook,
        fields: [
          // Permanent Address
          {
            name: "permanent_address_street",
            label: "Permanent Street",
            type: "text",
            placeholder: "Enter street",
            required: true,
            step: 1,
          },
          {
            name: "permanent_address_state",
            label: "Permanent State",
            type: "select",
            required: true,
            step: 1,
            storeLabel: true,
          },
          {
            name: "permanent_address_city",
            label: "Permanent City",
            type: "select",
            step: 1,
            required: true,
            storeLabel: true,
          },
          {
            name: "permanent_address_pincode",
            label: "Permanent Pincode",
            type: "text",
            required: true,
            step: 1,
          },
          // Current Address
          {
            name: "current_address_street",
            label: "Current Street",
            type: "text",
            placeholder: "Enter street",
            required: true,
            step: 1,
          },
          {
            name: "current_address_state",
            label: "Current State",
            type: "select",
            step: 1,
            storeLabel: true,
          },
          {
            name: "current_address_city",
            label: "Current City",
            type: "select",
            step: 1,
            required: true,
            storeLabel: true,
          },
          {
            name: "current_address_pincode",
            label: "Current Pincode",
            type: "text",
            required: true,
            step: 1,
          },
          {
            name: "alternative_mobile_number",
            label: "Alternative Mobile Number",
            type: "text",
            placeholder: "Enter alternative mobile number",
            required: false,
            step: 1,
          },
        ],
      },
      {
        title: "Account Details",
        icon: FaDiagramProject,
        fields: [
          {
            name: "bank_name",
            label: "Bank Name",
            type: "text",
            placeholder: "Enter bank name",
            required: true,
            step: 2,
          },
          {
            name: "bank_branch",
            label: "Bank Branch",
            type: "text",
            placeholder: "Enter bank branch",
            required: true,
            step: 2,
          },
          {
            name: "ifsc_code",
            label: "IFSC Code",
            type: "text",
            placeholder: "Enter IFSC code",
            required: true,
            step: 2,
          },
          {
            name: "account_number",
            label: "Account Number",
            type: "text",
            placeholder: "Enter account number",
            required: true,
            step: 2,
          },
          {
            name: "account_type",
            label: "Account Type",
            type: "select",
            options: ["Savings", "Current", "Salary"],
            required: true,
            storeLabel: true,
            step: 2,
          },
        ],
      },
      {
        title: "Nominee Details",
        icon: FaUserCheck,
        fields: [
          {
            name: "nominee_name",
            label: "Nominee Name",
            type: "text",
            placeholder: "Enter nominee name",
            required: true,
            step: 3,
          },
          {
            name: "nominee_mobile_number",
            label: "Nominee Mobile Number",
            type: "text",
            placeholder: "Enter nominee mobile number",
            required: true,
            step: 3,
          },
          {
            name: "nominee_relation",
            label: "Nominee Relation",
            type: "select",
            options: ["Spouse", "Child", "Parent", "Sibling", "Other"],
            placeholder: "Enter relation with nominee",
            required: true,
            step: 3,
          },
          {
            name: "nominee_address",
            label: "Nominee Address",
            type: "text",
            placeholder: "Enter nominee address",
            required: true,
            step: 3,
          },
        ],
      },
      {
        title: "Other Insurer Details",
        icon: FaUserCheck,
        fields: [
          {
            name: "name_of_insurer",
            label: "Name of Insurer",
            type: "text",
            placeholder: "Enter name of insurer",
            required: true,
            step: 4,
          },
          {
            name: "agency_code_no",
            label: "Agency Code No",
            type: "text",
            placeholder: "Enter agency code",
            required: true,
            step: 4,
          },
          {
            name: "date_of_appointment_as_agency",
            label: "Date of Appointment as Agency",
            type: "date",
            required: true,
            step: 4,
          },
          {
            name: "date_of_cessation_of_agency",
            label: "Date of Cessation of Agency",
            type: "date",
            required: true,
            step: 4,
          },
          {
            name: "reason_for_cessation_agency",
            label: "Reason for Cessation of Agency",
            type: "text",
            placeholder: "Enter reason for cessation",
            required: true,
            step: 4,
          },



        ],
      },

      {
        title: "Relationship & Documents",
        // icon: FaHandshake,
        fields: [
          // Branch Information
          {
            name: "branch.branch_name",
            label: "Assigned Branch",
            type: "display",
            value: posp?.branch ? `${posp.branch.branch_name} (${posp.branch.branch_code})` : "Not assigned",
            step: 5,
          },
          // BQP Information
          {
            name: "bqp_info",
            label: "Business Quality Partner BQP",
            type: "display",
            value: posp?.bqp ? `${posp.bqp.name} (${posp.bqp.employee_code})` : "Not assigned",
            step: 5,
          },
          // Relationship Manager
          {
            name: "posp_relationship_manager",
            label: "POSP Relationship Manager",
            type: "display",
            value: posp?.posp_relationship_manager ? `${posp.posp_relationship_manager.name} (${posp.posp_relationship_manager.employee_code})` : "Not assigned",
            step: 5,
          },

        
          {
            name: "posp_reporting_manager",
            label: "POSP Reporting Manager",
            type: "display",
            value: posp?.posp_reporting_manager? `${posp.posp_reporting_manager}` : "Not assigned",
            step: 5,
          },

          {
            name: "reffered_by_Name",
            label: "POSP Reffered By Name",
            type: "display",
            value: posp?.reffered_by_Name?`${posp.reffered_by_Name}` : "Not assigned",
            step: 5,
          }, {
            name: "reffered_by_Contact",
            label: "POSP Reffered By Contact",
            type: "display",
            value: posp?.reffered_by_Contact?`${posp.reffered_by_Contact}` : "Not assigned",
            step: 5,
          },
          {
            name: "edit_relationship",
            label: "Edit Relationship",
            type: "button",
            step: 5,
            action: () => setShowRelationshipDialog(true),
          }
          


         
        ],
      },



      {
              title: "Uploaded Documents",
              icon: FaCloudUploadAlt,
              fields: [
                {
                  name: "aadhar_card_front",
                  label: "Aadhar Card Front",
                  type: "file",
                },
                {
                  name: "aadhar_card_back",
                  label: "Aadhar Card Back",
                  type: "file",
                },
                {
                  name: "bank_passbook_or_cancelled_cheque",
                  label: "Bank Passbook / Canc. Cheque",
                  type: "file",
                },
                {
                  name: "passport_size_photo",
                  label: "Passport Size Photo",
                  type: "file",
                },
                {
                  name: "signature_image",
                  label: "Signature",
                  type: "file",
                },
                {
                  name: "pancard_image",
                  label: "PAN Card",
                  type: "file",
                },
                {
                  name: "marksheet_image",
                  label: "Marksheet",
                  type: "file",
                },
                {
                  name: "noc_issued_by_other_insurer_image",
                  label: "NOC Issued by Other Insurer",
                  type: "file",
                  required: true,
                  step: 5,
                },
              ],
            },


    ],
    [posp] // Add posp as dependency
  );

  
  const [selectedImage, setSelectedImage] = useState(null);

 

  useEffect(() => {
    if (sendEmailSuccess) {
      // setShowDialog(true);      // show the success dialog
      setErrorMessage("");      // clear CKEditor content
  
      // Delay reset so effect above runs
      const timeout = setTimeout(() => {
        dispatch(sendEmailReset());
      }, 1000);
  
      return () => clearTimeout(timeout);
    }
  }, [sendEmailSuccess]);
  
 
  const renderFields = (fields) => {
    return fields.map((field, index) => {
      // Handle nested field values (like branch.branch_name)
      const fieldValue = field.name.includes('.') 
        ? field.name.split('.').reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : null), posp)
        : posp ? posp[field.name] : null;
  
      const fileValue = field.type === "file" ? (posp ? posp[field.name] : null) : null;
  
      const handleImageClick = () => {
        if (fileValue) {
          setSelectedImage(fileValue);
        }
      };



      if (field.type === "button") {
        return (
          <div key={index} className="flex gap-1 flex-col col-span-full">
            <Button
              onClick={field.action}
              color="blue"
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <FaEdit /> {field.label}
            </Button>
          </div>
        );
      }
  
      // Handle display fields differently
      if (field.type === "display") {
        return (
          <div key={index} className="flex gap-1 flex-col">
            <label className="font-semibold">{field.label}</label>
            <div className="p-2 border rounded-md w-full bg-gray-50">
              {field.value || fieldValue || "Not available"}
            </div>
          </div>
        );
      }
  
      return (
        <div key={index} className="flex gap-1 flex-col">
          <label className="font-semibold">{field.label}</label>
          <div className="relative">
            {field.type === "file" ? (
              <div className="cursor-pointer" onClick={handleImageClick}>
                {fileValue === null ? (
                  <div className="w-40 h-28 bg-gray-200 flex justify-center items-center text-gray-500 border rounded-md">
                    No Image
                  </div>
                ) : fileValue ? (
                  <img
                    src={fileValue}
                    alt={field.label}
                    className="w-fit h-28 object-cover border rounded-md"
                  />
                ) : (
                  <div className="w-40 h-28 bg-gray-200 flex justify-center items-center text-gray-500 border rounded-md">
                    No Image
                  </div>
                )}
              </div>
            ) : (
              <input
                type={field.type}
                value={
                  fieldValue === null
                    ? "..." // Loading state
                    : fieldValue || ""
                }
                readOnly={field.readOnly || false}
                className={`p-2 border rounded-md w-full ${
                  fieldValue === null ? "text-gray-400 italic" : "text-black"
                }`}
                placeholder={field.placeholder || ""}
              />
            )}
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userInfo = getDecryptedCookie("userInfo");

  
    if (!token || !userInfo.id) {
      window.location.reload();
      navigate("/login"); // Redirect to login if no token or userId
      return;
    }
  }, [dispatch, navigate]);

  const [errorMessage, setErrorMessage] = useState("");


  
  const handleSubmit = async () => {
    if (!posp?.email) {
      toast.error("POSP email not found!");
      return;
    }
  
    const formData = {
      email: posp.email,
      email_content: errorMessage,
    };
  
    const toastId = toast.loading("Sending email...");
  
    try {
      const result = await dispatch(sendEmailToPosp(formData));
  
      if (result?.error) {
        throw new Error(result.error.message || "Failed to send email.");
      }
  
      toast.update(toastId, {
        render: "Email sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
  
      dispatch(fetchPospById(id));
  
      // Give UI a moment to react to success
      setTimeout(() => {
        dispatch(sendEmailReset());
      }, 1000); // 1 second delay
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
    }
  };
  

  const handleVerification = async () => {
    
    if (!posp) {
      toast.error("POSP data not found");
      return;
    }

    const toastId = toast.loading("Verifying documents...");

    try {
      const result = await dispatch(toggle_Documents_verification(id));

      if (result?.error) {
        throw new Error(result.error.message || "Verification failed");
      }

      toast.update(toastId, {
        render: "Documents verified successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });

      // Optionally refresh the POSP data
      dispatch(fetchPospById(id));
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to verify documents",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
      // console.error("Verification error:", error);
    }
  };


  const handleCanUpdateDocuments = async () => {
    if (!posp ) {
      toast.error("POSP data not found");
      return;
    }

    const toastId = toast.loading("Allowing documents...");

    try {
      const result = await dispatch(toggle_can_update_documents(id));

      if (result?.error) {
        throw new Error(result.error.message || "Verification failed");
      }

      toast.update(toastId, {
        render: "Allow Update successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });

      // Optionally refresh the POSP data
      dispatch(fetchPospById(id));
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to allow update documents",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
    }
  };


  return (
    <>
      <div className="relative h-fit w-full ">
        {sendEmailLoading && <Loading />}
        {loading && <Loading />}

        <ToastContainer position="top-right" autoClose={5000} />

        <div
          className={`flex justify-between mb-5 items-center w-full px-2 lg:px-8 py-4 border-b border-gray-200 ${
            sendEmailLoading ? "backdrop-blur-sm" : ""
          }`}
        >
          {/* Heading and Subheading */}
          <div>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              Update Posp Document
            </Typography>
            <Typography variant="small" color="gray" className="mt-1">
              Check the details below to proceed
            </Typography>
          </div>
        </div>

        <div className="lg:mx-5 mx-2">
        {stepFields?.map((section, index) => (
  <Card
    key={index}
    className="mb-5 p-5 shadow-lg border border-gray-200 rounded-lg bg-white w-full"
  >
    <Typography
      variant="h6"
      className="font-semibold text-blue-800 underline text-xl mb-4"
    >
      {index + 1}. {section?.title}
    </Typography>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {renderFields(section?.fields)}
    </div>
  </Card>
))}










          <Card className="mb-5 p-5 shadow-lg border border-gray-200 rounded-lg bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <Typography
                  variant="h6"
                  className="font-bold text-blue-700 text-xl tracking-tight underline"
                >
                  POSP Document Verification
                </Typography>
                <Typography className="mt-2 text-gray-600 leading-relaxed">
                  I have carefully reviewed all POSP details and supporting
                  documents, and confirm their validity and completeness.
                </Typography>
              </div>

              <Button
                disabled={posp?.documents_verification !== 0}
                color={posp?.documents_verification !== 0 ? "gray" : "blue"}
                onClick={handleVerification}
                className="w-full md:w-40 py-3"
                variant="contained"
                size="medium"
              >
                {posp?.documents_verification !== 0 ? "Verified" : "Verify"}
              </Button>
            </div>
          </Card>



          <Card className="mb-5 p-5 shadow-lg border border-gray-200 rounded-lg bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Typography
                variant="h6"
                className="font-bold text-blue-700 text-xl tracking-tight underline"
              >
                Allow Posp to Update Document
              </Typography>

              <Button
                disabled={posp?.can_update_documents !== 0}
                color={posp?.can_update_documents !== 0 ? "gray" : "blue"}
                onClick={handleCanUpdateDocuments}
                className="w-full md:w-40 py-3"
                variant="contained"
                size="medium"
              >
                {posp?.can_update_documents === 1 ? "Allowed" : "Allow"}
              </Button>
            </div>
          </Card>











<Card className="mb-5 p-5 shadow-lg border border-gray-200 rounded-lg bg-white w-full">
  <Typography
    variant="h6"
    className="font-semibold text-blue-800 text-xl mb-4 underline"
  >
    Send Email to POSP
  </Typography>

  <div className="flex flex-col gap-4 w-full">
    <div className="w-full">
      <CkeditorDemo
        placeholder="Describe the incorrect details"
        content={errorMessage}
        setContent={setErrorMessage}
      />
    </div>

    <div className="w-full flex justify-end">
      <Button
        color="red"
        className="w-full sm:w-auto px-6 py-3"
        onClick={handleSubmit}
      >
        Send Mail
      </Button>
    </div>
  </div>
</Card>


        </div>

        {selectedImage && (
          <Dialog
            size={"xl"}
            open={selectedImage}
            handler={() => setSelectedImage(null)}
          >
            <DialogBody>
              <div className="flex flex-col relative p-0 items-center">
                <button
                  className="absolute top-1 right-1 bg-white border border-gray-500 rounded-full p-1 shadow-md"
                  onClick={() => setSelectedImage(null)}
                >
                  <RxCross1 className="h-6 font-extrabold w-6 text-gray-900" />
                </button>
                <img
                  src={selectedImage}
                  alt="Full Size"
                  className="max-w-full max-h-full"
                />
              </div>
            </DialogBody>
          </Dialog>
        )}
      </div>






      <Dialog 
        size="xl" 
        open={showRelationshipDialog} 
        handler={() => setShowRelationshipDialog(false)}
      >
        <DialogBody className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" color="blue-gray">
              Edit Relationship Details
            </Typography>
            <Button
              variant="text"
              color="red"
              onClick={() => setShowRelationshipDialog(false)}
              className="p-1"
            >
              <RxCross1 className="h-5 w-5" />
            </Button>
          </div>
          
          <AppointOfficialsToPosp 
            pospId={id} 
            initialValues={{
              branch_id: posp?.branch?.id || '',
              bqp: posp?.bqp?.id || '',
              posp_relationship_manager: posp?.posp_relationship_manager?.id || '',
              posp_reporting_manager: posp?.posp_reporting_manager || '',
              reffered_by_Name: posp?.reffered_by_Name || '',
              reffered_by_Contact: posp?.reffered_by_Contact || ''
            }} 
            onSuccess={() => {
              setShowRelationshipDialog(false);
              dispatch(fetchPospById(id));
            }}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default HrPospUpdate;



































