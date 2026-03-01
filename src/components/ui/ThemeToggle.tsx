import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { themeConfig, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${themeConfig.mode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${themeConfig.mode === 'light' ? 'dark' : 'light'} mode`}
      className="p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 hover:scale-105 active:scale-95"
    >
      {themeConfig.mode === 'light' ? (
        <MdDarkMode className="text-xl" />
      ) : (
        <MdLightMode className="text-xl" />
      )}
    </button>
  )
}
