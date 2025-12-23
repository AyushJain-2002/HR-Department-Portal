import { useEffect } from "react";
// import { use, useSelector } from "react-redux";
import { useDepartment, useStateData } from "../../hooks/hookIndex";
// import { fetchCities, fetchStates } from "../../store/Actions/StateAction";
  export default function GroupConfig(formData) {
    const { fetchCities, fetchStates,states = [], cities = { city: [] }}=useStateData();
    const {designations}=useDepartment();
//     const { designations } = useSelector((state) => state.departments);
//  const { states = [], cities = { city: [] } } = useSelector(
//     (state) => state.states
//   );
useEffect(() => {
        (fetchCities());
        (fetchStates());
    }, []);
  return{
     stepFields : [
      {
        fields : [
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
        placeholder: "Select a Title",
        required: true,
        storeLabel: true,
      },
      {
        name: "group_name",
        label: "Group Name",
        type: "text",
        placeholder: "Enter Group name",
        required: true,
      },
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter Your name",
        required: true,
      },

      {
        name: "designation",
        label: "Designation",
        type: "select",
        options:
          designations?.map((des) => ({
            value: des.id,
            label: des.designation_name,
          })) || [],
        placeholder: "Select Designation",
        storeLabel: true,
      },
      {
        name: "email",
        label: "E-mail",
        type: "text",
        placeholder: "Enter Email ID",
      },

      {
        name: "mobile_no",
        label: "Mobile Number",
        type: "text",
        placeholder: "Enter mobile number",
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
        options:  (cities.cities || []).map((city) => ({
              value: city.city_id,
              label: city.city_name,
            }))
          ,
        placeholder: "Select a city",
        required: true,
        storeLabel: true,
      },
      {
        name: "active",
        label: "Active",
        type: "select",
        options: [
          { value: 1, label: "Yes" }, // 1 for true
          { value: 0, label: "No" }, // 0 for false
        ],
        placeholder: "Select active status",
        required: true,
        storeLabel: false,
      },
    ],
  },
    ],
    };
  }