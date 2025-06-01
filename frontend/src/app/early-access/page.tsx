"use client"
import { useState } from 'react'

export default function EarlyAccessPage() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            setError('Email is required')
            return
        }
        setError('')
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-blue-700">Join Early Access List</h1>
                {submitted ? (
                    <div className="text-green-600 font-semibold text-center py-8">
                        Thank you for joining! We'll keep you updated.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                id="message"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                rows={4}
                            />
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Join Early Access
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
} 