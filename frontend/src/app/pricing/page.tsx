'use client'

import { CheckIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const tiers = [
    {
        name: 'Free',
        id: 'tier-free',
        price: { monthly: '$0' },
        description: 'Perfect for trying out our platform',
        features: [
            'Basic CV filtering',
            'Limited candidate search',
            'Basic CV assistance',
            'Standard support',
            'Up to 5 job postings',
        ],
        cta: 'Get started',
        mostPopular: false,
    },
    {
        name: 'Pro',
        id: 'tier-pro',
        price: { monthly: '$29' },
        description: 'Everything you need for efficient hiring',
        features: [
            'Bulk CV upload',
            'Automated interview scheduling',
            'Advanced candidate filtering',
            'Priority support',
            'Unlimited job postings',
            'Basic AI scoring',
            'Email templates',
        ],
        cta: 'Start free trial',
        mostPopular: true,
    },
    {
        name: 'Premium',
        id: 'tier-premium',
        price: { monthly: '$79' },
        description: 'Advanced features for enterprise hiring',
        features: [
            'Everything in Pro',
            'Full AI candidate scoring',
            'Career roadmap generation',
            'Advanced email automation',
            'Custom integrations',
            'Dedicated support',
            'White-label options',
        ],
        cta: 'Contact sales',
        mostPopular: false,
    },
]

const candidateTiers = [
    {
        name: 'Free',
        id: 'tier-free-candidate',
        price: { monthly: '$0' },
        description: 'Start your job search journey',
        features: [
            'Basic profile creation',
            'Job search access',
            'Standard application tracking',
            'Basic resume tips',
            'Community support',
        ],
        cta: 'Get started',
        mostPopular: false,
    },
    {
        name: 'Pro',
        id: 'tier-pro-candidate',
        price: { monthly: '$5' },
        description: 'Accelerate your career growth',
        features: [
            'Advanced CV builder',
            'Personalized job roadmap',
            'Mock interview preparation',
            'Priority application review',
            'Career insights',
            'Premium job alerts',
            'Resume optimization',
        ],
        cta: 'Start free trial',
        mostPopular: true,
    },
]

export default function PricingPage() {
    const [userType, setUserType] = useState<'company' | 'candidate'>('company')

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Choose the right plan for&nbsp;you
                    </p>
                </div>

                {/* User Type Toggle */}
                <div className="mt-8 flex justify-center">
                    <div className="relative rounded-full bg-gray-100 p-1">
                        <div className="flex">
                            <button
                                onClick={() => setUserType('company')}
                                className={`${userType === 'company'
                                        ? 'bg-white shadow-sm'
                                        : 'text-gray-500'
                                    } relative rounded-full px-6 py-2 text-sm font-medium transition-all duration-200`}
                            >
                                For Companies
                            </button>
                            <button
                                onClick={() => setUserType('candidate')}
                                className={`${userType === 'candidate'
                                        ? 'bg-white shadow-sm'
                                        : 'text-gray-500'
                                    } relative rounded-full px-6 py-2 text-sm font-medium transition-all duration-200`}
                            >
                                For Candidates
                            </button>
                        </div>
                    </div>
                </div>

                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {(userType === 'company' ? tiers : candidateTiers).map((tier) => (
                        <div
                            key={tier.id}
                            className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${tier.mostPopular ? 'ring-2 ring-blue-600' : ''
                                }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3
                                        className={`text-lg font-semibold leading-8 ${tier.mostPopular ? 'text-blue-600' : 'text-gray-900'
                                            }`}
                                    >
                                        {tier.name}
                                    </h3>
                                    {tier.mostPopular && (
                                        <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                                            Most popular
                                        </p>
                                    )}
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                                        {tier.price.monthly}
                                    </span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600">
                                        /month
                                    </span>
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon
                                                className="h-6 w-5 flex-none text-blue-600"
                                                aria-hidden="true"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                href="#"
                                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tier.mostPopular
                                        ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
                                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                    }`}
                            >
                                {tier.cta}
                            </a>
                        </div>
                    ))}
                </div>

                {/* API Pricing */}
                {userType === 'company' && (
                    <div className="mt-16 rounded-3xl bg-gray-50 px-6 py-8 sm:mt-20 sm:px-12">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                Need a custom solution?
                            </h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Our white-labeled API allows you to integrate our AI recruitment platform
                                into your existing systems.
                            </p>
                            <div className="mt-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Contact sales
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 