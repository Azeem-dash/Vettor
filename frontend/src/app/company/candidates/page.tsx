'use client'

import {
    ArrowDownTrayIcon,
    EnvelopeIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

interface Candidate {
    id: string
    name: string
    title: string
    matchPercentage: number
    skills: string[]
    experience: number
    location: string
    status: 'new' | 'contacted' | 'interviewed'
}

// Mock data for demonstration
const mockCandidates: Candidate[] = [
    {
        id: '1',
        name: 'John Doe',
        title: 'Senior Software Engineer',
        matchPercentage: 95,
        skills: ['React', 'TypeScript', 'Node.js'],
        experience: 5,
        location: 'San Francisco, CA',
        status: 'new',
    },
    {
        id: '2',
        name: 'Jane Smith',
        title: 'Full Stack Developer',
        matchPercentage: 88,
        skills: ['Python', 'Django', 'React'],
        experience: 3,
        location: 'Remote',
        status: 'contacted',
    },
    // Add more mock candidates as needed
]

export default function CompanyCandidates() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        experience: '',
        location: '',
        skills: '',
    })
    const [sortBy, setSortBy] = useState<'match' | 'experience'>('match')
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const filteredCandidates = mockCandidates.filter((candidate) => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesExperience = !filters.experience || candidate.experience >= parseInt(filters.experience);
        const matchesLocation = !filters.location || candidate.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesSkills = !filters.skills || candidate.skills.some(skill =>
            skill.toLowerCase().includes(filters.skills.toLowerCase())
        );

        return matchesSearch && matchesExperience && matchesLocation && matchesSkills;
    })

    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
        if (sortBy === 'match') {
            return b.matchPercentage - a.matchPercentage
        }
        return b.experience - a.experience
    })

    const toggleCandidate = (id: string) => {
        setSelectedCandidates(prev =>
            prev.includes(id)
                ? prev.filter(candidateId => candidateId !== id)
                : [...prev, id]
        )
    }

    const handleSendEmails = () => {
        // TODO: Implement email sending logic
        console.log('Sending emails to:', selectedCandidates)
    }

    const handleExportCSV = () => {
        // TODO: Implement CSV export logic
        console.log('Exporting candidates:', selectedCandidates)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Matched Candidates</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            View and manage candidates that match your criteria
                        </p>
                    </div>
                    <div className="mt-4 flex space-x-3 sm:mt-0">
                        <button
                            onClick={handleExportCSV}
                            disabled={selectedCandidates.length === 0}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                            Export CSV
                        </button>
                        <button
                            onClick={handleSendEmails}
                            disabled={selectedCandidates.length === 0}
                            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
                        >
                            <EnvelopeIcon className="h-5 w-5 mr-2" />
                            Send Emails
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                placeholder="Search candidates..."
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'match' | 'experience')}
                            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                        >
                            <option value="match">Sort by Match %</option>
                            <option value="experience">Sort by Experience</option>
                        </select>
                        <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <FunnelIcon className="h-5 w-5 mr-2" />
                            More Filters
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <select
                            value={filters.experience}
                            onChange={(e) => handleFilterChange('experience', e.target.value)}
                            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                        >
                            <option value="">Experience</option>
                            <option value="1">1+ years</option>
                            <option value="3">3+ years</option>
                            <option value="5">5+ years</option>
                        </select>
                        <input
                            type="text"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                            placeholder="Location"
                            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                        <input
                            type="text"
                            value={filters.skills}
                            onChange={(e) => handleFilterChange('skills', e.target.value)}
                            placeholder="Skills"
                            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Candidates List */}
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                                <input
                                                    type="checkbox"
                                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                                    checked={selectedCandidates.length === sortedCandidates.length}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedCandidates(sortedCandidates.map(c => c.id))
                                                        } else {
                                                            setSelectedCandidates([])
                                                        }
                                                    }}
                                                />
                                            </th>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Candidate
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Match
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Skills
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Experience
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Location
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {sortedCandidates.map((candidate) => (
                                            <tr key={candidate.id} className="hover:bg-gray-50">
                                                <td className="relative px-7 sm:w-12 sm:px-6">
                                                    <input
                                                        type="checkbox"
                                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                                        checked={selectedCandidates.includes(candidate.id)}
                                                        onChange={() => toggleCandidate(candidate.id)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="font-medium text-gray-900">{candidate.name}</div>
                                                    <div className="text-gray-500">{candidate.title}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <div className="flex items-center">
                                                        <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                            <div
                                                                className="bg-blue-600 h-2.5 rounded-full"
                                                                style={{ width: `${candidate.matchPercentage}%` }}
                                                            />
                                                        </div>
                                                        <span className="ml-2 text-gray-900">{candidate.matchPercentage}%</span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div className="flex flex-wrap gap-1">
                                                        {candidate.skills.map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {candidate.experience} years
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {candidate.location}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${candidate.status === 'new'
                                                            ? 'bg-green-100 text-green-700'
                                                            : candidate.status === 'contacted'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                    >
                                                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 