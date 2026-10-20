import { useState, type ElementType } from 'react';
import { AlgorithmsFloatingDSA } from './FloatingDSA';
import {
  ListFilter,
  Grid,
  Layers,
  ArrowRightLeft,
  GitFork,
  Share2,
  ArrowUpDown,
  Search,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface TabData {
  id: string;
  name: string;
  icon: ElementType;
  status: 'Core Support' | 'Interactive Preview' | 'Coming Soon';
  tagline: string;
  explanation: string;
  learningPoints: string[];
  complexity: { time: string; space: string };
}

const TABS: TabData[] = [
  {
    id: 'linked-list',
    name: 'Linked List',
    icon: ListFilter,
    status: 'Core Support',
    tagline: 'Dynamic heap node chaining via pointers',
    explanation:
      'A linear collection of data elements where order is not given by their physical placement in memory. Instead, each node points to the next using raw memory addresses.',
    learningPoints: [
      'Nodes contain data payload and pointer to next node',
      'Constant time O(1) insertion and deletion at head',
      'Last node points to nullptr ground terminator',
      'Requires dereferencing pointers (head->next)',
    ],
    complexity: { time: 'O(n) search, O(1) insert', space: 'O(n)' },
  },
  {
    id: 'array',
    name: 'Array',
    icon: Grid,
    status: 'Interactive Preview',
    tagline: 'Contiguous memory layout with O(1) index access',
    explanation:
      'Fixed-size sequential collection of elements of the same type stored at contiguous memory locations. Indexing uses direct base address calculation: base + (index * sizeof(T)).',
    learningPoints: [
      'Instantaneous random access via 0-based index calculation',
      'Cache-friendly memory locality in CPU L1/L2 caches',
      'Fixed size in static C++ arrays; dynamic in std::vector',
      'Insertion/deletion requires shifting subsequent elements',
    ],
    complexity: { time: 'O(1) access, O(n) insert', space: 'O(n)' },
  },
  {
    id: 'stack',
    name: 'Stack',
    icon: Layers,
    status: 'Interactive Preview',
    tagline: 'LIFO (Last In, First Out) container adaptor',
    explanation:
      'Elements are added and removed only from the top. Used extensively in computer architecture for call stacks, expression evaluation, and backtracking algorithms.',
    learningPoints: [
      'Strict Last-In, First-Out (LIFO) discipline',
      'Push adds to top; Pop removes and inspects the top element',
      'Direct mapping to C++ call frames and recursion depth',
      'O(1) time complexity for all standard operations',
    ],
    complexity: { time: 'O(1) push/pop', space: 'O(n)' },
  },
  {
    id: 'queue',
    name: 'Queue',
    icon: ArrowRightLeft,
    status: 'Interactive Preview',
    tagline: 'FIFO (First In, First Out) sequential buffer',
    explanation:
      'Elements are inserted at the back (rear/enqueue) and removed from the front (dequeue). Essential for BFS, CPU scheduling, and asynchronous message buffers.',
    learningPoints: [
      'Strict First-In, First-Out (FIFO) ordering',
      'Dual pointer tracking: Front (head) and Rear (tail)',
      'Underpins Breadth-First Search (BFS) graph traversals',
      'Can be implemented as circular ring buffers in memory',
    ],
    complexity: { time: 'O(1) enqueue/dequeue', space: 'O(n)' },
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    icon: GitFork,
    status: 'Interactive Preview',
    tagline: 'Hierarchical node branching with left & right subtrees',
    explanation:
      'A non-linear hierarchical data structure where each node has at most two children referred to as left child and right child. The foundation of BSTs, AVL, and Heaps.',
    learningPoints: [
      'Root node serves as the unique entry point',
      'Left subtree holds values smaller than root (in BST)',
      'Enables efficient logarithmic O(log n) lookup when balanced',
      'Supports In-order, Pre-order, and Post-order recursive traversals',
    ],
    complexity: { time: 'O(log n) balanced search', space: 'O(n)' },
  },
  {
    id: 'graph',
    name: 'Graph',
    icon: Share2,
    status: 'Interactive Preview',
    tagline: 'Vertices connected by directed or undirected edges',
    explanation:
      'A network of vertices (nodes) and edges (connections). Represents networks, social graphs, dependency trees, and pathfinding maps.',
    learningPoints: [
      'Modeled via Adjacency Matrix or Adjacency List in C++',
      'Can be directed or undirected, cyclic or acyclic (DAG)',
      'Traversed using Depth-First Search (DFS) or Breadth-First Search (BFS)',
      'Core foundation of Dijkstra and A* pathfinding',
    ],
    complexity: { time: 'O(V + E) traversal', space: 'O(V + E)' },
  },
  {
    id: 'sorting',
    name: 'Sorting',
    icon: ArrowUpDown,
    status: 'Interactive Preview',
    tagline: 'Visualizing element comparisons and swaps',
    explanation:
      'Watch sorting algorithms reorder elements in ascending order. Observe how comparison counts and memory swaps evolve dynamically during each pass.',
    learningPoints: [
      'Visualizes comparison pairs and in-place element swaps',
      'Contrasts quadratic O(n²) Bubble/Insertion with O(n log n) Merge/Quick',
      'Demonstrates stability and memory overhead trade-offs',
      'Helps students intuitively grasp partition pivots',
    ],
    complexity: { time: 'O(n log n) Quick/Merge', space: 'O(1) to O(n)' },
  },
  {
    id: 'searching',
    name: 'Searching',
    icon: Search,
    status: 'Interactive Preview',
    tagline: 'Linear scan vs logarithmic binary search interval halving',
    explanation:
      'Observe binary search halving the search space on sorted data by comparing target with midpoint index. Replaces slow O(n) scans with fast O(log n) convergence.',
    learningPoints: [
      'Requires input array to be pre-sorted',
      'Maintains Low, Mid, and High boundary pointers',
      'Eliminates half the remaining elements at each comparison step',
      'Locates target in at most ⌈log₂(n)⌉ + 1 comparisons',
    ],
    complexity: { time: 'O(log n) Binary Search', space: 'O(1)' },
  },
];

export const DataStructuresSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('linked-list');

  // Interactive state for specific diagrams
  const [arraySelectedIndex, setArraySelectedIndex] = useState<number>(2);
  const [stackItems, setStackItems] = useState<number[]>([14, 28, 42, 56]);
  const [queueItems, setQueueItems] = useState<number[]>([10, 20, 30, 40]);
  const [searchStep, setSearchStep] = useState<number>(1);
  const [sortStep, setSortStep] = useState<number>(0);
  const [activeGraphNode, setActiveGraphNode] = useState<string>('A');

  const currentTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  // Sorting animation steps
  const sortSteps = [
    { arr: [45, 12, 89, 34, 25], comparing: [0, 1], swapped: true, desc: "Comparing 45 and 12 -> Swap needed" },
    { arr: [12, 45, 89, 34, 25], comparing: [1, 2], swapped: false, desc: "Comparing 45 and 89 -> In correct order" },
    { arr: [12, 45, 89, 34, 25], comparing: [2, 3], swapped: true, desc: "Comparing 89 and 34 -> Swap needed" },
    { arr: [12, 45, 34, 89, 25], comparing: [3, 4], swapped: true, desc: "Comparing 89 and 25 -> Swap needed (89 reaches end)" },
    { arr: [12, 34, 25, 45, 89], comparing: [1, 2], swapped: true, desc: "Pass 2: Swapping 34 and 25" },
    { arr: [12, 25, 34, 45, 89], comparing: [], swapped: false, desc: "Array sorted! [12, 25, 34, 45, 89]" },
  ];

  // Search steps for target 42 in [10, 20, 30, 42, 55, 68, 77, 90]
  const searchSteps = [
    { low: 0, high: 7, mid: 3, target: 42, match: true, desc: "Low=0 (10), High=7 (90). Mid=3 (42). Target 42 found at index 3 in 1 step!" },
    { low: 0, high: 7, mid: 3, target: 55, match: false, desc: "Low=0, High=7, Mid=3 (42). Target 55 > 42 -> Search right half." },
    { low: 4, high: 7, mid: 5, target: 55, match: false, desc: "Low=4 (55), High=7 (90), Mid=5 (68). Target 55 < 68 -> Search left." },
    { low: 4, high: 4, mid: 4, target: 55, match: true, desc: "Low=4, High=4, Mid=4 (55). Target 55 found at index 4!" },
  ];

  const handlePushStack = () => {
    if (stackItems.length < 5) {
      const nextVal = (stackItems[stackItems.length - 1] || 10) + 14;
      setStackItems([...stackItems, nextVal]);
    }
  };

  const handlePopStack = () => {
    if (stackItems.length > 1) {
      setStackItems(stackItems.slice(0, -1));
    }
  };

  const handleEnqueue = () => {
    if (queueItems.length < 5) {
      const nextVal = (queueItems[queueItems.length - 1] || 10) + 10;
      setQueueItems([...queueItems, nextVal]);
    }
  };

  const handleDequeue = () => {
    if (queueItems.length > 1) {
      setQueueItems(queueItems.slice(1));
    }
  };

  // Render diagram based on active tab
  const renderDiagram = () => {
    switch (activeTabId) {
      case 'linked-list':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Head pointer */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#168BFF', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>head</span>
                <div style={{ padding: '6px 12px', backgroundColor: '#152235', border: '1px solid #168BFF', borderRadius: '6px', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                  0x7FA0
                </div>
              </div>

              <span style={{ color: '#168BFF', fontSize: '18px', fontWeight: 700 }}>→</span>

              {/* Node 10 */}
              <div style={{ display: 'flex', border: '1px solid #26364A', borderRadius: '8px', backgroundColor: '#101A28', overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', backgroundColor: 'rgba(22, 139, 255, 0.1)', borderRight: '1px solid #26364A', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>data</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>10</div>
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>next</div>
                  <div style={{ fontSize: '0.75rem', color: '#3CCB83', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>0x7FB8</div>
                </div>
              </div>

              <span style={{ color: '#168BFF', fontSize: '18px', fontWeight: 700 }}>→</span>

              {/* Node 20 */}
              <div style={{ display: 'flex', border: '1px solid #168BFF', borderRadius: '8px', backgroundColor: '#101A28', overflow: 'hidden', boxShadow: '0 0 16px rgba(22, 139, 255, 0.3)' }}>
                <div style={{ padding: '10px 14px', backgroundColor: 'rgba(22, 139, 255, 0.15)', borderRight: '1px solid #26364A', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.625rem', color: '#168BFF' }}>data</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>20</div>
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>next</div>
                  <div style={{ fontSize: '0.75rem', color: '#3CCB83', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>0x7FD0</div>
                </div>
              </div>

              <span style={{ color: '#168BFF', fontSize: '18px', fontWeight: 700 }}>→</span>

              {/* Node 30 */}
              <div style={{ display: 'flex', border: '1px solid #26364A', borderRadius: '8px', backgroundColor: '#101A28', overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', backgroundColor: 'rgba(22, 139, 255, 0.1)', borderRight: '1px solid #26364A', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>data</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>30</div>
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>next</div>
                  <div style={{ fontSize: '0.75rem', color: '#ED6A5E', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>nullptr</div>
                </div>
              </div>

              <span style={{ color: '#ED6A5E', fontSize: '18px', fontWeight: 700 }}>→</span>

              {/* Nullptr */}
              <div style={{ padding: '8px 12px', border: '1px dashed #ED6A5E', borderRadius: '6px', color: '#ED6A5E', fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(237, 106, 94, 0.08)' }}>
                nullptr (0x0)
              </div>
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Full GDB execution synchronization available in the SimIDE extension.
            </div>
          </div>
        );

      case 'array':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '10px', maxWidth: '100%' }}>
              {[15, 32, 48, 64, 80, 96].map((val, idx) => {
                const isSelected = idx === arraySelectedIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setArraySelectedIndex(idx)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: isSelected ? 'rgba(22, 139, 255, 0.15)' : '#101A28',
                      border: isSelected ? '2px solid #168BFF' : '1px solid #26364A',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 0 16px rgba(22, 139, 255, 0.35)' : 'none',
                      transition: 'all 0.2s ease',
                      minWidth: '58px',
                    }}
                  >
                    <span style={{ fontSize: '0.6875rem', color: isSelected ? '#168BFF' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      [{idx}]
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F4F7FB', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                      {val}
                    </span>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      +{(idx * 4)}B
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ backgroundColor: '#101A28', border: '1px solid #26364A', borderRadius: '8px', padding: '10px 16px', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
              arr[{arraySelectedIndex}] = <span style={{ color: '#168BFF', fontWeight: 700 }}>{[15, 32, 48, 64, 80, 96][arraySelectedIndex]}</span> | Address: 0x1000 + ({arraySelectedIndex} × 4) = <span style={{ color: '#3CCB83' }}>0x{ (0x1000 + arraySelectedIndex * 4).toString(16).toUpperCase() }</span>
            </div>
          </div>
        );

      case 'stack':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handlePushStack} disabled={stackItems.length >= 5} className="btn btn-primary btn-sm">
                + Push()
              </button>
              <button onClick={handlePopStack} disabled={stackItems.length <= 1} className="btn btn-secondary btn-sm">
                - Pop()
              </button>
            </div>

            {/* Vertical Stack Tube */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '6px',
                width: '180px',
                minHeight: '190px',
                borderLeft: '3px solid #26364A',
                borderRight: '3px solid #26364A',
                borderBottom: '3px solid #26364A',
                borderRadius: '0 0 10px 10px',
                padding: '8px',
                backgroundColor: 'rgba(16, 26, 40, 0.4)',
                position: 'relative',
              }}
            >
              {stackItems.map((val, idx) => {
                const isTop = idx === stackItems.length - 1;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      backgroundColor: isTop ? '#152235' : '#101A28',
                      border: isTop ? '1px solid #168BFF' : '1px solid #26364A',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isTop ? '0 0 12px rgba(22, 139, 255, 0.3)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#F4F7FB' }}>
                      {val}
                    </span>
                    {isTop && (
                      <span style={{ fontSize: '0.6875rem', color: '#168BFF', fontWeight: 700, backgroundColor: 'rgba(22, 139, 255, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                        TOP ◀
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'queue':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleEnqueue} disabled={queueItems.length >= 5} className="btn btn-primary btn-sm">
                + Enqueue(Rear)
              </button>
              <button onClick={handleDequeue} disabled={queueItems.length <= 1} className="btn btn-secondary btn-sm">
                - Dequeue(Front)
              </button>
            </div>

            {/* Queue Horizontal Pipe */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderTop: '2px dashed #26364A',
                borderBottom: '2px dashed #26364A',
                padding: '16px 8px',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#3CCB83', fontWeight: 700 }}>FRONT (Exit) ◀</span>

              {queueItems.map((val, idx) => {
                const isFront = idx === 0;
                const isRear = idx === queueItems.length - 1;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 18px',
                      backgroundColor: isFront ? 'rgba(60, 203, 131, 0.15)' : isRear ? 'rgba(22, 139, 255, 0.15)' : '#101A28',
                      border: isFront ? '1px solid #3CCB83' : isRear ? '1px solid #168BFF' : '1px solid #26364A',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{val}</span>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                      {isFront ? 'Front' : isRear ? 'Rear' : `Pos ${idx}`}
                    </span>
                  </div>
                );
              })}

              <span style={{ fontSize: '0.75rem', color: '#168BFF', fontWeight: 700 }}>◀ REAR (Entry)</span>
            </div>
          </div>
        );

      case 'binary-tree':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="280" height="190" viewBox="0 0 280 190" fill="none">
              {/* Edges */}
              <line x1="140" y1="36" x2="80" y2="90" stroke="#26364A" strokeWidth="2" />
              <line x1="140" y1="36" x2="200" y2="90" stroke="#168BFF" strokeWidth="2" />
              <line x1="80" y1="90" x2="45" y2="150" stroke="#26364A" strokeWidth="2" />
              <line x1="80" y1="90" x2="115" y2="150" stroke="#26364A" strokeWidth="2" />
              <line x1="200" y1="90" x2="175" y2="150" stroke="#26364A" strokeWidth="2" />
              <line x1="200" y1="90" x2="235" y2="150" stroke="#168BFF" strokeWidth="2" />

              {/* Root 50 */}
              <circle cx="140" cy="36" r="18" fill="#152235" stroke="#168BFF" strokeWidth="2" />
              <text x="140" y="41" fill="#F4F7FB" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono">50</text>

              {/* Left 30 */}
              <circle cx="80" cy="90" r="16" fill="#101A28" stroke="#26364A" strokeWidth="2" />
              <text x="80" y="95" fill="#F4F7FB" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono">30</text>

              {/* Right 70 (Highlighted) */}
              <circle cx="200" cy="90" r="16" fill="#152235" stroke="#168BFF" strokeWidth="2" />
              <text x="200" y="95" fill="#168BFF" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono">70</text>

              {/* Leaves */}
              <circle cx="45" cy="150" r="14" fill="#101A28" stroke="#26364A" strokeWidth="1.5" />
              <text x="45" y="154" fill="#A7B5C7" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">20</text>

              <circle cx="115" cy="150" r="14" fill="#101A28" stroke="#26364A" strokeWidth="1.5" />
              <text x="115" y="154" fill="#A7B5C7" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">40</text>

              <circle cx="175" cy="150" r="14" fill="#101A28" stroke="#26364A" strokeWidth="1.5" />
              <text x="175" y="154" fill="#A7B5C7" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">60</text>

              <circle cx="235" cy="150" r="14" fill="#152235" stroke="#A78BFA" strokeWidth="2" />
              <text x="235" y="154" fill="#A78BFA" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono">85</text>
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              In-Order Traversal: 20 → 30 → 40 → 50 → 60 → 70 → 85
            </span>
          </div>
        );

      case 'graph':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="280" height="190" viewBox="0 0 280 190" fill="none">
              {/* Edges */}
              <line x1="60" y1="60" x2="140" y2="35" stroke={activeGraphNode === 'A' || activeGraphNode === 'B' ? '#168BFF' : '#26364A'} strokeWidth="2" />
              <line x1="60" y1="60" x2="90" y2="140" stroke={activeGraphNode === 'A' || activeGraphNode === 'D' ? '#168BFF' : '#26364A'} strokeWidth="2" />
              <line x1="140" y1="35" x2="220" y2="60" stroke={activeGraphNode === 'B' || activeGraphNode === 'C' ? '#168BFF' : '#26364A'} strokeWidth="2" />
              <line x1="140" y1="35" x2="140" y2="120" stroke={activeGraphNode === 'B' || activeGraphNode === 'E' ? '#168BFF' : '#26364A'} strokeWidth="2" />
              <line x1="220" y1="60" x2="200" y2="145" stroke={activeGraphNode === 'C' || activeGraphNode === 'F' ? '#168BFF' : '#26364A'} strokeWidth="2" />
              <line x1="90" y1="140" x2="140" y2="120" stroke={activeGraphNode === 'D' || activeGraphNode === 'E' ? '#168BFF' : '#26364A'} strokeWidth="2" />
              <line x1="140" y1="120" x2="200" y2="145" stroke={activeGraphNode === 'E' || activeGraphNode === 'F' ? '#168BFF' : '#26364A'} strokeWidth="2" />

              {/* Vertices */}
              {[
                { id: 'A', x: 60, y: 60 },
                { id: 'B', x: 140, y: 35 },
                { id: 'C', x: 220, y: 60 },
                { id: 'D', x: 90, y: 140 },
                { id: 'E', x: 140, y: 120 },
                { id: 'F', x: 200, y: 145 },
              ].map((v) => {
                const isActive = activeGraphNode === v.id;
                return (
                  <g key={v.id} onClick={() => setActiveGraphNode(v.id)} style={{ cursor: 'pointer' }}>
                    <circle
                      cx={v.x}
                      cy={v.y}
                      r={isActive ? 18 : 16}
                      fill={isActive ? '#152235' : '#101A28'}
                      stroke={isActive ? '#168BFF' : '#26364A'}
                      strokeWidth={isActive ? 2.5 : 1.5}
                    />
                    <text
                      x={v.x}
                      y={v.y + 4}
                      fill={isActive ? '#168BFF' : '#F4F7FB'}
                      fontSize="12"
                      fontWeight="700"
                      textAnchor="middle"
                      fontFamily="JetBrains Mono"
                    >
                      {v.id}
                    </text>
                  </g>
                );
              })}
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Click any node to inspect adjacent edges (Active Vertex: {activeGraphNode})
            </span>
          </div>
        );

      case 'sorting':
        const currentSort = sortSteps[sortStep];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => setSortStep((prev) => (prev + 1) % sortSteps.length)}
                className="btn btn-primary btn-sm"
              >
                <Play size={14} /> Step Pass ({sortStep + 1}/{sortSteps.length})
              </button>
              <button onClick={() => setSortStep(0)} className="btn btn-secondary btn-sm">
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Sorting Bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px', padding: '10px 0' }}>
              {currentSort.arr.map((val, idx) => {
                const isComparing = currentSort.comparing.includes(idx);
                const heightPercent = (val / 95) * 100;
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: isComparing ? '#168BFF' : '#F4F7FB' }}>
                      {val}
                    </span>
                    <div
                      style={{
                        width: '36px',
                        height: `${heightPercent}px`,
                        backgroundColor: isComparing ? '#168BFF' : '#152235',
                        border: isComparing ? '1px solid #168BFF' : '1px solid #26364A',
                        borderRadius: '6px 6px 0 0',
                        boxShadow: isComparing ? '0 0 14px rgba(22, 139, 255, 0.4)' : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>[{idx}]</span>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: '0.8125rem', color: '#A7B5C7', backgroundColor: '#101A28', padding: '8px 16px', borderRadius: '6px', border: '1px solid #26364A' }}>
              {currentSort.desc}
            </div>
          </div>
        );

      case 'searching':
        const curSearch = searchSteps[searchStep];
        const searchArr = [10, 20, 30, 42, 55, 68, 77, 90];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => setSearchStep((prev) => (prev + 1) % searchSteps.length)}
                className="btn btn-primary btn-sm"
              >
                <Search size={14} /> Next Interval Step ({searchStep + 1}/{searchSteps.length})
              </button>
              <button onClick={() => setSearchStep(0)} className="btn btn-secondary btn-sm">
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Binary Search Cells */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '6px 0', maxWidth: '100%' }}>
              {searchArr.map((val, idx) => {
                const isMid = idx === curSearch.mid;
                const inRange = idx >= curSearch.low && idx <= curSearch.high;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px 14px',
                      backgroundColor: isMid ? 'rgba(22, 139, 255, 0.2)' : inRange ? '#101A28' : 'rgba(16, 26, 40, 0.3)',
                      border: isMid ? '2px solid #168BFF' : inRange ? '1px solid #26364A' : '1px solid rgba(38, 54, 74, 0.3)',
                      borderRadius: '6px',
                      opacity: inRange ? 1 : 0.35,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span style={{ fontSize: '0.625rem', color: isMid ? '#168BFF' : 'var(--text-muted)' }}>
                      {isMid ? 'MID' : `[${idx}]`}
                    </span>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: isMid ? '#168BFF' : '#F4F7FB' }}>
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: '0.8125rem', color: '#A7B5C7', backgroundColor: '#101A28', padding: '8px 16px', borderRadius: '6px', border: '1px solid #26364A', textAlign: 'center' }}>
              {curSearch.desc}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="algorithms" className="section" style={{ position: 'relative', overflow: 'visible' }}>
      <AlgorithmsFloatingDSA />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge purple">
            <Sparkles size={14} />
            <span>Visual DSA Suite</span>
          </div>
          <h2 className="section-title">
            Every Algorithm, <span className="gradient-text-blue-purple">Visually.</span>
          </h2>
          <p className="section-desc">
            From arrays to graphs, see how data structures and algorithms work.
          </p>
        </div>

        {/* 8 Selectable Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '100px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid #168BFF' : '1px solid #26364A',
                  backgroundColor: isActive ? 'rgba(22, 139, 255, 0.15)' : 'rgba(16, 26, 40, 0.6)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 0 16px rgba(22, 139, 255, 0.25)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <Icon size={16} color={isActive ? '#168BFF' : 'var(--text-muted)'} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Two-Column Interactive Stage */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.35fr',
            gap: '32px',
            alignItems: 'stretch',
          }}
          className="dsa-stage-grid"
        >
          {/* Left Column: Details & Learning Points */}
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: currentTab.status === 'Core Support' ? '#3CCB83' : '#A78BFA',
                    backgroundColor: currentTab.status === 'Core Support' ? 'rgba(60, 203, 131, 0.12)' : 'rgba(167, 139, 250, 0.12)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: `1px solid ${currentTab.status === 'Core Support' ? 'rgba(60, 203, 131, 0.3)' : 'rgba(167, 139, 250, 0.3)'}`,
                  }}
                >
                  {currentTab.status === 'Core Support' ? '✓ Core Extension Engine' : 'Interactive Preview'}
                </span>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {currentTab.complexity.time}
                </span>
              </div>

              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>
                {currentTab.name}
              </h3>

              <div style={{ fontSize: '0.9375rem', color: '#168BFF', fontWeight: 600, marginBottom: '16px' }}>
                {currentTab.tagline}
              </div>

              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                {currentTab.explanation}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Core Learning Concepts
                </div>
                {currentTab.learningPoints.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle size={16} color="#168BFF" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom status note per specification */}
            <div
              style={{
                marginTop: '28px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              {currentTab.status === 'Core Support'
                ? 'Full pointer dereferencing and node step-through natively supported in SimIDE core.'
                : 'Interactive web demonstration. Extension integration for this structure is on the upcoming release roadmap.'}
            </div>
          </div>

          {/* Right Column: Live Interactive Diagram */}
          <div
            className="card"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0A101A',
              border: '1px solid var(--border-color)',
              minHeight: '380px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Interactive SVG Canvas
            </div>

            {renderDiagram()}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dsa-stage-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
