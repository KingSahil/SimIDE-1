import React from 'react';

/**
 * FloatingDSA — Complete suite of decorative, animated data-structure diagrams
 * and C++ programming symbols distributed throughout the SimIDE website.
 *
 * Characteristics:
 * - Electric-blue (#079BFF / #168BFF) dominant accent, violet (#8057E8) & purple (#B99AFF) secondary.
 * - Thin neon-style outlines, dark translucent fills, subtle glow filters.
 * - Gentle floating motion: 14s-24s ease-in-out alternate, 4px-8px displacement.
 * - pointer-events: none, aria-hidden="true".
 * - Respects prefers-reduced-motion and gracefully scales for mobile screens.
 */

const BLUE = '#079BFF';
const BLUE_DIM = 'rgba(7, 155, 255, 0.6)';
const BLUE_SUBTLE = 'rgba(7, 155, 255, 0.3)';
const PURPLE = '#B99AFF';
const PURPLE_DIM = 'rgba(185, 154, 255, 0.55)';
const VIOLET = '#8057E8';
const VIOLET_DIM = 'rgba(128, 87, 232, 0.5)';
const TEXT_MUTED = 'rgba(244, 247, 251, 0.35)';

const wrapBase: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  filter: 'drop-shadow(0 0 8px rgba(7, 155, 255, 0.2))',
  transition: 'opacity 0.3s ease',
};

/* ─────────────────────────────────────────────────────────────
   REUSABLE DIAGRAM SVGS
   ───────────────────────────────────────────────────────────── */

/** Linked List: 10 → 20 → 30 → 40 */
export const LinkedListHero: React.FC = () => (
  <svg width="220" height="38" viewBox="0 0 220 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0, 1, 2, 3].map((i) => {
      const x = i * 56;
      const vals = [10, 20, 30, 40];
      return (
        <g key={i}>
          <rect x={x} y="4" width="40" height="30" rx="6" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.06)" />
          <text x={x + 20} y="23" textAnchor="middle" fill={BLUE} fontSize="11" fontFamily="var(--font-mono)">{vals[i]}</text>
          {i < 3 && (
            <>
              <line x1={x + 42} y1="19" x2={x + 53} y2="19" stroke={BLUE_DIM} strokeWidth="1.2" />
              <polygon points={`${x + 53},16 ${x + 53},22 ${x + 57},19`} fill={BLUE_DIM} />
            </>
          )}
        </g>
      );
    })}
  </svg>
);

/** Pointer Chain: head → [0x7FA0] → [0x7FB8] → nullptr */
export const LinkedListPointer: React.FC = () => (
  <svg width="230" height="42" viewBox="0 0 230 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="2" y="25" fill={BLUE} fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">head</text>
    <line x1="28" y1="21" x2="42" y2="21" stroke={BLUE_DIM} strokeWidth="1.2" />
    <polygon points="42,18 42,24 46,21" fill={BLUE_DIM} />
    {/* Node 1 */}
    <rect x="48" y="7" width="56" height="28" rx="5" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.06)" />
    <text x="76" y="25" textAnchor="middle" fill={BLUE} fontSize="10" fontFamily="var(--font-mono)">0x7FA0</text>
    <line x1="106" y1="21" x2="120" y2="21" stroke={BLUE_DIM} strokeWidth="1.2" />
    <polygon points="120,18 120,24 124,21" fill={BLUE_DIM} />
    {/* Node 2 */}
    <rect x="126" y="7" width="56" height="28" rx="5" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
    <text x="154" y="25" textAnchor="middle" fill={PURPLE} fontSize="10" fontFamily="var(--font-mono)">0x7FB8</text>
    <line x1="184" y1="21" x2="196" y2="21" stroke={PURPLE_DIM} strokeWidth="1.2" />
    <polygon points="196,18 196,24 200,21" fill={PURPLE_DIM} />
    <text x="204" y="25" fill={TEXT_MUTED} fontSize="10" fontFamily="var(--font-mono)">null</text>
  </svg>
);

