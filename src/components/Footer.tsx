import { SimIdeLogo } from './Icons';
import { DOWNLOAD_URL, GITHUB_URL, ISSUES_URL, DISCUSSIONS_URL } from '../config';


interface FooterProps {
  onOpenDocs: () => void;
  onOpenChangelog: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenChangelog, onOpenContact }) => {
  return (
    <footer
      style={{
        backgroundColor: 'transparent',
        borderTop: '1px solid #26364A',
        paddingTop: '64px',
        paddingBottom: '40px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <SimIdeLogo size={28} />
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
            </div>

            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                maxWidth: '320px',
                marginBottom: '16px',
              }}
            >
              Simulation + IDE for better understanding.
            </p>

            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                lineHeight: '1.5',
                maxWidth: '320px',
              }}
            >
              Native VS Code visual debugger for C++ data structures and algorithms. Free and open source for students and educators worldwide.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#F4F7FB',
                marginBottom: '18px',
              }}
            >
              Product
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#features" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Features
                </a>
              </li>
              <li>
                <a href="#algorithms" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Algorithms
                </a>
              </li>
              <li>
                <a href="#how-it-works" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  How It Works
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenChangelog}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  Changelog (v0.4.2)
                </button>
              </li>
              <li>
                <a
                  href={DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: '#168BFF', fontWeight: 600 }}
                >
                  VS Code Marketplace →
                </a>
              </li>
            </ul>
          </div>

          {/* Developers Column */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#F4F7FB',
                marginBottom: '18px',
              }}
            >
              Developers
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={onOpenDocs}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  Documentation
                </button>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={ISSUES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#F4F7FB',
                marginBottom: '18px',
              }}
            >
              Community
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href={DISCUSSIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                >
                  Discussions
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  Contact Maintainers
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div
          style={{
            paddingTop: '28px',
            borderTop: '1px solid #1E2D3E',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}
        >
          © {new Date().getFullYear()} SimIDE Project · MIT License
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
