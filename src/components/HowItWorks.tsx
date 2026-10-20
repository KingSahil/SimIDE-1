import { Code2, PlayCircle, Eye } from 'lucide-react';
import { WorkflowFloatingDSA } from './FloatingDSA';

const STEPS = [
  {
    number: '01',
    title: 'Write Your Code',
    description: 'Write your C++ program in VS Code.',
    detail: 'Use standard C++ constructs — structs, pointers, vectors, or trees. No custom libraries or special headers required.',
    icon: Code2,
    badge: 'Standard C++20',
  },
  {
    number: '02',
    title: 'Start Visualization',
    description: 'Launch SimIDE to begin exploring your program.',
    detail: 'Click the SimIDE Debug Mentor icon in the Activity Bar or press F5 to initiate synchronized execution tracking.',
    icon: PlayCircle,
    badge: 'One Click Launch',
  },
  {
    number: '03',
    title: 'Step Through Execution',
    description: 'Follow the execution and see how your data structures change.',
    detail: 'Advance step-by-step with F10/F11. Inspect heap allocations, pointer linkings, and stack frames in real time.',
    icon: Eye,
    badge: 'Live Memory Sync',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section" style={{ position: 'relative', overflow: 'visible' }}>
      <WorkflowFloatingDSA />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>Workflow</span>
          </div>
          <h2 className="section-title">
            Simple, Seamless, <span className="gradient-text-blue-purple">Native to VS Code.</span>
          </h2>
          <p className="section-desc">
            No external websites, no copy-pasting code into sandboxes. Zero context switching from your daily editor.
          </p>
        </div>

        {/* 3 Step Pipeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '32px',
            position: 'relative',
          }}
          className="steps-grid"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '32px',
                  position: 'relative',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#101A28',
                }}
              >
                <div>
                  {/* Step Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#168BFF',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {step.number}
                    </span>

                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(22, 139, 255, 0.08)',
                        border: '1px solid rgba(22, 139, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#168BFF',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Title & Short Exact Description */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '10px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#F4F7FB',
                      fontWeight: 500,
                      marginBottom: '12px',
                      lineHeight: '1.5',
                    }}
                  >
                    "{step.description}"
                  </p>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {step.detail}
                  </p>
                </div>

                {/* Step pill tag */}
                <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: '#3CCB83',
                      backgroundColor: 'rgba(60, 203, 131, 0.12)',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      border: '1px solid rgba(60, 203, 131, 0.25)',
                    }}
                  >
                    {step.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