/** Doubly Linked List: nullptr ⇦ [15] ⇄ [30] ⇄ [45] ⇨ */
export const DoublyLinkedList: React.FC = () => (
  <svg width="220" height="42" viewBox="0 0 220 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0, 1, 2].map((i) => {
      const x = i * 68 + 10;
      const vals = [15, 30, 45];
      return (
        <g key={i}>
          <rect x={x} y="6" width="46" height="30" rx="5" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.06)" />
          <line x1={x + 28} y1="6" x2={x + 28} y2="36" stroke="rgba(7,155,255,0.25)" strokeWidth="1" />
          <text x={x + 14} y="25" textAnchor="middle" fill={BLUE} fontSize="11" fontFamily="var(--font-mono)">{vals[i]}</text>
          <text x={x + 37} y="24" textAnchor="middle" fill={BLUE_DIM} fontSize="8" fontFamily="var(--font-mono)">•</text>
          {i < 2 && (
            <>
              {/* Forward arrow */}
              <line x1={x + 48} y1="17" x2={x + 64} y2="17" stroke={VIOLET} strokeWidth="1" />
              <polygon points={`${x + 64},15 ${x + 64},19 ${x + 67},17`} fill={VIOLET} />
              {/* Backward arrow */}
              <line x1={x + 67} y1="25" x2={x + 51} y2="25" stroke={BLUE_DIM} strokeWidth="1" />
              <polygon points={`${x + 51},23 ${x + 51},27 ${x + 48},25`} fill={BLUE_DIM} />
            </>
          )}
        </g>
      );
    })}
  </svg>
);

/** Compact Linked List terminating: [42] → [99] → ∅ */
export const LinkedListTerminator: React.FC = () => (
  <svg width="150" height="36" viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="38" height="28" rx="5" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.06)" />
    <text x="23" y="22" textAnchor="middle" fill={BLUE} fontSize="11" fontFamily="var(--font-mono)">42</text>
    <line x1="44" y1="18" x2="58" y2="18" stroke={BLUE_DIM} strokeWidth="1.2" />
    <polygon points="58,15 58,21 62,18" fill={BLUE_DIM} />

    <rect x="64" y="4" width="38" height="28" rx="5" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
    <text x="83" y="22" textAnchor="middle" fill={PURPLE} fontSize="11" fontFamily="var(--font-mono)">99</text>
    <line x1="104" y1="18" x2="118" y2="18" stroke={PURPLE_DIM} strokeWidth="1.2" />
    <polygon points="118,15 118,21 122,18" fill={PURPLE_DIM} />

    <text x="132" y="23" fill={TEXT_MUTED} fontSize="14" fontFamily="var(--font-mono)">∅</text>
  </svg>
);

/** Array: [2, 5, 8, 12] with index labels */
export const ArrayHero: React.FC = () => (
  <svg width="168" height="42" viewBox="0 0 168 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[2, 5, 8, 12].map((v, i) => {
      const x = i * 42;
      return (
        <g key={i}>
          <text x={x + 20} y="8" textAnchor="middle" fill={TEXT_MUTED} fontSize="8" fontFamily="var(--font-mono)">[{i}]</text>
          <rect x={x} y="11" width="40" height="28" rx="4" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
          <text x={x + 20} y="29" textAnchor="middle" fill={PURPLE} fontSize="11" fontFamily="var(--font-mono)">{v}</text>
        </g>
      );
    })}
  </svg>
);

/** Array with index pointer marker: arr[2] = 16 */
export const ArrayIndexed: React.FC = () => (
  <svg width="180" height="52" viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[4, 9, 16, 25].map((v, i) => {
      const x = i * 44 + 2;
      const isTarget = i === 2;
      return (
        <g key={i}>
          <rect
            x={x}
            y="6"
            width="40"
            height="28"
            rx="4"
            stroke={isTarget ? BLUE : VIOLET}
            strokeWidth={isTarget ? 1.5 : 1}
            fill={isTarget ? 'rgba(7,155,255,0.14)' : 'rgba(128,87,232,0.06)'}
          />
          <text x={x + 20} y="24" textAnchor="middle" fill={isTarget ? BLUE : VIOLET} fontSize="11" fontFamily="var(--font-mono)" fontWeight={isTarget ? 700 : 400}>
            {v}
          </text>
          {isTarget && (
            <>
              <line x1={x + 20} y1="46" x2={x + 20} y2="37" stroke={BLUE} strokeWidth="1.2" />
              <polygon points={`${x + 17},37 ${x + 23},37 ${x + 20},34`} fill={BLUE} />
              <text x={x + 20} y="52" textAnchor="middle" fill={BLUE} fontSize="8" fontFamily="var(--font-mono)">i = 2</text>
            </>
          )}
        </g>
      );
    })}
  </svg>
);

