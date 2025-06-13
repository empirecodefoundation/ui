import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from 'next/font/local'

// Export fonts
export { GeistSans, GeistMono };

export const MinecartLCD = localFont({
  src: '../app/fonts/Minecart LCD.ttf',
  variable: '--font-minecart-lcd',
})
