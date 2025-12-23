import { useEffect } from "react";
// import { use, useSelector } from "react-redux";
// import { fetchStates } from "../../store/Actions/StateAction";
import {useStateData} from "../../hooks/hookIndex"
export default function CityConfig() {
    // const { states = [], loading } = useSelector((state) => state.states);
    const {fetchStates,states = [], loading }=useStateData();
    useEffect(() => {
        (fetchStates());
    }, []);

    return {
        stepFields: [
            {
                // title: "City Details",
                // className: "grid grid-cols-4 w-3/4 ",
                className: "lg:grid lg:grid-cols-[1fr_1fr_.5fr_1fr] lg:gap-4 sm:grid-row-1 lg:w-full md:justify-center",
                fields: [
                    {
                        name: "stateId",
                        label: "State",
                        type: "select",
                        options: states.map((state) => ({
                            value: state.id,
                            label: state.state_name,
                        })), // Options passed via props
                        required: true,
                        className:"mb-2 "
                    },
                    {
                        name: "cityName", 
                        label: "City Name",
                        type: "text",
                        placeholder: "Enter city name",
                        required: true,
                        className:"mb-2"
                    },
                    {
                    name:"submit",
                    label: "Submit",
                    type:"submit",
                    className:"md:w-48 mr-2 ml-auto "
                    },
                    {
                    name:"reset",
                    label: "Reset",
                    type:"reset",
                    className:"md:w-48 bg-gray-500 hover:bg-gray-600"
                    }
                ],
            }
        ],
    };
}
