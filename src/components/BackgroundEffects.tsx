import React from 'react';
import { SonarGrid } from '@/components/ui/sonar-grid';

export const BackgroundEffects: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: 'var(--bg-main)',
      }}
      aria-hidden="true"
    >
      {/* ── Native GPU Radial Ambient Lighting (Zero re-rasterization cost) ── */}

      {/* Left Flank Upper — Electric Blue Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-8%',
          left: '-8%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(7, 155, 255, 0.15) 0%, rgba(0, 122, 204, 0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Right Flank Upper — Violet & Purple Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '-8%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(128, 87, 232, 0.14) 0%, rgba(185, 154, 255, 0.04) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Left Flank Lower — Deep Cyan/Electric Blue Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 139, 255, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Technical Grid overlay */}
      <div
        className="tech-grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 85%)',
          pointerEvents: 'none',
        }}
      />

      {/* High-Performance Universal Sonar Acoustic Wave Grid */}
      <SonarGrid
        id="global-sonar-field"
        spacing={36}
        dotRadius={1.1}
        baseOpacity={0.18}
        color="#168BFF"
        ringWidth={90}
        speed={240}
        amplitude={2.0}
        pingEvery={4}
        interactive={true}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
