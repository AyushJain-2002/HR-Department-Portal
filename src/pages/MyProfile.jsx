
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
// import axios from "../../config/axios";
import {
  UserIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BanknotesIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  IdentificationIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CogIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
  XCircleIcon,
  Bars3Icon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,ExclamationCircleIcon
} from "@heroicons/react/24/outline";

// Professional Skeleton Loading Component
const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen py-4 px-4 flex justify-center bg-gray-50">
      <div className="w-full max-w-6xl border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="p-0">
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
              <div className="relative">
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full border-2 border-gray-300 bg-gray-200 animate-pulse"></div>
              </div>
              
              <div className="flex-1 text-center lg:text-left space-y-2">
                <div className="h-6 bg-gray-200 rounded w-48 mx-auto lg:mx-0 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-36 mx-auto lg:mx-0 animate-pulse"></div>
                <div className="flex flex-wrap gap-1 justify-center lg:justify-start">
                  <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-64 space-y-2">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="flex-1">
                <div className="border border-gray-200 rounded-lg bg-white p-4 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="h-3 bg-gray-200 rounded w-28"></div>
                        <div className="h-3 bg-gray-200 rounded w-40"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all duration-200 text-sm ${
        isActive 
          ? 'bg-blue-50 border border-blue-200 text-blue-700 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
      }`}
    >
      <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
      <span className="font-medium">{label}</span>
    </button>
  );
};

// Status Badge Component
const StatusBadge = ({ status, label }) => {
  const getStatusConfig = (status) => {
    const configs = {
      Active: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: CheckCircleIcon },
      Verified: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: CheckCircleIcon },
      Enabled: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: CheckCircleIcon },
      Recent: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: CheckCircleIcon },
      Pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: ClockIcon },
      Inactive: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: ExclamationTriangleIcon },
      Disabled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: ExclamationTriangleIcon },
      Never: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: ClockIcon },
    };
    
    return configs[status] || configs.Pending;
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.border} ${config.bg} ${config.text} text-xs font-medium`}>
      <IconComponent className="w-3 h-3" />
      {label || status}
    </div>
  );
};

