'use client'

import { AcademicCapIcon, BriefcaseIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const features = [
  {
    title: "Bulk CV Upload & Filtering",
    description: "Process hundreds of CVs in seconds with AI-powered screening",
    icon: "📂"
  },
  {
    title: "Smart Ranking Based on Skills",
    description: "AI-driven candidate ranking based on role requirements",
    icon: "🎯"
  },
  {
    title: "Multi-language Interview AI",
    description: "Conduct interviews in any language with real-time analysis",
    icon: "🌍"
  },
  {
    title: "Candidate Insights Dashboard",
    description: "Comprehensive analytics and candidate performance metrics",
    icon: "📊"
  },
  {
    title: "Role-Specific Roadmaps",
    description: "Personalized career paths and skill development plans",
    icon: "🗺️"
  },
  {
    title: "Interview Email Automation",
    description: "Streamlined communication with automated scheduling",
    icon: "📧"
  }
]

const testimonials = [
  {
    content: "We reduced screening time by 80% — and hired better candidates.",
    author: "HR Lead",
    role: "TechHub Pvt Ltd",
    image: "/images/hr-lead.jpeg"
  },
  {
    content: "I created my CV and landed my first interview in 3 days.",
    author: "Areeba N.",
    role: "Computer Science Graduate",
    image: "/images/areeba.jpeg"
  }
]

const targetAudience = [
  {
    title: "Recruiters & HR teams",
    description: "Hire smarter and save time with AI-powered screening",
    icon: <BriefcaseIcon className="h-6 w-6" />
  },
  {
    title: "Fresh Graduates & Professionals",
    description: "Stand out and get prepared with AI guidance",
    icon: <UserGroupIcon className="h-6 w-6" />
  },
  {
    title: "Universities & Bootcamps",
    description: "Support student placement with confidence",
    icon: <AcademicCapIcon className="h-6 w-6" />
  }
]

const regions = [
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "India", flag: "🇮🇳" },
  { name: "Middle East", flag: "🇸🇦🇦🇪" },
  { name: "African markets", flag: "🌍" }
]

