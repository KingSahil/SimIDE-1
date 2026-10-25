import { Code2, PlayCircle, Eye, Zap, CheckCircle2 } from 'lucide-react';
import { WorkflowFloatingDSA } from './FloatingDSA';

const STEPS = [
  {
    number: '01',
    title: 'Write Your C++ Code',
    badge: 'Standard C++20',
    visual: 'code',
  },
  {
    number: '02',
    title: 'Start Visual Debugger',
    badge: 'One Click / F5',
    visual: 'launch',
  },
  {
    number: '03',
    title: 'Step & Watch Memory Evolve',
    badge: 'F10 / Scroll Sync',
    visual: 'step',
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
            <Zap size={14} color="#168BFF" />
            <span>3-Step Visual Workflow</span>
          </div>
          <h2 className="section-title">
            Simple, Seamless, <span className="gradient-text-blue-purple">Native to VS Code.</span>
          </h2>
          <p className="section-desc">
            No external web sandboxes or copy-pasting. Write standard C++ and observe your data structures mutate in real time.
          </p>
        </div>

        {/* 3 Step Pipeline with Embedded Visual Diagrams */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
            position: 'relative',
          }}
          className="steps-grid"
        >
          {STEPS.map((step) => {
            return (
              <div
                key={step.number}
                className="spotlight-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '28px',
                  position: 'relative',
                  backgroundColor: '#101A28',
                  borderRadius: '14px',
                  minHeight: '340px',
                }}
              >
                <div>
                  {/* Step Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '18px',
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

                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: '#3CCB83',
                        backgroundColor: 'rgba(60, 203, 131, 0.12)',
                        border: '1px solid rgba(60, 203, 131, 0.3)',
                        padding: '3px 10px',
                        borderRadius: '100px',
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '16px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Embedded Visualizer Widget */}
                <div
                  style={{
                    backgroundColor: '#0A101A',
                    border: '1px solid #26364A',
                    borderRadius: '10px',
                    padding: '16px',
                    minHeight: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {/* Visual 1: Mini C++ Code Editor */}
                  {step.visual === 'code' && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: '1.6' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', marginBottom: '4px', fontSize: '0.6875rem' }}>
                        <Code2 size={12} color="#168BFF" />
                        <span>solution.cpp (C++20)</span>
                      </div>
                      <div>
                        <span style={{ color: '#569CD6' }}>struct</span> <span style={{ color: '#4EC9B0' }}>Node</span> {'{'}
                      </div>
                      <div style={{ paddingLeft: '12px' }}>
                        <span style={{ color: '#4EC9B0' }}>int</span> data;
                      </div>
                      <div style={{ paddingLeft: '12px' }}>
                        <span style={{ color: '#4EC9B0' }}>Node</span>* next;
                      </div>
                      <div>{'};'}</div>
                    </div>
                  )}

                  {/* Visual 2: One-Click Launch Indicator */}
                  {step.visual === 'launch' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(22, 139, 255, 0.15)',
                          border: '1px solid #168BFF',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          boxShadow: '0 0 20px rgba(22, 139, 255, 0.3)',
                        }}
                      >
                        <PlayCircle size={18} color="#168BFF" />
                        <span>F5 / Launch SimIDE</span>
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#3CCB83', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} />
                        <span>GDB Debug Adapter Attached</span>
                      </div>
                    </div>
                  )}

                  {/* Visual 3: Step & Watch Memory Evolve */}
                  {step.visual === 'step' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        <span style={{ color: '#168BFF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={12} /> Live Step Trace
                        </span>
                        <span>[Step 3: Line 13]</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <div style={{ padding: '4px 8px', backgroundColor: '#152235', border: '1px solid #168BFF', borderRadius: '4px', fontSize: '0.6875rem', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                          head (0x7FA0)
                        </div>
                        <span style={{ color: '#168BFF', fontSize: '14px' }}>→</span>
                        <div style={{ padding: '4px 8px', backgroundColor: '#101A28', border: '1px solid #3CCB83', borderRadius: '4px', fontSize: '0.6875rem', color: '#3CCB83', fontFamily: 'var(--font-mono)' }}>
                          Node(10)
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Progress Connector */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '16px',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#168BFF' }} />
                  <span>Automated synchronization</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
