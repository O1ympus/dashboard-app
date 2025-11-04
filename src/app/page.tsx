import SearchBar from '@/components/SearchBar'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  return (
    <div className={`max-w-[1536px] px-4 pb-2 sm:px-8 lg:flex lg:flex-col lg:justify-start`}>
      <SearchBar />
      <Dashboard />
    </div>
  )
}
