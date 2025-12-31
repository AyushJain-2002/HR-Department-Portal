import { useOperation } from "../../hooks/useOperation"
import {useBranch} from "../../hooks/useBranch"
import {useFuel} from "../../hooks/useFuel"
import {usePolicyReferBy} from "../../hooks/usePolicyReferBy"
import { useEffect } from "react";

export default function ReferByConfig(formData){
    const{ bqpList, relationshipManagers, reportingManager, pospTypes,fetchBqp,fetchRelationshipManager,fetchPospTypes} = useOperation();
    const{ branches,fetchBranches } = useBranch();
    const{ banks,fetchBanks } = useFuel();
    const{ policyRefList,fetchPolicyReferBy} =usePolicyReferBy();
    const titles = [
        { id: 1, title: "Mr." },
        { id: 2, title: "Mrs." },
        { id: 3, title: "Miss." },
    ];
    // console.log("policy rf list in config",policyRefList)
    useEffect(() => {
        if (!bqpList?.length) (fetchBqp());
    if (!banks || banks.length === 0) (fetchBanks());
    if (!policyRefList || policyRefList.length === 0) (fetchPolicyReferBy());
    if (!branches || branches.length === 0) (fetchBranches());
    if(!relationshipManagers || relationshipManagers.length === 0) (fetchRelationshipManager())
    if(!pospTypes || pospTypes.length === 0) (fetchPospTypes())
}, []);
// console.log("ref list in config",policyRefList)
return{
        stepFields:[
         {
            // title:"Add Policy Refer By",
        className: "grid gap-4 sm:grid-row-1 md:justify-center md:grid-cols-3",
            fields:[
                {
                    name: "bqp",
                    label: "BQP",
                    type: "select",
                    options: bqpList?.map((bqp) => ({
                    value: bqp.id,
                    label: bqp.name + " - " + bqp.code,
                    })),
                    placeholder: "Select BQP",
                    required: true,
                    storeLabel: false,
                },
                {
                    name: "relationship_manager",
                    label: "Relationship Manager",
                    type: "select",
                    options: relationshipManagers?.map((rm) => ({
                    value: rm.id,
                    label: rm.name + " - " + rm.code,
                    })),
                    placeholder: "Select Relationship Manager",
                    required: true,
                    storeLabel: false,
                },
                {
                    name: "posp",
                    label: "POSP",
                    type: "select",
                    options: pospTypes?.map((pos) => ({
                    value: pos.id,
                    label: pos.name + " - " + pos.code,
                    })),
                    placeholder: "Select POSP",
                    required: true,
                    storeLabel: false,
                },
                {
                    name: "title",
                    label: "Title",
                    type: "select",
                    options: titles.map((tit) => ({
                    value: tit.id,
                    label: tit.title,
                    })),
                    placeholder: "Select a Title",
                    required: true,
                    storeLabel: true,
                },
                {
                    name: "name",
                    label: "Policy Refer By Name",
                    type: "text",
                    placeholder: "Enter Policy Refer By name",
                    required: true,
                },
                {
                    name: "gender",
                    label: "Gender",
                    type: "select",
                    options: [
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                    ],
                    placeholder: "Select Gender",
                    required: true,
                    storeLabel: true,
                },
                {
                    name: "mobile_no",
                    label: "Mobile Number",
                    type: "text",
                    placeholder: "Enter mobile number",
                    required: true,
                },
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
                    storeLabel: false,
                    disabled: !!formData.branch_id, // Disable if restricted user
                    defaultValue: !!formData.branch_id
                    ? {
                        value: Number(formData.branch_id),
                        label:
                            branches?.find(
                            (branch) => branch.id === Number(formData.branch_id)
                            )?.branch_code || "Unknown Branch",
                        }
                    : undefined,
                },
                {
                    name: "email",
                    label: "E-mail",
                    type: "text",
                    placeholder: "Enter Email ID",
                    required: true,
                },
                {
                    name: "aadhar_no",
                    label: "Aadhar Number",
                    type: "text",
                    placeholder: "Aadhar Number",
                    required: true,
                },
                {
                    name: "pancard_number",
                    label: "Pancard Number",
                    type: "text",
                    placeholder: "Pancard Number",
                    required: true,
                },
                {
                    name: "bank_name",
                    label: "Bank Name",
                    type: "select",
                    options: banks?.map((bank) => ({
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
                    label: "Bank Branch code",
                    type: "text",
                    placeholder: "Bank Branch code",
                    required: true,
                    step: 1,
                },
                {
                    name: "bank_branch_name",
                    label: "Bank Branch Name",
                    type: "text",
                    placeholder: "Bank Branch Name",
                    required: true,
                    step: 1,
                },
                {
                    name: "bank_ifsc_code",
                    label: "IFSC Code",
                    type: "text",
                    placeholder: "IFSC Code",
                    required: true,
                    step: 1,
                },
                {
                    name: "bank_account_no",
                    label: "Account Number",
                    type: "text",
                    placeholder: "Account Number",
                    required: true,
                    step: 1,
                },
                {
                    name: "bank_account_type",
                    label: "Account Type",
                    type: "select",
                    options: [
                    { value: "Savings", label: "Savings" },
                    { value: "Current", label: "Current" },
                    ],
                    placeholder: "Select Account Type",
                    required: true,
                    storeLabel: true,
                    step: 3,
                },
                {
                    name:"submit",
                    label: "Submit",
                    type:"button",
                    className:"w-48 mx-[42%]  col-span-full"
                }
            ]
        }
           // ],
           // [
           // titles,
           // bqpList,
           // relationshipManagers,
           // pospTypes,
           // banks,
           // branches,
           // isRestrictedUser,
           // parsedBranchId,
           // ]
        ]
 }
}