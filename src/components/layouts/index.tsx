import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import ScrollToTop from '../ScrollToTop'

export function MainLayout() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <main className="pt-[70px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

