import { FaAddressBook, FaCloudUploadAlt, FaHome, FaUserCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaDiagramProject } from "react-icons/fa6";
import { RiProgress2Line } from "react-icons/ri";
export default function PospDocument11config() {
  const {
    states = [],
    cities = { cities: [] },
    citiesBy = { cities: [] }
  } = useSelector((state) => state.states);
  return {
    // title: "HR Employee Form",
    validate: true,
    stepFields: [
          {
            title: "Personal",
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
                placeholder: "Select Title",
                required: true,
                step: 0,
              },
              {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Name",
                readOnly: true, // Make the field read-only
                step: 0,
              },
              {
                name: "mobile_no",
                label: "Mobile Number",
                type: "text",
                placeholder: "Mobile Number",
                readOnly: true, // Make the field read-only
                step: 0,
              },
              {
                name: "email",
                label: "Email ID",
                type: "text",
                placeholder: "Email ID",
                readOnly: true, // Make the field read-only
                step: 0,
              },
    
              {
                name: "father_name",
                label: "Father's Name",
                type: "text",
                placeholder: "Enter father's name",
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
                options: [
                  { value: 1, label: "Female" },
                  { value: 2, label: "Male" },
                  { value: 3, label: "Other" },
                  { value: 4, label: "Psycho" },
                ],
                storeLabel: true,
                required: true,
                step: 0,
                placeholder:"Select Gender"
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
                name: "aadhar_no",
                label: "Aadhar Number",
                type: "text",
                placeholder: "Enter Aadhar card number",
                required: true,
                step: 0,
              },
              {
                name: "marital_status",
                label: "Marital Status",
                type: "select",
                options: [
                  { value: 1, label: "Single" },
                  { value: 2, label: "Married" },
                  { value: 3, label: "Other" },
                ],
                storeLabel: true,
                placeholder: "Select Status",
                required: true,
                step: 0,
              },
    
              {
                name: "language",
                label: "Language",
                type: "select",
                options: [
                  { value: 1, label: "Hindi" },
                  { value: 2, label: "English" },
                  { value: 3, label: "Marathi" },
                  { value: 4, label: "Gujarati" },
                  { value: 5, label: "Tamil" },
                  { value: 6, label: "Telugu" },
                  { value: 7, label: "Bengali" },
                  { value: 8, label: "Punjabi" },
                  { value: 9, label: "Malayalam" },
                  { value: 10, label: "Kannada" },
                  { value: 11, label: "Urdu" },
                  { value: 12, label: "Odia" },
                  { value: 13, label: "Assamese" },
                  { value: 14, label: "Other" },
                ],
                storeLabel: false,
                placeholder: "Select Language",
                required: true,
                step: 0,
              },
            ],
          },
          {
            title: "Address",
            icon: FaAddressBook,
            fields2: [
              {
                name: "permanent_house_no",
                label: "Permanent H.No.",
                type: "text",
                placeholder: "Enter House No",
                required: true,
                step: 1,
              },
              {
                name: "permanent_address_town",
                label: "Permanent Town",
                type: "text",
                placeholder: "Enter Town",
                required: true,
                step: 1,
              },
              {
                name: "permanent_address_street",
                label: "Permanent Street",
                type: "text",
                placeholder: "Enter Street",
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
              },
              {
                name: "permanent_address_city",
                label: "Permanent City",
                type: "select",
    
                options: (citiesBy.cities || []).map((city) => ({
                  value: city.city_id,
                  label: city.city_name,
                })),
                placeholder: "Select a city",
                step: 1,
                required: true,
                storeLabel: true,
              },
              {
                name: "permanent_address_pincode",
                label: "Permanent Pincode",
                type: "number",
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
                name: "current_address_town",
                label: "Current  Town",
                type: "text",
                placeholder: "Enter Town",
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
              },
              {
                name: "current_address_city",
                label: "Current City",
                type: "select",
                options: (cities.cities || []).map((city) => ({
                  value: city.city_id,
                  label: city.city_name,
                })),
                placeholder: "Select a city",
                step: 1,
                required: true,
                storeLabel: true,
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
                name: "alternative_mobile_number",
                label: "Alternative Mobile Number",
                type: "text",
                placeholder: "Enter alternative mobile number",
                required: false,
                step: 1,
              },
              {
                name: "same_as_permanent",
                label: "Same as Current Address",
                type: "radio",
                required: true,
                options: [
                  { value: "1", label: "NO" },
                  { value: "2", label: "YES" },
                ],
                step: 1,
              },
            ],
          },
          {
            title: "Account",
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
                options: [
                  {
                    value: 1,
                    label: "Savings Account",
                  },
                  { value: 2, label: "Current Account" },
                  { value: 3, label: "Joint Account" },
                  { value: 4, label: "Psycho" },
                ],
                required: true,
                storeLabel: true,
                step: 2,
              },
            ],
          },
          {
            title: "Nominee Info",
            icon: FaUserCheck,
            fields: [
              {
                name: "nominee_name",
                label: "Nominee Name",
                type: "text",
                placeholder: "Enter nominee name",
                required: true,
                step: 4,
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
                type: "text",
                placeholder: "Enter relation with nominee",
                required: true,
                step: 4,
              },
              {
                name: "nominee_address",
                label: "Nominee Address",
                type: "text",
                placeholder: "Enter nominee address",
                required: true,
                step: 4,
              },
            ],
          },
            {
              title: "Process to Upload",
              icon: RiProgress2Line,
              fields: [
                {
                  label:
                    "Upload a clear image of the front side of your Aadhar Card.",
                  sampleImage: "../../../../assets/Images/Aadhar_PVC_Front.jpg",
                  step: 5,
                  // type: "file",
                },
                {
                  label: "Upload a clear image of the back side of your Aadhar Card.",
                  step: 5,
                  type: "file",
                  sampleImage:
                    "../../../../public/assets/Images/Sample_PVC_Aadhar_Card_back.jpg",
                },
                {
                  label:
                    "Upload your Bank Passbook first page or a Cancelled Cheque.",
                  step: 5,
                  type: "file",
                  sampleImage: "../../../../assets/Images/Aadhar_PVC_Front.jpg",
                },
                {
                  label:
                    "Upload a recent Passport Size Photo with a clear background.",
                  step: 5,
                  type: "file",
                  sampleImage: "../../../../assets/Images/passport-size.webp",
                },
                {
                  label: "Upload a clear image of your signature on white paper.",
                  step: 5,
                  type: "file",
                  sampleImage: "../../../../assets/Images/signature.png",
                },
                {
                  label: "Upload a clear image of your PAN Card.",
                  step: 5,
                  type: "file",
                  sampleImage: "../../../../assets/Images/pancard.webp",
                },
                {
                  label: "Upload your latest education Marksheet.",
                  step: 5,
                  type: "file",
                  sampleImage: "../../../../assets/Images/marksheet.jpg",
                },
              ],
            },
          {
            title: "Documents",
            icon: FaCloudUploadAlt,
            fields: [
              {
                name: "aadhar_card_front",
                label: "Aadhar Card Front",
                type: "file",
                required: true,
                step: 6,
              },
              {
                name: "aadhar_card_back",
                label: "Aadhar Card Back",
                type: "file",
                required: true,
                step: 6,
              },
              {
                name: "bank_passbook_or_cancelled_cheque",
                label: "Bank Passbook / Canc. Cheque",
                type: "file",
                required: true,
                step: 6,
              },
              {
                name: "passport_size_photo",
                label: "Passport Size Photo",
                type: "file",
                required: true,
                step: 6,
              },
              {
                name: "signature_image",
                label: "Signature",
                type: "file",
                required: true,
                step: 6,
              },
              {
                name: "pancard_image",
                label: "PAN Card",
                type: "file",
                required: true,
                step: 6,
              },
              {
                name: "marksheet_image",
                label: "Marksheet",
                type: "file",
                required: true,
                step: 6,
              },
              {
                name: "declaration",
                label: "I Agree to the Terms and Conditions",
                type: "checkbox",
                required: true,
                step: 6,
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
                    },
                    {
                      label: "Upload a clear image of the back side of your Aadhar Card.",
                      step: 5,
                      type: "file",
                      sampleImage:
                        "../../../../public/assets/Images/Sample_PVC_Aadhar_Card_back.jpg",
                    },
                    {
                      label:
                        "Upload your Bank Passbook first page or a Cancelled Cheque.",
                      step: 5,
                      type: "file",
                      sampleImage: "../../../../assets/Images/cancelcheque.jfif",
                    },
                    {
                      label:
                        "Upload a recent Passport Size Photo with a clear background.",
                      step: 5,
                      type: "file",
                      sampleImage: "../../../../assets/Images/passport-size.webp",
                    },
                    {
                      label: "Upload a clear image of your signature on white paper.",
                      step: 5,
                      type: "file",
                      sampleImage: "../../../../assets/Images/signature.png",
                    },
                    {
                      label: "Upload a clear image of your PAN Card.",
                      step: 5,
                      type: "file",
                      sampleImage: "../../../../assets/Images/pancard.webp",
                    },
                    {
                      label: "Upload your latest education Marksheet.",
                      step: 5,
                      type: "file",
                      sampleImage: "../../../../assets/Images/marksheet.jpg",
                    },
                  ],
                },

};
}