/** Array with Binary Search pointers */
export const ArrayBinarySearch: React.FC = () => (
  <svg width="190" height="48" viewBox="0 0 190 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[10, 20, 30, 42, 55].map((v, i) => {
      const x = i * 37 + 3;
      const isMid = i === 2;
      return (
        <g key={i}>
          <rect
            x={x}
            y="12"
            width="34"
            height="26"
            rx="3"
            stroke={isMid ? BLUE : PURPLE}
            strokeWidth={isMid ? 1.4 : 1}
            fill={isMid ? 'rgba(7,155,255,0.15)' : 'rgba(185,154,255,0.06)'}
          />
          <text x={x + 17} y="29" textAnchor="middle" fill={isMid ? BLUE : PURPLE} fontSize="10" fontFamily="var(--font-mono)">{v}</text>
          {i === 0 && <text x={x + 17} y="8" textAnchor="middle" fill={BLUE_SUBTLE} fontSize="7" fontFamily="var(--font-mono)">low</text>}
          {isMid && <text x={x + 17} y="8" textAnchor="middle" fill={BLUE} fontSize="7" fontFamily="var(--font-mono)" fontWeight="700">mid</text>}
          {i === 4 && <text x={x + 17} y="8" textAnchor="middle" fill={BLUE_SUBTLE} fontSize="7" fontFamily="var(--font-mono)">high</text>}
        </g>
      );
    })}
  </svg>
);

/** Array Sorting Swap Indicators */
export const ArraySorting: React.FC = () => (
  <svg width="168" height="46" viewBox="0 0 168 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[12, 25, 34, 45].map((v, i) => {
      const x = i * 41 + 2;
      const isSwap = i === 1 || i === 2;
      return (
        <g key={i}>
          <rect
            x={x}
            y="8"
            width="38"
            height="28"
            rx="4"
            stroke={isSwap ? BLUE : VIOLET}
            strokeWidth={isSwap ? 1.4 : 1}
            fill={isSwap ? 'rgba(7,155,255,0.1)' : 'rgba(128,87,232,0.06)'}
          />
          <text x={x + 19} y="26" textAnchor="middle" fill={isSwap ? BLUE : VIOLET} fontSize="11" fontFamily="var(--font-mono)">{v}</text>
        </g>
      );
    })}
    {/* Swap curved arc between 1 and 2 */}
    <path d="M 62 6 Q 82 -2 102 6" stroke={BLUE} strokeWidth="1" fill="none" strokeDasharray="2 2" />
    <polygon points="101,4 105,7 101,8" fill={BLUE} />
  </svg>
);

/** Binary Tree (3 nodes): root 7, child 3, child 11 */
export const BinaryTreeHero: React.FC = () => (
  <svg width="120" height="88" viewBox="0 0 120 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="22" x2="30" y2="58" stroke={BLUE_DIM} strokeWidth="1" />
    <line x1="60" y1="22" x2="90" y2="58" stroke={BLUE_DIM} strokeWidth="1" />
    {/* Root */}
    <circle cx="60" cy="18" r="14" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.08)" />
    <text x="60" y="22" textAnchor="middle" fill={BLUE} fontSize="10" fontFamily="var(--font-mono)">7</text>
    {/* Left */}
    <circle cx="30" cy="64" r="13" stroke={VIOLET} strokeWidth="1.2" fill="rgba(128,87,232,0.06)" />
    <text x="30" y="68" textAnchor="middle" fill={VIOLET} fontSize="10" fontFamily="var(--font-mono)">3</text>
    {/* Right */}
    <circle cx="90" cy="64" r="13" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
    <text x="90" y="68" textAnchor="middle" fill={PURPLE} fontSize="10" fontFamily="var(--font-mono)">11</text>
  </svg>
);

/** Balanced Binary Search Tree (5 nodes) */
export const BinarySearchTree5: React.FC = () => (
  <svg width="140" height="96" viewBox="0 0 140 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Branch lines */}
    <line x1="70" y1="18" x2="40" y2="44" stroke={BLUE_DIM} strokeWidth="1" />
    <line x1="70" y1="18" x2="100" y2="44" stroke={BLUE_DIM} strokeWidth="1" />
    <line x1="40" y1="44" x2="22" y2="72" stroke={VIOLET_DIM} strokeWidth="1" />
    <line x1="100" y1="44" x2="118" y2="72" stroke={PURPLE_DIM} strokeWidth="1" />

    {/* Root */}
    <circle cx="70" cy="18" r="12" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.08)" />
    <text x="70" y="22" textAnchor="middle" fill={BLUE} fontSize="9" fontFamily="var(--font-mono)">20</text>

    {/* Level 1 */}
    <circle cx="40" cy="44" r="11" stroke={VIOLET} strokeWidth="1.2" fill="rgba(128,87,232,0.06)" />
    <text x="40" y="48" textAnchor="middle" fill={VIOLET} fontSize="9" fontFamily="var(--font-mono)">10</text>
    <circle cx="100" cy="44" r="11" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
    <text x="100" y="48" textAnchor="middle" fill={PURPLE} fontSize="9" fontFamily="var(--font-mono)">30</text>

    {/* Level 2 Leaves */}
    <circle cx="22" cy="72" r="9" stroke={BLUE_DIM} strokeWidth="1" fill="rgba(7,155,255,0.04)" />
    <text x="22" y="75" textAnchor="middle" fill={BLUE} fontSize="8" fontFamily="var(--font-mono)">5</text>
    <circle cx="118" cy="72" r="9" stroke={PURPLE_DIM} strokeWidth="1" fill="rgba(185,154,255,0.04)" />
    <text x="118" y="75" textAnchor="middle" fill={PURPLE} fontSize="8" fontFamily="var(--font-mono)">35</text>
  </svg>
);

