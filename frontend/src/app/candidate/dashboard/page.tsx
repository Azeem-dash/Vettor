'use client'

import {
    BriefcaseIcon,
    ChartBarIcon,
    ClockIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

const stats = [
    { name: 'Job Matches', value: '24', icon: BriefcaseIcon, change: '+12%', changeType: 'increase' },
    { name: 'Applications', value: '8', icon: DocumentTextIcon, change: '+3', changeType: 'increase' },
    { name: 'Interviews', value: '3', icon: ClockIcon, change: '+2', changeType: 'increase' },
    { name: 'Profile Views', value: '156', icon: UserCircleIcon, change: '+23%', changeType: 'increase' },
]

const recentJobs = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$120k - $150k',
        match: '95%',
        posted: '2 days ago',
    },
    {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartupX',
        location: 'Remote',
        type: 'Full-time',
        salary: '$100k - $130k',
        match: '92%',
        posted: '3 days ago',
    },
    {
        id: 3,
        title: 'React Developer',
        company: 'Digital Solutions',
        location: 'New York, NY',
        type: 'Contract',
        salary: '$90k - $110k',
        match: '88%',
        posted: '5 days ago',
    },
]

const recentApplications = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        status: 'Interview Scheduled',
        date: '2024-03-15',
        nextStep: 'Technical Interview',
    },
    {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartupX',
        status: 'Under Review',
        date: '2024-03-14',
        nextStep: 'Awaiting Response',
    },
]

export default function CandidateDashboard() {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Here's what's happening with your job search today.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.name}
                                className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
                            >
                                <dt>
                                    <div className="absolute rounded-md bg-blue-500 p-3">
                                        <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                                </dt>
                                <dd className="ml-16 flex items-baseline">
                                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                    <p
                                        className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                            }`}
                                    >
                                        {stat.change}
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Recent Job Matches */}
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Recent Job Matches</h2>
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                                        {recentJobs.map((job) => (
                                            <li key={job.id} className="py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">{job.title}</p>
                                                        <p className="truncate text-sm text-gray-500">{job.company}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            {job.match} Match
                                                        </span>
                                                        <span className="mt-1 text-sm text-gray-500">{job.posted}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        View all matches
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Recent Applications */}
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                                        {recentApplications.map((application) => (
                                            <li key={application.id} className="py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">
                                                            {application.title}
                                                        </p>
                                                        <p className="truncate text-sm text-gray-500">
                                                            {application.company}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                            {application.status}
                                                        </span>
                                                        <span className="mt-1 text-sm text-gray-500">
                                                            {application.nextStep}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        View all applications
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8">
                        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <DocumentTextIcon className="mr-2 h-5 w-5 text-gray-400" />
                                Update Resume
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <BriefcaseIcon className="mr-2 h-5 w-5 text-gray-400" />
                                Browse Jobs
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <EnvelopeIcon className="mr-2 h-5 w-5 text-gray-400" />
                                Messages
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <ChartBarIcon className="mr-2 h-5 w-5 text-gray-400" />
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 