import { Eye, GitCommit, GraduationCap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LearningFloatingDSA } from './FloatingDSA';

export const LearningBenefits: React.FC = () => {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'visible' }}>
      <LearningFloatingDSA />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <GraduationCap size={14} color="#168BFF" />
            <span>Pedagogical Value</span>
          </div>
          <h2 className="section-title">
            Understand, <span className="gradient-text-blue-purple">Don't Just Guess.</span>
          </h2>
          <p className="section-desc">
            Replace tedious terminal crashes and hand-drawn whiteboard scribbles with instant visual clarity.
          </p>
        </div>

        {/* 3 Large Visual Benefit Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px',
          }}
        >
          {/* Benefit 1: Visual Pointer Guard */}
          <div
            className="spotlight-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px',
              backgroundColor: '#101A28',
              borderRadius: '14px',
            }}
          >
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(22, 139, 255, 0.1)',
                  border: '1px solid rgba(22, 139, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#168BFF',
                  marginBottom: '20px',
                }}
              >
                <Eye size={24} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F4F7FB', marginBottom: '8px' }}>
                Visual Pointer Debugging
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Eliminate mysterious segmentation faults before they crash your runtime.
              </p>
            </div>

            {/* Embedded Visual: Segfault vs SimIDE Guard */}
            <div
              style={{
                backgroundColor: '#0A101A',
                border: '1px solid #26364A',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                margin: '12px 0',
              }}
            >
              {/* Terminal Segfault (Old Way) */}
              <div
                style={{
                  padding: '6px 10px',
                  backgroundColor: 'rgba(237, 106, 94, 0.1)',
                  border: '1px solid rgba(237, 106, 94, 0.3)',
                  borderRadius: '6px',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#ED6A5E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>Terminal: Segmentation fault (core dumped)</span>
                <span>✗ 0x0</span>
              </div>

              {/* SimIDE Visual Guard (New Way) */}
              <div
                style={{
                  padding: '6px 10px',
                  backgroundColor: 'rgba(60, 203, 131, 0.12)',
                  border: '1px solid rgba(60, 203, 131, 0.35)',
                  borderRadius: '6px',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#3CCB83',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>SimIDE: head points to Node(10) @ 0x7FA0</span>
                <span>✓ Safe</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#168BFF', fontSize: '0.8125rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Direct line-to-memory inspection</span>
            </div>
          </div>

          {/* Benefit 2: Step-by-Step Operations */}
          <div
            className="spotlight-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px',
              backgroundColor: '#101A28',
              borderRadius: '14px',
            }}
          >
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(128, 87, 232, 0.1)',
                  border: '1px solid rgba(128, 87, 232, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8057E8',
                  marginBottom: '20px',
                }}
              >
                <GitCommit size={24} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F4F7FB', marginBottom: '8px' }}>
                Step-by-Step Learning
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Connect theoretical algorithms directly to physical heap memory structures.
              </p>
            </div>

            {/* Embedded Visual: Live Step Rail */}
            <div
              style={{
                backgroundColor: '#0A101A',
                border: '1px solid #26364A',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                margin: '12px 0',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <span>Step Forward [F10]</span>
                <span style={{ color: '#8057E8' }}>Step Back [F11]</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '6px 0' }}>
                <span style={{ padding: '3px 8px', backgroundColor: '#152235', border: '1px solid #26364A', borderRadius: '4px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  1. Stack
                </span>
                <span style={{ color: '#8057E8' }}>→</span>
                <span style={{ padding: '3px 8px', backgroundColor: 'rgba(128, 87, 232, 0.2)', border: '1px solid #8057E8', borderRadius: '4px', fontSize: '0.6875rem', color: '#A78BFA', fontWeight: 700 }}>
                  2. Allocate
                </span>
                <span style={{ color: '#8057E8' }}>→</span>
                <span style={{ padding: '3px 8px', backgroundColor: '#152235', border: '1px solid #26364A', borderRadius: '4px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  3. Link
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8057E8', fontSize: '0.8125rem', fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              <span>Full execution scrub history</span>
            </div>
          </div>

          {/* Benefit 3: University Grade Leak Prevention */}
          <div
            className="spotlight-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px',
              backgroundColor: '#101A28',
              borderRadius: '14px',
            }}
          >
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(60, 203, 131, 0.1)',
                  border: '1px solid rgba(60, 203, 131, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3CCB83',
                  marginBottom: '20px',
                }}
              >
                <GraduationCap size={24} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F4F7FB', marginBottom: '8px' }}>
                Built for CS Students &amp; Educators
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Clear visual feedback when memory leaks or orphaned heap nodes happen.
              </p>
            </div>

            {/* Embedded Visual: Heap Telemetry Score */}
            <div
              style={{
                backgroundColor: '#0A101A',
                border: '1px solid #26364A',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                margin: '12px 0',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Heap Memory:</span>
                <span style={{ color: '#F4F7FB' }}>72 Bytes allocated</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Memory Leaks:</span>
                <span style={{ color: '#3CCB83', fontWeight: 700 }}>0 Bytes (Clean)</span>
              </div>

              <div style={{ width: '100%', height: '4px', backgroundColor: '#26364A', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#3CCB83' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3CCB83', fontSize: '0.8125rem', fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              <span>100% Free &amp; Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