/** Tree Node AVL with balance factor */
export const TreeNodeAVL: React.FC = () => (
  <svg width="110" height="70" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="55" y1="20" x2="28" y2="50" stroke={BLUE_DIM} strokeWidth="1" />
    <line x1="55" y1="20" x2="82" y2="50" stroke={BLUE_DIM} strokeWidth="1" />

    <circle cx="55" cy="18" r="14" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.08)" />
    <text x="55" y="21" textAnchor="middle" fill={BLUE} fontSize="9" fontFamily="var(--font-mono)">50</text>
    <text x="76" y="14" fill={VIOLET} fontSize="7" fontFamily="var(--font-mono)">bf:0</text>

    <circle cx="28" cy="50" r="11" stroke={VIOLET} strokeWidth="1" fill="rgba(128,87,232,0.06)" />
    <text x="28" y="53" textAnchor="middle" fill={VIOLET} fontSize="8" fontFamily="var(--font-mono)">25</text>

    <circle cx="82" cy="50" r="11" stroke={PURPLE} strokeWidth="1" fill="rgba(185,154,255,0.06)" />
    <text x="82" y="53" textAnchor="middle" fill={PURPLE} fontSize="8" fontFamily="var(--font-mono)">75</text>
  </svg>
);

/** 4-Node Graph Network */
export const GraphHero: React.FC = () => (
  <svg width="110" height="96" viewBox="0 0 110 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="28" y1="24" x2="78" y2="18" stroke={VIOLET_DIM} strokeWidth="0.9" />
    <line x1="28" y1="24" x2="22" y2="70" stroke={VIOLET_DIM} strokeWidth="0.9" />
    <line x1="78" y1="18" x2="84" y2="68" stroke={VIOLET_DIM} strokeWidth="0.9" />
    <line x1="22" y1="70" x2="84" y2="68" stroke={VIOLET_DIM} strokeWidth="0.9" />
    <line x1="28" y1="24" x2="84" y2="68" stroke={VIOLET_DIM} strokeWidth="0.9" />

    <circle cx="28" cy="24" r="11" stroke={VIOLET} strokeWidth="1.2" fill="rgba(128,87,232,0.08)" />
    <text x="28" y="28" textAnchor="middle" fill={VIOLET} fontSize="9" fontFamily="var(--font-mono)">A</text>
    <circle cx="78" cy="18" r="11" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.08)" />
    <text x="78" y="22" textAnchor="middle" fill={BLUE} fontSize="9" fontFamily="var(--font-mono)">B</text>
    <circle cx="22" cy="70" r="11" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
    <text x="22" y="74" textAnchor="middle" fill={PURPLE} fontSize="9" fontFamily="var(--font-mono)">C</text>
    <circle cx="84" cy="68" r="11" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.06)" />
    <text x="84" y="72" textAnchor="middle" fill={BLUE} fontSize="9" fontFamily="var(--font-mono)">D</text>
  </svg>
);

