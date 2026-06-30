import { useState, useRef, useCallback, useEffect } from 'react';
import { GraphNode, GraphEdge, filterCategories } from '@/mocks/knowledge-graph';

interface GraphCanvasProps {
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  centerId: string;
  selectedNode: GraphNode | null;
  onNodeSelect: (node: GraphNode | null) => void;
  activeFilter: string;
}

function getRadialPosition(index: number, total: number, centerX: number, centerY: number, radius: number) {
  const angle = (2 * Math.PI / total) * index - Math.PI / 2;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

export default function GraphCanvas({ graphNodes, graphEdges, centerId, selectedNode, onNodeSelect, activeFilter }: GraphCanvasProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const viewBoxWidth = 900;
  const viewBoxHeight = 650;
  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;
  const radius = 210;

  const centerNode = graphNodes.find((n) => n.id === centerId)!;
  const outerNodes = graphNodes.filter((n) => n.id !== centerId);

  const filteredOuterNodes = activeFilter === 'all'
    ? outerNodes
    : outerNodes.filter((n) => n.type === activeFilter);

  const showCenter = activeFilter === 'all';

  const visibleNodes = showCenter ? [centerNode, ...filteredOuterNodes] : filteredOuterNodes;

  const getNodePosition = useCallback((nodeId: string) => {
    if (nodeId === centerId) {
      return { x: centerX, y: centerY };
    }
    const outerIndex = outerNodes.findIndex((n) => n.id === nodeId);
    if (!showCenter && activeFilter !== 'all') {
      const filteredIndex = filteredOuterNodes.findIndex((n) => n.id === nodeId);
      if (filteredIndex === -1) return { x: centerX, y: centerY };
      return getRadialPosition(filteredIndex, filteredOuterNodes.length || 1, centerX, centerY, radius);
    }
    if (outerIndex === -1) return { x: centerX, y: centerY };
    return getRadialPosition(outerIndex, outerNodes.length, centerX, centerY, radius);
  }, [centerX, centerY, radius, showCenter, activeFilter, centerId, outerNodes, filteredOuterNodes]);

  const getEdgeRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'oklch(var(--accent-500) / 0.6)';
      case 'medium': return 'oklch(var(--secondary-500) / 0.6)';
      case 'low': return 'oklch(var(--foreground-400) / 0.4)';
      default: return 'oklch(var(--foreground-400) / 0.4)';
    }
  };

  const getEdgeRiskDash = (risk: string) => {
    switch (risk) {
      case 'high': return 'none';
      case 'medium': return '5,3';
      case 'low': return '3,5';
      default: return 'none';
    }
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setZoom((prev) => Math.min(2.5, Math.max(0.4, prev + delta)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.graph-node')) return;
    setIsPanning(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isPanning, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  }, [activeFilter, centerId]);

  const visibleEdgeSet = new Set<string>();
  const visibleEdges = graphEdges.filter((edge) => {
    const sourceVisible = showCenter || outerNodes.find((n) => n.id === edge.source && filteredOuterNodes.some((fn) => fn.id === edge.source));
    const targetVisible = showCenter || outerNodes.find((n) => n.id === edge.target && filteredOuterNodes.some((fn) => fn.id === edge.target));
    if (activeFilter !== 'all') {
      if (edge.source !== centerId && edge.target !== centerId) return false;
      return (edge.source === centerId && filteredOuterNodes.some((n) => n.id === edge.target)) ||
             (edge.target === centerId && filteredOuterNodes.some((n) => n.id === edge.source));
    }
    const key = [edge.source, edge.target].sort().join('-');
    if (visibleEdgeSet.has(key)) return false;
    visibleEdgeSet.add(key);
    return true;
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[550px] md:h-[620px] rounded-xl bg-background-100 overflow-hidden cursor-grab active:cursor-grabbing border border-background-200/60"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <defs>
          {graphEdges.map((edge) => (
            <marker
              key={`arrow-${edge.source}-${edge.target}`}
              id={`arrow-${edge.source}-${edge.target}`}
              viewBox="0 0 10 10"
              refX="30"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={getEdgeRiskColor(edge.riskLevel)} />
            </marker>
          ))}
        </defs>

        {visibleEdges.map((edge) => {
          const from = getNodePosition(edge.source);
          const to = getNodePosition(edge.target);

          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;

          const nodeRadius = edge.source === centerId ? 28 : 20;
          const targetRadius = edge.target === centerId ? 28 : 20;

          const offsetX = (dx / dist) * nodeRadius;
          const offsetY = (dy / dist) * nodeRadius;
          const toffsetX = (dx / dist) * targetRadius;
          const toffsetY = (dy / dist) * targetRadius;

          return (
            <g key={`${edge.source}-${edge.target}`}>
              <line
                x1={from.x + offsetX}
                y1={from.y + offsetY}
                x2={to.x - toffsetX}
                y2={to.y - toffsetY}
                stroke={getEdgeRiskColor(edge.riskLevel)}
                strokeWidth={edge.riskLevel === 'high' ? 2 : 1.5}
                strokeDasharray={getEdgeRiskDash(edge.riskLevel)}
                markerEnd={`url(#arrow-${edge.source}-${edge.target})`}
              />
              <rect
                x={midX - 50}
                y={midY - 25}
                width="100"
                height="20"
                rx="10"
                fill="oklch(var(--background-50))"
                stroke={getEdgeRiskColor(edge.riskLevel)}
                strokeWidth="1"
              />
              <text
                x={midX}
                y={midY - 11}
                textAnchor="middle"
                fill="oklch(var(--foreground-800))"
                fontSize="9"
                fontWeight="600"
              >
                {edge.label}
              </text>
            </g>
          );
        })}

        {visibleNodes.map((node) => {
          const pos = node.id === centerId
            ? { x: centerX, y: centerY }
            : getNodePosition(node.id);
          const isSelected = selectedNode?.id === node.id;
          const isCenter = node.id === centerId;

          return (
            <g
              key={node.id}
              className="graph-node cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onNodeSelect(isSelected ? null : node);
              }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isCenter ? 48 : node.size / 2 + (isSelected ? 4 : 0)}
                fill={isSelected ? node.color : 'oklch(var(--background-50))'}
                stroke={node.color}
                strokeWidth={isSelected ? 3.5 : 2.5}
                className="transition-all duration-300"
              />
              {isCenter && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="54"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  opacity="0.3"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${pos.x} ${pos.y}`}
                    to={`360 ${pos.x} ${pos.y}`}
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              <foreignObject
                x={pos.x - 14}
                y={pos.y - 14}
                width="28"
                height="28"
              >
                <div className={`w-7 h-7 flex items-center justify-center ${isSelected ? 'text-background-50' : ''}`}>
                  <i className={`${node.icon} text-sm`} style={isSelected ? { color: 'oklch(var(--background-50))' } : { color: node.color }}></i>
                </div>
              </foreignObject>

              <text
                x={pos.x}
                y={pos.y + (isCenter ? 60 : 38)}
                textAnchor="middle"
                fill={isSelected ? node.color : 'oklch(var(--foreground-800))'}
                fontSize={isCenter ? '13' : '11'}
                fontWeight={isCenter ? '700' : '600'}
                className="pointer-events-none font-heading"
              >
                {node.label}
              </text>

              {!isCenter && (
                <text
                  x={pos.x}
                  y={pos.y + (isCenter ? 75 : 52)}
                  textAnchor="middle"
                  fill="oklch(var(--foreground-500))"
                  fontSize="9"
                  className="pointer-events-none"
                >
                  {node.type}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.15))}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-background-50 border border-background-200 hover:bg-background-100 transition-colors shadow-sm cursor-pointer"
        >
          <i className="ri-add-line text-foreground-600 text-sm"></i>
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.4, z - 0.15))}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-background-50 border border-background-200 hover:bg-background-100 transition-colors shadow-sm cursor-pointer"
        >
          <i className="ri-subtract-line text-foreground-600 text-sm"></i>
        </button>
        <button
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-background-50 border border-background-200 hover:bg-background-100 transition-colors shadow-sm cursor-pointer"
        >
          <i className="ri-fullscreen-line text-foreground-600 text-sm"></i>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-background-50 border border-background-200 text-xs text-foreground-500 font-medium shadow-sm">
        Zoom: {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}