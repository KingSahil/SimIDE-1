import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
} from 'd3-force';
import type {
  Simulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from 'd3-force';

/**
 * DraggableDSA — Spring wrapper for floating items with dragSnapToOrigin.
 * When released, it smoothly springs back to its original position!
 */
export const DraggableDSA: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  initialOffset?: { x: number; y: number };
}> = ({ children, style, className, initialOffset = { x: 0, y: 0 } }) => {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.3}
      dragTransition={{ bounceStiffness: 450, bounceDamping: 24 }}
      initial={{ x: initialOffset.x, y: initialOffset.y }}
      whileHover={{
        scale: 1.05,
        filter: 'drop-shadow(0 0 20px rgba(22, 139, 255, 0.85))',
        zIndex: 50,
      }}
      whileDrag={{
        scale: 1.12,
        cursor: 'grabbing',
        zIndex: 100,
        filter: 'drop-shadow(0 0 32px rgba(0, 210, 255, 0.95)) drop-shadow(0 12px 24px rgba(0, 0, 0, 0.8))',
      }}
      style={{
        position: 'absolute',
        pointerEvents: 'auto',
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   1. D3-FORCE INTERACTIVE LINKED LIST
   Reference: C:\Projects\vscode-extension\webview\app.ts
   Every single node can be dragged and springs back to original position!
   ───────────────────────────────────────────────────────────── */

interface D3LLNode extends SimulationNodeDatum {
  id: string;
  type: 'head' | 'node' | 'null';
  val?: number;
  addr?: string;
  nextAddr?: string | null;
  targetX: number;
  targetY: number;
  width: number;
  height: number;
}

interface D3LLLink extends SimulationLinkDatum<D3LLNode> {
  source: string | D3LLNode;
  target: string | D3LLNode;
  distance: number;
  strength: number;
}

export const D3InteractiveLinkedList: React.FC<{
  initialNodes?: Array<{ val: number; addr: string; nextAddr: string | null }>;
  scale?: number;
}> = ({
  initialNodes = [
    { val: 10, addr: '0x7FA0', nextAddr: '0x7FB8' },
    { val: 25, addr: '0x7FB8', nextAddr: '0x8024' },
    { val: 42, addr: '0x8024', nextAddr: null },
  ],
  scale = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<Simulation<D3LLNode, D3LLLink> | null>(null);

  // Initialize node definitions with target coordinates
  const initialData = useRef<D3LLNode[]>([]);
  const initialLinks = useRef<D3LLLink[]>([]);

  if (initialData.current.length === 0) {
    const rawNodes: D3LLNode[] = [
      {
        id: 'head-ptr',
        type: 'head',
        targetX: 45,
        targetY: 35,
        x: 45,
        y: 35,
        width: 58,
        height: 26,
      },
    ];

    const rawLinks: D3LLLink[] = [
      {
        source: 'head-ptr',
        target: 'node-0',
        distance: 85,
        strength: 0.4,
      },
    ];

    initialNodes.forEach((n, i) => {
      const nodeX = 145 + i * 140;
      rawNodes.push({
        id: `node-${i}`,
        type: 'node',
        val: n.val,
        addr: n.addr,
        nextAddr: n.nextAddr,
        targetX: nodeX,
        targetY: 65,
        x: nodeX,
        y: 65,
        width: 116,
        height: 46,
      });

      if (i < initialNodes.length - 1) {
        rawLinks.push({
          source: `node-${i}`,
          target: `node-${i + 1}`,
          distance: 140,
          strength: 0.4,
        });
      }
    });

    const lastIdx = initialNodes.length - 1;
    const nullX = 145 + initialNodes.length * 140 - 20;
    rawNodes.push({
      id: 'null-ptr',
      type: 'null',
      targetX: nullX,
      targetY: 65,
      x: nullX,
      y: 65,
      width: 54,
      height: 26,
    });

    rawLinks.push({
      source: `node-${lastIdx}`,
      target: 'null-ptr',
      distance: 90,
      strength: 0.4,
    });

    initialData.current = rawNodes;
    initialLinks.current = rawLinks;
  }

  const [nodePositions, setNodePositions] = useState<{ [id: string]: { x: number; y: number } }>(() => {
    const map: { [id: string]: { x: number; y: number } } = {};
    initialData.current.forEach((n) => {
      map[n.id] = { x: n.x!, y: n.y! };
    });
    return map;
  });

  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // Setup D3 Force Simulation with strong home return forces
  useEffect(() => {
    const nodes = initialData.current;
    const links = initialLinks.current;

    const sim = forceSimulation<D3LLNode>(nodes)
      .force(
        'link',
        forceLink<D3LLNode, D3LLLink>(links)
          .id((d) => d.id)
          .distance((l) => l.distance)
          .strength((l) => l.strength)
      )
      .force(
        'charge',
        forceManyBody<D3LLNode>()
          .strength((d) => (d.type === 'node' ? -160 : -60))
          .distanceMax(260)
      )
      .force(
        'collide',
        forceCollide<D3LLNode>()
          .radius((d) => Math.max(d.width, d.height) / 2 + 8)
          .iterations(2)
      )
      .force(
        'centerX',
        forceX<D3LLNode>()
          .x((d) => d.targetX)
          .strength(0.22) // Strong return to original X
      )
      .force(
        'centerY',
        forceY<D3LLNode>()
          .y((d) => d.targetY)
          .strength(0.22) // Strong return to original Y
      )
      .velocityDecay(0.35)
      .alphaDecay(0.02);

    sim.on('tick', () => {
      const updated: { [id: string]: { x: number; y: number } } = {};
      nodes.forEach((n) => {
        if (n.x !== undefined && n.y !== undefined) {
          updated[n.id] = { x: n.x, y: n.y };
        }
      });
      setNodePositions(updated);
    });

    // Idle at mount since nodes are already at target coordinates
    sim.stop();
    simulationRef.current = sim;

    return () => {
      sim.stop();
    };
  }, []);

  // Drag interaction handlers
  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const sim = simulationRef.current;
    if (!sim) return;

    const targetNode = initialData.current.find((n) => n.id === id);
    if (!targetNode) return;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setActiveDragId(id);

    sim.alphaTarget(0.4).restart();
    targetNode.fx = targetNode.x;
    targetNode.fy = targetNode.y;

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const origX = targetNode.x!;
    const origY = targetNode.y!;

    const onPointerMove = (moveEv: PointerEvent) => {
      const dx = (moveEv.clientX - startClientX) / scale;
      const dy = (moveEv.clientY - startClientY) / scale;
      targetNode.fx = origX + dx;
      targetNode.fy = origY + dy;
    };

    const onPointerUp = (upEv: PointerEvent) => {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(upEv.pointerId);
      } catch {}
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      // Release anchor and wake simulation with full alpha so it springs back to original target position!
      targetNode.fx = null;
      targetNode.fy = null;
      sim.alpha(1).restart();
      setActiveDragId(null);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Helper to render dynamic curved SVG arrows between connected nodes
  const renderConnectingArrows = () => {
    return initialLinks.current.map((link, idx) => {
      const srcId = typeof link.source === 'string' ? link.source : link.source.id;
      const tgtId = typeof link.target === 'string' ? link.target : link.target.id;

      const srcPos = nodePositions[srcId];
      const tgtPos = nodePositions[tgtId];
      if (!srcPos || !tgtPos) return null;

      const srcNode = initialData.current.find((n) => n.id === srcId);
      const tgtNode = initialData.current.find((n) => n.id === tgtId);
      if (!srcNode || !tgtNode) return null;

      const srcW = srcNode.width;
      const tgtW = tgtNode.width;

      const dx = tgtPos.x - srcPos.x;
      const dy = tgtPos.y - srcPos.y;
      const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));

      const startX = srcPos.x + (dx / dist) * (srcW / 2);
      const startY = srcPos.y + (dy / dist) * (srcNode.height / 2);
      const endX = tgtPos.x - (dx / dist) * (tgtW / 2 + 4);
      const endY = tgtPos.y - (dy / dist) * (tgtNode.height / 2 + 4);

      const curvature = 16;
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2 - curvature;

      const isHead = srcId === 'head-ptr';
      const strokeColor = isHead ? '#0066FF' : '#168BFF';

      return (
        <path
          key={idx}
          d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeDasharray={isHead ? '4 2' : 'none'}
          fill="none"
          markerEnd={isHead ? 'url(#d3ArrowBlue)' : 'url(#d3ArrowCyan)'}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(22, 139, 255, 0.4))',
            transition: 'stroke 0.2s ease',
          }}
        />
      );
    });
  };

  const totalWidth = 620;
  const totalHeight = 130;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: `${totalWidth}px`,
        height: `${totalHeight}px`,
        pointerEvents: 'auto',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* SVG Layer for Dynamic Connected Links */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <marker id="d3ArrowBlue" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
            <path d="M 0 0.5 L 7 3.5 L 0 6.5 Z" fill="#0066FF" />
          </marker>
          <marker id="d3ArrowCyan" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
            <path d="M 0 0.5 L 7 3.5 L 0 6.5 Z" fill="#168BFF" />
          </marker>
        </defs>
        {renderConnectingArrows()}
      </svg>

      {/* Render Individual Draggable Nodes */}
      {initialData.current.map((node) => {
        const pos = nodePositions[node.id] || { x: node.targetX, y: node.targetY };
        const left = pos.x - node.width / 2;
        const top = pos.y - node.height / 2;
        const isDragging = activeDragId === node.id;

        if (node.type === 'head') {
          return (
            <div
              key={node.id}
              onPointerDown={(e) => handlePointerDown(node.id, e)}
              style={{
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
                width: `${node.width}px`,
                height: `${node.height}px`,
                zIndex: isDragging ? 100 : 5,
                cursor: isDragging ? 'grabbing' : 'grab',
                background: '#142B4D',
                border: '1.5px solid #0066FF',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isDragging
                  ? '0 0 20px rgba(0, 102, 255, 0.8), 0 8px 16px rgba(0,0,0,0.6)'
                  : '0 2px 10px rgba(0, 102, 255, 0.35)',
                transform: isDragging ? 'scale(1.12)' : 'scale(1)',
                transition: isDragging ? 'none' : 'box-shadow 0.2s ease, transform 0.15s ease',
              }}
            >
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#58A6FF' }}>
                head
              </span>
            </div>
          );
        }

        if (node.type === 'null') {
          return (
            <div
              key={node.id}
              onPointerDown={(e) => handlePointerDown(node.id, e)}
              style={{
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
                width: `${node.width}px`,
                height: `${node.height}px`,
                zIndex: isDragging ? 100 : 5,
                cursor: isDragging ? 'grabbing' : 'grab',
                background: 'rgba(22, 27, 34, 0.95)',
                border: '1.5px dashed #484F58',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                boxShadow: isDragging
                  ? '0 0 16px rgba(255, 255, 255, 0.3), 0 8px 16px rgba(0,0,0,0.6)'
                  : '0 2px 8px rgba(0, 0, 0, 0.4)',
                transform: isDragging ? 'scale(1.12)' : 'scale(1)',
                transition: isDragging ? 'none' : 'box-shadow 0.2s ease, transform 0.15s ease',
              }}
            >
              <span style={{ color: '#737D8C', fontWeight: 700, fontSize: '10px' }}>⦸</span>
              <span style={{ color: '#8B949E', fontFamily: 'var(--font-mono)', fontSize: '9px' }}>null</span>
            </div>
          );
        }

        return (
          <div
            key={node.id}
            onPointerDown={(e) => handlePointerDown(node.id, e)}
            style={{
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              width: `${node.width}px`,
              height: `${node.height}px`,
              zIndex: isDragging ? 100 : 5,
              cursor: isDragging ? 'grabbing' : 'grab',
              display: 'flex',
              flexDirection: 'column',
              transform: isDragging ? 'scale(1.12)' : 'scale(1)',
              transition: isDragging ? 'none' : 'box-shadow 0.2s ease, transform 0.15s ease',
            }}
          >
            <span
              style={{
                fontSize: '8px',
                fontFamily: 'var(--font-mono)',
                color: '#737D8C',
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: '2px',
                pointerEvents: 'none',
              }}
            >
              {node.addr}
            </span>

            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '38px',
                background: 'linear-gradient(180deg, #161B22 0%, #0D1117 100%)',
                border: isDragging ? '1.5px solid #00D2FF' : '1.5px solid #30363D',
                borderRadius: '8px',
                boxShadow: isDragging
                  ? '0 0 24px rgba(0, 210, 255, 0.75), 0 8px 20px rgba(0,0,0,0.7)'
                  : '0 4px 14px rgba(0, 0, 0, 0.45)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: '2px 4px',
                  borderRight: '1px solid #21262D',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '6px', fontWeight: 700, color: '#737D8C', letterSpacing: '0.5px' }}>
                  DATA
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#F0F6FC', fontFamily: 'var(--font-mono)' }}>
                  {node.val}
                </span>
              </div>

              <div
                style={{
                  flex: 1.25,
                  padding: '2px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <span style={{ fontSize: '6px', fontWeight: 700, color: '#737D8C', letterSpacing: '0.5px' }}>
                  NEXT
                </span>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: node.nextAddr ? '#58A6FF' : '#8B949E' }}>
                  {node.nextAddr || 'null'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   2. D3-FORCE INTERACTIVE BINARY TREE
   Every tree node springs back to its branch position when released!
   ───────────────────────────────────────────────────────────── */

interface D3TreeNode extends SimulationNodeDatum {
  id: string;
  val: number;
  label: string;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
}

interface D3TreeLink extends SimulationLinkDatum<D3TreeNode> {
  source: string | D3TreeNode;
  target: string | D3TreeNode;
  distance: number;
  strength: number;
}

export const D3InteractiveBinaryTree: React.FC = () => {
  const simulationRef = useRef<Simulation<D3TreeNode, D3TreeLink> | null>(null);

  const initialTreeNodes = useRef<D3TreeNode[]>([
    { id: 'tree-root', val: 50, label: 'root', targetX: 90, targetY: 30, x: 90, y: 30, radius: 22, color: '#3B82F6' },
    { id: 'tree-left', val: 25, label: 'L', targetX: 35, targetY: 100, x: 35, y: 100, radius: 19, color: '#168BFF' },
    { id: 'tree-right', val: 75, label: 'R', targetX: 145, targetY: 100, x: 145, y: 100, radius: 19, color: '#B99AFF' },
  ]);

  const initialTreeLinks = useRef<D3TreeLink[]>([
    { source: 'tree-root', target: 'tree-left', distance: 80, strength: 0.4 },
    { source: 'tree-root', target: 'tree-right', distance: 80, strength: 0.4 },
  ]);

  const [positions, setPositions] = useState<{ [id: string]: { x: number; y: number } }>({
    'tree-root': { x: 90, y: 30 },
    'tree-left': { x: 35, y: 100 },
    'tree-right': { x: 145, y: 100 },
  });

  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  useEffect(() => {
    const nodes = initialTreeNodes.current;
    const links = initialTreeLinks.current;

    const sim = forceSimulation<D3TreeNode>(nodes)
      .force(
        'link',
        forceLink<D3TreeNode, D3TreeLink>(links)
          .id((d) => d.id)
          .distance((l) => l.distance)
          .strength((l) => l.strength)
      )
      .force('charge', forceManyBody<D3TreeNode>().strength(-120).distanceMax(200))
      .force('collide', forceCollide<D3TreeNode>().radius((d) => d.radius + 6))
      .force('centerX', forceX<D3TreeNode>().x((d) => d.targetX).strength(0.22)) // Strong return home
      .force('centerY', forceY<D3TreeNode>().y((d) => d.targetY).strength(0.22)) // Strong return home
      .velocityDecay(0.35)
      .alphaDecay(0.02);

    sim.on('tick', () => {
      const updated: { [id: string]: { x: number; y: number } } = {};
      nodes.forEach((n) => {
        if (n.x !== undefined && n.y !== undefined) {
          updated[n.id] = { x: n.x, y: n.y };
        }
      });
      setPositions(updated);
    });

    // Idle at mount since nodes are already at target coordinates
    sim.stop();
    simulationRef.current = sim;

    return () => {
      sim.stop();
    };
  }, []);

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const sim = simulationRef.current;
    if (!sim) return;

    const targetNode = initialTreeNodes.current.find((n) => n.id === id);
    if (!targetNode) return;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setActiveDragId(id);

    sim.alphaTarget(0.4).restart();
    targetNode.fx = targetNode.x;
    targetNode.fy = targetNode.y;

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const origX = targetNode.x!;
    const origY = targetNode.y!;

    const onPointerMove = (moveEv: PointerEvent) => {
      targetNode.fx = origX + (moveEv.clientX - startClientX);
      targetNode.fy = origY + (moveEv.clientY - startClientY);
    };

    const onPointerUp = (upEv: PointerEvent) => {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(upEv.pointerId);
      } catch {}
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      // Release anchor and wake simulation so it springs back to original branch position!
      targetNode.fx = null;
      targetNode.fy = null;
      sim.alpha(1).restart();
      setActiveDragId(null);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div style={{ position: 'relative', width: '180px', height: '140px', pointerEvents: 'auto', userSelect: 'none' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
        {initialTreeLinks.current.map((link, i) => {
          const srcId = typeof link.source === 'string' ? link.source : link.source.id;
          const tgtId = typeof link.target === 'string' ? link.target : link.target.id;
          const srcPos = positions[srcId];
          const tgtPos = positions[tgtId];
          if (!srcPos || !tgtPos) return null;

          return (
            <line
              key={i}
              x1={srcPos.x}
              y1={srcPos.y}
              x2={tgtPos.x}
              y2={tgtPos.y}
              stroke="#168BFF"
              strokeWidth="1.8"
              strokeDasharray="4 2"
              style={{ filter: 'drop-shadow(0 0 4px rgba(22, 139, 255, 0.4))' }}
            />
          );
        })}
      </svg>

      {initialTreeNodes.current.map((n) => {
        const pos = positions[n.id] || { x: n.targetX, y: n.targetY };
        const isDragging = activeDragId === n.id;
        const size = n.radius * 2;

        return (
          <div
            key={n.id}
            onPointerDown={(e) => handlePointerDown(n.id, e)}
            style={{
              position: 'absolute',
              left: `${pos.x - n.radius}px`,
              top: `${pos.y - n.radius}px`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #1F2937 0%, #111827 100%)',
              border: `2px solid ${isDragging ? '#00D2FF' : n.color}`,
              boxShadow: isDragging
                ? '0 0 24px rgba(0, 210, 255, 0.8), 0 8px 16px rgba(0,0,0,0.6)'
                : '0 4px 14px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : 'grab',
              zIndex: isDragging ? 100 : 5,
              transform: isDragging ? 'scale(1.15)' : 'scale(1)',
              transition: isDragging ? 'none' : 'box-shadow 0.2s ease, transform 0.15s ease',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#F9FAFB' }}>
              {n.val}
            </span>
            <span style={{ fontSize: '7px', fontFamily: 'var(--font-mono)', color: n.color }}>
              {n.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   3. D3/SPRING INTERACTIVE STACK CARDS (SNAP TO ORIGIN)
   ───────────────────────────────────────────────────────────── */

export const D3InteractiveStack: React.FC = () => {
  const elements = [
    { val: 42, idx: 2, isTop: true },
    { val: 17, idx: 1 },
    { val: 8, idx: 0 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '135px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
        <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#168BFF', letterSpacing: '0.6px' }}>
          STACK (LIFO)
        </span>
        <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', color: '#737D8C' }}>SP: 0x7FFF</span>
      </div>

      {elements.map((elem, i) => (
        <motion.div
          key={i}
          drag
          dragSnapToOrigin
          dragElastic={0.3}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
          whileHover={{ scale: 1.04, filter: 'drop-shadow(0 0 12px rgba(22, 139, 255, 0.7))' }}
          whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50, filter: 'drop-shadow(0 0 20px rgba(0, 210, 255, 0.9))' }}
          style={{
            height: '38px',
            background: elem.isTop
              ? 'linear-gradient(135deg, rgba(20, 43, 77, 0.95) 0%, rgba(21, 27, 35, 0.95) 100%)'
              : 'linear-gradient(135deg, rgba(21, 27, 35, 0.95) 0%, rgba(28, 35, 45, 0.9) 100%)',
            border: elem.isTop ? '1.5px solid #388BFD' : '1.5px solid #2A3441',
            borderRadius: '8px',
            boxShadow: elem.isTop
              ? '0 4px 16px rgba(0, 102, 255, 0.45), 0 0 12px rgba(0, 210, 255, 0.3)'
              : '0 2px 8px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            cursor: 'grab',
            userSelect: 'none',
            touchAction: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#737D8C', fontWeight: 600 }}>
              [{elem.idx}]
            </span>
            {elem.isTop && (
              <span
                style={{
                  fontSize: '7px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: '#00D2FF',
                  background: 'rgba(0, 210, 255, 0.15)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                }}
              >
                TOP
              </span>
            )}
          </div>
          <span style={{ fontSize: '15px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: elem.isTop ? '#00D2FF' : '#F5F7FA' }}>
            {elem.val}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   4. D3/SPRING INTERACTIVE ARRAY CELLS (SNAP TO ORIGIN)
   ───────────────────────────────────────────────────────────── */

export const D3InteractiveArray: React.FC = () => {
  const cells = [
    { val: 4, idx: 0, addr: '0x1000' },
    { val: 9, idx: 1, addr: '0x1004' },
    { val: 16, idx: 2, addr: '0x1008', isActive: true },
    { val: 25, idx: 3, addr: '0x100C' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px' }}>
        <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#168BFF', letterSpacing: '0.5px' }}>
          int arr[4] = &#123;4, 9, 16, 25&#125;;
        </span>
        <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', color: '#3CCB83' }}>&amp;arr[0] = 0x1000</span>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '4px' }}>
        {cells.map((c, i) => (
          <motion.div
            key={i}
            drag
            dragSnapToOrigin
            dragElastic={0.3}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
            whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 12px rgba(22, 139, 255, 0.7))' }}
            whileDrag={{ scale: 1.15, cursor: 'grabbing', zIndex: 50, filter: 'drop-shadow(0 0 20px rgba(0, 210, 255, 0.9))' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '42px',
              padding: '6px 0',
              borderRadius: '6px',
              background: c.isActive
                ? 'linear-gradient(180deg, rgba(22, 139, 255, 0.22) 0%, rgba(22, 139, 255, 0.08) 100%)'
                : 'linear-gradient(180deg, #161B22 0%, #0D1117 100%)',
              border: c.isActive ? '1.5px solid #388BFD' : '1px solid #30363D',
              boxShadow: c.isActive ? '0 8px 20px rgba(0, 102, 255, 0.45)' : 'none',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            <span style={{ fontSize: '7px', fontFamily: 'var(--font-mono)', color: c.isActive ? '#168BFF' : '#737D8C', fontWeight: 700 }}>
              [{c.idx}]
            </span>
            <span style={{ fontSize: '15px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: c.isActive ? '#00D2FF' : '#F0F6FC', margin: '2px 0' }}>
              {c.val}
            </span>
            <span style={{ fontSize: '7px', fontFamily: 'var(--font-mono)', color: '#56606E' }}>
              {c.addr}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CALL STACK & QUEUE & POINTER GUARDS
   ───────────────────────────────────────────────────────────── */

export const VsCodeCallStack: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '150px',
        background: '#0D1521',
        border: '1px solid #26364A',
        borderRadius: '8px',
        padding: '8px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#168BFF', letterSpacing: '0.6px' }}>
        CALL STACK (DEPTH: 3)
      </div>

      {[
        { fn: 'quickSort(arr, 0, 2)', color: '#168BFF', bg: 'rgba(22, 139, 255, 0.15)', border: '#168BFF' },
        { fn: 'partition(arr, 0, 4)', color: '#B99AFF', bg: 'rgba(185, 154, 255, 0.08)', border: '#8057E8' },
        { fn: 'main()', color: '#A7B5C7', bg: 'rgba(255, 255, 255, 0.04)', border: '#30363D' },
      ].map((frame, i) => (
        <div
          key={i}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            background: frame.bg,
            border: `1px solid ${frame.border}`,
            fontSize: '9px',
            fontFamily: 'var(--font-mono)',
            color: frame.color,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {frame.fn}
        </div>
      ))}
    </div>
  );
};

export const VsCodeQueueBuffer: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px' }}>
        <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#36C779' }}>
          FRONT ▶
        </span>
        <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0066FF' }}>
          ▶ REAR
        </span>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
        {['101', '102', '103', '104'].map((val, i) => (
          <div
            key={i}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              background: 'linear-gradient(180deg, #161B22 0%, #0D1117 100%)',
              border: i === 0 ? '1.5px solid #36C779' : i === 3 ? '1.5px solid #0066FF' : '1px solid #30363D',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#F0F6FC' }}>
              {val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const VsCodePointerGuard: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '145px',
        background: '#0D1521',
        border: '1px solid rgba(60, 203, 131, 0.4)',
        borderRadius: '8px',
        padding: '8px 10px',
        boxShadow: '0 4px 16px rgba(60, 203, 131, 0.2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3CCB83' }} />
        <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#3CCB83' }}>
          POINTER DIAGNOSTIC
        </span>
      </div>
      <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#F4F7FB' }}>
        Node* ptr = 0x7FA0
      </div>
      <div style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', color: '#737D8C' }}>
        Status: Valid Heap
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   BACKWARD-COMPATIBLE WRAPPERS FOR OLD NAMES
   ───────────────────────────────────────────────────────────── */
export const LinkedListHero = D3InteractiveLinkedList;
export const LinkedListPointer = D3InteractiveLinkedList;
export const DoublyLinkedList = D3InteractiveLinkedList;
export const LinkedListTerminator = D3InteractiveLinkedList;
export const ArrayHero = D3InteractiveArray;
export const ArrayIndexed = D3InteractiveArray;
export const ArrayBinarySearch = D3InteractiveArray;
export const ArraySorting = D3InteractiveArray;
export const BinaryTreeHero = D3InteractiveBinaryTree;
export const BinarySearchTree5 = D3InteractiveBinaryTree;
export const TreeNodeAVL = D3InteractiveBinaryTree;
export const StackHero = D3InteractiveStack;
export const StackPush = D3InteractiveStack;
export const CallStackFrames = VsCodeCallStack;
export const QueueHero = VsCodeQueueBuffer;
export const QueueBuffer = VsCodeQueueBuffer;
export const GraphHero = D3InteractiveBinaryTree;
export const DirectedGraph = D3InteractiveLinkedList;
export const GraphCycle = D3InteractiveBinaryTree;
export const CodeSymbolsHero1 = VsCodePointerGuard;
export const CodeSymbolsHero2 = VsCodeCallStack;
export const CodeSymbolsFeatures = VsCodePointerGuard;
export const CodeSymbolsAlgorithms = VsCodeCallStack;
export const CodeSymbolsWorkflow = VsCodePointerGuard;
export const CodeSymbolsLearning = VsCodeCallStack;
export const CodeSymbolsCTA = VsCodePointerGuard;

/* ─────────────────────────────────────────────────────────────
   SECTION-SPECIFIC DISTRIBUTED MOVING & DRAGGABLE DATA STRUCTURES
   With .dsa-bg-layer class for desktop-only margin visibility!
   ───────────────────────────────────────────────────────────── */

/** Floating elements for Hero section */
export const HeroFloatingDSA: React.FC = () => {
  return (
    <div className="dsa-bg-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'visible' }} aria-hidden="true">
      {/* Upper-left: D3 Force-Interactive Linked List with Individually Movable Nodes */}
      <div style={{ position: 'absolute', top: '5%', left: '1%', transform: 'scale(0.85)', transformOrigin: 'top left' }}>
        <D3InteractiveLinkedList />
      </div>

      {/* Mid-left: D3 Force Binary Tree (Individually Draggable Circular Nodes) */}
      <div style={{ position: 'absolute', top: '52%', left: '2%' }}>
        <D3InteractiveBinaryTree />
      </div>

      {/* Lower-left: LIFO Stack with Spring Release Cards */}
      <div style={{ position: 'absolute', bottom: '6%', left: '4%' }}>
        <D3InteractiveStack />
      </div>

      {/* Upper-right: Call Stack Frames */}
      <div style={{ position: 'absolute', top: '8%', right: '3%' }}>
        <DraggableDSA>
          <VsCodeCallStack />
        </DraggableDSA>
      </div>

      {/* Mid-right: Contiguous Array with Spring Pull */}
      <div style={{ position: 'absolute', top: '52%', right: '3%' }}>
        <D3InteractiveArray />
      </div>

      {/* Lower-right: FIFO Queue Buffer with FRONT & REAR */}
      <div style={{ position: 'absolute', bottom: '6%', right: '4%' }}>
        <DraggableDSA>
          <VsCodeQueueBuffer />
        </DraggableDSA>
      </div>
    </div>
  );
};

/** Floating elements for 3D VsCodePreview Section */
export const VsCodeFloatingDSA: React.FC = () => {
  return (
    <div className="dsa-bg-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4, overflow: 'visible' }} aria-hidden="true">
      {/* Left Margin: Real-Time Call Stack & Memory Guard */}
      <div style={{ position: 'absolute', top: '15%', left: '2%' }}>
        <DraggableDSA>
          <VsCodeCallStack />
        </DraggableDSA>
      </div>

      <div style={{ position: 'absolute', top: '55%', left: '2%' }}>
        <DraggableDSA>
          <VsCodePointerGuard />
        </DraggableDSA>
      </div>

      {/* Right Margin: Live D3 Linked List Node Chain */}
      <div style={{ position: 'absolute', top: '18%', right: '1%', transform: 'scale(0.8)', transformOrigin: 'top right' }}>
        <D3InteractiveLinkedList />
      </div>

      <div style={{ position: 'absolute', top: '58%', right: '2%' }}>
        <D3InteractiveStack />
      </div>
    </div>
  );
};

/** Floating elements for Features section */
export const FeaturesFloatingDSA: React.FC = () => {
  return (
    <div className="dsa-bg-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'visible' }} aria-hidden="true">
      <div style={{ position: 'absolute', top: '16%', left: '1%', transform: 'scale(0.8)', transformOrigin: 'top left' }}>
        <D3InteractiveLinkedList />
      </div>

      <div style={{ position: 'absolute', bottom: '15%', left: '3%' }}>
        <DraggableDSA>
          <VsCodePointerGuard />
        </DraggableDSA>
      </div>

      <div style={{ position: 'absolute', top: '16%', right: '2%' }}>
        <D3InteractiveArray />
      </div>

      <div style={{ position: 'absolute', bottom: '12%', right: '3%' }}>
        <D3InteractiveBinaryTree />
      </div>
    </div>
  );
};

/** Floating elements for DataStructures / Algorithms section */
export const AlgorithmsFloatingDSA: React.FC = () => {
  return (
    <div className="dsa-bg-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'visible' }} aria-hidden="true">
      <div style={{ position: 'absolute', top: '12%', left: '1%', transform: 'scale(0.8)', transformOrigin: 'top left' }}>
        <D3InteractiveLinkedList />
      </div>

      <div style={{ position: 'absolute', top: '65%', left: '3%' }}>
        <D3InteractiveStack />
      </div>

      <div style={{ position: 'absolute', top: '12%', right: '2%' }}>
        <D3InteractiveBinaryTree />
      </div>

      <div style={{ position: 'absolute', top: '68%', right: '2%' }}>
        <D3InteractiveArray />
      </div>
    </div>
  );
};

/** Floating elements for HowItWorks / Workflow section */
export const WorkflowFloatingDSA: React.FC = () => {
  return (
    <div className="dsa-bg-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'visible' }} aria-hidden="true">
      <div style={{ position: 'absolute', top: '22%', left: '2%' }}>
        <DraggableDSA>
          <VsCodeCallStack />
        </DraggableDSA>
      </div>

      <div style={{ position: 'absolute', bottom: '12%', left: '2%' }}>
        <DraggableDSA>
          <VsCodePointerGuard />
        </DraggableDSA>
      </div>

      <div style={{ position: 'absolute', top: '18%', right: '2%' }}>
        <D3InteractiveBinaryTree />
      </div>

      <div style={{ position: 'absolute', bottom: '14%', right: '2%' }}>
        <D3InteractiveStack />
      </div>
    </div>
  );
};

/** Floating elements for LearningBenefits section */
export const LearningFloatingDSA: React.FC = () => {
  return (
    <div className="dsa-bg-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'visible' }} aria-hidden="true">
      <div style={{ position: 'absolute', top: '24%', left: '2%' }}>
        <DraggableDSA>
          <VsCodePointerGuard />
        </DraggableDSA>
      </div>

      <div style={{ position: 'absolute', bottom: '16%', left: '2%' }}>
        <D3InteractiveStack />
      </div>

      <div style={{ position: 'absolute', top: '22%', right: '2%' }}>
        <D3InteractiveArray />
      </div>
    </div>
  );
};

/** Floating elements for DownloadCTA section & Bottom */
export const BottomCTAFloatingDSA: React.FC = () => {
  return (
    <div className="dsa-bg-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'visible' }} aria-hidden="true">
      <div style={{ position: 'absolute', top: '25%', left: '1%', transform: 'scale(0.8)', transformOrigin: 'top left' }}>
        <D3InteractiveLinkedList />
      </div>

      <div style={{ position: 'absolute', bottom: '12%', left: '3%' }}>
        <DraggableDSA>
          <VsCodePointerGuard />
        </DraggableDSA>
      </div>

      <div style={{ position: 'absolute', top: '25%', right: '3%' }}>
        <D3InteractiveStack />
      </div>
    </div>
  );
};

export const FloatingDSA = HeroFloatingDSA;
