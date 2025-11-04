'use client'

import { Button } from '@/components/ui/button'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from 'next-themes'

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <FaSun className={`absolute h-10 w-10 scale-100 rotate-0 dark:scale-0 dark:-rotate-90`} />
      <FaMoon className={`absolute h-10 w-10 scale-0 rotate-90 dark:scale-100 dark:-rotate-0`} />
    </Button>
  )
}