/** Directed Acyclic Graph: v1 ──► v2 ──► v3 */
export const DirectedGraph: React.FC = () => (
  <svg width="150" height="70" viewBox="0 0 150 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* v1 to v2 */}
    <line x1="32" y1="25" x2="68" y2="25" stroke={BLUE_DIM} strokeWidth="1.2" />
    <polygon points="68,22 68,28 72,25" fill={BLUE_DIM} />
    {/* v1 to v3 */}
    <line x1="26" y1="36" x2="52" y2="52" stroke={VIOLET_DIM} strokeWidth="1" />
    <polygon points="50,49 55,54 55,48" fill={VIOLET_DIM} />
    {/* v2 to v3 */}
    <line x1="80" y1="35" x2="68" y2="48" stroke={PURPLE_DIM} strokeWidth="1" />
    <polygon points="67,45 66,51 72,49" fill={PURPLE_DIM} />

    <circle cx="22" cy="25" r="11" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.08)" />
    <text x="22" y="29" textAnchor="middle" fill={BLUE} fontSize="8" fontFamily="var(--font-mono)">v1</text>

    <circle cx="84" cy="25" r="11" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
    <text x="84" y="29" textAnchor="middle" fill={PURPLE} fontSize="8" fontFamily="var(--font-mono)">v2</text>

    <circle cx="60" cy="56" r="10" stroke={VIOLET} strokeWidth="1.2" fill="rgba(128,87,232,0.06)" />
    <text x="60" y="59" textAnchor="middle" fill={VIOLET} fontSize="8" fontFamily="var(--font-mono)">v3</text>
  </svg>
);

/** Graph Cycle (3-node triangle with weights) */
export const GraphCycle: React.FC = () => (
  <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="55" y1="18" x2="25" y2="68" stroke={BLUE_DIM} strokeWidth="1" />
    <line x1="55" y1="18" x2="85" y2="68" stroke={VIOLET_DIM} strokeWidth="1" />
    <line x1="25" y1="68" x2="85" y2="68" stroke={PURPLE_DIM} strokeWidth="1" />

    <text x="34" y="40" fill={BLUE_SUBTLE} fontSize="7" fontFamily="var(--font-mono)">w:4</text>
    <text x="74" y="40" fill={VIOLET_DIM} fontSize="7" fontFamily="var(--font-mono)">w:6</text>
    <text x="55" y="80" textAnchor="middle" fill={PURPLE_DIM} fontSize="7" fontFamily="var(--font-mono)">w:2</text>

    <circle cx="55" cy="18" r="11" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.08)" />
    <text x="55" y="22" textAnchor="middle" fill={BLUE} fontSize="9" fontFamily="var(--font-mono)">u</text>

    <circle cx="25" cy="68" r="11" stroke={VIOLET} strokeWidth="1.2" fill="rgba(128,87,232,0.06)" />
    <text x="25" y="72" textAnchor="middle" fill={VIOLET} fontSize="9" fontFamily="var(--font-mono)">v</text>

    <circle cx="85" cy="68" r="11" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
    <text x="85" y="72" textAnchor="middle" fill={PURPLE} fontSize="9" fontFamily="var(--font-mono)">w</text>
  </svg>
);

/** Vertical Stack: [pop, 42, 17, 8] */
export const StackHero: React.FC = () => (
  <svg width="52" height="106" viewBox="0 0 52 106" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="26" y="9" textAnchor="middle" fill={BLUE_DIM} fontSize="8" fontFamily="var(--font-mono)">▲ pop</text>
    {['42', '17', '8'].map((v, i) => {
      const y = i * 27 + 16;
      return (
        <g key={i}>
          <rect x="2" y={y} width="48" height="23" rx="4" stroke={BLUE} strokeWidth="1.2" fill="rgba(7,155,255,0.06)" />
          <text x="26" y={y + 15} textAnchor="middle" fill={BLUE} fontSize="10" fontFamily="var(--font-mono)">{v}</text>
        </g>
      );
    })}
  </svg>
);

/** Call Stack Frames: main() -> partition() -> quickSort() */
export const CallStackFrames: React.FC = () => (
  <svg width="105" height="96" viewBox="0 0 105 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="9" fill={BLUE} fontSize="7" fontFamily="var(--font-mono)" fontWeight="700">CALL STACK</text>
    {[
      { fn: 'quickSort()', color: BLUE, bg: 'rgba(7,155,255,0.12)' },
      { fn: 'partition()', color: PURPLE, bg: 'rgba(185,154,255,0.06)' },
      { fn: 'main()', color: VIOLET, bg: 'rgba(128,87,232,0.06)' },
    ].map((f, i) => {
      const y = i * 26 + 14;
      return (
        <g key={i}>
          <rect x="2" y={y} width="100" height="22" rx="3" stroke={f.color} strokeWidth="1" fill={f.bg} />
          <text x="8" y={y + 14} fill={f.color} fontSize="8" fontFamily="var(--font-mono)">{f.fn}</text>
        </g>
      );
    })}
  </svg>
);

