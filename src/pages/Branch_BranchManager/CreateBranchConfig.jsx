// // branchFormConfig.js

// export const addFields = ({
//   states = [],
//   cities = [],
//   zones = [],
//   regions = [],
//   departments = [],
//   designations = [],
//   initialValue,
//   formData
// }) => {
//   console.log(cities)
import  { useEffect } from "react";
import { useZones,useStateData,useDepartment } from "../../hooks/hookIndex";

// Custom hook to supply config with Redux state
export function addFields(formData) {
    const {states,cities,citiesBy,fetchStates} =useStateData();
    const { departments,designations,fetchDepartments,  fetchDesignation} =useDepartment();
    const{zones,region,fetchRegions,fetchZones}=useZones();
    useEffect(() => {
      if (!departments || departments.length === 0) (fetchDepartments());
      if (!designations || designations.length === 0) (fetchDesignation());
      if (!states || states.length === 0) (fetchStates());
      if (!zones || zones.length === 0)(fetchZones());
      if(!region || region.length === 0)(fetchRegions());
    }, []);
  return {
    stepFields: [
      // ========================
      //     BRANCH DETAILS
      // ========================
      {
        // title: "",
        className: "grid gap-4 md:grid-cols-3 sm:grid-row-1  md:justify-center",
        // className: "grid grid-cols-3 gap-4 w-full",
        fields: [ 
          {
            name: "branch_name",
            label: "Branch Name",
            type: "text",
            placeholder: "Enter branch name",
            required: true,
            // 
          },
          {
            name: "state",
            label: "State",
            type: "select",
            options: states.map((s) => ({
              value: s.id,
              label: s.state_name,
            })),
            storeLabel: true,
            // ,
            required: true,
          },
          {
            name: "city",
            label: "City",
            type: "select",
            options:  (cities.cities || []).map((city) => ({
                        value: city.city_id,
                        label: city.city_name,
                      })),
            storeLabel: true,
            // ,
            dependsOn:["state"],
            // disabled: false,
            required: true,
          },
          {
            name: "address",
            label: "Address",
            type: "text",
            placeholder: "Enter address",
            // ,
          },
          {
            name: "zone",
            label: "Zone",
            type: "select",
            storeLabel: true,
            options: zones.map((z) => ({
              value: z.id,
              label: z.zone_name,
            })),
            // ,
          },
          {
            name: "region",
            label: "Region",
            type: "select",
            storeLabel: true,
            options: region.map((r) => ({
              value: r.id,
              label: r.region_name,
            })),
            // ,
          },
          { name: "landline_number", label: "Landline Number", type: "text",},
          { name: "mobile_number", label: "Mobile Number", type: "text" },
          { name: "gst_number", label: "GST Number", type: "text" },
          {
            name: "broker_pancard_number",
            label: "Broker Pancard Number",
            type: "text",
          },
        ],
      },

      // ========================
      //     MANAGER DETAILS
      // ========================
      {
        title: "Branch Manager Details",
        // className: "grid grid-cols-3 gap-4 w-full",
        className: "grid gap-4 sm:grid-row-1 md:justify-center md:grid-cols-3",
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
            name: "branch_manager_name",
            label: "Manager Name",
            type: "text",
          },
          {
            name: "department",
            label: "Department",
            type: "select",
            storeLabel: true,
            options: departments.map((d) => ({
              value: d.id,
              label: d.department_name,
            })),
          },
          {
            name: "designation",
            label: "Designation",
            type: "select",
            storeLabel: true,
            options: designations.map((dg) => ({
              value: dg.id,
              label: dg.designation_name,
            })),
          },
          {
            name: "branch_manager_email",
            label: "Email",
            type: "text",
          },
          {
            name: "branch_manager_mobile_number",
            label: "Mobile",
            type: "text",
          },
        ],
      },
      {
        fields:[
          {
            name:"submit",
            label: "Submit",
            type:"button",
            className:"w-48 m-4 mx-[42%]"
          }
        ]
      }
    ],
  };
};

export function editFields (formData) {
    
 const {states,cities,citiesBy,fetchStates} =useStateData();
    const { departments,designations,fetchDepartments,  fetchDesignation} =useDepartment();
    const{zones,region,fetchRegions,fetchZones}=useZones();
    useEffect(() => {
      if (!departments || departments.length === 0) (fetchDepartments());
      if (!designations || designations.length === 0) (fetchDesignation());
      if (!states || states.length === 0) (fetchStates());
      if (!zones || zones.length === 0)(fetchZones());
      if(!region || region.length === 0)(fetchRegions());
    }, []);
  return {
    stepFields: [
      {
        // className: "grid grid-cols-3 gap-4 w-full",
        className: "grid gap-4 md:grid-cols-3 sm:grid-row-1  md:justify-center",
          fields: [
          {
            name: "branch_code",
            label: "Branch Code",
            
            type: "text",
            placeholder: "Branch code",
            readOnly: true, // Make branch_code field read-only
          },
          {
            name: "branch_name",
            label: "Branch Name",
            type: "text",
            placeholder: "Enter branch name",
            required: true,
            
          },
          {
            name: "state",
            label: "State",
            type: "select",
            options: states.map((s) => ({
              value: s.id,
              label: s.state_name,
            })),
            storeLabel: true,
            required: true,
          },
          {
            name: "city",
            label: "City",
            type: "select",
            options:  (cities.cities || []).map((city) => ({
                        value: city.city_id,
                        label: city.city_name,
                      })),
            storeLabel: true,
            dependsOn:["state"],
            required: true,
          },
          {
            name: "address",
            label: "Address",
            type: "text",
            placeholder: "Enter address",
          },
          {
            name: "zone",
            label: "Zone",
            type: "select",
            storeLabel: true,
            options: zones.map((z) => ({
              value: z.id,
              label: z.zone_name,
            })),
          },
          {
            name: "region",
            label: "Region",
            type: "select",
            storeLabel: true,
            options: region.map((r) => ({
              value: r.id,
              label: r.region_name,
            })),
          },
          { name: "landline_number", label: "Landline Number", type: "text",},
          { name: "mobile_number", label: "Mobile Number", type: "text", },
          { name: "gst_number", label: "GST Number",  type: "text" },
          {
            name: "broker_pancard_number",
            label: "Broker Pancard Number",
            type: "text",
          },{
            name:"submit",
            label: "Submit",
            type:"button",
            className:"w-48 mx-auto  col-span-full"
          }
        ]
      }
    ],
  };
};