


// import { useState, useEffect } from 'react';
// import Select from 'react-select';
// import { Button, Card, Typography } from '@material-tailwind/react';
// import { use, useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   fetchBranch,
//   fetchBqp,
//   fetchRelationshipManager,
//   submitHrVerification
// } from '../../../store/Reducers/AssignOffialPosp';

// const AppointOfficialsToPosp = ({ pospId, initialValues, onSuccess }) => {
//   const  = use();
//   const {
//     branch = [],
//     bqp = [],
//     relationship_manager = [],
//     loading,
//     error,
//     message,
//     hrVerificationLoading,
//     hrVerificationSuccess
//   } = useSelector(state => state.assignOfficialPosp || {});

  
  
//   // Initialize form with either empty values or passed initialValues
//   const [formData, setFormData] = useState({
//     branch_id: initialValues.branch_id || '',
//     bqp: initialValues.bqp || '',
//     posp_reporting_manager: initialValues.posp_reporting_manager || '',
//     posp_relationship_manager: initialValues.posp_relationship_manager || '',
//     reffered_by_Name: initialValues.reffered_by_Name || '',
//     reffered_by_Contact: initialValues.reffered_by_Contact || ''
//   });



//   useEffect(() => {
//     if (error) toast.error(error);
//     if (message) toast.success(message);

//   }, [error, message]);

//   // Fetch branches on component mount
//   useEffect(() => {
//     (fetchBranch());
//   }, []);

//   // When branch is selected, fetch BQPs
//   useEffect(() => {
//     if (formData.branch_id) {
//       setFormData(prev => ({
//         ...prev,
//         bqp: '',
//         posp_relationship_manager: '',
//         posp_reporting_manager: ''
//       }));
//       (fetchBqp(formData.branch_id));
//     }
//   }, [formData.branch_id, ]);

//   // When BQP is selected, fetch relationship managers
//   useEffect(() => {
//     if (formData.bqp) {
//       setFormData(prev => ({
//         ...prev,
//         posp_relationship_manager: '',
//         posp_reporting_manager: ''
//       }));
//       (fetchRelationshipManager(formData.bqp));
//     }
//   }, [formData.bqp, ]);

