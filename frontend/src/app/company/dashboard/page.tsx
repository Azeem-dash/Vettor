'use client'

import {
    ArrowDownTrayIcon,
    BriefcaseIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ClockIcon,
    Cog6ToothIcon,
    DocumentArrowUpIcon,
    UserGroupIcon,
    XCircleIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Dummy data for demonstration
const dummyCandidates = [
    {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Senior Frontend Developer',
        match: 92,
        skills: ['React', 'TypeScript', 'Node.js'],
        experience: '5 years',
        location: 'New York',
        status: 'pending',
    },
    {
        id: 2,
        name: 'Michael Chen',
        title: 'Full Stack Developer',
        match: 88,
        skills: ['Python', 'Django', 'React'],
        experience: '4 years',
        location: 'San Francisco',
        status: 'interviewed',
    },
    {
        id: 3,
        name: 'Priya Patel',
        title: 'Backend Developer',
        match: 85,
        skills: ['Java', 'Spring Boot', 'AWS'],
        experience: '3 years',
        location: 'London',
        status: 'rejected',
    },
]

const steps = [
    { id: 'upload', name: 'Upload Resumes', status: 'current' },
    { id: 'filter', name: 'Filter Candidates', status: 'upcoming' },
    { id: 'review', name: 'Review Matches', status: 'upcoming' },
    { id: 'contact', name: 'Contact Candidates', status: 'upcoming' },
]

const navigationItems = [
    {
        id: 'overview',
        name: 'Overview',
        icon: ChartBarIcon,
        description: 'Dashboard overview and analytics'
    },
    {
        id: 'upload',
        name: 'CV Upload',
        icon: DocumentArrowUpIcon,
        description: 'Upload and manage CVs'
    },
    {
        id: 'candidates',
        name: 'Candidates',
        icon: UserGroupIcon,
        description: 'View and manage candidates'
    },
    {
        id: 'interviews',
        name: 'Interviews',
        icon: ChatBubbleLeftRightIcon,
        description: 'Schedule and manage interviews'
    },
    {
        id: 'jobs',
        name: 'Jobs',
        icon: BriefcaseIcon,
        description: 'Manage job postings'
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: Cog6ToothIcon,
        description: 'Company settings and preferences'
    }
]

export default function CompanyDashboard() {
    const [currentStep, setCurrentStep] = useState(0)
    const [currentSection, setCurrentSection] = useState('overview')
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
    const [jobCriteria, setJobCriteria] = useState({
        title: '',
        skills: '',
        experience: '',
        location: '',
    })

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map(file => file.name)
            setUploadedFiles(prev => [...prev, ...files])
        }
    }

    const handleCriteriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobCriteria(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const renderSection = () => {
        switch (currentSection) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-blue-100">
                                        <UserGroupIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Total Candidates</p>
                                        <p className="text-2xl font-semibold text-gray-900">1,234</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-green-100">
                                        <BriefcaseIcon className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                                        <p className="text-2xl font-semibold text-gray-900">12</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-purple-100">
                                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Interviews</p>
                                        <p className="text-2xl font-semibold text-gray-900">8</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-yellow-100">
                                        <ChartBarIcon className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Match Rate</p>
                                        <p className="text-2xl font-semibold text-gray-900">85%</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )
            case 'upload':
                return (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column - Upload & Criteria */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* CV Upload Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow p-6"
                            >
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Upload CVs</h2>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="mt-4">
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                                        >
                                            <span>Upload Files</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                multiple
                                                accept=".pdf,.doc,.docx"
                                                className="sr-only"
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">PDF, DOC up to 10MB</p>
                                </div>
                                {uploadedFiles.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium text-gray-900">Uploaded Files</h3>
                                        <ul className="mt-2 divide-y divide-gray-200">
                                            {uploadedFiles.map((file, index) => (
                                                <li key={index} className="py-2 flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">{file}</span>
                                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>

                            {/* Job Criteria Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-lg shadow p-6"
                            >
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Job Criteria</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={jobCriteria.title}
                                            onChange={handleCriteriaChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="e.g., Senior Frontend Developer"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                                            Required Skills
                                        </label>
                                        <input
                                            type="text"
                                            name="skills"
                                            id="skills"
                                            value={jobCriteria.skills}
                                            onChange={handleCriteriaChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="e.g., React, TypeScript, Node.js"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                            Years of Experience
                                        </label>
                                        <input
                                            type="text"
                                            name="experience"
                                            id="experience"
                                            value={jobCriteria.experience}
                                            onChange={handleCriteriaChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="e.g., 3-5 years"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            value={jobCriteria.location}
                                            onChange={handleCriteriaChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="e.g., New York, Remote"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Candidate List */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-lg shadow"
                            >
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">Matched Candidates</h2>
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                                            Export to CSV
                                        </button>
                                    </div>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {dummyCandidates.map((candidate) => (
                                        <motion.li
                                            key={candidate.id}
                                            whileHover={{ scale: 1.01 }}
                                            className="p-6 hover:bg-gray-50"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <span className="text-blue-600 font-medium">
                                                                {candidate.name.split(' ').map(n => n[0]).join('')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900">{candidate.name}</h3>
                                                        <p className="text-sm text-gray-500">{candidate.title}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {candidate.match}% Match
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {candidate.experience} • {candidate.location}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        {candidate.status === 'pending' && (
                                                            <button className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                                <ClockIcon className="h-4 w-4 mr-1" />
                                                                Pending
                                                            </button>
                                                        )}
                                                        {candidate.status === 'interviewed' && (
                                                            <button className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                                                                Interviewed
                                                            </button>
                                                        )}
                                                        {candidate.status === 'rejected' && (
                                                            <button className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                                <XCircleIcon className="h-4 w-4 mr-1" />
                                                                Rejected
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {candidate.skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                )
            // Add other cases as needed
            default:
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">{navigationItems.find(item => item.id === currentSection)?.name}</h2>
                        <p className="text-gray-500">This section is under development.</p>
                    </div>
                )
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-2xl font-semibold text-gray-900">Company Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your recruitment process
                    </p>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Progress Steps */}
                <nav aria-label="Progress">
                    <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
                        {steps.map((step, index) => (
                            <li key={step.id} className="md:flex-1">
                                <button
                                    onClick={() => setCurrentStep(index)}
                                    className={`group flex w-full flex-col border-l-4 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${index === currentStep
                                            ? 'border-blue-600'
                                            : index < currentStep
                                                ? 'border-green-600'
                                                : 'border-gray-200'
                                        }`}
                                >
                                    <span className="text-sm font-medium text-blue-600">{step.name}</span>
                                    <span className="text-sm font-medium">
                                        {index === currentStep ? 'Current' : index < currentStep ? 'Completed' : 'Upcoming'}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Navigation */}
                <div className="mb-8">
                    <nav className="flex space-x-4 overflow-x-auto pb-4">
                        {navigationItems.map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentSection(item.id)}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${currentSection === item.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="h-5 w-5 mr-2" />
                                {item.name}
                            </motion.button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                {renderSection()}
            </main>
        </div>
    )
} 