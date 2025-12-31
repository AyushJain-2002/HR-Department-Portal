import  { useEffect } from "react";
import { FaAddressBook, FaBriefcase, FaCloudUploadAlt, FaHome, FaPiggyBank } from "react-icons/fa";
import {useDepartment} from "../../hooks/useDepartment";
import { RiProgress2Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { useOperation } from "../../hooks/useOperation";
import { useStateData } from "../../hooks/useStatesData";
import {useBranch} from "../../hooks/useBranch"
import { useFuel } from "../../hooks/useFuel";
import ROLES from "../../Utils/Routes/RolesConfig";
export default function HrEmployeeConfig(formData) {
    const{ bqpList, relationshipManagers, reportingManager, pospTypes,fetchBqp }=useOperation();
    const {states,cities,citiesBy,fetchStates} =useStateData();
    const { departments,designations,fetchDepartments,  fetchDesignation} =useDepartment();
    const {branches,fetchBranches} = useBranch();
    const {banks,fetchBanks} = useFuel();
    const userBranchId  = Cookies.get("branchId");
    const userRole   = Cookies.get("role");
    const isRestrictedUser = userBranchId && !["admin","Admin", "superadmin"].includes(userRole);
    const parsedBranchId = Number(userBranchId); 
    useEffect(() => {
      if (!bqpList || bqpList.length === 0) fetchBqp();
      if (!departments || departments.length === 0) (fetchDepartments());
      if (!designations || designations.length === 0) (fetchDesignation());
      if (!states || states.length === 0) (fetchStates());
      if (!branches || branches.length === 0) (fetchBranches());
      if (!banks?.length) (fetchBanks());
    }, []);
  return {
    stepFields: [
            {
              title: "Personal Details",
              icon: FaHome,
              fields: [
                {
                  name: "title",
                  label: "Title",
                  type: "select",
                  options: [
                    { value: "1", label: "Mr." },
                    { value: "2", label: "Mrs." },
                    { value: "3", label: "Miss." },
                    { value: "4", label: "Dr." },
                  ],
                  storeLabel: true,
                  placeholder: "Select title",
                  required: true,
                  step: 0,
                },
                {
                  name: "name",
                  label: "Name",
                  type: "text",
                  placeholder: "Name",
                  required: true,
                  step: 0,
                },
                {
                  name: "mobile_no",
                  label: "Mobile Number",
                  type: "tel",
                  placeholder: "Mobile Number",
                  required: true,
                  step: 0,
                },
                {
                  name: "alternative_mobile_number",
                  label: "Alternative Mobile No.",
                  type: "tel",
                  placeholder: "Alternative Mobile Number",
                  required: false,
                  step: 0,
                },
                {
                  name: "personal_email",
                  label: "Personal Email",
                  type: "email",
                  placeholder: "Personal Email",
                  required: true,
                  step: 0,
                },
                {
                  name: "login_email",
                  label: "Login Email",
                  type: "email",
                  placeholder: "Login Email",
                  required: true,
                  step: 0,
                },
                {
                  name: "aadhar_no",
                  label: "Aadhar Number",
                  type: "text",
                  placeholder: "Aadhar Number",
                  required: true,
                  step: 0,
                },
                {
                  name: "pancard_number",
                  label: "Pancard Number",
                  type: "text",
                  placeholder: "Pancard Number",
                  required: true,
                  step: 0,
                },
                {
                  name: "education_level",
                  label: "Education Level",
                  type: "select",
                  options: [
                    { value: 1, label: "10th" },
                    { value: 2, label: "12th" },
                    { value: 3, label: "Diploma / Certificate" },
                    { value: 4, label: "Bachelor's Degree" },
                    { value: 5, label: "Master's Degree" },
                  ],
                  storeLabel: true,
                  placeholder: "Select Level",
                  required: true,
                  step: 0,
                },
                {
                  name: "joining_date",
                  label: "Joining Date",
                  type: "date",
                  placeholder: "Joining Date",
                  required: true,
                  step: 0,
                },
                {
                  name: "role",
                  label: "Role",
                  type: "select",
                  options: [
                    { value: ROLES.SUPER_ADMIN, label: "Super Admin" },
                    { value: ROLES.ADMIN, label: "Admin" },
                    { value: ROLES.HR_HEAD, label: "HR Head" },
                    { value: ROLES.HR, label: "HR" },
                    // { value: ROLES.OPERATION_HEAD, label: "Operation Head" },
                    // { value: ROLES.SALES_SUPPORT_HEAD, label: "Sales Support Head" },
                    // { value: ROLES.SALES_MARKETING_HEAD, label: "Sales & Marketing Head" },
                    // { value: ROLES.ACCOUNTS_HEAD, label: "Accounts Head" },
                    // { value: ROLES.RENEWALS_HEAD, label: "Renewals Head" },
                    // { value: ROLES.IT_SUPPORT_HEAD, label: "IT Support Head" },
                    // { value: ROLES.INVENTORY_HEAD, label: "Inventory Head" },
                    // { value: ROLES.CLAIM_HEAD, label: "Claim Head" },
                    // { value: ROLES.OPERATION, label: "Operation" },
                    // { value: ROLES.SALES_SUPPORT, label: "Sales Support" },
                    // { value: ROLES.SALES_MARKETING, label: "Sales & Marketing" },
                    // { value: ROLES.ACCOUNTS, label: "Accounts" },
                    // { value: ROLES.RENEWAL, label: "Renewal" },
                    // { value: ROLES.IT_SUPPORT, label: "IT Support" },
                    // { value: ROLES.INVENTORY, label: "Inventory" },
                    // { value: ROLES.CLAIM, label: "Claim" },
                    // { value: ROLES.MISP, label: "MISP" },
                    // { value: ROLES.GROUP, label: "Group" },
                    // { value: ROLES.SUB_GROUP, label: "Sub Group" },
                    // { value: ROLES.POSP, label: "POSP" }
                  ],
                  storeLabel: true,
                  placeholder: "Select Role",
                  required: true,
                  step: 0,
                },
              ],
            },
            {
              title: "Address Book Details",
              icon: FaAddressBook,
             
              fields2: [
                
                {
                  name: "permanent_house_no",
                  label: "Permanent  House No",
                  type: "text",
                  placeholder: "Enter House No",
                  required: true,
                  step: 1,
                },
               
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
                  options: states.map((state) => ({
                    value: state.id,
                    label: state.state_name,
                  })),
                  placeholder: "Select a state",
                  step: 1,
                  storeLabel: true,
                  createOpt: false,
                },
                {
                  name: "permanent_address_city",
                  label: "Permanent City",
                  type: "select",
                  // options: formData.permanent_address_state
                  //   ? (citiesBy.cities || []).map((city) => ({
                  //       value: city.city_id,
                  //       label: city.city_name,
                  //     }))
                  //   : [],
                  options:  (citiesBy.cities || []).map((city) => ({
                        value: city.city_id,
                        label: city.city_name,
                      }))
                    ,
                  placeholder: "Select a city",
                  step: 1,
                  dependsOn: ["permanent_address_state"],
                  required: true,
                  storeLabel: true,
                  createOpt: false,
                },
                {
                  name: "permanent_address_town",
                  label: "Permanent  Town",
                  type: "text",
                  placeholder: "Enter Town",
                  required: true,
                  step: 1,
                },
                {
                  name: "permanent_address_pincode",
                  label: "Permanent Pincode",
                  type: "tel",
                  placeholder: "Enter pincode",
                  required: true,
                  step: 1,
                },
              ],
              fields: [
                {
                  name: "current_house_no",
                  label: "Current  House No",
                  type: "text",
                  placeholder: "Enter House No",
                  required: true,
                  step: 1,
                },
                {
                  name: "current_address_street",
                  label: "Current  Street",
                  type: "text",
      
                  placeholder: "Enter street",
                  required: true,
                  step: 1,
                },
                {
                  name: "current_address_state",
                  label: "Current  State",
                  type: "select",
                  options: states.map((state) => ({
                    value: state.id,
                    label: state.state_name,
                  })),
                  placeholder: "Select state",
                  storeLabel: true,
                  required: true,
                  step: 1,
                  createOpt: false,
                },
                {
                  name: "current_address_city",
                  label: "Current City",
                  type: "select",
                  options:  (cities.cities || []).map((city) => ({
                        value: city.city_id,
                        label: city.city_name,
                      }))
                    ,
                  placeholder: "Select a city",
                  step: 1,
                  dependsOn: ["current_address_state"],
                  required: true,
                  storeLabel: true,
                  createOpt: false,
                },
                {
                  name: "current_address_town",
                  label: "Current  Town",
                  type: "text",
                  placeholder: "Current Town",
                  required: true,
                  step: 1,
                },
                {
                  name: "current_address_pincode",
                  label: "Current Pincode",
                  type: "text",
                  placeholder: "Enter pincode",
                  required: true,
                  step: 1,
                },
               
                {
                  name: ["same_as_permanent"],
                  label: "Same as Current Address",
                  type: "radio",
                  required: true,
                  options: [
                    { value: "1", label: "NO" },
                    { value: "2", label: "YES" },
                  ],
                  step: 1,
                },



                {
                  name: "permanent_house_no",
                  label: "Permanent  House No",
                  type: "text",
                  placeholder: "Enter House No",
                  required: true,
                  step: 1,
                  dependsOn: ["same_as_permanent"],
                  sourceFields: ["current_house_no"], 
                },
               
                {
                  name: "permanent_address_street",
                  label: "Permanent  Street",
                  type: "text",
                  placeholder: "Enter street",
                  required: true,
                  step: 1,
                  dependsOn: ["same_as_permanent"],
                  sourceFields: ["current_address_street"],
                },
                {
                  name: "permanent_address_state",
                  label: "Permanent State",
                  type: "select",
                  required: true,
                  options: states.map((state) => ({
                    value: state.id,
                    label: state.state_name,
                  })),
                  placeholder: "Select a state",
                  step: 1,
                  storeLabel: true,
                  createOpt: false,
                  dependsOn: ["same_as_permanent"],
                  sourceFields: ["current_address_state"],
                },
                {
                  name: "permanent_address_city",
                  label: "Permanent  City",
                  type: "select",
                  // options: formData.permanent_address_state
                  //   ? (citiesBy.cities || []).map((city) => ({
                  //       value: city.city_id,
                  //       label: city.city_name,
                  //     }))
                  //   : [],
                  options:  (cities.cities || []).map((city) => ({
                        value: city.city_id,
                        label: city.city_name,
                      }))
                    ,
                  placeholder: "Select a city",
                  step: 1,
                  dependsOn: ["same_as_permanent","permanent_address_state"],
                  required: true,
                  storeLabel: true,
                  createOpt: false,
                  sourceFields: ["current_address_city"],
                },
                {
                  name: "permanent_address_town",
                  label: "Permanent  Town",
                  type: "text",
                  placeholder: "Enter Town",
                  required: true,
                  step: 1,
                  dependsOn: ["same_as_permanent"],
                  sourceFields: ["current_address_town"],
                },
                {
                  name: "permanent_address_pincode",
                  label: "Permanent Pincode",
                  type: "text",
                  placeholder: "Enter pincode",
                  required: true,
                  step: 1,
                  dependsOn: ["same_as_permanent"],
                  sourceFields: ["current_address_pincode"],
                },
              ],
            },
            {
              title: "Employment Details",
              icon: FaBriefcase,
              fields: [
                {
                  name: "department",
                  label: "Department",
                  type: "select",
                  options: departments?.map((dep) => ({
                    value: dep.id,
                    label: dep.department_name,
                  })),
                  storeLabel: true,
                  placeholder: "Select Department",
                  required: true,
                  step: 2,
                },
                {
                  name: "designation",
                  label: "Designation",
                  type: "select",
                  options: designations?.map((des) => ({
                    value: des.id,
                    label: des.designation_name,
                  })),
                  storeLabel: true,
                  placeholder: "Select Designation",
                  required: true,
                  step: 2,
                },
                {
                  name: "branch_id",
                  label: "Branch",
                  type: "select",
                  options: branches?.map((branch) => ({
                    value: branch.id,
                    label: branch.branch_code,
                  })),
                  storeLabel: true,
                  placeholder: "Select Branch",
                  required: true,
                  step: 2,
                 disabled: isRestrictedUser, // Disable if restricted user
                 defaultValue:
                 isRestrictedUser && parsedBranchId
                   ? {
                       value: parsedBranchId,
                       label:
                         branches?.find((branch) => branch.id === parsedBranchId)
                           ?.branch_code || "Unknown Branch",
                     }
                   : undefined,
                },
                {
                  name: "bqp",
                  label: "BQP", 
                  type: "select",
                  options: bqpList?.map((emp) => ({
                    value: emp.id,
                    label: emp.name,
                  })),
                  storeLabel: true,
                  placeholder: "Select BQP",
                  required: true,
                  step: 2,
                },
                {
                  name: "reporting_manager",
                  label: "Reporting Manager",
                  type: "select",
                  options: (reportingManager || []).map((bqp) => ({
                    value: bqp.id,
                    label: bqp.name + " " + bqp.code,
                  })),
                  storeLabel: true,
                  placeholder: "Select Reporting Manager",
                  required: true,
                  step: 2,
                  dependsOn: ["bqp"],
                },
                {
                  name: "relationship_manager",
                  label: "Relationship Manager",
                  type: "select",
                  options: (relationshipManagers || []).map((bqp) => ({
                    value: bqp.id,
                    label: bqp.name + " " + bqp.code,
                  })),
                  storeLabel: true,
                  placeholder: "Select Relationship Manager",
                  required: true,
                  step: 2,
                  dependsOn:["reporting_manager"]
                },
                {
                  name: "level",
                  label: "Level",
                  type: "text",
                  placeholder: "Level",
                  required: false,
                  step: 2,
                },
                {
                  name: "grade",
                  label: "Grade",
                  type: "text",
                  placeholder: "Grade",
                  required: false,
                  step: 2,
                },
                {
                  name: "is_bqp",
                  label: "Is BQP",
                  type: "select",
                  options: [
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ],
                  storeLabel: true,
                  placeholder: "Select Is BQP",
                  required: true,
                  step: 2,
                },
                {
                  name: "employee_type",
                  label: "Employee Type",
                  type: "select",
                  options: [
                    { value: "Fresher", label: "Fresher" },
                    { value: "Experienced", label: "Experienced" },
                  ],
                  storeLabel: true,
                  placeholder: "Select Employee Type",
                  required: true,
                  step: 2,
                },
              ],
            },
            {
              title: "Bank and Emergency Contact Details",
              icon: FaPiggyBank,
              fields: [
                { 
                  name: "bank_name",
                  label: "Bank Name",
                  type: "select",
                  options: banks?.map((state) => ({
                  value: state.id,
                  label: state.bank_name,
                })),
                storeLabel: true,
                  placeholder: "Bank Name",
                  required: true,
                  step: 3,
                },
                {
                  name: "bank_branch",
                  label: "Bank Branch",
                  type: "text",
                  placeholder: "Bank Branch",
                  required: true,
                  step: 3,
                },
                {
                  name: "ifsc_code",
                  label: "IFSC Code",
                  type: "text",
                  placeholder: "IFSC Code",
                  required: true,
                  step: 3,
                },
                {
                  name: "account_number",
                  label: "Account Number",
                  type: "text",
                  placeholder: "Account Number",
                  required: true,
                  step: 3,
                },
                {
                  name: "account_type",
                  label: "Account Type",
                  type: "select",
                  options: [
                    { value: "Savings", label: "Savings" },
                    { value: "Current", label: "Current" },
                  ],
                  placeholder: "Select Account Type",
                  required: true,
                  step: 3,
                },
                {
                  name: "emergency_contact_person_name",
                  label: "Emergency Contact Person Name",
                  type: "text",
                  placeholder: "Emergency Contact Person Name",
                  required: true,
                  step: 3,
                },
                {
                  name: "emergency_contact_person_number",
                  label: "Emergency Contact Person Number",
                  type: "text",
                  placeholder: "Emergency Contact Person Number",
                  required: true,
                  step: 3,
                },
              ],
            },
            {
              title: "Experienced Details",
              icon: FaBriefcase, // You can change this to a relevant icon
              fields: [
                {
                  name: "total_experience",
                  label: "Total Experience (Years)",
                  type: "tel",
                  placeholder: "Enter total years of experience",
                  required: true,
                  step: 3,
                },
                {
                  name: "company_name",
                  label: "Previous Company Name",
                  type: "text",
                  placeholder: "Enter previous company name",
                  required: true,
                  step: 3,
                },
                {
                  name: "experience",
                  label: "Experience Details",
                  type: "textarea",
                  placeholder: "Describe your previous experience",
                  required: true,
                  step: 3,
                },
                {
                  name: "last_company_designation",
                  label: "Last Designation",
                  type: "text",
                  placeholder: "Enter your last designation",
                  required: true,
                  step: 3,
                },
                {
                  name: "previous_ctc",
                  label: "Previous CTC",
                  type: "tel",
                  placeholder: "Enter previous CTC",
                  required: true,
                  step: 3,
                },
                {
                  name: "current_ctc",
                  label: "Current CTC",
                  type: "tel",
                  placeholder: "Enter current CTC",
                  required: true,
                  step: 3,
                },
                // {
                //   name: "Previous_offer_letter",
                //   label: "Previous Offer Letter",
                //   type: "file",
                //   placeholder: "Upload relieving letter",
                //   required: false,
                //   step: 3,
                // },
                {
                  name: "relieving_letter",
                  label: "Previous Relieving Letter",
                  type: "file",
                  placeholder: "Upload relieving letter",
                  required: true,
                  step: 3,
                },
                // {
                //   name: "remarks",
                //   label: "Remarks",
                //   type: "text",
                //   placeholder: "For Increment Purpose",
                //   required: false,
                //   step: 3,
                // },
              ],
            },
            {
              title: "Documents to Upload",
              icon: FaCloudUploadAlt,
              fields: [
                {
                  name: "aadhaar_card_front",
                  label: "Aadhaar Card Front",
                  type: "file",
                  required: true,
                  step: 4,
                },
                {
                  name: "aadhaar_card_back",
                  label: "Aadhaar Card Back",
                  type: "file",
                  required: true,
                  step: 4,
                },
                {
                  name: "pancard_image",
                  label: "Pancard Image",
                  type: "file",
                  required: true,
                  step: 4,
                },
                {
                  name: "bank_passbook_image",
                  label: "Bank Passbook Image",
                  type: "file",
                  required: true,
                  step: 4,
                },
                {
                  name: "marksheet_image",
                  label: "Marksheet Image",
                  type: "file",
                  required: true,
                  step: 4,
                },
                {
                  name: "photo",
                  label: "Photo",
                  type: "file",
                  required: true,
                  step: 4,
                },
              ],
            },
    ],
    dialogBox:
      {
        title: "Instructions",
        content: "Please Keep All the Documents Ready Before Proceeding to Fill the Form.",
        points: [
          { point: "Identity Proof (Aadhar Card/Voter Card/10th Marksheet etc.)" },
          { point: "Address Proof (Aadhar Card/Voter Card/Utility Bills etc.)" },
          { point: "Educational Certificates (Marksheet/Degree Certificates)" },
          { point: "Previous Employment Documents (Relieving Letter/Experience Certificate)" },
          { point: "Bank Account Details (Cancelled Cheque/Passbook)" },
          { point: "Passport Size Photo" },
          { point: "Any Other Relevant Documents" },
        ],
        notes: [
          { point: "Ensure all documents are up-to-date and valid." },
          { point: "Ensure all documents are clear and legible." },
          { point: "Contact HR for any assistance regarding document submission." },
          
        ],
      },
      uploadInstruction:{
                  title: "Document Regarding Instructions",
                  icon: RiProgress2Line,
                  fields: [
                    {
                      label:
                        "Upload a clear image of the front side of your Aadhar Card.",
                      sampleImage: "../../../../assets/Images/Aadhar_PVC_Front.jpg",
                      step: 5,
                      type: "file",
                      accept: "image/jpeg,image/png,image/jpg", // Add this
                      acceptTypes: ["image/jpeg", "image/png", "image/jpg"], // Add this
                    },
                    {
                      label: "Upload a clear image of the back side of your Aadhar Card.",
                      step: 5,
                      type: "file",
                      accept: "image/jpeg,image/png,image/jpg", // Add this
                      acceptTypes: ["image/jpeg", "image/png", "image/jpg"], // Add this
                      sampleImage:
                        "../../../../public/assets/Images/Sample_PVC_Aadhar_Card_back.jpg",
                    },
                    {
                      label:
                        "Upload your Bank Passbook first page or a Cancelled Cheque.",
                      step: 5,
                      type: "file",
                      accept: "image/jpeg,image/png,image/jpg", // Add this
                      acceptTypes: ["image/jpeg", "image/png", "image/jpg"], // Add this
                      sampleImage: "../../../../assets/Images/cancelcheque.jfif",
                    },
                    {
                      label:
                        "Upload a recent Passport Size Photo with a clear background.",
                      step: 5,
                      type: "file",
                      accept: "image/jpeg,image/png,image/jpg", // Add this
                      acceptTypes: ["image/jpeg", "image/png", "image/jpg"], // Add this
                      sampleImage: "../../../../assets/Images/passport-size.webp",
                    },
                    {
                      label: "Upload a clear image of your signature on white paper.",
                      step: 5,
                      type: "file",
                      accept: "image/jpeg,image/png,image/jpg", // Add this
                      acceptTypes: ["image/jpeg", "image/png", "image/jpg"], // Add this
                      sampleImage: "../../../../assets/Images/signature.png",
                    },
                    {
                      label: "Upload a clear image of your PAN Card.",
                      step: 5,
                      type: "file",
                      accept: "image/jpeg,image/png,image/jpg", // Add this
                      acceptTypes: ["image/jpeg", "image/png", "image/jpg"], // Add this
                      sampleImage: "../../../../assets/Images/pancard.webp",
                    },
                    {
                      label: "Upload your latest education Marksheet.",
                      step: 5,
                      type: "file",
                      accept: "image/jpeg,image/png,image/jpg", // Add this
                      acceptTypes: ["image/jpeg", "image/png", "image/jpg"], // Add this
                      sampleImage: "../../../../assets/Images/marksheet.jpg",
                    },
                  ],
                },
    

};
}