//   const handleChange = (selectedOption, fieldName) => {
//     setFormData(prev => ({
//       ...prev,
//       [fieldName]: selectedOption ? selectedOption.value : ''
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Updating relationship details...");
//     try {
//       await (submitHrVerification(pospId, formData));
//       toast.update(toastId, {
//         render: "Relationship details updated successfully!",
//         type: "success",
//         isLoading: false,
//         autoClose: 5000,
//         closeButton: true,
//       });
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       toast.update(toastId, {
//         render: "Failed to update relationship details",
//         type: "error",
//         isLoading: false,
//         autoClose: 5000,
//         closeButton: true,
//       });
//     }
//   };


//   // Format options
//   const branchOptions = branch.map(b => ({
//     value: b.id,
//     label: `${b.branch_code} - ${b.branch_name}`
//   }));

//   const bqpOptions = bqp.map(b => ({
//     value: b.id,
//     label: `${b.employee_code} - ${b.name}`
//   }));

//   const rmOptions = relationship_manager.map(rm => ({
//     value: rm.id,
//     label: `${rm.employee_code} - ${rm.name}`
//   }));

//   const reportingManagerOptions = bqp.map(b => ({
//     value: b.employee_code,
//     label: `${b.employee_code} - ${b.name}`
//   }));

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={5000} />
      
//       <div className="w-full">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Responsive row for selects */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {/* Branch */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
//               <Select
//                 options={branchOptions}
//                 isLoading={loading}
//                 onChange={(selected) => handleChange(selected, 'branch_id')}
//                 placeholder="Select Branch"
//                 className="text-sm"
//                 required
//               />
//             </div>

//             {/* BQP */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">BQP *</label>
//               <Select
//                 options={bqpOptions}
//                 isLoading={loading}
//                 onChange={(selected) => handleChange(selected, 'bqp')}
//                 placeholder={formData.branch_id ? "Select BQP" : "Select Branch first"}
//                 className="text-sm"
//                 isDisabled={!formData.branch_id}
//                 value={bqpOptions.find(opt => opt.value === formData.bqp) || null}
//                 required
//               />
//             </div>

//             {/* Relationship Manager */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">RM *</label>
//               <Select
//                 options={rmOptions}
//                 isLoading={loading}
//                 onChange={(selected) => handleChange(selected, 'posp_relationship_manager')}
//                 placeholder={formData.bqp ? "Select RM" : "Select BQP first"}
//                 className="text-sm"
//                 isDisabled={!formData.bqp}
//                 value={rmOptions.find(opt => opt.value === formData.posp_relationship_manager) || null}
//                 required
//               />
//             </div>

//             {/* Reporting Manager */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Reporting *</label>
//               <Select
//                 options={reportingManagerOptions}
//                 isLoading={loading}
//                 onChange={(selected) => handleChange(selected, 'posp_reporting_manager')}
//                 placeholder={formData.branch_id ? "Select Manager" : "Select Branch first"}
//                 className="text-sm"
//                 isDisabled={!formData.branch_id}
//                 value={reportingManagerOptions.find(opt => opt.value === formData.posp_reporting_manager) || null}
//                 required
//               />
//             </div>
//           </div>

//           {/* Second row for other inputs */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Referred By Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Referred By Name</label>
//               <input
//                 type="text"
//                 name="reffered_by_Name"
//                 value={formData.reffered_by_Name}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter Referred By Name"
//                 maxLength="100"
//               />
//             </div>

//             {/* Referred By Contact */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Referred By Contact</label>
//               <input
//                 type="text"
//                 name="reffered_by_Contact"
//                 value={formData.reffered_by_Contact}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter Contact Number"
//                 maxLength="20"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               variant="filled"
//               size="sm"
//               color="blue"
//               disabled={hrVerificationLoading || 
//                 !formData.branch_id || 
//                 !formData.bqp || 
//                 !formData.posp_relationship_manager || 
//                 !formData.posp_reporting_manager}
//               className="mt-2 py-4"
//             >
//               {hrVerificationLoading ? 'Submitting...' : 'Submit Verification'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AppointOfficialsToPosp;


import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from '@material-tailwind/react';
// import { use, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAssignOfficialPosp } from '../../hooks/hookIndex';
// import {
//   fetchBranch,fetchBqp,fetchRelationshipManager,submitHrVerification
// } from '../../store/Reducers/AssignOffialPosp';

const AppointOfficialsToPosp = ({ pospId, initialValues, onSuccess }) => {
  const {  fetchBranch,fetchBqp,fetchRelationshipManager,submitHrVerification,
        branch = [],bqp = [],relationship_manager = [],loading,error,message,hrVerificationLoading,
        hrVerificationSuccess}=useAssignOfficialPosp()
  // const {
  //   branch = [],bqp = [],relationship_manager = [],loading,error,message,hrVerificationLoading,hrVerificationSuccess
  // } = useSelector(state => state.assignOfficialPosp || {});

  // Initialize form with either empty values or passed initialValues
  const [formData, setFormData] = useState({
    branch_id: initialValues?.branch_id || '',
    bqp: initialValues?.bqp || '',
    posp_reporting_manager: initialValues?.posp_reporting_manager || '',
    posp_relationship_manager: initialValues?.posp_relationship_manager || '',
    reffered_by_Name: initialValues?.reffered_by_Name || '',
    reffered_by_Contact: initialValues?.reffered_by_Contact || ''
  });

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message]);

  // Fetch branches on component mount
  useEffect(() => {
    (fetchBranch());
  }, []);

  // When branch is selected, fetch BQPs
  useEffect(() => {
    if (formData.branch_id) {
      setFormData(prev => ({
        ...prev,
        bqp: '',
        posp_relationship_manager: '',
        posp_reporting_manager: ''
      }));
      (fetchBqp(formData.branch_id));
    }
  }, [formData.branch_id, ]);

  // When BQP is selected, fetch relationship managers
  useEffect(() => {
    if (formData.bqp) {
      setFormData(prev => ({
        ...prev,
        posp_relationship_manager: '',
        posp_reporting_manager: ''
      }));
      (fetchRelationshipManager(formData.bqp));
    }
  }, [formData.bqp, ]);

  const handleChange = (selectedOption, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting HR verification...");
    try {
      await (submitHrVerification(pospId, formData));
      toast.update(toastId, {
        render: "HR verification submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to submit HR verification",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
    }
  };

  // Format options with null checks
  const branchOptions = (branch || []).map(b => ({
    value: b.id,
    label: `${b.branch_code} - ${b.branch_name}`
  }));

  const bqpOptions = (bqp || []).map(b => ({
    value: b.id,
    label: `${b.employee_code} - ${b.name}`
  }));

  const rmOptions = (relationship_manager || []).map(rm => ({
    value: rm.id,
    label: `${rm.employee_code} - ${rm.name}`
  }));

  const reportingManagerOptions = (bqp || []).map(b => ({
    value: b.employee_code,
    label: `${b.employee_code} - ${b.name}`
  }));

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Responsive row for selects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
              <Select
                options={branchOptions}
                isLoading={loading}
                onChange={(selected) => handleChange(selected, 'branch_id')}
                placeholder="Select Branch"
                className="text-sm"
                value={branchOptions.find(opt => opt.value === formData.branch_id) || null}
                required
              />
            </div>

            {/* BQP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">BQP *</label>
              <Select
                options={bqpOptions}
                isLoading={loading}
                onChange={(selected) => handleChange(selected, 'bqp')}
                placeholder={formData.branch_id ? "Select BQP" : "Select Branch first"}
                className="text-sm"
                isDisabled={!formData.branch_id}
                value={bqpOptions.find(opt => opt.value === formData.bqp) || null}
                required
              />
            </div>

            {/* Relationship Manager */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RM *</label>
              <Select
                options={rmOptions}
                isLoading={loading}
                onChange={(selected) => handleChange(selected, 'posp_relationship_manager')}
                placeholder={formData.bqp ? "Select RM" : "Select BQP first"}
                className="text-sm"
                isDisabled={!formData.bqp}
                value={rmOptions.find(opt => opt.value === formData.posp_relationship_manager) || null}
                required
              />
            </div>

            {/* Reporting Manager */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reporting *</label>
              <Select
                options={reportingManagerOptions}
                isLoading={loading}
                onChange={(selected) => handleChange(selected, 'posp_reporting_manager')}
                placeholder={formData.branch_id ? "Select Manager" : "Select Branch first"}
                className="text-sm"
                isDisabled={!formData.branch_id}
                value={reportingManagerOptions.find(opt => opt.value === formData.posp_reporting_manager) || null}
                required
              />
            </div>
          </div>

          {/* Second row for other inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Referred By Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Referred By Name</label>
              <input
                type="text"
                name="reffered_by_Name"
                value={formData.reffered_by_Name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Referred By Name"
                maxLength="100"
              />
            </div>

            {/* Referred By Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Referred By Contact</label>
              <input
                type="text"
                name="reffered_by_Contact"
                value={formData.reffered_by_Contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Contact Number"
                maxLength="20"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="filled"
              size="sm"
              color="blue"
              disabled={hrVerificationLoading || 
                !formData.branch_id || 
                !formData.bqp || 
                !formData.posp_relationship_manager || 
                !formData.posp_reporting_manager}
              className="mt-2 py-4"
            >
              {hrVerificationLoading ? 'Submitting...' : 'Submit Verification'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AppointOfficialsToPosp;