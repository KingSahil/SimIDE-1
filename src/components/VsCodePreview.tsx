import { useState, useRef, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimIdeLogo } from './Icons';
import { VsCodeFloatingDSA } from './FloatingDSA';
import {
  Pause,
  Files,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Settings,
  Circle,
  Cpu,
  Info,
  Maximize2,
  Sparkles,
  Layers,
  Radio,
  HardDrive
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StepState {
  step: number;
  line: number; // 1-indexed line number in C++ code
  description: string;
  codeSnippet: string;
  callStack: string;
  cameraTarget: {
    focusName: string;
    focusType: 'stack' | 'heap-node' | 'pointer-wire' | 'full-chain';
    accentColor: string;
  };
  pointers: {
    head: string;
    first: string;
    second: string;
    third: string;
  };
  nodes: Array<{
    id: string;
    value: number;
    address: string;
    next: string | null;
  }>;
  telemetry: {
    heapBytes: number;
    activePointers: number;
    cycles: number;
  };
}

const SIMULATION_STEPS: StepState[] = [
  {
    step: 1,
    line: 10,
    description: "head pointer initialized to nullptr on the stack frame. No heap memory has been allocated yet.",
    codeSnippet: "Node* head = nullptr;",
    callStack: "main() : line 10",
    cameraTarget: {
      focusName: "Stack Frame [head = nullptr]",
      focusType: "stack",
      accentColor: "#168BFF",
    },
    pointers: { head: "nullptr (0x0)", first: "uninitialized", second: "uninitialized", third: "uninitialized" },
    nodes: [],
    telemetry: { heapBytes: 0, activePointers: 1, cycles: 12 },
  },
  {
    step: 2,
    line: 12,
    description: "Allocated new Node on heap at 0x7FA0 with data = 10, next = nullptr. Pointer 'first' references it.",
    codeSnippet: "Node* first = new Node{10, nullptr};",
    callStack: "main() : line 12",
    cameraTarget: {
      focusName: "Heap Allocation [Node 10 @ 0x7FA0]",
      focusType: "heap-node",
      accentColor: "#3CCB83",
    },
    pointers: { head: "nullptr (0x0)", first: "0x7FA0", second: "uninitialized", third: "uninitialized" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: null },
    ],
    telemetry: { heapBytes: 24, activePointers: 2, cycles: 48 },
  },
  {
    step: 3,
    line: 13,
    description: "Assigned head = first. Both 'head' and 'first' now point directly to Node(10) in heap memory.",
    codeSnippet: "head = first;",
    callStack: "main() : line 13",
    cameraTarget: {
      focusName: "Pointer Linkage [head ➔ Node 10]",
      focusType: "pointer-wire",
      accentColor: "#168BFF",
    },
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "uninitialized", third: "uninitialized" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: null },
    ],
    telemetry: { heapBytes: 24, activePointers: 2, cycles: 56 },
  },
  {
    step: 4,
    line: 15,
    description: "Allocated second Node on heap at 0x7FB8 with data = 20, next = nullptr. 'second' references it.",
    codeSnippet: "Node* second = new Node{20, nullptr};",
    callStack: "main() : line 15",
    cameraTarget: {
      focusName: "Heap Allocation [Node 20 @ 0x7FB8]",
      focusType: "heap-node",
      accentColor: "#A78BFA",
    },
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "0x7FB8", third: "uninitialized" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: null },
      { id: "second", value: 20, address: "0x7FB8", next: null },
    ],
    telemetry: { heapBytes: 48, activePointers: 3, cycles: 92 },
  },
  {
    step: 5,
    line: 16,
    description: "Linked first->next = second. Node(10) now connects dynamically to Node(20).",
    codeSnippet: "first->next = second;",
    callStack: "main() : line 16",
    cameraTarget: {
      focusName: "Pointer Vector [10 ➔ 20]",
      focusType: "pointer-wire",
      accentColor: "#168BFF",
    },
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "0x7FB8", third: "uninitialized" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: "0x7FB8" },
      { id: "second", value: 20, address: "0x7FB8", next: null },
    ],
    telemetry: { heapBytes: 48, activePointers: 3, cycles: 104 },
  },
  {
    step: 6,
    line: 18,
    description: "Allocated third Node on heap at 0x7FD0 with data = 30, next = nullptr. 'third' references it.",
    codeSnippet: "Node* third = new Node{30, nullptr};",
    callStack: "main() : line 18",
    cameraTarget: {
      focusName: "Heap Allocation [Node 30 @ 0x7FD0]",
      focusType: "heap-node",
      accentColor: "#3CCB83",
    },
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "0x7FB8", third: "0x7FD0" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: "0x7FB8" },
      { id: "second", value: 20, address: "0x7FB8", next: null },
      { id: "third", value: 30, address: "0x7FD0", next: null },
    ],
    telemetry: { heapBytes: 72, activePointers: 4, cycles: 140 },
  },
  {
    step: 7,
    line: 19,
    description: "Linked second->next = third. Completed singly linked list: 10 → 20 → 30 → nullptr.",
    codeSnippet: "second->next = third;",
    callStack: "main() : line 19",
    cameraTarget: {
      focusName: "Full Panorama [10 ➔ 20 ➔ 30 ➔ ∅]",
      focusType: "full-chain",
      accentColor: "#F4BF4F",
    },
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "0x7FB8", third: "0x7FD0" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: "0x7FB8" },
      { id: "second", value: 20, address: "0x7FB8", next: "0x7FD0" },
      { id: "third", value: 30, address: "0x7FD0", next: null },
    ],
    telemetry: { heapBytes: 72, activePointers: 4, cycles: 158 },
  },
];

