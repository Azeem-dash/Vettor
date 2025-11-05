'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

const heroHighlights = [
  {
    icon: '⚡',
    title: '47s to shortlist',
    subtitle: 'Process 200 CVs with AI triage in under a minute.'
  },
  {
    icon: '🎯',
    title: '5x faster hires',
    subtitle: 'Cut time-to-interview by focusing only on top-fit profiles.'
  },
  {
    icon: '🛡️',
    title: 'Bias-aware scoring',
    subtitle: 'Explainable fit score for every candidate you shortlist.'
  }
]

const painPoints = [
  {
    icon: '🕐',
    title: 'The Time Sink',
    description: 'Recruiting teams spend 10+ hours every week vetting 200+ CVs where 80% are irrelevant.',
    metric: '15 hrs/week wasted',
    accent: 'from-rose-50 to-orange-50 border-rose-200 text-rose-600'
  },
  {
    icon: '😫',
    title: 'Missed Talent',
    description: 'Human fatigue and bias mean your best candidates slip through the cracks.',
    metric: '42% of good candidates missed',
    accent: 'from-amber-50 to-yellow-50 border-amber-200 text-amber-600'
  },
  {
    icon: '💸',
    title: 'Budget Burn',
    description: 'Every manual screening hour costs ~$75 in recruiter time with zero compounding value.',
    metric: '$3,750/month wasted',
    accent: 'from-emerald-50 to-green-50 border-emerald-200 text-emerald-600'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Upload & Go',
    description: 'Drag & drop hundreds of CVs. We handle PDF, Word, LinkedIn exports — no manual data entry.',
    badge: 'Multi-format AI parsing'
  },
  {
    number: '02',
    title: 'Set the Signal',
    description: 'Mark must-have skills, years of experience, culture-fit markers, and knock-out criteria.',
    badge: 'Smart criteria builder'
  },
  {
    number: '03',
    title: 'Review the Shortlist',
    description: 'Get a ranked shortlist with explainable fit scores, ready to invite to interview.',
    badge: 'Explainable AI scoring'
  }
]

const socialProofLogos = ['TechHub', 'InnovateCorp', 'TalentWorks', 'BridgeLabs']

const securityPoints = ['🔒 GDPR Ready', '📊 End-to-end Encryption', '🤖 Bias Tracking & Alerts']