// Add these new constants for footer navigation
const footerNavigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ],
  social: [
    { name: 'LinkedIn', href: '#', icon: 'LinkedIn' },
    { name: 'Twitter', href: '#', icon: 'Twitter' },
    { name: 'Email', href: 'mailto:contact@example.com', icon: 'Email' },
  ],
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const shouldAnimate = mounted && !prefersReducedMotion

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 flex items-center bg-white">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Vettor Logo" width={180} height={180} className="h-44 w-44" priority />
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-2 sm:pb-32 lg:flex lg:px-8 lg:py-16 relative z-10">
          <motion.div
            className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 relative z-20"
            {...(shouldAnimate ? fadeInUp : {})}
          >
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <motion.div
                {...(shouldAnimate ? fadeInUp : {})}
                className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-blue-100 text-blue-700"
              >
                <span className="mr-2">🚀</span>
                Trusted by modern recruiters & ambitious candidates
              </motion.div>
            </div>
            <motion.h1
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Vettor: Hire Smarter. Get Hired Faster. Powered by AI.
            </motion.h1>
            <motion.p
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              Say goodbye to manual screening. <b>Vettor</b> helps companies find the right candidates faster, and guides job seekers to land their dream roles — smarter, fairer, and faster.
            </motion.p>
            <motion.div
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-10 flex items-center gap-x-6 relative z-30"
            >
              <Link
                href="/auth/signup?type=company"
                className="relative z-40 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer transition-all duration-200 hover:scale-105"
              >
                Start Hiring Smarter
              </Link>
              <Link
                href="/auth/login?type=candidate"
                className="relative z-40 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-105"
              >
                Create Your AI CV
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 relative z-10"
            {...(shouldAnimate ? {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.8, delay: 0.2 }
            } : {})}
          >
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <Image
                src="/images/hero-image.png"
                alt="Platform screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.div
              {...(shouldAnimate ? fadeInUp : {})}
              className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-red-100 text-red-700 mb-4"
            >
              <span className="mr-2">💡</span>
              The Problem
            </motion.div>
            <motion.h2
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Recruitment today is broken
            </motion.h2>
            <motion.p
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              Companies receive hundreds of irrelevant CVs, interviews are time-consuming and biased, talented candidates get ignored, and students don't know where to start.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-24 sm:py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.div
              {...(shouldAnimate ? fadeInUp : {})}
              className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-green-100 text-green-700 mb-4"
            >
              <span className="mr-2">✅</span>
              Our Solution
            </motion.div>
            <motion.h2
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              All-in-One AI Recruitment Platform
            </motion.h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              {/* For Companies */}
              <motion.div
                {...(shouldAnimate ? fadeInUp : {})}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <BriefcaseIcon className="h-6 w-6" />
                  </div>
                  For Companies
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">📂</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Upload & Filter CVs in Seconds</h4>
                      <p className="mt-1 text-gray-600">AI analyzes hundreds of CVs and shortlists the most relevant ones based on your custom criteria.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">📅</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Automated Interview Invites</h4>
                      <p className="mt-1 text-gray-600">Let AI schedule interviews and send emails — no manual effort.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🤖</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">AI Video Interview (Coming Soon)</h4>
                      <p className="mt-1 text-gray-600">Our AI conducts real-time interviews, analyzes speech, confidence, and skills in any language.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              {/* For Candidates */}
              <motion.div
                {...(shouldAnimate ? fadeInUp : {})}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                    <UserGroupIcon className="h-6 w-6" />
                  </div>
                  For Candidates
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">📝</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Create AI-Optimized CV</h4>
                      <p className="mt-1 text-gray-600">Just enter your info — our AI generates a professional, job-ready CV.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🚀</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Job Suggestions & Roadmaps</h4>
                      <p className="mt-1 text-gray-600">Get matched with relevant jobs and see the learning roadmap to reach them.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">💬</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">AI Interview Prep</h4>
                      <p className="mt-1 text-gray-600">Practice interviews with our AI coach to boost confidence and performance.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.div
              {...(shouldAnimate ? fadeInUp : {})}
              className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-purple-100 text-purple-700 mb-4"
            >
              <span className="mr-2">🧠</span>
              Powerful Features
            </motion.div>
            <motion.h2
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Everything you need to hire better
            </motion.h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <span className="text-2xl">{feature.icon}</span>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="py-24 sm:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.div
              {...(shouldAnimate ? fadeInUp : {})}
              className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 mb-4"
            >
              <span className="mr-2">🌍</span>
              Who Is This For?
            </motion.div>
            <motion.h2
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Built for everyone in the hiring ecosystem
            </motion.h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {targetAudience.map((audience) => (
                <motion.div
                  key={audience.title}
                  variants={fadeInUp}
                  className="flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                    {audience.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{audience.title}</h3>
                  <p className="mt-2 text-gray-600">{audience.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.div
              {...(shouldAnimate ? fadeInUp : {})}
              className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-blue-100 text-blue-700 mb-4"
            >
              <span className="mr-2">📈</span>
              The Vision
            </motion.div>
            <motion.h2
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Expanding globally, starting with emerging economies
            </motion.h2>
            <motion.p
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              We believe hiring should be fair, efficient, and data-driven. Our platform is built to reduce hiring time, improve quality, and empower job seekers worldwide.
            </motion.p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {regions.map((region) => (
                <motion.div
                  key={region.name}
                  variants={fadeInUp}
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg ring-1 ring-gray-900/5"
                >
                  <span className="text-xl">{region.flag}</span>
                  <span className="font-medium text-gray-900">{region.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 sm:py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.div
              {...(shouldAnimate ? fadeInUp : {})}
              className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-green-100 text-green-700 mb-4"
            >
              <span className="mr-2">💬</span>
              What People Say
            </motion.div>
            <motion.h2
              {...(shouldAnimate ? fadeInUp : {})}
              className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Loved by companies and candidates
            </motion.h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex flex-col justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center gap-x-4">
                      <Image
                        className="h-12 w-12 rounded-full bg-gray-50"
                        src={testimonial.image}
                        alt=""
                        width={48}
                        height={48}
                      />
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="mt-6 text-gray-600">{testimonial.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            {...(shouldAnimate ? fadeInUp : {})}
            className="relative isolate overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16"
          >
            <motion.div
              {...(shouldAnimate ? fadeInUp : {})}
              className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-white/10 text-white mb-4"
            >
              <span className="mr-2">📢</span>
              Join Us Now
            </motion.div>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Whether you're hiring or job-seeking — get ahead with AI.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start for Free
              </Link>
              <Link
                href="/demo"
                className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a Demo
              </Link>
              <Link
                href="/early-access"
                className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Join Early Access List
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex flex-col items-center md:items-end space-y-4 md:order-2">
            <div className="flex justify-center space-x-6">
              {footerNavigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <div className="flex justify-center space-x-6">
              {footerNavigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <div className="flex justify-center">
                <div className="max-w-md w-full">
                  <label htmlFor="email" className="sr-only">
                    Stay updated
                  </label>
                  <div className="flex gap-x-3">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    📩 Stay updated with our latest features and updates
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-center text-xs leading-5 text-gray-500">
              Built with ❤️ by developers who care about the future of hiring.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
