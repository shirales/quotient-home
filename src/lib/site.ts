export const SITE_NAME = 'Quotient'
export const SITE_TITLE = 'Quotient — AI Superforecasting for Prediction Market Traders'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.quotient.social'
export const SITE_DESCRIPTION =
  "Q is an AI superforecasting agent with an 85.1% win rate. See where markets are mispriced, understand why, and act on it. Follow the calls, trade the signals, or build with the API."
export const SITE_OG_DESCRIPTION =
  "Q is an AI superforecasting agent with an 85.1% win rate. Follow the calls. Trade the signals. Build with the API."
export const DEFAULT_OG_IMAGE_PATH = '/og/og-default.png'

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}
