'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

const painPoints = [
  {
    icon: '🕐',
    title: 'Hours Wasted on Irrelevant CVs',
    description: 'You spend hours screening hundreds of CVs, 80% are irrelevant.',
    accent: 'from-rose-50 to-orange-50 border-rose-200 text-rose-600'
  },
  {
    icon: '😫',
    title: 'Biased and Inconsistent Screening',
    description: 'Manual screening is biased and inconsistent - you miss great talent.',
    accent: 'from-amber-50 to-yellow-50 border-amber-200 text-amber-600'
  },
  {
    icon: '💸',
    title: 'Wasted Team Time',
    description: 'Your expensive team time is wasted on administrative work.',
    accent: 'from-emerald-50 to-green-50 border-emerald-200 text-emerald-600'
  }
]

const redditQuotes = [
  {
    quote: '"I spend 15+ hours a week just filtering through resumes. Most are completely irrelevant. There has to be a better way."',
    source: 'r/recruiting'
  },
  {
    quote: '"The worst part is knowing I\'m probably missing great candidates because I\'m so burned out by the time I get to resume #50."',
    source: 'r/humanresources'
  }
]

const solutionFeatures = [
  {
    icon: '📄',
    title: 'Upload hundreds of CVs at once',
    description: 'PDF, DOC formats supported'
  },
  {
    icon: '🎯',
    title: 'Set simple filters',
    description: 'Skills, experience, certifications'
  },
  {
    icon: '⚡',
    title: 'Get a ranked shortlist in under 60 seconds',
    description: 'Fast results you can trust'
  },
  {
    icon: '🔍',
    title: 'See WHY candidates were selected',
    description: 'Transparent AI explanations'
  }
]

const founderBenefits = [
  {
    icon: '🎁',
    title: '6 months FREE access',
    description: 'When we launch, you get 6 months free.'
  },
  {
    icon: '💬',
    title: 'Help shape the product',
    description: 'Your feedback directly influences what we build.'
  },
  {
    icon: '⭐',
    title: 'Priority support forever',
    description: 'You\'ll always be a priority.'
  },
  {
    icon: '🚫',
    title: 'No credit card required',
    description: 'Just your email to join the waitlist.'
  }
]

type WaitlistFormProps = {
  submitted: boolean
  onSubmit: (email: string) => Promise<void>
  placeholder?: string
  ctaLabel?: string
  helperText?: string
  align?: 'left' | 'center'
  layout?: 'inline' | 'stack'
  compact?: boolean
  className?: string
}

