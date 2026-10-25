import { useState, useRef } from 'react';
import { Activity, Layers, Sparkles, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { FeaturesFloatingDSA } from './FloatingDSA';

interface FeatureCardProps {
  icon: typeof Activity;
  title: string;
  tag: string;
  accent: string;
  visualType: 'runtime' | 'dsa' | 'pointer' | 'vscode';
}

const FEATURES: FeatureCardProps[] = [
  {
    icon: Activity,
    title: 'Real-Time Runtime Sync',
    tag: 'GDB / LLDB Engine',
    accent: '#168BFF',
    visualType: 'runtime',
  },
  {
    icon: Layers,
    title: 'Interactive Data Structures',
    tag: 'Heap & Stack Graph',
    accent: '#8057E8',
    visualType: 'dsa',
  },
  {
    icon: Sparkles,
    title: 'Pointer Safety & Diagnostics',
    tag: 'Zero Segfault Mode',
    accent: '#3CCB83',
    visualType: 'pointer',
  },
  {
    icon: Terminal,
    title: 'Native to VS Code',
    tag: 'Zero Context Switching',
    accent: '#007ACC',
    visualType: 'vscode',
  },
];

// Spotlight card with cursor-following radial gradient
const SpotlightFeatureCard: React.FC<{ feature: FeatureCardProps }> = ({ feature }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeDsaTab, setActiveDsaTab] = useState<'list' | 'tree' | 'stack'>('list');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = feature.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="spotlight-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        minHeight: '340px',
        backgroundColor: '#101A28',
        borderRadius: '14px',
        position: 'relative',
      }}
    >
      {/* 21st.dev Radial Spotlight Gradient */}
      <div
        className="border-beam"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, ${feature.accent}33, transparent 75%)`,
        }}
      />

      {/* Top Header: Icon & Category Tag */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'rgba(22, 139, 255, 0.08)',
              border: `1px solid ${feature.accent}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: feature.accent,
            }}
          >
            <Icon size={22} />
          </div>

          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: feature.accent,
              backgroundColor: `${feature.accent}15`,
              border: `1px solid ${feature.accent}35`,
              padding: '3px 10px',
              borderRadius: '100px',
            }}
          >
            {feature.tag}
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '14px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {feature.title}
        </h3>
      </div>

      {/* Rich Embedded Micro-Visualizer Diagram */}
      <div
        style={{
          backgroundColor: '#0A101A',
          border: '1px solid #26364A',
          borderRadius: '10px',
          padding: '16px',
          margin: '10px 0',
          position: 'relative',
          zIndex: 2,
          minHeight: '135px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Visualizer 1: Real Runtime Execution Pulse */}
        {feature.visualType === 'runtime' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: '#3CCB83', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3CCB83' }} />
                GDB Synchronized
              </span>
              <span style={{ color: '#168BFF' }}>Instruction: 0x7FA0</span>
            </div>

            {/* Execution Signal Waveform (SVG) */}
            <div style={{ height: '36px', width: '100%', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="36" viewBox="0 0 240 36" fill="none">
                <path
                  d="M0,18 L40,18 L55,4 L70,32 L85,10 L95,24 L105,18 L160,18 L175,6 L190,30 L200,18 L240,18"
                  stroke="#168BFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="pointer-laser-line"
                />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span>Breakpoint: Line 12</span>
              <span>Clock: 120Hz</span>
            </div>
          </div>
        )}

        {/* Visualizer 2: Multi-DSA Interactive Mini Node Preview */}
        {feature.visualType === 'dsa' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Interactive mini tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
              {(['list', 'tree', 'stack'] as const).map((t) => (
                <button
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDsaTab(t);
                  }}
                  style={{
                    flex: 1,
                    padding: '2px 0',
                    fontSize: '0.625rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: activeDsaTab === t ? 'rgba(128, 87, 232, 0.25)' : '#101A28',
                    color: activeDsaTab === t ? '#A78BFA' : 'var(--text-muted)',
                    border: activeDsaTab === t ? '1px solid #8057E8' : '1px solid #26364A',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Mini diagram */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px' }}>
              {activeDsaTab === 'list' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ padding: '4px 8px', backgroundColor: '#152235', border: '1px solid #8057E8', borderRadius: '4px', fontSize: '0.6875rem', color: '#F4F7FB', fontFamily: 'var(--font-mono)' }}>
                    [10 | •]
                  </div>
                  <span style={{ color: '#8057E8', fontSize: '12px' }}>→</span>
                  <div style={{ padding: '4px 8px', backgroundColor: '#152235', border: '1px solid #8057E8', borderRadius: '4px', fontSize: '0.6875rem', color: '#F4F7FB', fontFamily: 'var(--font-mono)' }}>
                    [20 | ∅]
                  </div>
                </div>
              )}

              {activeDsaTab === 'tree' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <div style={{ padding: '2px 8px', backgroundColor: '#152235', border: '1px solid #8057E8', borderRadius: '4px', fontSize: '0.6875rem', color: '#A78BFA', fontFamily: 'var(--font-mono)' }}>
                    root (50)
                  </div>
                  <span style={{ fontSize: '10px', color: '#8057E8' }}>↙ ↘</span>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    <span>(25)</span>
                    <span>(75)</span>
                  </div>
                </div>
              )}

              {activeDsaTab === 'stack' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '90px' }}>
                  <div style={{ padding: '2px', backgroundColor: 'rgba(128, 87, 232, 0.3)', border: '1px solid #8057E8', borderRadius: '3px', textAlign: 'center', fontSize: '0.625rem', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                    TOP: 42
                  </div>
                  <div style={{ padding: '2px', backgroundColor: '#152235', border: '1px solid #26364A', borderRadius: '3px', textAlign: 'center', fontSize: '0.625rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    28
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Visualizer 3: Pointer Safety & Diagnostics */}
        {feature.visualType === 'pointer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3CCB83', fontSize: '0.75rem', fontWeight: 700 }}>
                <ShieldCheck size={14} />
                <span>Zero Segfault Guard</span>
              </div>
              <span style={{ fontSize: '0.625rem', color: '#3CCB83', backgroundColor: 'rgba(60, 203, 131, 0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                Safe Dereference
              </span>
            </div>

            {/* Visual Pointer verification */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '6px 0' }}>
              <div style={{ padding: '4px 8px', backgroundColor: '#152235', border: '1px solid #3CCB83', borderRadius: '4px', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#3CCB83' }}>
                head != nullptr
              </div>
              <span style={{ color: '#3CCB83', fontSize: '14px', fontWeight: 700 }}>✓</span>
              <div style={{ padding: '4px 8px', backgroundColor: '#101A28', border: '1px solid #26364A', borderRadius: '4px', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#F4F7FB' }}>
                0x7FA0 Valid
              </div>
            </div>

            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Memory leaks: 0 detected • Heap bound confirmed
            </div>
          </div>
        )}

        {/* Visualizer 4: Native to VS Code UI */}
        {feature.visualType === 'vscode' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {/* Mini VS Code tab header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #26364A', paddingBottom: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#007ACC' }} />
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#F4F7FB', fontWeight: 600 }}>
                main.cpp — Debugging
              </span>
            </div>

            {/* Mini editor content */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.4, padding: '2px 0' }}>
              <div><span style={{ color: '#569CD6' }}>Node</span>* head = <span style={{ color: '#569CD6' }}>new</span> Node;</div>
              <div style={{ color: '#3CCB83' }}>// Live SimIDE view active</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.625rem', color: '#007ACC', backgroundColor: 'rgba(0, 122, 204, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
              <span>F5 Debugger Connected</span>
              <span>Zero Sandboxes</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div
        style={{
          height: '2px',
          width: '40px',
          backgroundColor: feature.accent,
          borderRadius: '2px',
          marginTop: '12px',
          position: 'relative',
          zIndex: 2,
        }}
      />
    </div>
  );
};

export const FeatureCards: React.FC = () => {
  return (
    <section id="features" className="section" style={{ position: 'relative', overflow: 'visible' }}>
      <FeaturesFloatingDSA />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={14} color="#168BFF" />
            <span>Visual First</span>
          </div>
          <h2 className="section-title">
            See Everything. <span className="gradient-text-blue-purple">Read Less.</span>
          </h2>
          <p className="section-desc">
            No endless paragraphs. SimIDE translates raw memory pointers and data operations into intuitive visual mental models.
          </p>
        </div>

        {/* 4 Cards Grid with Spotlight */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px',
          }}
        >
          {FEATURES.map((feat) => (
            <SpotlightFeatureCard key={feat.title} feature={feat} />
          ))}
        </div>
      </div>
    </section>
  );
};
