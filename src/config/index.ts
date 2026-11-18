// Application-level feature flags and config
export const appConfig = {
  name: 'CompeteHub',
  tagline: 'Where Champions Are Made',
  description: "India's premier academic competition platform.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  supportEmail: 'support@competehub.in',
  contactEmail: 'contact@competehub.in',

  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },

  referral: {
    rewardAmount: 150, // INR per successful referral
    minWithdrawal: 500,
    creditDelayDays: 7,
  },

  otp: {
    length: 6,
    expiryMinutes: 10,
    resendCooldownSeconds: 60,
  },

  password: {
    minLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
  },
} as const;

export type AppConfig = typeof appConfig;
