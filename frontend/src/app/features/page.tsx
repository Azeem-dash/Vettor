"use client"
import { AcademicCapIcon, ChartBarIcon, DocumentArrowUpIcon, EnvelopeIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const features = [
    { title: "Bulk CV Upload & Filtering", description: "Process hundreds of CVs in seconds with AI-powered screening", icon: DocumentArrowUpIcon },
    { title: "Smart Ranking Based on Skills", description: "AI-driven candidate ranking based on role requirements", icon: ChartBarIcon },
    { title: "Multi-language Interview AI", description: "Conduct interviews in any language with real-time analysis", icon: AcademicCapIcon },
    { title: "Candidate Insights Dashboard", description: "Comprehensive analytics and candidate performance metrics", icon: ChartBarIcon },
    { title: "Role-Specific Roadmaps", description: "Personalized career paths and skill development plans", icon: UserGroupIcon },
    { title: "Interview Email Automation", description: "Streamlined communication with automated scheduling", icon: EnvelopeIcon },
]

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Platform Features</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition">
                            <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
                            <h2 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h2>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 