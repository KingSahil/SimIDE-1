import { Activity, Layers, Sparkles, Terminal } from 'lucide-react';
import { FeaturesFloatingDSA } from './FloatingDSA';

const FEATURES = [
  {
    icon: Activity,
    title: 'Real Execution',
    description: 'Visualize your C++ program while stepping through actual execution.',
    tag: 'Runtime Sync',
    accent: '#168BFF',
  },
  {
    icon: Layers,
    title: 'Multiple Data Structures',
    description: 'Explore arrays, linked lists, stacks, queues, trees and graphs.',
    tag: 'DSA Suite',
    accent: '#8057E8',
  },
  {
    icon: Sparkles,
    title: 'Learn by Doing',
    description: 'Follow your code step by step and understand how data changes.',
    tag: 'Interactive',
    accent: '#3CCB83',
  },
  {
    icon: Terminal,
    title: 'Native to VS Code',
    description: 'Learn inside the development environment you already use.',
    tag: 'Zero Context Switching',
    accent: '#007ACC',
  },
];

export const FeatureCards: React.FC = () => {
  return (
    <section id="features" className="section" style={{ position: 'relative', overflow: 'visible' }}>
      <FeaturesFloatingDSA />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>Features</span>
          </div>
          <h2 className="section-title">
            Engineered for <span className="gradient-text-blue-purple">Computer Science Students</span>
          </h2>
          <p className="section-desc">
            Stop drawing memory diagrams by hand. Let SimIDE bridge the gap between abstract pointers and concrete mental models.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="card feature-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(22, 139, 255, 0.08)',
                        border: '1px solid rgba(22, 139, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: feat.accent,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        padding: '3px 8px',
                        borderRadius: '100px',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {feat.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '10px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {feat.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {feat.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div
                  style={{
                    height: '2px',
                    width: '32px',
                    backgroundColor: feat.accent,
                    borderRadius: '2px',
                    marginTop: '24px',
                    opacity: 0.8,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
