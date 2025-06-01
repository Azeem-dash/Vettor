"use client"
import { useState } from 'react'

export default function ContactPage() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !message) {
            setError('Email and message are required')
            return
        }
        setError('')
        setSubmitted(true)
        // Optionally, open mail client
        // window.location.href = `mailto:contact@example.com?subject=Contact from ${email}&body=${encodeURIComponent(message)}`
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-blue-700">Contact Us</h1>
                {submitted ? (
                    <div className="text-green-600 font-semibold text-center py-8">
                        Thank you for reaching out! We will get back to you soon.
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
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message<span className="text-red-500">*</span></label>
                            <textarea
                                id="message"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                rows={4}
                                required
                            />
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                )}
                <div className="mt-6 text-center text-sm text-gray-500">
                    Or email us directly at <a href="mailto:contact@example.com" className="text-blue-600 underline">contact@example.com</a>
                </div>
            </div>
        </div>
    )
} 