// Professional CRM Profile Component
export const CRMProfileProfessional = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('personal');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation items configuration
  const navItems = [
    { id: 'personal', label: 'Personal Info', icon: UserIcon },
    { id: 'professional', label: 'Professional', icon: BriefcaseIcon },
    { id: 'address', label: 'Address', icon: MapPinIcon },
    { id: 'career', label: 'Career', icon: ChartBarIcon },
    { id: 'bank', label: 'Bank Info', icon: BanknotesIcon },
    { id: 'emergency', label: 'Emergency', icon: PhoneIcon },
  ];

  // Section field configurations
  const sectionFields = {
    personal: [
      { label: "User name", value: user?.name, icon: UserIcon, fullWidth: true },
      { label: "Email", value: user?.personal_email, icon: EnvelopeIcon, fullWidth: true },
      { label: "Phone number", value: user?.mobile_no, icon: PhoneIcon, fullWidth: true },
      { label: "Aadhar Number", value: user?.aadhar_no, icon: DocumentTextIcon },
      { label: "PAN Number", value: user?.pancard_number, icon: IdentificationIcon },
    ],
    professional: [
      { label: "Department", value: user?.department, icon: BuildingOfficeIcon },
      { label: "Designation", value: user?.designation, icon: AcademicCapIcon },
      { label: "Employee Type", value: user?.employee_type, icon: UserIcon },
      { label: "Total Experience", value: user?.total_experience, icon: ChartBarIcon },
      { label: "Grade", value: user?.grade, icon: AcademicCapIcon },
      { label: "Level", value: user?.level, icon: ChartBarIcon },
    ],
    address: {
      current: [
        { label: "City", value: user?.current_address_city, icon: MapPinIcon },
        { label: "State", value: user?.current_address_state, icon: MapPinIcon },
        { label: "Pincode", value: user?.current_address_pincode, icon: MapPinIcon },
        { label: "Street", value: user?.current_address_street, icon: MapPinIcon },
        { label: "Town", value: user?.current_address_town, icon: MapPinIcon },
      ],
      permanent: [
        { label: "City", value: user?.permanent_address_city, icon: MapPinIcon },
        { label: "State", value: user?.permanent_address_state, icon: MapPinIcon },
        { label: "Pincode", value: user?.permanent_address_pincode, icon: MapPinIcon },
        { label: "Street", value: user?.permanent_address_street, icon: MapPinIcon },
        { label: "Town", value: user?.permanent_address_town, icon: MapPinIcon },
      ]
    },
    career: [
      { label: "Previous Company", value: user?.company_name },
      { label: "Last Designation", value: user?.last_company_designation },
      { label: "Previous CTC", value: user?.previous_ctc },
      { label: "Current CTC", value: user?.current_ctc },
      { label: "Joining Date", value: user?.joining_date },
      { label: "Education Level", value: user?.education_level },
    ],
    bank: [
      { label: "Bank Name", value: user?.bank_name },
      { label: "Account Number", value: user?.account_number },
      { label: "IFSC Code", value: user?.ifsc_code },
      { label: "Branch", value: user?.bank_branch },
      { label: "Account Type", value: user?.account_type },
    ],
    emergency: [
      { label: "Contact Person", value: user?.emergency_contact_person_name },
      { label: "Contact Number", value: user?.emergency_contact_person_number },
      { label: "Alternative Mobile", value: user?.alternative_mobile_number },
    ]
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const token = Cookies.get("authToken");
        if (!token) throw new Error("Unauthorized");

        const response = await axios.get('/get_user_data', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setTimeout(() => {
          setUser(response.data.data);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Profile loading error:", error);
        navigate("/login");
      }
    };

    loadUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("authToken");
      Cookies.remove("userInfo");
      navigate("/login");
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : "US";
  };

  // Helper functions for profile completion
  const getCompletedBasicInfo = (user) => {
    const fields = ['name', 'login_email', 'mobile_no', 'department', 'designation'];
    return fields.filter(field => user?.[field] && user[field].toString().trim() !== '').length;
  };

  const getCompletedContactInfo = (user) => {
    const fields = ['personal_email', 'current_address_city', 'emergency_contact_person_number'];
    return fields.filter(field => user?.[field] && user[field].toString().trim() !== '').length;
  };

  const getCompletedDocuments = (user) => {
    const fields = ['aadhar_no', 'pancard_number'];
    return fields.filter(field => user?.[field] && user[field].toString().trim() !== '').length;
  };

  const getMissingFields = (user) => {
    const requiredFields = [
      { key: 'name', label: 'Full Name' },
      { key: 'login_email', label: 'Email' },
      { key: 'mobile_no', label: 'Phone Number' },
      { key: 'department', label: 'Department' },
      { key: 'designation', label: 'Designation' },
      { key: 'personal_email', label: 'Personal Email' },
      { key: 'aadhar_no', label: 'Aadhar Number' },
    ];
    return requiredFields.filter(field => !user?.[field.key] || user[field.key].toString().trim() === '');
  };

  const calculateProfileCompletion = (user) => {
    const totalFields = 12; // Total fields we're tracking
    const completedFields = getCompletedBasicInfo(user) + getCompletedContactInfo(user) + getCompletedDocuments(user);
    return Math.round((completedFields / totalFields) * 100);
  };

 
  const getAccountStatusFields = (user) => [
  {
    label: 'Email Verified',
    icon: EnvelopeIcon, // email icon
    status: user?.email_verification === 1 ? 'Verified' : 'Pending',
  },

  {
    label: 'Documents',
    icon: DocumentTextIcon, // document icon
    status: user?.documents_verification === 1 ? 'Verified' : 'Pending',
  },
];


  // Reusable field component
  const Field = ({ label, value, icon: Icon, fullWidth = false, type = 'normal' }) => {
    if (type === 'status') {
      return (
        <div className={`p-3 rounded-lg border text-center transition-all ${
          value ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
        }`}>
          <div className="flex justify-center mb-2">
            <Icon className={`w-6 h-6 ${value ? "text-green-600" : "text-red-600"}`} />
          </div>
          <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
          <div className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${
            value ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {value ? "Verified" : "Pending"}
          </div>
        </div>
      );
    }

    return (
      <div className={`space-y-1 ${fullWidth ? 'md:col-span-2' : ''}`}>
        <label className="text-sm text-gray-600">{label}</label>
        <div className="p-2 bg-gray-50 border rounded-lg flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-500" />}
          <Typography className="text-gray-800 text-sm">
            {value || "N/A"}
          </Typography>
        </div>
      </div>
    );
  };

  // Render active section content
  const renderSectionContent = () => {
    if (!user) return null;

    const sections = {
      personal: (
        <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-blue-600"></div>
            <UserIcon className="w-5 h-5 text-blue-600" />
            <Typography variant="h5" className="font-semibold text-gray-900">
              Personal Information
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {sectionFields.personal.map((field, index) => (
              <Field key={index} {...field} />
            ))}
          </div>
        </div>
      ),

      professional: (
        <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-purple-600"></div>
            <BriefcaseIcon className="w-5 h-5 text-purple-600" />
            <Typography variant="h5" className="font-semibold text-gray-900">
              Professional Details
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {sectionFields.professional.map((field, index) => (
              <Field key={index} {...field} />
            ))}
          </div>
        </div>
      ),

      address: (
        <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-green-600"></div>
            <MapPinIcon className="w-5 h-5 text-green-600" />
            <Typography variant="h5" className="font-semibold text-gray-900">
              Address Details
            </Typography>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-3">
              <Typography variant="h6" className="font-semibold text-gray-800 border-b pb-2">
                Current Address
              </Typography>
              <div className="grid grid-cols-1 gap-2">
                {sectionFields.address.current.map((field, index) => (
                  <Field key={index} {...field} />
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Typography variant="h6" className="font-semibold text-gray-800 border-b pb-2">
                Permanent Address
              </Typography>
              <div className="grid grid-cols-1 gap-2">
                {sectionFields.address.permanent.map((field, index) => (
                  <Field key={index} {...field} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),

      career: (
        <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-amber-600"></div>
            <ChartBarIcon className="w-5 h-5 text-amber-600" />
            <Typography variant="h5" className="font-semibold text-gray-900">
              Career Information
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {sectionFields.career.map((field, index) => (
              <Field key={index} {...field} />
            ))}
          </div>
        </div>
      ),

      bank: user?.bank_name ? (
        <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-amber-600"></div>
            <BanknotesIcon className="w-5 h-5 text-amber-600" />
            <Typography variant="h5" className="font-semibold text-gray-900">
              Bank Information
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {sectionFields.bank.map((field, index) => (
              <Field key={index} {...field} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
          No bank information available
        </div>
      ),

      emergency: (
        <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-orange-600"></div>
            <PhoneIcon className="w-5 h-5 text-orange-600" />
            <Typography variant="h5" className="font-semibold text-gray-900">
              Emergency Contact
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {sectionFields.emergency.map((field, index) => (
              <Field key={index} {...field} />
            ))}
          </div>
        </div>
      ),
    };

    return sections[activeSection] || sections.personal;
  };

  if (loading) return <ProfileSkeleton />;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md border border-gray-200 rounded-lg shadow-sm">
          <CardBody className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircleIcon className="w-8 h-8 text-red-600" />
            </div>
            <Typography variant="h4" className="text-red-600 mb-2 font-bold">
              Access Denied
            </Typography>
            <Typography className="text-gray-600 mb-6">
              Your session has expired or you're not authorized to view this page.
            </Typography>
            <Button 
              onClick={() => navigate("/login")} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
              Login Again
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const completionRate = calculateProfileCompletion(user);
  const missingFields = getMissingFields(user);

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Profile Header */}
        <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
            <div className="relative">
              <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full border-4 border-white bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-md">
                <span className="text-xl lg:text-2xl font-bold text-gray-700">
                  {getInitials(user.name || user.full_name)}
                </span>
              </div>
              <div className="absolute bottom-1 lg:bottom-2 right-1 lg:right-2 bg-green-500 border-2 border-white rounded-full w-3 h-3 lg:w-4 lg:h-4 shadow-sm"></div>
            </div>

             <div className="flex-1 text-center lg:text-left">
  {/* Name */}
  <Typography
    variant="h1"
    className="text-xl lg:text-2xl font-bold text-gray-900 mb-1"
  >
    {user.name || user.full_name || "User Profile"}
  </Typography>

  {/* Email */}
  <Typography className="text-gray-600 text-sm lg:text-base mb-3 flex items-center justify-center lg:justify-start gap-2">
    <EnvelopeIcon className="w-4 h-4" />
    {user.login_email || user.email}
  </Typography>

  {/* Badges */}
  <div className="flex flex-wrap gap-1 lg:gap-2 justify-center lg:justify-start">
    {/* Role */}
    <span className="px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium text-blue-800 border border-blue-200 flex items-center gap-1">
      <BriefcaseIcon className="w-3 h-3" />
      {user.role || "User"}
    </span>

    {/* Employee ID */}
    <span className="px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium text-purple-800 border border-purple-200 flex items-center gap-1">
      <IdentificationIcon className="w-3 h-3" />
      ID: {user.employee_code}
    </span>

    {/* Department */}
    <span className="px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium text-green-800 border border-green-200 flex items-center gap-1">
      <BuildingOfficeIcon className="w-3 h-3" />
      {user.department || "Not Assigned"}
    </span>
    
    
    

{getAccountStatusFields(user).map((field, index) => {
    const FieldIcon = field.icon;
    const status = field.status.toLowerCase();

    // Hover message
    const tooltipMessage =
      status === "verified"
        ? `${field.label} is Verified`
        : `${field.label} is Pending`;

    return (
      <div
        key={index}
        title={tooltipMessage} // ✅ Tooltip on hover
        className="flex items-center gap-2 text-xs lg:text-sm text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm  cursor-default"
      >
        {/* Field Type Icon */}
        <FieldIcon className="w-4 h-4 text-gray-500" />

        {/* Status Icon */}
    

        {/* Label + Status Text */}
        <span
          className={`font-medium ${
            status === "verified"
              ? "text-green-700"
              : status === "pending"
              ? "text-yellow-700"
              : "text-red-700"
          }`}
        >
           {field.status}
           

           
        </span>
      </div>
    );
  })}
 <div className="w-full  pt-2 mx-auto lg:mx-0">
    <div className="text-gray-600 text-xs mb-1 font-sm">
      Profile Completion
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${completionRate}%` }}
      ></div>
    </div>
    <div className="text-gray-500 text-xs mt-1 text-right">
      {completionRate}%
    </div>
  </div>
  </div>
</div>

            <div className="flex gap-2">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 lg:px-4 rounded-lg transition-colors shadow-sm flex items-center gap-2 text-sm"
                onClick={() => {/* Edit profile */}}
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="outlined"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-3 lg:px-4 rounded-lg transition-colors shadow-sm flex items-center gap-2 text-sm"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content with Navigation */}
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-2">
              <Typography variant="h6" className="font-semibold text-gray-900">
                Profile Sections
              </Typography>
              <Button
                variant="text"
                className="p-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
              </Button>
            </div>

            {/* Navigation Sidebar */}
            <div className={`
              ${sidebarOpen ? 'block' : 'hidden'} 
              lg:block lg:w-64 space-y-1 bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg border border-gray-200 lg:border-none
            `}>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeSection === item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-lg">
                {renderSectionContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMProfileProfessional;