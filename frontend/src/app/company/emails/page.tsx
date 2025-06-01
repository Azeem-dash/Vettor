'use client'

import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const emailSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    template: z.string().min(1, 'Template is required'),
    message: z.string().min(1, 'Message is required'),
    interviewDate: z.string().optional(),
    interviewTime: z.string().optional(),
    interviewType: z.enum(['online', 'onsite']).optional(),
})

type EmailFormData = z.infer<typeof emailSchema>

const emailTemplates = [
    {
        id: 'initial',
        name: 'Initial Interview Invitation',
        subject: 'Interview Invitation for {position} at {company}',
        message: `Dear {candidate_name},

We were impressed by your profile and would like to invite you for an interview for the {position} position at {company}.

Interview Details:
Date: {interview_date}
Time: {interview_time}
Type: {interview_type}

Please confirm your availability by replying to this email.

Best regards,
{company_name} Team`,
    },
    {
        id: 'technical',
        name: 'Technical Interview',
        subject: 'Technical Interview Invitation - {position}',
        message: `Dear {candidate_name},

Thank you for your interest in the {position} position. We would like to invite you for a technical interview.

Interview Details:
Date: {interview_date}
Time: {interview_time}
Type: {interview_type}

Please prepare for a technical discussion about your experience and skills.

Best regards,
{company_name} Team`,
    },
    {
        id: 'final',
        name: 'Final Interview',
        subject: 'Final Interview Invitation - {position}',
        message: `Dear {candidate_name},

We were impressed with your technical interview and would like to invite you for a final interview with our team.

Interview Details:
Date: {interview_date}
Time: {interview_time}
Type: {interview_type}

This will be a discussion with our team leads and HR.

Best regards,
{company_name} Team`,
    },
]

export default function EmailPage() {
    const router = useRouter()
    const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0])
    const [selectedCandidates, setSelectedCandidates] = useState([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            subject: selectedTemplate.subject,
            template: selectedTemplate.id,
            message: selectedTemplate.message,
        },
    })

    const handleTemplateChange = (templateId: string) => {
        const template = emailTemplates.find(t => t.id === templateId)
        if (template) {
            setSelectedTemplate(template)
            setValue('subject', template.subject)
            setValue('message', template.message)
        }
    }

    const onSubmit = async (data: EmailFormData) => {
        try {
            // TODO: Implement email sending logic
            console.log('Sending emails:', {
                ...data,
                candidates: selectedCandidates,
            })
            router.push('/company/candidates')
        } catch (error) {
            console.error('Failed to send emails:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Send Interview Invitations</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Customize and send interview invitations to selected candidates
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Email Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Template Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Template
                                </label>
                                <select
                                    {...register('template')}
                                    onChange={(e) => handleTemplateChange(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                >
                                    {emailTemplates.map((template) => (
                                        <option key={template.id} value={template.id}>
                                            {template.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    {...register('subject')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.subject && (
                                    <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
                                )}
                            </div>

                            {/* Interview Details */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700">
                                        Interview Date
                                    </label>
                                    <input
                                        type="date"
                                        {...register('interviewDate')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="interviewTime" className="block text-sm font-medium text-gray-700">
                                        Interview Time
                                    </label>
                                    <input
                                        type="time"
                                        {...register('interviewTime')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="interviewType" className="block text-sm font-medium text-gray-700">
                                        Interview Type
                                    </label>
                                    <select
                                        {...register('interviewType')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="online">Online</option>
                                        <option value="onsite">On-site</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    {...register('message')}
                                    rows={10}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.message && (
                                    <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => router.push('/company/candidates')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                                    {isSubmitting ? 'Sending...' : 'Send Emails'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Selected Candidates */}
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900">Selected Candidates</h3>
                                <div className="mt-4 space-y-4">
                                    {selectedCandidates.map((candidate) => (
                                        <div
                                            key={candidate.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                                                <p className="text-sm text-gray-500">{candidate.email}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedCandidates((prev) =>
                                                        prev.filter((c) => c.id !== candidate.id)
                                                    )
                                                }
                                                className="text-gray-400 hover:text-gray-500"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 