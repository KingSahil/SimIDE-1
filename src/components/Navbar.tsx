import { useState, useEffect } from 'react';
import { SimIdeLogo, VsCodeIcon, GithubIcon } from './Icons';
import { DOWNLOAD_URL, GITHUB_URL } from '../config';
import { Menu, X, ExternalLink, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDocs }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(8, 13, 20, 0.88)' : 'rgba(8, 13, 20, 0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid #26364A' : '1px solid rgba(38, 54, 74, 0.4)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
          aria-label="SimIDE Home"
        >
          <SimIdeLogo size={32} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                color: '#F4F7FB',
              }}
            >
              Sim<span style={{ color: '#168BFF' }}>IDE</span>
            </span>
            <span
              style={{
                fontSize: '0.6875rem',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: 'rgba(22, 139, 255, 0.15)',
                color: '#168BFF',
                fontWeight: 600,
                border: '1px solid rgba(22, 139, 255, 0.3)',
                letterSpacing: '0.04em',
              }}
            >
              C++ DSA
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          <a
            href="#features"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Features
          </a>
          <a
            href="#algorithms"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Algorithms
          </a>
          <a
            href="#how-it-works"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            How It Works
          </a>
          <button
            onClick={onOpenDocs}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              cursor: 'pointer',
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Documentation
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm desktop-cta"
            style={{ textDecoration: 'none' }}
          >
            <VsCodeIcon size={18} />
            <span>Download Extension</span>
            <ArrowRight size={14} />
          </a>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'rgba(16, 26, 40, 0.8)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(13, 21, 33, 0.98)',
            borderBottom: '1px solid var(--border-color)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <a
            href="#features"
            onClick={closeMobileMenu}
            style={{
              fontSize: '1.05rem',
              fontWeight: 500,
              padding: '8px 0',
              borderBottom: '1px solid rgba(38, 54, 74, 0.4)',
            }}
          >
            Features
          </a>
          <a
            href="#algorithms"
            onClick={closeMobileMenu}
            style={{
              fontSize: '1.05rem',
              fontWeight: 500,
              padding: '8px 0',
              borderBottom: '1px solid rgba(38, 54, 74, 0.4)',
            }}
          >
            Algorithms
          </a>
          <a
            href="#how-it-works"
            onClick={closeMobileMenu}
            style={{
              fontSize: '1.05rem',
              fontWeight: 500,
              padding: '8px 0',
              borderBottom: '1px solid rgba(38, 54, 74, 0.4)',
            }}
          >
            How It Works
          </a>
          <button
            onClick={() => {
              closeMobileMenu();
              onOpenDocs();
            }}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              color: 'var(--text-primary)',
              font: 'inherit',
              fontSize: '1.05rem',
              fontWeight: 500,
              padding: '8px 0',
              borderBottom: '1px solid rgba(38, 54, 74, 0.4)',
              cursor: 'pointer',
            }}
          >
            Documentation
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1.05rem',
              fontWeight: 500,
              padding: '8px 0',
              borderBottom: '1px solid rgba(38, 54, 74, 0.4)',
            }}
          >
            <GithubIcon size={18} />
            <span>GitHub Repository</span>
            <ExternalLink size={14} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="btn btn-primary"
            style={{ marginTop: '8px', textDecoration: 'none' }}
          >
            <VsCodeIcon size={20} />
            <span>Download Extension</span>
            <ArrowRight size={16} />
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
