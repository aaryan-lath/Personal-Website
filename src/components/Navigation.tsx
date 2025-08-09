'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  const isProjectPage = pathname?.startsWith('/project/');
  const isActivityPage = pathname?.startsWith('/activities/');
  const isResearchPage = pathname?.startsWith('/research/');
  const isTimelinePage = pathname?.startsWith('/timeline');

  const navItems = (isProjectPage || isActivityPage || isResearchPage || isTimelinePage) ? [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Internships', href: '/#internships' },
    { name: 'Research', href: '/#research' },
    { name: 'Activities', href: '/#activities' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Contact', href: '/#contact' },
  ] : [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Internships', href: '#internships' },
    { name: 'Research', href: '#research' },
    { name: 'Activities', href: '#activities' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Only detect sections on main page
      if (!isProjectPage && !isActivityPage && !isResearchPage && !isTimelinePage) {
        const sections = ['home', 'projects', 'internships', 'research', 'activities', 'timeline', 'contact'];
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        let currentSection = 'home'; // Default to home
        
        // Find which section is currently most visible
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            
            // Check if section is in viewport (with some tolerance)
            if (sectionTop <= windowHeight * 0.5 && sectionBottom >= windowHeight * 0.3) {
              currentSection = sectionId;
            }
          }
        }
        
        setActiveSection(currentSection);
      }
    };
    
    const checkModalState = () => {
      setIsModalOpen(document.body.hasAttribute('data-modal-open'));
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check modal state on mount and set up observer
    checkModalState();
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open'] });
    
    // Initial scroll check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isProjectPage, isActivityPage, isResearchPage, isTimelinePage]);

  // Update indicator position when active section changes
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    if (isProjectPage || isActivityPage || isResearchPage || isTimelinePage) return;

    const navItems = navRef.current.querySelectorAll('[data-nav-item]');
    let activeIndex = -1;

    navItems.forEach((item, index) => {
      const navItem = item as HTMLElement;
      const section = navItem.dataset.navItem;
      if (section === activeSection) {
        activeIndex = index;
      }
    });

    if (activeIndex >= 0 && activeIndex < navItems.length) {
      const activeItem = navItems[activeIndex] as HTMLElement;
      const indicator = indicatorRef.current;
      
      indicator.style.left = `${activeItem.offsetLeft}px`;
      indicator.style.width = `${activeItem.offsetWidth}px`;
      indicator.style.opacity = '1';
    } else {
      indicatorRef.current.style.opacity = '0';
    }
  }, [activeSection, isProjectPage, isActivityPage, isResearchPage, isTimelinePage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isProjectPage || isActivityPage || isResearchPage || isTimelinePage) {
      // On project/activity/research/timeline pages, just navigate normally (no preventDefault)
      setIsMenuOpen(false);
      return;
    }
    
    // On main page, use smooth scrolling
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  if (isModalOpen) return null;

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
      isScrolled || isProjectPage || isActivityPage || isResearchPage || isTimelinePage
        ? 'bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 rounded-full px-6 py-2' 
        : 'bg-white/10 backdrop-blur-sm rounded-full px-6 py-3'
    }`}>
      <div className="flex items-center w-full gap-8">
        <Link 
          href={(isProjectPage || isActivityPage || isResearchPage || isTimelinePage) ? '/' : '#home'} 
          className={`flex items-center text-xl font-bold transition-all duration-300 whitespace-nowrap ${
            isScrolled || isProjectPage || isActivityPage || isResearchPage || isTimelinePage ? 'text-gray-900' : 'text-white'
          }`}
          onClick={(e) => handleNavClick(e, (isProjectPage || isActivityPage || isResearchPage || isTimelinePage) ? '/' : '#home')}
        >
          <div className={`transition-all duration-500 ease-in-out overflow-hidden mr-3 ${
            isScrolled || isProjectPage || isActivityPage || isResearchPage || isTimelinePage ? 'w-8 h-8 opacity-100' : 'w-0 h-0 opacity-0'
          }`}>
            <img 
              src="/images/profile.jpeg" 
              alt="Aaryan Lath" 
              className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
            />
          </div>
          Aaryan Lath
        </Link>

        <div ref={navRef} className="hidden md:flex items-center space-x-1 relative flex-1">
          {/* Moving indicator */}
          <div 
            ref={indicatorRef}
            className={`absolute h-full rounded-full transition-all duration-300 ease-out opacity-0 ${
              isScrolled || isProjectPage || isActivityPage || isResearchPage || isTimelinePage
                ? 'bg-blue-100' 
                : 'bg-white/20 backdrop-blur-sm'
            }`}
            style={{ top: 0, zIndex: -1 }}
          />
          
          {navItems.map((item) => {
            const sectionId = item.href.startsWith('#') ? item.href.slice(1) : 
                            item.href === '/timeline' ? 'timeline' : 
                            item.href === '/' ? 'home' : 
                            item.href === '/#timeline' ? 'timeline' : '';
            
            return (
              <Link
                key={item.name}
                href={item.href}
                data-nav-item={sectionId}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/20 relative z-10 ${
                  isScrolled || isProjectPage || isActivityPage || isResearchPage || isTimelinePage
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-white/90 hover:text-white'
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-colors ${
              isScrolled || isProjectPage || isActivityPage || isResearchPage || isTimelinePage
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 block px-4 py-2 rounded-full text-base font-medium transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}