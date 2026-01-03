import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
} from '@/components/ui/resizable-navbar';
import { Link } from 'react-router-dom';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Packages from '@/pages/Packages';
import Interior from '@/pages/Interior';
import Projects from '@/pages/Projects';
import Careers from '@/pages/Careers';
import Contact from '@/pages/Contact';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { Footer } from '@/components/ui/footer-taped-design';
import { GenieChat } from '@/components/ui/genie-chat';
import { StaggeredMenu } from '@/components/ui/staggered-menu';

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PACKAGES', href: '/packages' },
  { label: 'INTERIOR', href: '/interior' },
  { label: 'OUR PROJECTS', href: '/projects' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'CONTACT US', href: '/contact' },
];

const pageHeroConfig: Record<string, any> = {
  '/services': {
    mainText: "Expert construction services tailored to your needs. From planning to execution, we handle it all.",
    overlayText: { part1: 'Our', part2: 'Services' },
    imageSrc: "/genie-img-services.png",
    imageAlt: "EKS Construction Genie Mascot",
    backgroundImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
  },
  '/packages': {
    mainText: "Flexible packages designed for every budget. Transparent pricing, no hidden costs.",
    overlayText: { part1: 'Best', part2: 'Packages' },
    imageSrc: "/genie-img-packages-v2.png",
    imageAlt: "EKS Construction Genie Mascot",
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop"
  },
  '/interior': {
    mainText: "Transform your space with our premium interior design solutions. Beauty meets functionality.",
    overlayText: { part1: 'Interior', part2: 'Design' },
    imageSrc: "/genie-img-interior.png",
    imageAlt: "EKS Construction Genie Mascot",
    backgroundImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
  },
  '/projects': {
    mainText: "A showcase of our finest work. Explore our portfolio of completed projects across the region.",
    overlayText: { part1: 'Our', part2: 'Work' },
    imageSrc: "/genie-img-projects.png",
    imageAlt: "EKS Construction Genie Mascot",
    backgroundImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"
  },
  '/careers': {
    mainText: "Join our team of dedicated professionals. Build your future with EKS Construction.",
    overlayText: { part1: 'Join Us' },
    imageSrc: "/genie-img-careers.png",
    imageAlt: "EKS Construction Genie Mascot",
    backgroundImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
  },
  '/contact': {
    mainText: "We're here to help. Reach out to us for quotes, inquiries, or just to say hello.",
    overlayText: { part1: 'Get in', part2: 'Touch' },
    imageSrc: "/genie-img-contact.png",
    imageAlt: "EKS Construction Genie Mascot",
    backgroundImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
  }
};

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const customHeroProps = pageHeroConfig[location.pathname];

  const defaultHeroProps = {
    mainText: "Building your dreams with precision and passion.",
    overlayText: { part1: 'EKS', part2: 'Const.' },
    imageSrc: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop",
    imageAlt: "EKS Construction",
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop"
  };

  const heroProps = { ...defaultHeroProps, ...customHeroProps };

  // Transform navItems to match new component's expected format (name, link)
  // Filter out CONTACT US as requested (it's already a button on the right)
  const formattedNavItems = navItems
    .filter(item => item.label !== 'CONTACT US')
    .map(item => ({ name: item.label, link: item.href }));

  // StaggeredMenu items for mobile
  const staggeredMenuItems = navItems.map(item => ({
    label: item.label,
    ariaLabel: `Go to ${item.label.toLowerCase()}`,
    link: item.href
  }));

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com/eksconstruction' },
    { label: 'Facebook', link: 'https://facebook.com/eksconstruction' },
    { label: 'WhatsApp', link: 'https://wa.me/919876543210' }
  ];

  return (
    <>
      <ScrollToTop />
      <Navbar className="top-2">
        <NavBody>
          <NavbarLogo />
          <NavItems items={formattedNavItems} />
          <div className="flex items-center gap-4 mr-6">
            <NavbarButton as={Link} href="/contact" variant="primary">CONTACT US</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile StaggeredMenu - only visible on mobile */}
        <div className="lg:hidden">
          <StaggeredMenu
            position="right"
            items={staggeredMenuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={false}
            menuButtonColor="#000"
            openMenuButtonColor="#000"
            changeMenuColorOnOpen={true}
            colors={['#082E6D', '#C11336']}
            logoUrl="/logo.png"
            accentColor="#C11336"
            isFixed={true}
          />
        </div>
      </Navbar>
      {!isHomePage && !location.pathname.startsWith('/interior') && (
        <MinimalistHero
          key={location.pathname}
          {...heroProps}
        />
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
      <GenieChat />
    </>
  )
}

export default function App() {
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
