import React, { useState } from 'react';
import { PieChart,Tooltip, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, Calendar, ChevronUp, ChevronDown, Clock, Award, FileText, Mail, Phone, MapPin,  Upload, AlertCircle, Check } from 'lucide-react';
import ReactApexChart from "react-apexcharts";

const DashboardAdmin = () => {
   
    const data = [
        { name: "OD", value: 400 },
        { name: "TP", value: 800 },
        { name: "ADD", value: 300 },
        { name: "Net Premium", value: 500 },
        { name: "Renewal Status", value: 200 },
    ];

       const [state, setState] = useState({
        series: [
            { name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] },
            { name: 'series2', data: [11, 32, 45, 32, 34, 52, 41] }
        ],
        options: {
            chart: {
                height: 250,
                type: 'area',
                fontFamily: 'Inter, sans-serif',
                toolbar: {
                    show: false
                }
            },
            colors: ['#6366f1', '#a5b4fc'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 90, 100]
                }
            },
            grid: {
                borderColor: '#f1f5f9',
                strokeDashArray: 4,
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    "2018-09-19T00:00:00.000Z",
                    "2018-09-19T01:30:00.000Z",
                    "2018-09-19T02:30:00.000Z",
                    "2018-09-19T03:30:00.000Z",
                    "2018-09-19T04:30:00.000Z",
                    "2018-09-19T05:30:00.000Z",
                    "2018-09-19T06:30:00.000Z"
                ],
                labels: {
                    style: {
                        colors: '#64748b',
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#64748b',
                        fontSize: '12px'
                    }
                }
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
                theme: 'dark'
            },
        },
    });

   
    
    const COLORS =['#d100d1','#7400b8','#f55536','#4f000b','#669bbc'];
    // const COLORS=  ['#6366f1', '#34d399', '#fbbf24', '#f87171', '#60a5fa'];

    // Stats data
    const stats = [
        { id: 1, title: 'Revenue', value: '$24,560', change: '+14%', isPositive: true, icon: <DollarSign className="h-6 w-6 text-indigo-500" /> },
        { id: 2, title: 'Users', value: '2,340', change: '+5.6%', isPositive: true, icon: <Users className="h-6 w-6 text-blue-500" /> },
        { id: 3, title: 'Conversion', value: '3.25%', change: '-0.8%', isPositive: false, icon: <TrendingUp className="h-6 w-6 text-emerald-500" /> }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-6 bg-slate-50 min-h-screen font-sans">
            {/* Left Side - Profile and Status Cards */}
            <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-4">
                {/* Profile Card - Reduced Height */}
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-slate-100">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32 flex items-center justify-center relative">
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#pattern)" />
                                <defs>
                                    <pattern id="pattern" patternUnits="userSpaceOnUse" width="10" height="10" x="0" y="0">
                                        <circle cx="5" cy="5" r="1" fill="white" />
                                    </pattern>
                                </defs>
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="w-24 h-24 bg-white p-1 rounded-full absolute -bottom-10 left-1/2 transform -translate-x-1/2 shadow-md ring-4 ring-white">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
                                    alt="User avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 pb-4 px-4 text-center">
                        <h3 className="text-lg font-bold text-slate-800">Sarah Johnson</h3>
                        <p className="text-sm text-slate-500">Senior Developer</p>
                        <div className="flex items-center justify-center mt-1">
                            <div className="flex items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></div>
                                <span>Active</span>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2 justify-center">
                            <button className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm">
                                <Upload className="h-3 w-3" />
                                <span>Update</span>
                            </button>
                            <button className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition shadow-sm">
                                <AlertCircle className="h-3 w-3" />
                                <span>Support</span>
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
                                <p className="text-slate-500 text-xs">Department</p>
                                <p className="text-sm font-medium">Engineering</p>
                            </div>
                            <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
                                <p className="text-slate-500 text-xs">Location</p>
                                <p className="text-sm font-medium">New York</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100">
                        <div className="grid grid-cols-3 divide-x divide-slate-100">
                            <button className="py-3 flex flex-col items-center hover:bg-slate-50 transition">
                                <Mail className="h-4 w-4 text-indigo-500" />
                                <span className="text-xs mt-1 text-slate-600">Email</span>
                            </button>
                            <button className="py-3 flex flex-col items-center hover:bg-slate-50 transition">
                                <Phone className="h-4 w-4 text-indigo-500" />
                                <span className="text-xs mt-1 text-slate-600">Call</span>
                            </button>
                            <button className="py-3 flex flex-col items-center hover:bg-slate-50 transition">
                                <MapPin className="h-4 w-4 text-indigo-500" />
                                <span className="text-xs mt-1 text-slate-600">Map</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Time Off Card - More Compact */}
                <div className="bg-white shadow-sm rounded-xl p-4 border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-indigo-500 mr-2" />
                            <h3 className="text-base font-semibold text-slate-800">Time Off</h3>
                        </div>
                        <button className="text-indigo-600 text-xs font-medium hover:text-indigo-700 transition">View all</button>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 transition hover:shadow-sm">
                            <div className="flex justify-between items-start">
                                <div className="flex">
                                    <div className="p-1.5 bg-indigo-100 rounded-lg mr-2">
                                        <Clock className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-800">Took: 2 days</h4>
                                        <p className="text-xs text-slate-500">Mar 15 - Mar 16, 2025</p>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Approved</span>
                            </div>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 transition hover:shadow-sm">
                            <div className="flex justify-between items-start">
                                <div className="flex">
                                    <div className="p-1.5 bg-slate-100 rounded-lg mr-2">
                                        <Clock className="h-4 w-4 text-slate-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-800">Left: 18 days</h4>
                                        <p className="text-xs text-slate-500">Annual leave balance</p>
                                    </div>
                                </div>
                                <button className="flex items-center text-indigo-600 text-xs font-medium hover:text-indigo-700 transition">
                                    <Check className="h-3 w-3 mr-1" />
                                    <span>Apply</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Right Side - Dashboard Cards */}
            <div className="w-full lg:w-2/3 xl:w-3/4 flex flex-col gap-4">
                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-white shadow-sm border border-slate-100 rounded-xl p-4 transition-transform hover:shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                    <p className="text-xl font-bold mt-1 text-slate-800">{stat.value}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className={`flex items-center mt-2 ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'} bg-${stat.isPositive ? 'emerald' : 'red'}-50 rounded-full px-2 py-0.5 w-fit`}>
                                {stat.isPositive ?
                                    <ChevronUp className="h-4 w-4" /> :
                                    <ChevronDown className="h-4 w-4" />
                                }
                                <span className="text-sm font-medium">{stat.change}</span>
                                <span className="text-xs text-slate-500 ml-1">vs last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Row - Weekly and Monthly side by side */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* ApexChart - Weekly Performance */}
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-100 w-full max-w-screen-lg" style={{ height: "360px" }}>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="flex items-center">
                                    <TrendingUp className="h-4 w-4 text-indigo-500 mr-2" />
                                    <h2 className="text-base font-semibold text-slate-800">Weekly Performance</h2>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 ml-6">Trending this week</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></div>
                                    <span className="text-xs text-slate-600">Series 1</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-indigo-300 rounded-full mr-1"></div>
                                    <span className="text-xs text-slate-600">Series 2</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-full">
                            <ReactApexChart 
                                options={state.options} 
                                series={state.series} 
                                type="area" 
                                height="250" 
                            />
                        </div>
                    </div>
                    
                    {/* Pie Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-100 w-full" style={{ height: "360px" }}>
                        <div className="p-4">
                            <div className="flex items-center mb-4">
                                <Award className="h-4 w-4 text-indigo-500 mr-2" />
                                <h2 className="text-base font-semibold text-slate-800">Premium Breakdown</h2>
                            </div>
                            
                            <div className="h-full">
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}`, 'Value']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Custom Legend */}
                            <div className="mt-1 grid md:grid-cols-3 gap-2 text-sm text-slate-700">
                                {data.map((entry, index) => (
                                    <div key={index} className="flex items-center">
                                        <div
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        ></div>
                                        <span className="text-xs">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Recent Activities - Left Side */}
                    <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-4 w-full md:w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <FileText className="h-4 w-4 text-indigo-500 mr-2" />
                                <h2 className="text-base font-semibold text-slate-800">Recent Activities</h2>
                            </div>
                            <button className="text-indigo-600 text-xs font-medium hover:text-indigo-700">View all</button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition border border-transparent hover:border-slate-100">
                                <div className="p-2 bg-indigo-100 rounded-full">
                                    <FileText className="h-4 w-4 text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium text-slate-800">Project proposal submitted</p>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">2h ago</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1">You submitted the new project proposal for review</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* More Activities - Right Side */}
                    <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-4 w-full md:w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 text-indigo-500 mr-2" />
                                <h2 className="text-base font-semibold text-slate-800">More Activities</h2>
                            </div>
                            <button className="text-indigo-600 text-xs font-medium hover:text-indigo-700">View all</button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition border border-transparent hover:border-slate-100">
                                <div className="p-2 bg-emerald-100 rounded-full">
                                    <Check className="h-4 w-4 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium text-slate-800">Code review completed</p>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">4h ago</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1">Your PR #423 has been approved and merged</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
