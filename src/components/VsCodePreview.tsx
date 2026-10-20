import { useState, useEffect, Fragment } from 'react';
import { SimIdeLogo } from './Icons';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Files,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Settings,
  Circle,
  Cpu,
  Info,
  Maximize2
} from 'lucide-react';

interface StepState {
  step: number;
  line: number; // 1-indexed line number in C++ code
  description: string;
  codeSnippet: string;
  callStack: string;
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
}

const SIMULATION_STEPS: StepState[] = [
  {
    step: 1,
    line: 10,
    description: "head pointer initialized to nullptr on the stack. No heap memory has been allocated yet.",
    codeSnippet: "Node* head = nullptr;",
    callStack: "main() : line 10",
    pointers: { head: "nullptr (0x0)", first: "uninitialized", second: "uninitialized", third: "uninitialized" },
    nodes: [],
  },
  {
    step: 2,
    line: 12,
    description: "Allocated new Node on heap at 0x7FA0 with data = 10, next = nullptr. Pointer 'first' references it.",
    codeSnippet: "Node* first = new Node{10, nullptr};",
    callStack: "main() : line 12",
    pointers: { head: "nullptr (0x0)", first: "0x7FA0", second: "uninitialized", third: "uninitialized" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: null },
    ],
  },
  {
    step: 3,
    line: 13,
    description: "Assigned head = first. Both 'head' and 'first' now point to the newly allocated Node(10).",
    codeSnippet: "head = first;",
    callStack: "main() : line 13",
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "uninitialized", third: "uninitialized" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: null },
    ],
  },
  {
    step: 4,
    line: 15,
    description: "Allocated second Node on heap at 0x7FB8 with data = 20, next = nullptr. 'second' references it.",
    codeSnippet: "Node* second = new Node{20, nullptr};",
    callStack: "main() : line 15",
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "0x7FB8", third: "uninitialized" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: null },
      { id: "second", value: 20, address: "0x7FB8", next: null },
    ],
  },
  {
    step: 5,
    line: 16,
    description: "Linked first->next = second. Node(10) now points forward to Node(20).",
    codeSnippet: "first->next = second;",
    callStack: "main() : line 16",
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "0x7FB8", third: "uninitialized" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: "0x7FB8" },
      { id: "second", value: 20, address: "0x7FB8", next: null },
    ],
  },
  {
    step: 6,
    line: 18,
    description: "Allocated third Node on heap at 0x7FD0 with data = 30, next = nullptr. 'third' references it.",
    codeSnippet: "Node* third = new Node{30, nullptr};",
    callStack: "main() : line 18",
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "0x7FB8", third: "0x7FD0" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: "0x7FB8" },
      { id: "second", value: 20, address: "0x7FB8", next: null },
      { id: "third", value: 30, address: "0x7FD0", next: null },
    ],
  },
  {
    step: 7,
    line: 19,
    description: "Linked second->next = third. Completed singly linked list: 10 → 20 → 30 → nullptr.",
    codeSnippet: "second->next = third;",
    callStack: "main() : line 19",
    pointers: { head: "0x7FA0", first: "0x7FA0", second: "0x7FB8", third: "0x7FD0" },
    nodes: [
      { id: "first", value: 10, address: "0x7FA0", next: "0x7FB8" },
      { id: "second", value: 20, address: "0x7FB8", next: "0x7FD0" },
      { id: "third", value: 30, address: "0x7FD0", next: null },
    ],
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
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = SIMULATION_STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= SIMULATION_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIndex < SIMULATION_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

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
      style={{
        maxWidth: '1220px',
        margin: '0 auto',
        padding: '0 16px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      {/* VS Code Window Container */}
      <div
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #26364A',
          borderRadius: '12px',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.75), 0 0 1px rgba(22, 139, 255, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            backgroundColor: '#080D14',
            borderBottom: '1px solid #26364A',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            userSelect: 'none',
          }}
        >
          {/* Window dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ED6A5E', display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F4BF4F', display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#61C554', display: 'inline-block' }} />
          </div>

          {/* Window Title */}
          <div
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>SimIDE Workspace</span>
            <span>—</span>
            <span style={{ color: '#F4F7FB', fontWeight: 500 }}>linked-list.cpp [Debugging Session]</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(60, 203, 131, 0.15)', color: '#3CCB83', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
              GDB Synchronized
            </span>
            <Maximize2 size={14} />
          </div>
        </div>

        {/* Main Editor Body: Activity Bar + Left Code + Right Visualizer */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            minHeight: '560px',
            backgroundColor: 'transparent',
          }}
          className="vscode-body"
        >
          {/* Activity Bar */}
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
                  backgroundColor: 'rgba(22, 139, 255, 0.12)',
                  border: '1px solid rgba(22, 139, 255, 0.3)',
                  cursor: 'pointer',
                }}
                title="SimIDE Visual Debugger"
              >
                <SimIdeLogo size={20} />
              </div>
              <Blocks size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>

            <Settings size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
          </div>

          {/* Left Panel: C++ Code Editor */}
          <div
            style={{
              flex: '1 1 50%',
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

            {/* Code Lines with Execution Marker */}
            <div
              style={{
                padding: '16px 0',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                lineHeight: '1.7',
                overflowX: 'auto',
                flex: 1,
              }}
            >
              {CODE_LINES.map((lineObj) => {
                const isCurrentLine = lineObj.line === currentStep.line;
                return (
                  <div
                    key={lineObj.line}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: isCurrentLine ? 'rgba(22, 139, 255, 0.15)' : 'transparent',
                      borderLeft: isCurrentLine ? '3px solid #168BFF' : '3px solid transparent',
                      padding: '0 12px 0 0',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                  >
                    {/* Execution arrow icon or line number */}
                    <div
                      style={{
                        width: '48px',
                        textAlign: 'right',
                        paddingRight: '14px',
                        color: isCurrentLine ? '#168BFF' : '#516279',
                        fontWeight: isCurrentLine ? 700 : 400,
                        userSelect: 'none',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                      }}
                    >
                      {isCurrentLine && (
                        <span
                          style={{
                            color: '#F4BF4F',
                            fontSize: '11px',
                            animation: 'bounceArrow 1s infinite alternate',
                          }}
                        >
                          ▶
                        </span>
                      )}
                      <span>{lineObj.line}</span>
                    </div>

                    {/* Tokens */}
                    <div style={{ whiteSpace: 'pre', flex: 1 }}>
                      {lineObj.tokens.length > 0 ? (
                        lineObj.tokens.map((tok, i) => renderToken(tok, i))
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>

                    {/* Inline marker note */}
                    {isCurrentLine && (
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          color: '#3CCB83',
                          backgroundColor: 'rgba(60, 203, 131, 0.12)',
                          padding: '1px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(60, 203, 131, 0.25)',
                          userSelect: 'none',
                          marginLeft: '12px',
                        }}
                      >
                        Active Frame
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: SimIDE Debug Mentor */}
          <div
            style={{
              flex: '1 1 50%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#0D1521',
              minWidth: 0,
            }}
            className="vscode-mentor-panel"
          >
            {/* Mentor Header */}
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
                  SimIDE Debug Mentor
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    backgroundColor: 'rgba(60, 203, 131, 0.15)',
                    color: '#3CCB83',
                    border: '1px solid rgba(60, 203, 131, 0.3)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#3CCB83',
                      display: 'inline-block',
                    }}
                  />
                  Live Sync
                </span>
              </div>

              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#F5A623',
                  backgroundColor: 'rgba(245, 166, 35, 0.12)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(245, 166, 35, 0.25)',
                  fontWeight: 600,
                }}
              >
                Paused at line {currentStep.line}
              </span>
            </div>

            {/* Stepper Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                backgroundColor: '#152235',
                borderBottom: '1px solid #26364A',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  className="btn btn-secondary btn-sm"
                  style={{
                    padding: '6px 10px',
                    opacity: currentStepIndex === 0 ? 0.4 : 1,
                    cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                  }}
                  title="Previous Step"
                  aria-label="Previous Step"
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStepIndex === SIMULATION_STEPS.length - 1}
                  className="btn btn-primary btn-sm"
                  style={{
                    padding: '6px 14px',
                    opacity: currentStepIndex === SIMULATION_STEPS.length - 1 ? 0.4 : 1,
                    cursor: currentStepIndex === SIMULATION_STEPS.length - 1 ? 'not-allowed' : 'pointer',
                  }}
                  title="Next Step"
                  aria-label="Next Step"
                >
                  <span>Step</span>
                  <ChevronRight size={16} />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '6px 12px' }}
                  title={isPlaying ? "Pause Simulation" : "Auto-play Simulation"}
                  aria-label={isPlaying ? "Pause Simulation" : "Auto-play Simulation"}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '6px 8px' }}
                  title="Reset to Line 10"
                  aria-label="Reset to Line 10"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Step indicator */}
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
                    backgroundColor: 'rgba(22, 139, 255, 0.2)',
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

            {/* Visualization Stage */}
            <div
              style={{
                flex: 1,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                overflowY: 'auto',
              }}
            >
              {/* Linked List Canvas Area */}
              <div
                style={{
                  backgroundColor: '#0A101A',
                  border: '1px solid #26364A',
                  borderRadius: '8px',
                  padding: '24px 16px',
                  minHeight: '190px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
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
                    fontWeight: 600,
                  }}
                >
                  Heap Memory & Pointer Graph
                </div>

                {/* Nodes render */}
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
                  {/* Head Pointer Box */}
                  <div
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
                    <div
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#152235',
                        border: '1px solid #168BFF',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#F4F7FB',
                        boxShadow: '0 0 10px rgba(22, 139, 255, 0.25)',
                      }}
                    >
                      {currentStep.pointers.head === "nullptr (0x0)" ? "nullptr" : currentStep.pointers.head}
                    </div>
                  </div>

                  {/* Arrow from head to first node (if head is assigned) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#168BFF',
                      fontSize: '18px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    →
                  </div>

                  {/* If no nodes on heap yet */}
                  {currentStep.nodes.length === 0 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        backgroundColor: 'rgba(38, 54, 74, 0.3)',
                        border: '1px dashed #26364A',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <Info size={14} />
                      <span>head points to 0x0 (nullptr). No heap nodes created yet.</span>
                    </div>
                  )}

                  {/* Nodes List */}
                  {currentStep.nodes.map((node, index) => {
                    const isNew =
                      (index === 0 && currentStep.step === 2) ||
                      (index === 1 && currentStep.step === 4) ||
                      (index === 2 && currentStep.step === 6);

                    return (
                      <Fragment key={node.id}>
                        {/* Single Node Card */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            flexShrink: 0,
                            animation: isNew ? 'popNode 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
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
                            <span style={{ color: '#A78BFA', fontWeight: 600 }}>{node.id}</span>
                            <span>@{node.address}</span>
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
                                ? '0 0 16px rgba(22, 139, 255, 0.4)'
                                : '0 4px 12px rgba(0,0,0,0.3)',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {/* Data compartment */}
                            <div
                              style={{
                                padding: '8px 14px',
                                borderRight: '1px solid #26364A',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'rgba(22, 139, 255, 0.08)',
                              }}
                            >
                              <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                data
                              </span>
                              <span
                                style={{
                                  fontSize: '1.125rem',
                                  fontWeight: 700,
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
                                minWidth: '55px',
                                justifyContent: 'center',
                                backgroundColor: node.next ? 'rgba(60, 203, 131, 0.06)' : 'rgba(237, 106, 94, 0.06)',
                              }}
                            >
                              <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                next
                              </span>
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  color: node.next ? '#3CCB83' : '#ED6A5E',
                                  fontFamily: 'var(--font-mono)',
                                }}
                              >
                                {node.next ? '•' : 'null'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pointer Connection Arrow */}
                        <div
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
                              strokeDasharray={node.next ? 'none' : '3 3'}
                            />
                            <polygon
                              points="26,6 34,10 26,14"
                              fill={node.next ? '#168BFF' : '#516279'}
                            />
                          </svg>
                        </div>
                      </Fragment>
                    );
                  })}

                  {/* Nullptr Ground Terminator Node (visible when nodes exist) */}
                  {currentStep.nodes.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                      nullptr
                    </div>
                  )}
                </div>
              </div>

              {/* Step Explanation Card */}
              <div
                style={{
                  backgroundColor: '#101A28',
                  border: '1px solid #26364A',
                  borderRadius: '8px',
                  padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Cpu size={14} color="#168BFF" />
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#168BFF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Execution Step {currentStep.step}:
                  </span>
                  <code
                    style={{
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      color: '#F4F7FB',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {currentStep.codeSnippet}
                  </code>
                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.5',
                  }}
                >
                  {currentStep.description}
                </p>
              </div>

              {/* Stack & Pointer Variables Inspector */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#101A28',
                    border: '1px solid #26364A',
                    borderRadius: '6px',
                    padding: '8px 12px',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>head</div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#168BFF', fontWeight: 600 }}>
                    {currentStep.pointers.head}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#101A28',
                    border: '1px solid #26364A',
                    borderRadius: '6px',
                    padding: '8px 12px',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>first</div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#A78BFA', fontWeight: 600 }}>
                    {currentStep.pointers.first}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#101A28',
                    border: '1px solid #26364A',
                    borderRadius: '6px',
                    padding: '8px 12px',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>second</div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#A78BFA', fontWeight: 600 }}>
                    {currentStep.pointers.second}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#101A28',
                    border: '1px solid #26364A',
                    borderRadius: '6px',
                    padding: '8px 12px',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>third</div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#A78BFA', fontWeight: 600 }}>
                    {currentStep.pointers.third}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
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
              <Circle size={8} fill="#FFFFFF" /> SimIDE Debugger: Active
            </span>
            <span>C++ 20 (g++ 13.2)</span>
            <span>Thread 1 (lldb-server)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Ln {currentStep.line}, Col 5</span>
            <span>UTF-8</span>
            <span>LF</span>
            <span>C++</span>
          </div>
        </div>
      </div>

      {/* Required Architecture / Simulation Disclaimer */}
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
          Illustrative interactive landing page preview. In VS Code, the SimIDE extension connects to real-time GDB/LLDB runtime debug adapters.
        </span>
      </div>

      <style>{`
        @keyframes popNode {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(6px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes bounceArrow {
          0% { transform: translateX(0); }
          100% { transform: translateX(3px); }
        }
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
        }
      `}</style>
    </div>
  );
};
