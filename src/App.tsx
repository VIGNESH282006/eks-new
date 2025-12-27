import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import GooeyNav from '@/components/ui/navbar';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Packages from '@/pages/Packages';
import Interior from '@/pages/Interior';
import Projects from '@/pages/Projects';
import Careers from '@/pages/Careers';
import Contact from '@/pages/Contact';

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PACKAGES', href: '/packages' },
  { label: 'INTERIOR', href: '/interior' },
  { label: 'OUR PROJECTS', href: '/projects' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'CONTACT US', href: '/contact' },
];

const Layout = () => {
  return (
    <>
      <GooeyNav items={navItems} />
      <main>
        <Outlet />
      </main>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/interior" element={<Interior />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