const founderBenefits = [
  {
    icon: '🎁',
    title: '6 Months Free',
    description: 'Extended beta access plus a lifetime founder discount.'
  },
  {
    icon: '💬',
    title: 'Shape the Roadmap',
    description: 'Weekly product sessions so we build what matters to your team.'
  },
  {
    icon: '⭐',
    title: 'VIP Treatment',
    description: 'Priority support, feature fast-lane, and direct founder access.'
  },
  {
    icon: '🤝',
    title: 'Founder Circle',
    description: 'Join a private network of forward-thinking recruiting leaders.'
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
            <a href="#solution" className="transition-colors duration-200 hover:text-slate-900">How it Works</a>
            <a href="#proof" className="transition-colors duration-200 hover:text-slate-900">Trust</a>
            <a href="#founders" className="transition-colors duration-200 hover:text-slate-900">Founder Perks</a>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
              <span className="text-sky-500">●</span>
              Validate before you build
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Hire your next top candidate <span className="text-sky-600">5x faster</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              Vettor is the AI recruiting co-pilot that filters hundreds of CVs in seconds, ranks them by genuine fit, and shows you why they made the shortlist.
            </p>

            <WaitlistForm submitted={submitted} onSubmit={handleWaitlistSubmit} helperText="No hard sell. No credit card. Just first access and a direct line to our team." />

            <motion.div
              className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {heroHighlights.map((highlight) => (
                <motion.div
                  key={highlight.title}
                  variants={fadeInUp}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm shadow-sm backdrop-blur transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="text-xl">{highlight.icon}</div>
                  <p className="mt-3 text-base font-semibold text-slate-900">{highlight.title}</p>
                  <p className="mt-2 text-xs text-slate-500">{highlight.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
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
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 px-6 py-7 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span className="text-slate-900">Bulk CV Upload</span>
                <span>👥 200 candidates</span>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-900 px-5 py-6 text-left text-white shadow-lg">
                <p className="text-xs uppercase tracking-wide text-white/60">AI Fit Score</p>
                <div className="mt-4 space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Laila Khan</span>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Victor Adeyemi</span>
                    <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300">88%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Sara Iqbal</span>
                    <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200">84%</span>
                  </div>
                </div>
                <p className="mt-5 text-xs text-white/70">Explainable insights show why each profile made the shortlist.</p>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-sm text-slate-600">
                <span>⏱️ Screening hours saved</span>
                <span className="font-semibold text-slate-900">10.4 hrs/week</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="problem" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mx-auto max-w-3xl text-center" {...(shouldAnimate ? fadeInUp : {})}>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              The recruitment black hole
            </span>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Manual screening is costing your team time, money, and quality
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Vettor is a validation-first product. We're talking to recruiters who feel this pain every day.
            </p>
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
                <div className="mt-6 inline-flex rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">{point.metric}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="solution" className="bg-slate-900 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mx-auto max-w-3xl text-center" {...(shouldAnimate ? fadeInUp : {})}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
              How Vettor works
            </span>
            <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
              From CV flood to ready-to-interview shortlist — in minutes
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              We focus on one core workflow today: filter, rank, and explain resumes so you can validate demand for smarter hiring.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="text-sm font-semibold text-white/70">{step.number}</div>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{step.description}</p>
                <div className="mt-6 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">{step.badge}</div>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sky-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...(shouldAnimate ? fadeInUp : {})} className="mt-16 rounded-3xl border border-white/10 bg-white/10 px-6 py-10 text-center backdrop-blur sm:px-12">
            <p className="text-base font-medium text-white">
              🎯 <span className="font-semibold">See it in action:</span> Watch Vettor shortlist 150 CVs in 47 seconds with full transparency.
            </p>
            <div className="mt-6 flex justify-center">
              <button className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-md transition-all duration-200 hover:-translate-y-0.5">Watch demo →</button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="proof" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-12 lg:grid-cols-[2fr,3fr] lg:items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Trusted by forward-thinking recruiting teams</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                We're onboarding founding recruiters from tech scale-ups, global HR teams, and university career offices who want to validate faster hiring — before investing in a full build.
              </p>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-base italic text-slate-700">
                  "Vettor cut our screening time by 80% and surfaced candidates we'd never have spotted manually. The explainable scoring gives us confidence to move fast."
                </p>
                <div className="mt-6 text-sm font-semibold text-slate-900">HR Director, Growth-stage SaaS Team</div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {socialProofLogos.map((logo) => (
                <div key={logo} className="flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-sm font-semibold tracking-wide text-slate-500 backdrop-blur">
                  {logo}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-10 text-center shadow-sm backdrop-blur sm:px-10" {...(shouldAnimate ? fadeInUp : {})}>
            <h4 className="text-lg font-semibold text-slate-900">Enterprise-grade from day zero</h4>
            <p className="mt-4 text-sm text-slate-600">Compliance is table stakes. Vettor is built on secure infrastructure with transparency built into every decision.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {securityPoints.map((point) => (
                <span key={point} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
                  {point}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="founders" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mx-auto max-w-3xl text-center" {...(shouldAnimate ? fadeInUp : {})}>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sky-600">
              Founding recruiter program
            </span>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Be the voice that shapes Vettor from day one</h2>
            <p className="mt-4 text-base text-slate-600">We have 47 founding seats left. Help us build the product you wish existed and unlock lifetime advantages.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2"
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
              helperText="Founders get 6 months free, lifetime discounts, and weekly product workshops."
              compact
              className="w-full max-w-xl"
            />
          </motion.div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...(shouldAnimate ? fadeInUp : {})}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-900 px-6 py-14 text-center text-white shadow-2xl sm:px-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-2xl space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Launch before you build</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to validate smarter hiring?</h2>
              <p className="text-base text-white/80">
                Join hundreds of recruiters already on the waitlist. Get early access, shape the roadmap, and make sure Vettor is exactly what you need before we write another line of product code.
              </p>
              <WaitlistForm
                submitted={submitted}
                onSubmit={handleWaitlistSubmit}
                layout="inline"
                align="center"
                helperText="We reply within 24 hours with a quick qualifying survey and a link to book a call if you'd like."
              />
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-xs text-slate-500 sm:flex-row sm:justify-between">
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