/** Stack Push Operation */
export const StackPush: React.FC = () => (
  <svg width="68" height="98" viewBox="0 0 68 98" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="34" y="8" textAnchor="middle" fill={PURPLE} fontSize="8" fontFamily="var(--font-mono)">push(50) ▼</text>
    {['50', '25', '10'].map((v, i) => {
      const y = i * 26 + 14;
      const isTop = i === 0;
      return (
        <g key={i}>
          <rect
            x="4"
            y={y}
            width="60"
            height="22"
            rx="4"
            stroke={isTop ? PURPLE : BLUE}
            strokeWidth={isTop ? 1.4 : 1}
            fill={isTop ? 'rgba(185,154,255,0.12)' : 'rgba(7,155,255,0.05)'}
          />
          <text x="34" y={y + 15} textAnchor="middle" fill={isTop ? PURPLE : BLUE} fontSize="10" fontFamily="var(--font-mono)">{v}</text>
        </g>
      );
    })}
  </svg>
);

/** Horizontal Queue: enq ▶ [A][B][C][D] ▶ deq */
export const QueueHero: React.FC = () => (
  <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="24" fill={PURPLE_DIM} fontSize="7" fontFamily="var(--font-mono)">enq ▶</text>
    {['A', 'B', 'C', 'D'].map((v, i) => {
      const x = i * 36 + 28;
      return (
        <g key={i}>
          <rect x={x} y="8" width="32" height="26" rx="4" stroke={PURPLE} strokeWidth="1.2" fill="rgba(185,154,255,0.06)" />
          <text x={x + 16} y="25" textAnchor="middle" fill={PURPLE} fontSize="10" fontFamily="var(--font-mono)">{v}</text>
        </g>
      );
    })}
    <text x="174" y="24" fill={PURPLE_DIM} fontSize="7" fontFamily="var(--font-mono)">▶ deq</text>
  </svg>
);

/** Queue Buffer with front & rear pointers */
export const QueueBuffer: React.FC = () => (
  <svg width="170" height="48" viewBox="0 0 170 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="16" y="8" textAnchor="middle" fill={BLUE} fontSize="7" fontFamily="var(--font-mono)">front</text>
    <text x="146" y="8" textAnchor="middle" fill={PURPLE} fontSize="7" fontFamily="var(--font-mono)">rear</text>
    {[101, 102, 103].map((v, i) => {
      const x = i * 42 + 22;
      return (
        <g key={i}>
          <rect x={x} y="12" width="38" height="26" rx="3" stroke={i === 0 ? BLUE : PURPLE} strokeWidth="1.1" fill="rgba(7,155,255,0.06)" />
          <text x={x + 19} y="29" textAnchor="middle" fill={i === 0 ? BLUE : PURPLE} fontSize="9" fontFamily="var(--font-mono)">{v}</text>
        </g>
      );
    })}
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   CODE SYMBOLS SNIPPETS
   ───────────────────────────────────────────────────────────── */

export const CodeSymbolsHero1: React.FC = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="16" fill={BLUE_DIM} fontSize="14" fontFamily="var(--font-mono)">{'{ }'}</text>
    <text x="8" y="38" fill={VIOLET_DIM} fontSize="11" fontFamily="var(--font-mono)">*ptr</text>
    <text x="2" y="55" fill={PURPLE_DIM} fontSize="10" fontFamily="var(--font-mono)">C++</text>
  </svg>
);

export const CodeSymbolsHero2: React.FC = () => (
  <svg width="70" height="50" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="16" fill={VIOLET_DIM} fontSize="12" fontFamily="var(--font-mono)">[ ]</text>
    <text x="6" y="34" fill={BLUE_DIM} fontSize="10" fontFamily="var(--font-mono)">&amp;&amp;</text>
    <text x="2" y="47" fill={PURPLE_DIM} fontSize="9" fontFamily="var(--font-mono)">→</text>
  </svg>
);

export const CodeSymbolsFeatures: React.FC = () => (
  <svg width="120" height="54" viewBox="0 0 120 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="14" fill={BLUE_DIM} fontSize="10" fontFamily="var(--font-mono)">int* p = &amp;val;</text>
    <text x="4" y="32" fill={VIOLET_DIM} fontSize="9" fontFamily="var(--font-mono)">template&lt;typename T&gt;</text>
    <text x="4" y="48" fill={PURPLE_DIM} fontSize="8" fontFamily="var(--font-mono)">const auto&amp;</text>
  </svg>
);

export const CodeSymbolsAlgorithms: React.FC = () => (
  <svg width="110" height="50" viewBox="0 0 110 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="14" fill={PURPLE_DIM} fontSize="10" fontFamily="var(--font-mono)">head-&gt;next</text>
    <text x="4" y="31" fill={BLUE_DIM} fontSize="9" fontFamily="var(--font-mono)">nullptr_t</text>
    <text x="4" y="46" fill={VIOLET_DIM} fontSize="8" fontFamily="var(--font-mono)">size_t O(log n)</text>
  </svg>
);

