import { FaBriefcase, FaHome, FaPiggyBank } from "react-icons/fa";
// import { use, useSelector } from "react-redux";
// import { fetchBranches } from "../../store/Actions/BranchAction";
// // import { fetchBqp } from "../../store/Actions/OperationAction";
// import { fetchStates } from "../../store/Actions/StateAction";
// import { fetchBanks } from "../../store/Actions/FuelAction";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useBranch,useFuel, useOperation, useStateData } from "../../hooks/hookIndex";


export default function MispCreateConfig(formData) {
      const{fetchBranches,branches}=useBranch();
      const{fetchBanks,banks}=useFuel()
      const {fetchStates,states = [], cities = { cities: [] }}=useStateData();
      const { bqpList, relationshipManagers, reportingManagerForPospMisp, pospTypes,fetchBqp } =
      useOperation();
      // const { states = [], cities = { cities: [] } } = useSelector(
      //   (state) => state.states
      // );
        // const { banks } = useSelector((state) => state.fuels);
        // const { branches } = useSelector((state) => state.branches);
      
        useEffect(() => {
          if (!branches || branches.length === 0) (fetchBranches());
          if (!bqpList || bqpList.length === 0) (fetchBqp());
          if (!states || states.length === 0) (fetchStates());
          if (!banks || banks.length === 0) (fetchBanks());
        }, []);

          const userBranchId = Cookies.get("branchId");
          const userRole = Cookies.get("role");
          const isRestrictedUser =
            userBranchId && !["admin", "Admin", "superadmin"].includes(userRole);
        const parsedBranchId = Number(userBranchId);
    return {
        stepFields : [
          {
            title: "Personal Details",
            icon: FaHome,
            fields: [
              {
                name: "title",
                label: "Title",
                type: "select",
                options: [
                  { value: 1, label: "Mr." },
                  { value: 2, label: "Mrs." },
                  { value: 3, label: "Miss." },
                  { value: 4, label: "Dr." },
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
                type: "text",
                placeholder: "Mobile Number",
                required: true,
                step: 0,
              },
              {
                name: "alternative_mobile_no",
                label: "Alternative Mobile Number",
                type: "text",
                placeholder: "Alternative Mobile Number",
                required: false,
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
              { name: "houseno", label: "House No.", type: "text" },
              {
                name: "street",
                label: "Street",
                type: "text",
                placeholder: "Enter street",
                required: true,
                step: 0,
              },
              {
                name: "state",
                label: "State",
                type: "select",
                options: (states || []).map((state) => ({
                  value: state.id,
                  label: state.state_name,
                })),
                placeholder: "Select state",
                storeLabel: true,
                required: true,
                step: 0,
              },
              {
                name: "city",
                label: "City",
                type: "select",
                options: (cities.cities || []).map((city) => ({
                  value: city.city_id,
                  label: city.city_name,
                })),
                placeholder: "Select a city",
                step: 0,
                required: true,
                storeLabel: true,
              },
              {
                name: "pincode",
                label: "Pincode",
                type: "text",
                placeholder: "Enter pincode",
                required: true,
                step: 0,
              },
            ],
          },
    
          {
            title: "Bank Details",
            icon: FaPiggyBank,
            fields: [
              {
                name: "bankname",
                label: "Bank Name",
                type: "select",
                options: (banks || []).map((bank) => ({
                  value: bank.id,
                  label: bank.bank_name,
                })),
                placeholder: "Bank Name",
                required: true,
                storeLabel: true,
                step: 3,
              },
              {
                name: "bank_branch_code",
                label: "Bank Branch Code",
                type: "text",
                placeholder: "Bank Branch Code",
                required: true,
                step: 1,
              },
              {
                name: "bankifsc_code",
                label: "IFSC Code",
                type: "text",
                placeholder: "IFSC Code",
                required: true,
                step: 1,
              },
              {
                name: "bankaccount_no",
                label: "Account Number",
                type: "text",
                placeholder: "Account Number",
                required: true,
                step: 1,
              },
              {
                name: "bank_type",
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
                name: "bank_passbook_image",
                label: "Bank Passbook Image",
                type: "file",
                required: true,
                step: 1,
              },
              {
                name: "pancard_image",
                label: "Pancard Image",
                type: "file",
                required: true,
                step: 1,
              },
              {
                name: "other_document",
                label: "Other Document",
                type: "file",
                required: true,
                step: 1,
              },
            ],
          },
          {
            title: "Official Details",
            icon: FaBriefcase, // Choose an appropriate icon
            fields: [
              {
                name: "branch_id",
                label: "Branch",
                type: "select",
                options: (branches || []).map((branch) => ({
                  value: branch.id,
                  label: branch.branch_code,
                })),
                placeholder: "Select Branch",
                required: true,
                step: 2,
                storeLabel: true,
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
                options: (bqpList || []).map((bqp) => ({
                  value: bqp.id,
                  label: bqp.name + " " + bqp.code,
                })),
                placeholder: "Select BQP",
                step: 2,
                required: true,
                storeLabel: false,
              },
              {
                name: "reporting_manager",
                label: "Reporting Manager",
                type: "select",
                options: (reportingManagerForPospMisp||[] ).map((bqp) => ({
                  value: bqp.id,
                  label: bqp.name + " " + bqp.code,
                })),
                placeholder: "Select Reporting Manager",
                step: 2,
                required: true,
                storeLabel: false,
              },
              {
                name: "relationship_manager",
                label: "Relationship Manager",
                type: "select",
                options: (relationshipManagers || []).map((bqp) => ({
                  value: bqp.id,
                  label: bqp.name + " " + bqp.code,
                })),
                placeholder: "Select Relationship Manager",
                step: 2,
                required: true,
                storeLabel: false,
              },
              {
                name: "posp_id",
                label: "POSP ID",
                type: "select",
                options: (pospTypes || []).map((bqp) => ({
                  value: bqp.id,
                  label: bqp.name + " " + bqp.posp_code,
                })),
                placeholder: "Select POSP ID",
                step: 2,
                required: true,
                storeLabel: false,
              },
            ],
          },
        ],
    };
}