const CODE_LINES = [
  { line: 1, text: "#include <iostream>", tokens: [{ t: "directive", v: "#include <iostream>" }] },
  { line: 2, text: "using namespace std;", tokens: [{ t: "kw", v: "using" }, { t: "plain", v: " " }, { t: "kw", v: "namespace" }, { t: "plain", v: " " }, { t: "id", v: "std" }, { t: "plain", v: ";" }] },
  { line: 3, text: "", tokens: [] },
  { line: 4, text: "struct Node {", tokens: [{ t: "kw", v: "struct" }, { t: "plain", v: " " }, { t: "type", v: "Node" }, { t: "plain", v: " {" }] },
  { line: 5, text: "    int data;", tokens: [{ t: "plain", v: "    " }, { t: "type", v: "int" }, { t: "plain", v: " data;" }] },
  { line: 6, text: "    Node* next;", tokens: [{ t: "plain", v: "    " }, { t: "type", v: "Node" }, { t: "plain", v: "* next;" }] },
  { line: 7, text: "};", tokens: [{ t: "plain", v: "};" }] },
  { line: 8, text: "", tokens: [] },
  { line: 9, text: "int main() {", tokens: [{ t: "type", v: "int" }, { t: "plain", v: " " }, { t: "fn", v: "main" }, { t: "plain", v: "() {" }] },
  { line: 10, text: "    Node* head = nullptr;", tokens: [{ t: "plain", v: "    " }, { t: "type", v: "Node" }, { t: "plain", v: "* " }, { t: "id", v: "head" }, { t: "plain", v: " = " }, { t: "kw", v: "nullptr" }, { t: "plain", v: ";" }] },
  { line: 11, text: "", tokens: [] },
  { line: 12, text: "    Node* first = new Node{10, nullptr};", tokens: [{ t: "plain", v: "    " }, { t: "type", v: "Node" }, { t: "plain", v: "* " }, { t: "id", v: "first" }, { t: "plain", v: " = " }, { t: "kw", v: "new" }, { t: "plain", v: " " }, { t: "type", v: "Node" }, { t: "plain", v: "{" }, { t: "num", v: "10" }, { t: "plain", v: ", " }, { t: "kw", v: "nullptr" }, { t: "plain", v: "};" }] },
  { line: 13, text: "    head = first;", tokens: [{ t: "plain", v: "    " }, { t: "id", v: "head" }, { t: "plain", v: " = " }, { t: "id", v: "first" }, { t: "plain", v: ";" }] },
  { line: 14, text: "", tokens: [] },
  { line: 15, text: "    Node* second = new Node{20, nullptr};", tokens: [{ t: "plain", v: "    " }, { t: "type", v: "Node" }, { t: "plain", v: "* " }, { t: "id", v: "second" }, { t: "plain", v: " = " }, { t: "kw", v: "new" }, { t: "plain", v: " " }, { t: "type", v: "Node" }, { t: "plain", v: "{" }, { t: "num", v: "20" }, { t: "plain", v: ", " }, { t: "kw", v: "nullptr" }, { t: "plain", v: "};" }] },
  { line: 16, text: "    first->next = second;", tokens: [{ t: "plain", v: "    " }, { t: "id", v: "first" }, { t: "op", v: "->" }, { t: "id", v: "next" }, { t: "plain", v: " = " }, { t: "id", v: "second" }, { t: "plain", v: ";" }] },
  { line: 17, text: "", tokens: [] },
  { line: 18, text: "    Node* third = new Node{30, nullptr};", tokens: [{ t: "plain", v: "    " }, { t: "type", v: "Node" }, { t: "plain", v: "* " }, { t: "id", v: "third" }, { t: "plain", v: " = " }, { t: "kw", v: "new" }, { t: "plain", v: " " }, { t: "type", v: "Node" }, { t: "plain", v: "{" }, { t: "num", v: "30" }, { t: "plain", v: ", " }, { t: "kw", v: "nullptr" }, { t: "plain", v: "};" }] },
  { line: 19, text: "    second->next = third;", tokens: [{ t: "plain", v: "    " }, { t: "id", v: "second" }, { t: "op", v: "->" }, { t: "id", v: "next" }, { t: "plain", v: " = " }, { t: "id", v: "third" }, { t: "plain", v: ";" }] },
  { line: 20, text: "", tokens: [] },
  { line: 21, text: "    return 0;", tokens: [{ t: "plain", v: "    " }, { t: "kw", v: "return" }, { t: "plain", v: " " }, { t: "num", v: "0" }, { t: "plain", v: ";" }] },
  { line: 22, text: "}", tokens: [{ t: "plain", v: "}" }] },
];