export const CodeSymbolsWorkflow: React.FC = () => (
  <svg width="115" height="50" viewBox="0 0 115 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="14" fill={BLUE_DIM} fontSize="9" fontFamily="var(--font-mono)">delete[] arr;</text>
    <text x="4" y="30" fill={PURPLE_DIM} fontSize="9" fontFamily="var(--font-mono)">new Node&#123;val&#125;;</text>
    <text x="4" y="46" fill={VIOLET_DIM} fontSize="8" fontFamily="var(--font-mono)">std::vector&lt;int&gt;</text>
  </svg>
);

export const CodeSymbolsLearning: React.FC = () => (
  <svg width="100" height="48" viewBox="0 0 100 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="14" fill={VIOLET_DIM} fontSize="10" fontFamily="var(--font-mono)">assert(p != null);</text>
    <text x="4" y="31" fill={BLUE_DIM} fontSize="9" fontFamily="var(--font-mono)">#include &lt;memory&gt;</text>
    <text x="4" y="45" fill={PURPLE_DIM} fontSize="8" fontFamily="var(--font-mono)">0x7FFEE4B0</text>
  </svg>
);

export const CodeSymbolsCTA: React.FC = () => (
  <svg width="90" height="44" viewBox="0 0 90 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="14" fill={BLUE_DIM} fontSize="11" fontFamily="var(--font-mono)">int main() &#123;</text>
    <text x="14" y="28" fill={PURPLE_DIM} fontSize="9" fontFamily="var(--font-mono)">return 0;</text>
    <text x="4" y="40" fill={BLUE_DIM} fontSize="11" fontFamily="var(--font-mono)">&#125;</text>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   SECTION-SPECIFIC DECORATION EXPORTS
   ───────────────────────────────────────────────────────────── */

/** Floating elements for Hero section */
export const HeroFloatingDSA: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'visible' }} aria-hidden="true">
      {/* Upper-left Linked List */}
      <div style={{ ...wrapBase, top: '6%', left: '3%', transform: 'rotate(-3deg)' }} className="dsa-float dsa-float-1">
        <LinkedListHero />
      </div>

      {/* Mid-left Binary Tree */}
      <div style={{ ...wrapBase, top: '56%', left: '2%', transform: 'rotate(2deg)' }} className="dsa-float dsa-float-2">
        <BinaryTreeHero />
      </div>

      {/* Lower-left Stack */}
      <div style={{ ...wrapBase, bottom: '6%', left: '5%', transform: 'rotate(-2deg)' }} className="dsa-float dsa-float-3">
        <StackHero />
      </div>

      {/* Left Code Symbols */}
      <div style={{ ...wrapBase, top: '34%', left: '2%', transform: 'rotate(4deg)' }} className="dsa-float dsa-float-7">
        <CodeSymbolsHero1 />
      </div>

      {/* Upper-right Graph */}
      <div style={{ ...wrapBase, top: '8%', right: '3%', transform: 'rotate(3deg)' }} className="dsa-float dsa-float-4">
        <GraphHero />
      </div>

      {/* Mid-right Array */}
      <div style={{ ...wrapBase, top: '54%', right: '3%', transform: 'rotate(-2deg)' }} className="dsa-float dsa-float-5">
        <ArrayHero />
      </div>

      {/* Lower-right Queue */}
      <div style={{ ...wrapBase, bottom: '6%', right: '4%', transform: 'rotate(1deg)' }} className="dsa-float dsa-float-6">
        <QueueHero />
      </div>

      {/* Right Code Symbols */}
      <div style={{ ...wrapBase, top: '32%', right: '2%', transform: 'rotate(-5deg)' }} className="dsa-float dsa-float-8">
        <CodeSymbolsHero2 />
      </div>
    </div>
  );
};

/** Floating elements for Features section */
export const FeaturesFloatingDSA: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'visible' }} aria-hidden="true">
      {/* Left flank: Pointer Chain */}
      <div style={{ ...wrapBase, top: '22%', left: '2%', transform: 'rotate(-2deg)' }} className="dsa-float dsa-float-3">
        <LinkedListPointer />
      </div>

      {/* Left flank: Code snippet */}
      <div style={{ ...wrapBase, bottom: '18%', left: '3%', transform: 'rotate(3deg)' }} className="dsa-float dsa-float-7">
        <CodeSymbolsFeatures />
      </div>

      {/* Right flank: Indexed Array */}
      <div style={{ ...wrapBase, top: '18%', right: '2%', transform: 'rotate(2deg)' }} className="dsa-float dsa-float-5">
        <ArrayIndexed />
      </div>

      {/* Right flank: Directed Graph */}
      <div style={{ ...wrapBase, bottom: '15%', right: '3%', transform: 'rotate(-3deg)' }} className="dsa-float dsa-float-4">
        <DirectedGraph />
      </div>
    </div>
  );
};

