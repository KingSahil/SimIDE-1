import React from 'react';
import { VsCodeIcon, GithubIcon } from './Icons';
import { DOWNLOAD_URL, GITHUB_URL } from '../config';
import { ArrowRight, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { HeroFloatingDSA } from './FloatingDSA';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col justify-center overflow-visible"
      style={{
        paddingTop: '90px',
        paddingBottom: '70px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Soft radial wash behind text to keep typography high-contrast while acoustic rings pass underneath */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse 60% 45% at 50% 45%, rgba(8, 13, 20, 0.85) 0%, transparent 100%)',
        }}
      />

      {/* Interactive Draggable Floating Data Structures (Moving on Flanks) */}
      <div
        className="dsa-bg-layer"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <HeroFloatingDSA />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* 21st.dev Style Eyebrow Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '100px',
            backgroundColor: 'rgba(22, 139, 255, 0.08)',
            border: '1px solid rgba(22, 139, 255, 0.35)',
            boxShadow: '0 0 24px rgba(22, 139, 255, 0.18)',
            marginBottom: '28px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#F4F7FB',
            animation: 'fadeInUp 0.6s ease-out',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#3CCB83',
              display: 'inline-block',
            }}
            className="radar-ping"
          />
          <span style={{ color: '#168BFF', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>SimIDE 2.0</span>
          <span style={{ color: 'var(--border-color)' }}>•</span>
          <span style={{ color: '#A7B5C7' }}>Now in public beta</span>
          <ArrowRight size={14} color="#168BFF" />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.15,
            maxWidth: '920px',
            margin: '0 auto 24px auto',
            animation: 'fadeInUp 0.8s ease-out',
          }}
        >
          <span style={{ color: '#FFFFFF' }}>Turn Your </span>
          <span style={{ color: '#079BFF' }}>C++ </span>
          <span style={{ color: '#FFFFFF' }}>Code Into </span>
          <br />
          <span style={{ color: '#FF4D4D', textShadow: '0 0 35px rgba(255, 77, 77, 0.45)' }}>Visual Understanding.</span>
        </h1>

        {/* Supporting Description */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            margin: '0 auto 36px auto',
            lineHeight: 1.6,
            fontWeight: 400,
            animation: 'fadeInUp 1s ease-out',
          }}
        >
          Every execution step is a real memory event. Understand and debug C++ data structures
          through real-time visualizations directly inside VS Code. Tap anywhere to ping.
        </p>

        {/* Spacious 21st.dev Style Pill CTA Buttons */}
        <div
          className="hero-cta-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '42px',
            position: 'relative',
            zIndex: 10,
            animation: 'fadeInUp 1.1s ease-out',
          }}
        >
          {/* Primary CTA: Download Extension */}
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-button primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              padding: '16px 36px',
              borderRadius: '100px',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #168BFF 0%, #0066FF 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 32px rgba(22, 139, 255, 0.45), 0 2px 8px rgba(0, 0, 0, 0.5)',
              textDecoration: 'none',
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <VsCodeIcon size={20} colorMode="white" />
            </div>
            <span>Download Extension</span>
            <ArrowRight size={20} style={{ marginLeft: '2px', flexShrink: 0 }} />
          </a>

          {/* Secondary CTA: View on GitHub */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-button secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              padding: '16px 34px',
              borderRadius: '100px',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#F4F7FB',
              background: 'rgba(13, 21, 33, 0.85)',
              border: '1.5px solid #26364A',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 28px rgba(0, 0, 0, 0.5)',
              textDecoration: 'none',
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <GithubIcon size={20} />
            </div>
            <span>View on GitHub</span>
          </a>
        </div>

        {/* Animated Scroll-to-Execute Mouse Prompt */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '36px',
            animation: 'fadeInUp 1.15s ease-out',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#168BFF',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Scroll Down to Step Through 3D Debugger</span>
            <span>↓</span>
          </div>

          <div
            style={{
              width: '22px',
              height: '34px',
              borderRadius: '12px',
              border: '2px solid rgba(22, 139, 255, 0.4)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: '#168BFF',
                animation: 'scrollWheel 1.5s infinite ease-in-out',
              }}
            />
          </div>
        </div>

        {/* 3 Compact Trust / Feature Indicators */}
        <div
          className="hero-indicators-group"
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
        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
          100% { transform: translateY(0); opacity: 1; }
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
