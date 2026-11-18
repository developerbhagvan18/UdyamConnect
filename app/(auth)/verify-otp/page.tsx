'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function VerifyOtpPage() {
  const router = useRouter()

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // 6 individual refs (Rules of Hooks — no array of useRef calls)
  const ref0 = useRef<HTMLInputElement>(null)
  const ref1 = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)
  const ref3 = useRef<HTMLInputElement>(null)
  const ref4 = useRef<HTMLInputElement>(null)
  const ref5 = useRef<HTMLInputElement>(null)
  const refs = [ref0, ref1, ref2, ref3, ref4, ref5]

  // Countdown timer
  useEffect(() => {
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
  }, [countdown])

  // Redirect to dashboard after verification
  useEffect(() => {
    if (!isVerified) return
    const timer = setTimeout(() => {
      router.push('/user/dashboard')
    }, 2000)
    return () => clearTimeout(timer)
  }, [isVerified, router])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // digits only
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // take last char
    setOtp(newOtp)
    if (value && index < 5) refs[index + 1].current?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('')
    const newOtp = [...otp]
    digits.forEach((d, i) => {
      newOtp[i] = d
    })
    setOtp(newOtp)
    refs[Math.min(digits.length, 5)].current?.focus()
  }

  const isComplete = otp.every((d) => d !== '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isComplete) return
    setIsLoading(true)
    // Simulate OTP verification
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    setIsVerified(true)
  }

  async function handleResend() {
    if (!canResend) return
    setCanResend(false)
    setCountdown(60)
    setOtp(Array(6).fill(''))
    refs[0].current?.focus()
    // Simulate resend
    await new Promise((r) => setTimeout(r, 800))
  }

  if (isVerified) {
    return (
      <div className="text-center space-y-6">
        <div className="text-7xl">✅</div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Phone Verified!</h2>
          <p className="mt-2 text-slate-500 text-sm">Redirecting to your dashboard...</p>
        </div>
        <div className="flex justify-center">
          <svg className="h-6 w-6 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl">
          📱
        </div>
      </div>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Verify Your Phone</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter the 6-digit OTP sent to{' '}
          <span className="font-semibold text-slate-700">+91 98765 43210</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP inputs */}
        <div className="flex justify-center gap-2 sm:gap-3">
          {refs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-11 h-14 sm:w-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors ${
                otp[index]
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-900'
              }`}
            />
          ))}
        </div>

        {/* Verify button */}
        <button
          type="submit"
          disabled={!isComplete || isLoading}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </button>
      </form>

      {/* Resend */}
      <div className="text-center text-sm text-slate-500">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Resend OTP
          </button>
        ) : (
          <span>
            Resend OTP in{' '}
            <span className="font-mono font-semibold text-slate-700">
              0:{String(countdown).padStart(2, '0')}
            </span>
          </span>
        )}
      </div>

      {/* Change number */}
      <div className="text-center">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Change phone number
        </Link>
      </div>
    </div>
  )
}