/** Floating elements for DataStructures / Algorithms section */
export const AlgorithmsFloatingDSA: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'visible' }} aria-hidden="true">
      {/* Left flank: Doubly Linked List */}
      <div style={{ ...wrapBase, top: '14%', left: '2%', transform: 'rotate(2deg)' }} className="dsa-float dsa-float-1">
        <DoublyLinkedList />
      </div>

      {/* Left flank: Code Symbols */}
      <div style={{ ...wrapBase, top: '65%', left: '3%', transform: 'rotate(-3deg)' }} className="dsa-float dsa-float-8">
        <CodeSymbolsAlgorithms />
      </div>

      {/* Right flank: 5-Node Balanced BST */}
      <div style={{ ...wrapBase, top: '12%', right: '2%', transform: 'rotate(-2deg)' }} className="dsa-float dsa-float-2">
        <BinarySearchTree5 />
      </div>

      {/* Right flank: Binary Search Array */}
      <div style={{ ...wrapBase, top: '68%', right: '2%', transform: 'rotate(3deg)' }} className="dsa-float dsa-float-6">
        <ArrayBinarySearch />
      </div>
    </div>
  );
};

/** Floating elements for HowItWorks / Workflow section */
export const WorkflowFloatingDSA: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'visible' }} aria-hidden="true">
      {/* Left flank: Call Stack Frames */}
      <div style={{ ...wrapBase, top: '25%', left: '3%', transform: 'rotate(-2deg)' }} className="dsa-float dsa-float-4">
        <CallStackFrames />
      </div>

      {/* Left flank: Code symbols */}
      <div style={{ ...wrapBase, bottom: '12%', left: '2%', transform: 'rotate(3deg)' }} className="dsa-float dsa-float-7">
        <CodeSymbolsWorkflow />
      </div>

      {/* Right flank: AVL Node */}
      <div style={{ ...wrapBase, top: '20%', right: '3%', transform: 'rotate(2deg)' }} className="dsa-float dsa-float-3">
        <TreeNodeAVL />
      </div>

      {/* Right flank: Queue Buffer */}
      <div style={{ ...wrapBase, bottom: '14%', right: '2%', transform: 'rotate(-1deg)' }} className="dsa-float dsa-float-5">
        <QueueBuffer />
      </div>
    </div>
  );
};

/** Floating elements for LearningBenefits section */
export const LearningFloatingDSA: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'visible' }} aria-hidden="true">
      {/* Left flank: Graph cycle */}
      <div style={{ ...wrapBase, top: '28%', left: '3%', transform: 'rotate(3deg)' }} className="dsa-float dsa-float-2">
        <GraphCycle />
      </div>

      {/* Left flank: Code symbols */}
      <div style={{ ...wrapBase, bottom: '18%', left: '2%', transform: 'rotate(-2deg)' }} className="dsa-float dsa-float-8">
        <CodeSymbolsLearning />
      </div>

      {/* Right flank: Sorting Array */}
      <div style={{ ...wrapBase, top: '24%', right: '2%', transform: 'rotate(-3deg)' }} className="dsa-float dsa-float-6">
        <ArraySorting />
      </div>
    </div>
  );
};

/** Floating elements for DownloadCTA section & Bottom */
export const BottomCTAFloatingDSA: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'visible' }} aria-hidden="true">
      {/* Left flank: Terminating linked list */}
      <div style={{ ...wrapBase, top: '35%', left: '3%', transform: 'rotate(-3deg)' }} className="dsa-float dsa-float-1">
        <LinkedListTerminator />
      </div>

      {/* Left flank: Code symbols */}
      <div style={{ ...wrapBase, bottom: '12%', left: '4%', transform: 'rotate(2deg)' }} className="dsa-float dsa-float-7">
        <CodeSymbolsCTA />
      </div>

      {/* Right flank: Push Stack */}
      <div style={{ ...wrapBase, top: '28%', right: '4%', transform: 'rotate(2deg)' }} className="dsa-float dsa-float-3">
        <StackPush />
      </div>
    </div>
  );
};

/* Backward compatible alias */
export const FloatingDSA = HeroFloatingDSA;
