'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Countdown timer after email is sent
  useEffect(() => {
    if (step !== 2) return
    if (countdown === 0) {
      setCanResend(true)
      return
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [step, countdown])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email address is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    setStep(2)
    setCountdown(60)
    setCanResend(false)
  }

  async function handleResend() {
    if (!canResend) return
    setCanResend(false)
    setCountdown(60)
    // Simulate resend
    await new Promise((r) => setTimeout(r, 800))
  }

  if (step === 2) {
    return (
      <div className="space-y-6 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl">
            📧
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Check Your Email</h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            We&apos;ve sent a password reset link to{' '}
            <span className="font-semibold text-slate-700">{email}</span>.
            <br />
            The link will expire in <span className="font-medium text-slate-700">30 minutes</span>.
          </p>
        </div>

        {/* Open email button */}
        <a
          href="mailto:"
          className="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors text-center"
        >
          Open Email App
        </a>

        {/* Resend */}
        <div className="text-sm text-slate-500">
          Didn&apos;t receive it?{' '}
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Resend Email
            </button>
          ) : (
            <span className="text-slate-400">
              Resend in{' '}
              <span className="font-mono font-semibold text-slate-600">
                0:{String(countdown).padStart(2, '0')}
              </span>
            </span>
          )}
        </div>

        {/* Back to login */}
        <div className="pt-2 border-t border-slate-100">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl">
          🔐
        </div>
      </div>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Forgot Password?</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="arjun@example.com"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${error ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
            />
          </div>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending Reset Link...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>

      {/* Back to login */}
      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Login
        </Link>
      </div>
    </div>
  )
}
