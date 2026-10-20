import { Eye, GitCommit, GraduationCap, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { LearningFloatingDSA } from './FloatingDSA';

const BENEFITS = [
  {
    icon: Eye,
    title: 'Visual Debugging',
    tagline: 'See pointer dereferences and memory updates.',
    description: 'Understand how data structures and pointers change during execution.',
    bulletPoints: [
      'Eliminate silent segmentation faults and wild pointer bugs',
      'Visually confirm nullptr termination before running loops',
      'Direct correlation between line execution and heap mutation',
    ],
    accent: '#168BFF',
  },
  {
    icon: GitCommit,
    title: 'Step-by-Step Learning',
    tagline: 'Connect theoretical code with real data structures.',
    description: 'Connect the code you write with the structures it creates.',
    bulletPoints: [
      'Step forwards and backwards through your pointer operations',
      'Watch nodes connect, unlink, and swap dynamically',
      'Replace pencil-and-paper tracing with live interactive diagrams',
    ],
    accent: '#8057E8',
  },
  {
    icon: GraduationCap,
    title: 'Built for Learners',
    tagline: 'Crafted specifically for CS students and educators.',
    description: 'Make complex C++ and DSA concepts easier to explore.',
    bulletPoints: [
      'Friendly diagnostic hints when memory leaks occur',
      'Uncluttered interface with clear visual hierarchy',
      '100% Free & Open Source for universities and students',
    ],
    accent: '#3CCB83',
  },
];

export const LearningBenefits: React.FC = () => {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'visible' }}>
      <LearningFloatingDSA />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>Pedagogical Value</span>
          </div>
          <h2 className="section-title">
            Understand, <span className="gradient-text-blue-purple">Don't Just Write.</span>
          </h2>
          <p className="section-desc">
            Go beyond code and see what's happening, step by step.
          </p>
        </div>

        {/* 3 Large Benefit Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px',
          }}
        >
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '36px 30px',
                  backgroundColor: '#101A28',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div>
                  {/* Icon & Accent */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(22, 139, 255, 0.08)',
                      border: '1px solid rgba(22, 139, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: b.accent,
                      marginBottom: '24px',
                    }}
                  >
                    <Icon size={26} />
                  </div>

                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      marginBottom: '8px',
                      color: '#F4F7FB',
                    }}
                  >
                    {b.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#168BFF',
                      fontWeight: 600,
                      marginBottom: '14px',
                    }}
                  >
                    {b.description}
                  </p>

                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      marginBottom: '24px',
                    }}
                  >
                    {b.tagline}
                  </p>

                  {/* Bullet Points */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {b.bulletPoints.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle2 size={16} color={b.accent} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '28px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Proven CS Methodology</span>
                  <ArrowUpRight size={16} color={b.accent} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