function WaitlistForm({
  submitted,
  onSubmit,
  placeholder = 'Enter your work email',
  ctaLabel = 'Get Early Access →',
  helperText,
  align = 'left',
  layout = 'inline',
  compact = false,
  className = ''
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (submitted) {
    return (
      <div
        className={`rounded-2xl border border-green-200 bg-green-50/80 px-4 py-5 text-sm font-medium text-green-700 backdrop-blur ${align === 'center' ? 'text-center' : ''} ${className}`}
      >
        ✅ You're on the list! We'll reach out with next steps and your founder perks.
      </div>
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setError('Email is required')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await onSubmit(trimmedEmail)
      setEmail('')
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formLayoutClass = layout === 'inline' ? 'flex flex-col gap-3 sm:flex-row' : 'flex flex-col gap-3'
  const inputSize = compact ? 'px-3 py-2.5 text-sm rounded-xl' : 'px-4 py-3.5 text-base rounded-2xl'
  const buttonSize = compact ? 'px-4 py-2.5 text-sm rounded-xl' : 'px-6 py-3.5 text-sm sm:text-base rounded-2xl'

  return (
    <div className={`space-y-3 ${className} ${align === 'center' ? 'text-center' : ''}`}>
      <form onSubmit={handleSubmit} className={`${formLayoutClass} ${align === 'center' ? 'mx-auto' : ''}`}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          className={`flex-1 border-0 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors duration-200 ${inputSize}`}
          disabled={isSubmitting}
          aria-label="Work email"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center gap-2 bg-sky-600 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-60 ${buttonSize}`}
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Joining...
            </>
          ) : (
            ctaLabel
          )}
        </button>
      </form>
      {helperText && <p className="text-xs sm:text-sm text-gray-500">{helperText}</p>}
      {error && <p className="text-xs font-medium text-rose-500">{error}</p>}
    </div>
  )
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const shouldAnimate = mounted && !prefersReducedMotion

  const handleWaitlistSubmit = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.log('Waitlist signup:', email)
    setSubmitted(true)
  }

  return (
    <div className="bg-white text-slate-900">
      <header className="absolute inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center group">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center overflow-hidden rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-slate-200/50 transition-transform duration-200 group-hover:scale-105">
              <Image 
                src="/images/logo.png" 
                alt="Vettor logo" 
                width={80} 
                height={80} 
                className="h-full w-full object-contain object-center" 
                priority 
              />
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#problem" className="transition-colors duration-200 hover:text-slate-900">Problem</a>
            <a href="#solution" className="transition-colors duration-200 hover:text-slate-900">Solution</a>
            <a href="#founders" className="transition-colors duration-200 hover:text-slate-900">Waitlist</a>
          </nav>
          <Link
            href="#join"
            className="hidden rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow md:inline-flex"
          >
            Join Waitlist
          </Link>
        </div>
      </header>

      <section id="join" className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 pb-24 pt-28 sm:pt-32">
        <div className="absolute -right-32 top-10 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <motion.div className="max-w-xl" {...(shouldAnimate ? fadeInUp : {})}>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Stop Wasting Time on Irrelevant CVs
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              We're building an AI tool that filters hundreds of CVs in seconds, so you only interview qualified candidates.
            </p>

            <div className="mt-8">
              <WaitlistForm 
                submitted={submitted} 
                onSubmit={handleWaitlistSubmit} 
                placeholder="Enter your work email"
                ctaLabel="Join waitlist for early access"
                helperText="No spam. We'll email when ready. First 50 users get 6 months free."
              />
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-md"
            {...(shouldAnimate
              ? {
                  initial: { opacity: 0, y: 24, scale: 0.95 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 0.6, delay: 0.12, ease: 'easeOut' }
                }
              : {})}
          >
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sky-200/40 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 px-6 py-8 shadow-xl backdrop-blur">
              <div className="text-center text-sm font-medium text-slate-600 mb-6">
                Simple mockup of clean interface
              </div>
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                <div className="text-4xl mb-4">📄</div>
                <p className="text-sm font-medium text-slate-600 mb-2">CV Upload Area</p>
                <p className="text-xs text-slate-500">Drag & drop or click to upload</p>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <p className="text-xs font-medium text-slate-600 mb-3">Filter Settings</p>
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    <span>Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    <span>Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    <span>Certifications</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="problem" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mx-auto max-w-3xl text-center" {...(shouldAnimate ? fadeInUp : {})}>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              The Recruitment Black Hole
            </span>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              The Problem We're Solving
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {painPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={fadeInUp}
                className={`rounded-3xl border bg-gradient-to-br p-6 shadow-sm backdrop-blur transition-transform duration-200 hover:-translate-y-1 ${point.accent}`}
              >
                <div className="text-3xl">{point.icon}</div>
                <p className="mt-6 text-lg font-semibold text-slate-900">{point.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{point.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {redditQuotes.map((quote, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur"
              >
                <p className="text-base italic text-slate-700 leading-relaxed">{quote.quote}</p>
                <p className="mt-4 text-xs font-medium text-slate-500">{quote.source}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="solution" className="bg-slate-900 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mx-auto max-w-3xl text-center" {...(shouldAnimate ? fadeInUp : {})}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
              Our Focused Solution
            </span>
            <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
              AI That Actually Works For Recruiters
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              We're starting with just CV filtering - because that's where the pain is.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {solutionFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{feature.description}</p>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sky-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...(shouldAnimate ? fadeInUp : {})} className="mt-16 rounded-3xl border border-white/10 bg-white/10 px-6 py-8 text-center backdrop-blur sm:px-12">
            <p className="text-base font-medium text-white/90">
              <span className="font-semibold">NOTICE:</span> We're starting with just CV filtering - because that's where the pain is.
            </p>
          </motion.div>
        </div>
      </section>


      <section id="founders" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mx-auto max-w-3xl text-center" {...(shouldAnimate ? fadeInUp : {})}>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sky-600">
              Be a Founding Recruiter
            </span>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Join the Waitlist</h2>
            <p className="mt-4 text-base text-slate-600">Help us validate demand and shape the product from day one.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {founderBenefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="text-3xl">{benefit.icon}</div>
                <p className="mt-6 text-lg font-semibold text-slate-900">{benefit.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...(shouldAnimate ? fadeInUp : {})} className="mt-12 flex justify-center">
            <WaitlistForm
              submitted={submitted}
              onSubmit={handleWaitlistSubmit}
              layout="inline"
              align="center"
              helperText="No credit card required. We'll email when ready."
              compact
              className="w-full max-w-xl"
            />
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 flex items-center justify-center overflow-hidden rounded bg-white p-0.5 ring-1 ring-slate-200/50">
              <Image 
                src="/images/logo.png" 
                alt="Vettor logo" 
                width={32} 
                height={32} 
                className="h-full w-full object-contain object-center" 
              />
            </div>
            <span>Vettor <span className="text-slate-300">•</span> AI co-pilot for recruiters</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center sm:items-end sm:text-right">
            <p className="text-xs text-slate-600 font-medium">
              No product exists yet - we're validating demand.
            </p>
            <p className="text-xs text-slate-500">
              If we get 100 serious recruiters on this list, we'll build it.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors duration-200 hover:text-slate-700">Privacy</Link>
            <Link href="#" className="transition-colors duration-200 hover:text-slate-700">Terms</Link>
            <Link href="mailto:contact@vettor.com" className="transition-colors duration-200 hover:text-slate-700">contact@vettor.com</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
