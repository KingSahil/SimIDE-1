import { useState } from 'react';
import { VsCodeIcon, GithubIcon } from './Icons';
import { DOWNLOAD_URL, GITHUB_URL } from '../config';
import { ArrowRight, Copy, Check, Terminal, Shield } from 'lucide-react';
import { BottomCTAFloatingDSA } from './FloatingDSA';

export const DownloadCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'ext install kingsahil.simide-ide';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section" style={{ paddingTop: '80px', paddingBottom: '120px', position: 'relative', overflow: 'visible' }}>
      <BottomCTAFloatingDSA />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Glowing Container Card */}
        <div
          style={{
            position: 'relative',
            backgroundColor: '#0D1521',
            border: '1px solid #26364A',
            borderRadius: '24px',
            padding: '72px 36px',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 1px rgba(22, 139, 255, 0.3)',
          }}
        >
          {/* Ambient Glows inside panel */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(22, 139, 255, 0.18) 0%, rgba(128, 87, 232, 0.08) 50%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          {/* Technical Grid Overlay */}
          <div
            className="tech-grid-bg"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.3,
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '100px',
                backgroundColor: 'rgba(22, 139, 255, 0.1)',
                border: '1px solid rgba(22, 139, 255, 0.25)',
                color: '#168BFF',
                fontSize: '0.8125rem',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              <Shield size={14} />
              <span>Verified VS Code Extension</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
                color: '#F4F7FB',
              }}
            >
              Visualize Your Code <span className="gradient-text-blue-purple">Today.</span>
            </h2>

            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '36px',
              }}
            >
              Download SimIDE and start exploring C++ data structures inside VS Code.
            </p>

            {/* Buttons */}
            <div
              className="hero-cta-group"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                marginBottom: '36px',
              }}
            >
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

            {/* Quick Install Command Box */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(8, 13, 20, 0.85)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
              }}
            >
              <Terminal size={14} color="#168BFF" />
              <span>{installCmd}</span>
              <button
                onClick={handleCopy}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copied ? '#3CCB83' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px',
                  fontFamily: 'inherit',
                  fontSize: '0.75rem',
                  transition: 'color 0.2s ease',
                }}
                title="Copy Quick Open Command"
                aria-label="Copy Quick Open Command"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
