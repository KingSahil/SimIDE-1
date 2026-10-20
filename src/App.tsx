import { useState } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';

import { Hero } from './components/Hero';
import { VsCodePreview } from './components/VsCodePreview';
import { FeatureCards } from './components/FeatureCards';
import { DataStructuresSection } from './components/DataStructuresSection';
import { HowItWorks } from './components/HowItWorks';
import { LearningBenefits } from './components/LearningBenefits';
import { DownloadCTA } from './components/DownloadCTA';
import { Footer } from './components/Footer';
import { DocumentationModal, ChangelogModal, ContactModal } from './components/InfoModals';

export function App() {
  const [docsOpen, setDocsOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-main)', overflowX: 'hidden' }}>
      {/* Ambient background animations & technical network */}
      <BackgroundEffects />

      {/* Navigation Bar */}
      

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Realistic Interactive VS Code Simulation Preview */}
        <VsCodePreview />

        {/* 4 Compact Feature Cards */}
        <FeatureCards />

        {/* 8-Tab Interactive Data Structures Section */}
        <DataStructuresSection />

        {/* 3-Step "How It Works" Section */}
        <HowItWorks />

        {/* CS Learning Benefits */}
        <LearningBenefits />

        {/* Final Download CTA Panel */}
        <DownloadCTA />
      </main>

      {/* Footer */}
      <Footer
        onOpenDocs={() => setDocsOpen(true)}
        onOpenChangelog={() => setChangelogOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Functional Modals for Docs, Changelog, Contact */}
      <DocumentationModal isOpen={docsOpen} onClose={() => setDocsOpen(false)} />
      <ChangelogModal isOpen={changelogOpen} onClose={() => setChangelogOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default App;
