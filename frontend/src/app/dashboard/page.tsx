'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import {
    ChartBarIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const stats = [
    { name: 'Total Candidates', value: '2,543', icon: UsersIcon },
    { name: 'Active Jobs', value: '12', icon: DocumentTextIcon },
    { name: 'Interviews Scheduled', value: '8', icon: EnvelopeIcon },
    { name: 'Match Rate', value: '87%', icon: ChartBarIcon },
]

const candidateStats = [
    { name: 'Job Matches', value: '24', icon: ChartBarIcon },
    { name: 'Applications', value: '12', icon: DocumentTextIcon },
    { name: 'Interviews', value: '3', icon: EnvelopeIcon },
    { name: 'Profile Views', value: '156', icon: UsersIcon },
]

const recentActivity = [
    {
        id: 1,
        type: 'candidate',
        name: 'John Doe',
        role: 'Senior Software Engineer',
        match: 95,
        date: '2 hours ago',
    },
    {
        id: 2,
        type: 'candidate',
        name: 'Jane Smith',
        role: 'Product Manager',
        match: 88,
        date: '4 hours ago',
    },
    {
        id: 3,
        type: 'candidate',
        name: 'Mike Johnson',
        role: 'UX Designer',
        match: 82,
        date: '1 day ago',
    },
]

const recentJobs = [
    {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        type: 'Full-time',
        match: 92,
    },
    {
        id: 2,
        title: 'Product Manager',
        company: 'StartupX',
        location: 'Remote',
        type: 'Full-time',
        match: 88,
    },
    {
        id: 3,
        title: 'UX Designer',
        company: 'Design Co',
        location: 'New York, NY',
        type: 'Contract',
        match: 85,
    },
]

export default function DashboardPage() {
    const [userType, setUserType] = useState<'company' | 'candidate'>('candidate')

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType')
        if (storedUserType === 'company' || storedUserType === 'candidate') {
            setUserType(storedUserType)
        }
    }, [])

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back, {userType === 'company' ? 'Company' : 'User'}!
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Here&apos;s what&apos;s happening with your {userType === 'company' ? 'recruitment' : 'job search'} today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {(userType === 'company' ? stats : candidateStats).map((stat) => (
                        <div
                            key={stat.name}
                            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                        >
                            <dt>
                                <div className="absolute rounded-md bg-blue-500 p-3">
                                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                    {stat.name}
                                </p>
                            </dt>
                            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </dd>
                        </div>
                    ))}
                </div>

                {/* Recent Activity / Jobs */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Activity for Companies */}
                    {userType === 'company' && (
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                                <h2 className="text-base font-semibold leading-6 text-gray-900">
                                    Recent Candidate Activity
                                </h2>
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                                        {recentActivity.map((activity) => (
                                            <li key={activity.id} className="py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {activity.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">
                                                            {activity.name}
                                                        </p>
                                                        <p className="truncate text-sm text-gray-500">
                                                            {activity.role}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                                <div
                                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                                    style={{ width: `${activity.match}%` }}
                                                                />
                                                            </div>
                                                            <span className="ml-2 text-sm text-gray-500">
                                                                {activity.match}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Jobs for Candidates */}
                    {userType === 'candidate' && (
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                                <h2 className="text-base font-semibold leading-6 text-gray-900">
                                    Recommended Jobs
                                </h2>
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                                        {recentJobs.map((job) => (
                                            <li key={job.id} className="py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">
                                                            {job.title}
                                                        </p>
                                                        <p className="truncate text-sm text-gray-500">
                                                            {job.company} • {job.location}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                                <div
                                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                                    style={{ width: `${job.match}%` }}
                                                                />
                                                            </div>
                                                            <span className="ml-2 text-sm text-gray-500">
                                                                {job.match}% match
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6">
                            <h2 className="text-base font-semibold leading-6 text-gray-900">
                                Quick Actions
                            </h2>
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {userType === 'company' ? (
                                    <>
                                        <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                            Upload New CVs
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Post New Job
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Schedule Interviews
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            View Analytics
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                            Update Profile
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Browse Jobs
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            View Applications
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Check Messages
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
} 