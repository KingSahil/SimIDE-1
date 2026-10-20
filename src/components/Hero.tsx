import { VsCodeIcon, GithubIcon } from './Icons';
import { DOWNLOAD_URL, GITHUB_URL } from '../config';
import { ArrowRight, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { HeroFloatingDSA } from './FloatingDSA';

export const Hero: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '100px',
        paddingBottom: '80px',
        textAlign: 'center',
        overflow: 'visible',
      }}
    >
      {/* Subtle Cosmic Flank Stars & Hero DSA Floating Elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        {/* Scattered Subtle Cosmic Star Particles (Flanks Only) */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.55,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Flank Stars */}
          <circle cx="8%" cy="22%" r="1" fill="#168BFF" opacity="0.4" className="cosmic-star" />
          <circle cx="14%" cy="38%" r="1.2" fill="#F4F7FB" opacity="0.5" className="cosmic-star" />
          <circle cx="5%" cy="52%" r="0.9" fill="#A78BFA" opacity="0.35" className="cosmic-star" />
          <circle cx="18%" cy="68%" r="1.1" fill="#168BFF" opacity="0.45" className="cosmic-star" />
          <circle cx="11%" cy="80%" r="0.8" fill="#F4F7FB" opacity="0.3" className="cosmic-star" />
          <circle cx="22%" cy="28%" r="1" fill="#168BFF" opacity="0.4" className="cosmic-star" />

          {/* Right Flank Stars */}
          <circle cx="82%" cy="20%" r="1.1" fill="#A78BFA" opacity="0.45" className="cosmic-star" />
          <circle cx="92%" cy="32%" r="0.9" fill="#F4F7FB" opacity="0.35" className="cosmic-star" />
          <circle cx="87%" cy="48%" r="1.2" fill="#168BFF" opacity="0.5" className="cosmic-star" />
          <circle cx="95%" cy="62%" r="0.8" fill="#A78BFA" opacity="0.3" className="cosmic-star" />
          <circle cx="79%" cy="74%" r="1" fill="#168BFF" opacity="0.4" className="cosmic-star" />
          <circle cx="89%" cy="84%" r="1.1" fill="#F4F7FB" opacity="0.45" className="cosmic-star" />
        </svg>

        {/* Floating DSA Diagrams for Hero Section */}
        <HeroFloatingDSA />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Exact Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            maxWidth: '900px',
            margin: '0 auto 24px auto',
            animation: 'fadeInUp 0.8s ease-out',
          }}
        >
          <span style={{ color: '#FFFFFF' }}>Turn Your </span>
          <span style={{ color: '#079BFF' }}>C++ </span>
          <span style={{ color: '#FFFFFF' }}>Code Into </span>
          <br />
          <span style={{ color: '#B99AFF' }}>Visual Understanding.</span>
        </h1>

        {/* Supporting Description */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            margin: '0 auto 40px auto',
            lineHeight: 1.6,
            fontWeight: 400,
            animation: 'fadeInUp 1s ease-out',
          }}
        >
          SimIDE helps you understand and debug C++ data structures and algorithms through real-time visualizations
          synchronized with program execution — directly inside VS Code.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '40px',
            animation: 'fadeInUp 1.1s ease-out',
          }}
        >
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              padding: '14px 28px',
              fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            <VsCodeIcon size={22} />
            <span>Download Extension</span>
            <ArrowRight size={18} />
          </a>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{
              padding: '14px 28px',
              fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            <GithubIcon size={20} />
            <span>View on GitHub</span>
          </a>
        </div>

        {/* 3 Compact Trust / Feature Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            fontWeight: 500,
            animation: 'fadeInUp 1.2s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="#3CCB83" />
            <span>Free &amp; Open Source</span>
          </div>

          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--border-color)',
            }}
            className="indicator-divider"
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} color="#168BFF" />
            <span>Windows, Linux and macOS</span>
          </div>

          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--border-color)',
            }}
            className="indicator-divider"
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#A78BFA" />
            <span>No AI Required</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .cosmic-star {
          animation: subtleTwinkle 4s ease-in-out infinite alternate;
        }
        .cosmic-star:nth-child(2n) {
          animation-duration: 5.5s;
          animation-delay: 1s;
        }
        .cosmic-star:nth-child(3n) {
          animation-duration: 6.5s;
          animation-delay: 2s;
        }
        @keyframes subtleTwinkle {
          0% { opacity: 0.25; }
          50% { opacity: 0.65; }
          100% { opacity: 0.35; }
        }
        @media (max-width: 600px) {
          .indicator-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
