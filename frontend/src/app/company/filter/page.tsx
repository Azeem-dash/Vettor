'use client'

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const filterSchema = z.object({
    jobTitle: z.string().min(1, 'Job title is required'),
    skills: z.array(z.string()).min(1, 'At least one skill is required'),
    experience: z.object({
        min: z.number().min(0),
        max: z.number().min(0),
        currency: z.string()
    }),
    location: z.object({
        type: z.enum(['onsite', 'remote', 'hybrid']),
        city: z.string().optional(),
        country: z.string().optional()
    }),
    education: z.array(z.string()).optional(),
    salary: z.object({
        min: z.number().min(0),
        max: z.number().min(0),
        currency: z.string()
    })
})

type FilterFormData = z.infer<typeof filterSchema>

export default function JobFilterPage() {
    const router = useRouter()
    const [newSkill, setNewSkill] = useState('')
    const [skills, setSkills] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FilterFormData>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            skills: [],
            experience: { min: 0, max: 10, currency: 'USD' },
            location: { type: 'onsite' },
            education: [],
            salary: { min: 0, max: 0, currency: 'USD' },
        },
    })

    const addSkill = () => {
        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill])
            setNewSkill('')
        }
    }

    const removeSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill))
    }

    const onSubmit = async (data: FilterFormData) => {
        try {
            // TODO: Implement filter logic
            console.log({ ...data, skills })
            router.push('/company/candidates')
        } catch (error) {
            console.error('Filter submission failed:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Job Criteria Filter</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Set your requirements to find the best candidates
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Job Title */}
                    <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                            Job Title
                        </label>
                        <input
                            type="text"
                            {...register('jobTitle')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.jobTitle && (
                            <p className="mt-2 text-sm text-red-600">{errors.jobTitle.message}</p>
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                className="block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="Add a skill"
                            />
                            <button
                                type="button"
                                onClick={addSkill}
                                className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
                            >
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-500"
                                    >
                                        <XMarkIcon className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="experience.min" className="block text-sm font-medium text-gray-700">
                                Minimum Experience (years)
                            </label>
                            <input
                                type="number"
                                {...register('experience.min', { valueAsNumber: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="experience.max" className="block text-sm font-medium text-gray-700">
                                Maximum Experience (years)
                            </label>
                            <input
                                type="number"
                                {...register('experience.max', { valueAsNumber: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Work Location</label>
                        <div className="mt-1">
                            <select
                                {...register('location.type')}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="remote">Remote</option>
                                <option value="onsite">On-site</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => router.push('/company/dashboard')}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing...' : 'Apply Filter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 