export const VsCodePreview: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const lastStepIndexRef = useRef(0);

  const currentStep = SIMULATION_STEPS[currentStepIndex];

  // GSAP ScrollTrigger for 3D Reveal and Execution Scrubbing (Optimized, Zero-Lag)
  useGSAP(
    () => {
      if (!containerRef.current || !stickyWrapperRef.current || !windowRef.current) return;

      // Master scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=260%',
          pin: stickyWrapperRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            const progress = self.progress;
            let targetIdx = 0;
            // 0 -> 0.12 is the entrance reveal
            // 0.12 -> 1.0 is the line-by-line execution scrubbing
            if (progress >= 0.12) {
              const stepProg = (progress - 0.12) / 0.88;
              targetIdx = Math.min(
                SIMULATION_STEPS.length - 1,
                Math.max(0, Math.floor(stepProg * SIMULATION_STEPS.length))
              );
            }

            // ONLY trigger React re-render when the actual execution step index changes!
            if (lastStepIndexRef.current !== targetIdx) {
              lastStepIndexRef.current = targetIdx;
              setCurrentStepIndex(targetIdx);
            }
          },
        },
      });

      // 3D Entrance: Tilts upward, moves from depth, scales smoothly to flat 0deg
      tl.fromTo(
        windowRef.current,
        {
          rotateX: 22,
          y: 110,
          scale: 0.9,
          transformPerspective: 1200,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.95)',
        },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          transformPerspective: 1200,
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(22, 139, 255, 0.28)',
          duration: 0.35,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef }
  );

  const renderToken = (token: { t: string; v: string }, i: number) => {
    let color = '#D4D4D4';
    if (token.t === 'kw') color = '#569CD6'; // Blue
    else if (token.t === 'type') color = '#4EC9B0'; // Teal
    else if (token.t === 'directive') color = '#C586C0'; // Purple
    else if (token.t === 'num') color = '#B5CEA8'; // Greenish
    else if (token.t === 'id') color = '#9CDCFE'; // Light Blue
    else if (token.t === 'fn') color = '#DCDCAA'; // Yellow
    else if (token.t === 'op') color = '#D4D4D4';

    return (
      <span key={i} style={{ color }}>
        {token.v}
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '260vh', // Pinned scroll track for smooth GSAP line scrubbing
        paddingTop: '30px',
      }}
    >
      {/* Floating draggable data structures in the margins */}
      <VsCodeFloatingDSA />

      {/* Sticky view holder that stays centered while scrubbing */}
      <div
        ref={stickyWrapperRef}
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 16px',
          boxSizing: 'border-box',
          position: 'sticky',
          top: '28px',
          zIndex: 10,
        }}
      >
        {/* Top Interactive Scrub Telemetry & Mode Controller */}
        <div
          className="vscode-scrub-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            backgroundColor: 'rgba(13, 21, 33, 0.85)',
            border: '1px solid #26364A',
            backdropFilter: 'blur(16px)',
            borderRadius: '10px',
            padding: '8px 16px',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Scroll Execution Mode Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(22, 139, 255, 0.15)',
                border: '1px solid #168BFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#168BFF',
                pointerEvents: 'none',
              }}
            >
              <Radio size={12} className="radar-ping" />
              <span>Scroll-Driven Debugging Active</span>
            </div>

            {/* Hint text */}
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }} className="hide-on-mobile">
              Scroll the page to execute C++ line-by-line
            </span>
          </div>

          {/* Passive Step Progress Rail (Non-clickable visual progress track) */}
          <div className="vscode-step-rail" style={{ display: 'flex', alignItems: 'center', gap: '6px', pointerEvents: 'none', userSelect: 'none', flexWrap: 'wrap' }}>
            {SIMULATION_STEPS.map((s, idx) => {
              const isActive = idx === currentStepIndex;
              const isPassed = idx < currentStepIndex;
              return (
                <div
                  key={s.step}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: isActive
                      ? '1px solid #168BFF'
                      : isPassed
                      ? '1px solid rgba(60, 203, 131, 0.4)'
                      : '1px solid #26364A',
                    backgroundColor: isActive
                      ? 'rgba(22, 139, 255, 0.25)'
                      : isPassed
                      ? 'rgba(60, 203, 131, 0.1)'
                      : '#101A28',
                    color: isActive ? '#FFFFFF' : isPassed ? '#3CCB83' : 'var(--text-muted)',
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontWeight: isActive ? 700 : 400 }}>Ln {s.line}</span>
                  {isActive && (
                    <motion.span
                      layoutId="stepDot"
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#168BFF',
                        display: 'inline-block',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3D Realistic VS Code Window Container */}
        <div
          ref={windowRef}
          style={{
            backgroundColor: '#0A101A',
            border: '1px solid #26364A',
            borderRadius: '14px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'border-color 0.3s ease',
            position: 'relative',
          }}
        >
          {/* Top Title Bar */}
          <div
            className="vscode-title-bar"
            style={{
              backgroundColor: '#080D14',
              borderBottom: '1px solid #26364A',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none',
              gap: '12px',
            }}
          >
            {/* Window control dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ED6A5E', display: 'inline-block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F4BF4F', display: 'inline-block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#61C554', display: 'inline-block' }} />
            </div>

            {/* Window Title & Active Debug File */}
            <div
              className="vscode-title-text"
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>SimIDE Debugger</span>
              <span>—</span>
              <span style={{ color: '#F4F7FB', fontWeight: 600 }}>linked-list.cpp [GDB Synchronized]</span>
            </div>

            {/* Visual Hardware Telemetry Pill */}
            <div className="vscode-title-telemetry" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(22, 139, 255, 0.12)',
                  border: '1px solid rgba(22, 139, 255, 0.3)',
                  padding: '2px 10px',
                  borderRadius: '6px',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#168BFF',
                }}
              >
                <Cpu size={12} />
                <span>{currentStep.telemetry.heapBytes} Bytes Heap</span>
              </div>
              <Maximize2 size={14} color="var(--text-muted)" className="hide-on-mobile" />
            </div>
          </div>

          {/* Main Body: Activity Bar + Left C++ Editor + Right Interactive Visualizer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              minHeight: '580px',
              backgroundColor: 'transparent',
            }}
            className="vscode-body"
          >
            {/* Leftmost Activity Bar */}
            <div
              style={{
                width: '48px',
                backgroundColor: '#080D14',
                borderRight: '1px solid #26364A',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '12px',
                paddingBottom: '12px',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
              className="vscode-activity-bar"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <Files size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                <Search size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                <GitBranch size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                <div style={{ position: 'relative' }}>
                  <Bug size={20} color="#168BFF" style={{ cursor: 'pointer' }} />
                  <span style={{ position: 'absolute', right: '-14px', top: '2px', width: '2px', height: '18px', backgroundColor: '#168BFF', borderRadius: '2px' }} />
                </div>
                <div
                  style={{
                    padding: '4px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(22, 139, 255, 0.15)',
                    border: '1px solid rgba(22, 139, 255, 0.4)',
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(22, 139, 255, 0.3)',
                  }}
                  title="SimIDE Visual Debugger"
                >
                  <SimIdeLogo size={20} />
                </div>
                <Blocks size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              </div>

              <Settings size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>

            {/* Code Editor Panel */}
            <div
              style={{
                flex: '1 1 48%',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid #26364A',
                backgroundColor: '#0A101A',
                minWidth: 0,
              }}
              className="vscode-code-panel"
            >
              {/* Tab Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#080D14',
                  borderBottom: '1px solid #26364A',
                  height: '38px',
                  paddingLeft: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#0A101A',
                    padding: '0 16px',
                    height: '100%',
                    borderTop: '2px solid #168BFF',
                    borderRight: '1px solid #26364A',
                    fontSize: '0.8125rem',
                    color: '#F4F7FB',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                  }}
                >
                  <span style={{ color: '#168BFF', fontWeight: 700 }}>C++</span>
                  <span>linked-list.cpp</span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#168BFF',
                      marginLeft: '4px',
                    }}
                  />
                </div>
              </div>

              {/* Code Lines with Smooth Morphing Highlight */}
              <div
                style={{
                  padding: '16px 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  lineHeight: '1.7',
                  overflowX: 'auto',
                  flex: 1,
                  position: 'relative',
                }}
              >
                {CODE_LINES.map((lineObj) => {
                  const isCurrentLine = lineObj.line === currentStep.line;
                  const isBreakpointLine = lineObj.line === 12;

                  return (
                    <div
                      key={lineObj.line}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '0 12px 0 0',
                        backgroundColor: isCurrentLine ? 'rgba(22, 139, 255, 0.14)' : 'transparent',
                        borderLeft: isCurrentLine ? '3px solid #168BFF' : '3px solid transparent',
                        transition: 'background-color 0.25s ease',
                      }}
                    >
                      {/* Active line morphic glow pill (Framer Motion) */}
                      {isCurrentLine && (
                        <motion.div
                          layoutId="activeCodeLineMarker"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(22, 139, 255, 0.1)',
                            borderTop: '1px solid rgba(22, 139, 255, 0.3)',
                            borderBottom: '1px solid rgba(22, 139, 255, 0.3)',
                            pointerEvents: 'none',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Gutter: Line Number + Breakpoint Indicator */}
                      <div
                        style={{
                          width: '52px',
                          textAlign: 'right',
                          paddingRight: '14px',
                          color: isCurrentLine ? '#168BFF' : '#516279',
                          fontWeight: isCurrentLine ? 700 : 400,
                          userSelect: 'none',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '6px',
                        }}
                      >
                        {/* Breakpoint dot on line 12 */}
                        {isBreakpointLine && (
                          <span
                            className="breakpoint-dot"
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: '#E5534B',
                              display: 'inline-block',
                              boxShadow: '0 0 6px #E5534B',
                            }}
                            title="Active Breakpoint"
                          />
                        )}

                        {/* Yellow debug execution arrow */}
                        {isCurrentLine && (
                          <motion.span
                            initial={{ scale: 0.8, x: -3 }}
                            animate={{ scale: 1, x: 0 }}
                            style={{
                              color: '#F4BF4F',
                              fontSize: '11px',
                              display: 'inline-block',
                            }}
                          >
                            ▶
                          </motion.span>
                        )}
                        <span>{lineObj.line}</span>
                      </div>

                      {/* Syntax Tokens */}
                      <div style={{ whiteSpace: 'pre', flex: 1, position: 'relative', zIndex: 2 }}>
                        {lineObj.tokens.length > 0 ? (
                          lineObj.tokens.map((tok, i) => renderToken(tok, i))
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </div>

                      {/* Active Execution Badge */}
                      {isCurrentLine && (
                        <div
                          style={{
                            fontSize: '0.6875rem',
                            color: '#3CCB83',
                            backgroundColor: 'rgba(60, 203, 131, 0.15)',
                            padding: '1px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(60, 203, 131, 0.3)',
                            userSelect: 'none',
                            marginLeft: '12px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#3CCB83' }} />
                          <span>Executing</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: SimIDE Live Visual Simulation & Morphic Camera HUD */}
            <div
              style={{
                flex: '1 1 52%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#0D1521',
                minWidth: 0,
              }}
              className="vscode-mentor-panel"
            >
              {/* Mentor Header with Live Camera Lens Target */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  height: '38px',
                  backgroundColor: '#101A28',
                  borderBottom: '1px solid #26364A',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SimIdeLogo size={20} />
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#F4F7FB',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    SimIDE Memory Canvas
                  </span>
                </div>

                {/* Framer Motion Morphing Camera Lens HUD */}
                <motion.div
                  key={currentStep.cameraTarget.focusName}
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    color: currentStep.cameraTarget.accentColor,
                    backgroundColor: 'rgba(22, 139, 255, 0.12)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${currentStep.cameraTarget.accentColor}`,
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <Sparkles size={12} />
                  <span>Camera: {currentStep.cameraTarget.focusName}</span>
                </motion.div>
              </div>

              {/* Stepper Toolbar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 16px',
                  backgroundColor: '#152235',
                  borderBottom: '1px solid #26364A',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Passive Debug Status (Non-clickable, Purely Scroll-Driven) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none', userSelect: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      backgroundColor: 'rgba(245, 166, 35, 0.12)',
                      border: '1px solid rgba(245, 166, 35, 0.35)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#F4BF4F',
                      fontWeight: 600,
                    }}
                  >
                    <Pause size={13} fill="#F4BF4F" />
                    <span>Paused at Line {currentStep.line}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 10px',
                      backgroundColor: 'rgba(22, 139, 255, 0.08)',
                      border: '1px solid rgba(22, 139, 255, 0.25)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      color: '#168BFF',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500,
                    }}
                  >
                    <span>Scroll to Advance</span>
                    <span>↓</span>
                  </div>
                </div>

                {/* Step status gauge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span>Step</span>
                  <span
                    style={{
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(22, 139, 255, 0.25)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(22, 139, 255, 0.4)',
                      fontWeight: 700,
                    }}
                  >
                    {currentStep.step} / {SIMULATION_STEPS.length}
                  </span>
                </div>
              </div>

              {/* Main Visualizer Stage */}
              <div
                style={{
                  flex: 1,
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  overflowY: 'auto',
                }}
              >
                {/* Linked List Heap Graph Canvas */}
                <div
                  style={{
                    backgroundColor: '#0A101A',
                    border: '1px solid #26364A',
                    borderRadius: '10px',
                    padding: '20px 16px',
                    minHeight: '210px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '12px',
                      fontSize: '0.6875rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <HardDrive size={12} color="#168BFF" />
                    <span>Heap Memory &amp; Pointer Graph</span>
                  </div>

                  {/* Nodes & Pointers Container */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      overflowX: 'auto',
                      padding: '16px 8px',
                      width: '100%',
                    }}
                  >
                    {/* Head Pointer Box (Stack Pointer) */}
                    <motion.div
                      layout
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#168BFF',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        head
                      </span>
                      <motion.div
                        animate={{
                          borderColor: currentStep.pointers.head !== "nullptr (0x0)" ? '#168BFF' : '#364B66',
                          backgroundColor: currentStep.pointers.head !== "nullptr (0x0)" ? '#152235' : '#101A28',
                          boxShadow: currentStep.pointers.head !== "nullptr (0x0)"
                            ? '0 0 14px rgba(22, 139, 255, 0.4)'
                            : 'none',
                        }}
                        style={{
                          padding: '6px 12px',
                          border: '1px solid #168BFF',
                          borderRadius: '6px',
                          fontSize: '0.8125rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#F4F7FB',
                          fontWeight: 600,
                        }}
                      >
                        {currentStep.pointers.head === "nullptr (0x0)" ? "nullptr" : currentStep.pointers.head}
                      </motion.div>
                    </motion.div>

                    {/* Animated Arrow from head to first node */}
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                        <line
                          x1="0"
                          y1="10"
                          x2="26"
                          y2="10"
                          stroke={currentStep.pointers.head !== "nullptr (0x0)" ? '#168BFF' : '#364B66'}
                          strokeWidth="2"
                          className={currentStep.pointers.head !== "nullptr (0x0)" ? "pointer-laser-line" : ""}
                        />
                        <polygon
                          points="26,6 34,10 26,14"
                          fill={currentStep.pointers.head !== "nullptr (0x0)" ? '#168BFF' : '#364B66'}
                        />
                      </svg>
                    </div>

                    {/* If no nodes on heap yet */}
                    {currentStep.nodes.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 18px',
                          backgroundColor: 'rgba(38, 54, 74, 0.25)',
                          border: '1px dashed #26364A',
                          borderRadius: '8px',
                          fontSize: '0.8125rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <Info size={16} color="#168BFF" />
                        <span>Pointer head = 0x0. Heap memory clean. Scroll down to allocate Node(10).</span>
                      </motion.div>
                    )}

                    {/* Dynamic Heap Nodes with Framer Motion Layout Morphing */}
                    <AnimatePresence mode="popLayout">
                      {currentStep.nodes.map((node, index) => {
                        const isNew =
                          (index === 0 && currentStep.step === 2) ||
                          (index === 1 && currentStep.step === 4) ||
                          (index === 2 && currentStep.step === 6);

                        return (
                          <Fragment key={node.id}>
                            {/* Single Node Card */}
                            <motion.div
                              layout
                              initial={{ opacity: 0, scale: 0.7, y: 18 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.7 }}
                              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                flexShrink: 0,
                              }}
                            >
                              {/* Address & Variable Label */}
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  fontSize: '0.6875rem',
                                  fontFamily: 'var(--font-mono)',
                                  color: 'var(--text-muted)',
                                }}
                              >
                                <span style={{ color: '#A78BFA', fontWeight: 700 }}>{node.id}</span>
                                <span style={{ color: '#168BFF' }}>@{node.address}</span>
                              </div>

                              {/* Node Box with data & next compartments */}
                              <div
                                style={{
                                  display: 'flex',
                                  border: isNew ? '2px solid #168BFF' : '1px solid #26364A',
                                  backgroundColor: '#101A28',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  boxShadow: isNew
                                    ? '0 0 20px rgba(22, 139, 255, 0.45)'
                                    : '0 4px 14px rgba(0,0,0,0.4)',
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                {/* Data compartment */}
                                <div
                                  style={{
                                    padding: '8px 16px',
                                    borderRight: '1px solid #26364A',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(22, 139, 255, 0.08)',
                                  }}
                                >
                                  <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                                    data
                                  </span>
                                  <span
                                    style={{
                                      fontSize: '1.25rem',
                                      fontWeight: 800,
                                      color: '#F4F7FB',
                                      fontFamily: 'var(--font-mono)',
                                    }}
                                  >
                                    {node.value}
                                  </span>
                                </div>

                                {/* Next pointer compartment */}
                                <div
                                  style={{
                                    padding: '8px 12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    minWidth: '58px',
                                    justifyContent: 'center',
                                    backgroundColor: node.next ? 'rgba(60, 203, 131, 0.08)' : 'rgba(237, 106, 94, 0.08)',
                                  }}
                                >
                                  <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                                    next
                                  </span>
                                  <span
                                    style={{
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      color: node.next ? '#3CCB83' : '#ED6A5E',
                                      fontFamily: 'var(--font-mono)',
                                    }}
                                  >
                                    {node.next ? '• ptr' : 'null'}
                                  </span>
                                </div>
                              </div>
                            </motion.div>

                            {/* Pointer Connection Arrow */}
                            <motion.div
                              layout
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexShrink: 0,
                                padding: '0 2px',
                              }}
                            >
                              <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                                <line
                                  x1="0"
                                  y1="10"
                                  x2="26"
                                  y2="10"
                                  stroke={node.next ? '#168BFF' : '#516279'}
                                  strokeWidth="2"
                                  className={node.next ? "pointer-laser-line" : ""}
                                />
                                <polygon
                                  points="26,6 34,10 26,14"
                                  fill={node.next ? '#168BFF' : '#516279'}
                                />
                              </svg>
                            </motion.div>
                          </Fragment>
                        );
                      })}
                    </AnimatePresence>

                    {/* Nullptr Ground Terminator Node (visible when nodes exist) */}
                    {currentStep.nodes.length > 0 && (
                      <motion.div
                        layout
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px 14px',
                          border: '1px dashed #ED6A5E',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(237, 106, 94, 0.08)',
                          color: '#ED6A5E',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        <span>nullptr (0x0)</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Visual RAM Memory Grid (Stack Space vs Heap Space) */}
                <div
                  style={{
                    backgroundColor: '#101A28',
                    border: '1px solid #26364A',
                    borderRadius: '8px',
                    padding: '12px 14px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#168BFF' }}>
                      <Layers size={14} />
                      <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>Physical RAM Mapping</span>
                    </div>

                    <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      GDB Frame: {currentStep.callStack}
                    </span>
                  </div>

                  {/* Memory Register Blocks */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '8px',
                    }}
                  >
                    {/* Stack Register */}
                    <div
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#0A101A',
                        border: '1px solid rgba(22, 139, 255, 0.3)',
                        borderRadius: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.625rem', color: '#168BFF', fontWeight: 600 }}>
                        <span>[STACK] head</span>
                        <span>0x7FFE20</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 700 }}>
                        {currentStep.pointers.head}
                      </div>
                    </div>

                    {/* Heap Registers */}
                    {currentStep.nodes.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#0A101A',
                          border: '1px solid rgba(60, 203, 131, 0.3)',
                          borderRadius: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.625rem', color: '#3CCB83', fontWeight: 600 }}>
                          <span>[HEAP] Node({n.value})</span>
                          <span>{n.address}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 700 }}>
                          next: {n.next || "0x0"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Explanation Banner */}
                <div
                  style={{
                    backgroundColor: '#101A28',
                    border: '1px solid #26364A',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(22, 139, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#168BFF',
                      flexShrink: 0,
                    }}
                  >
                    <Cpu size={18} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#168BFF' }}>
                        Line {currentStep.line}:
                      </span>
                      <code style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px', color: '#F4F7FB' }}>
                        {currentStep.codeSnippet}
                      </code>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                      {currentStep.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom VS Code Status Bar */}
          <div
            style={{
              backgroundColor: '#007ACC',
              color: '#FFFFFF',
              padding: '4px 16px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <Circle size={8} fill="#FFFFFF" /> SimIDE Debugger: Synchronized
              </span>
              <span>C++20 (g++ 13.2)</span>
              <span>LLDB Debug Adapter</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span>Ln {currentStep.line}, Col 5</span>
              <span>UTF-8</span>
              <span>Step {currentStepIndex + 1} of {SIMULATION_STEPS.length}</span>
            </div>
          </div>
        </div>

        {/* Visual Architecture Disclaimer */}
        <div
          style={{
            marginTop: '12px',
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Info size={14} color="#168BFF" />
          <span>
            Interactive simulation preview. In VS Code, SimIDE connects to native runtime memory via GDB/LLDB debug adapters.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .vscode-body {
            flex-direction: column !important;
          }
          .vscode-code-panel {
            border-right: none !important;
            border-bottom: 1px solid #26364A;
          }
        }
        @media (max-width: 580px) {
          .vscode-activity-bar {
            display: none !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
