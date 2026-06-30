import { GraphNode, GraphEdge } from '@/mocks/knowledge-graph';

interface DetailPanelProps {
  node: GraphNode | null;
  graphEdges: GraphEdge[];
  centerId: string;
  centerName: string;
  onClose: () => void;
}

export default function DetailPanel({ node, graphEdges, centerId, centerName, onClose }: DetailPanelProps) {
  if (!node) return null;

  const relatedEdges = graphEdges.filter(
    (e) => e.source === node.id || e.target === node.id
  );

  const isCenter = node.id === centerId;

  return (
    <div className="p-5 rounded-xl bg-background-50 border border-background-200/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: node.bgColor }}
          >
            <i className={`${node.icon} text-lg`} style={{ color: node.color }}></i>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground-900">{node.label}</h3>
            <span className="text-xs text-foreground-500">{node.type}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-100 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-foreground-400 text-sm"></i>
        </button>
      </div>

      {node.details && (
        <div className="space-y-2.5 mb-5">
          {node.details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-background-100"
            >
              <span className="text-xs text-foreground-500">{detail.label}</span>
              <span className="text-xs font-semibold text-foreground-800">{detail.value}</span>
            </div>
          ))}
        </div>
      )}

      {!isCenter && relatedEdges.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2.5">
            Relationship
          </p>
          {relatedEdges.map((edge) => {
            const otherId = edge.source === node.id ? edge.target : edge.source;

            return (
              <div
                key={`${edge.source}-${edge.target}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-background-100"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-100">
                  <i className="ri-git-branch-line text-accent-600 text-sm"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground-800 truncate">{edge.label}</p>
                  <p className="text-xs text-foreground-500">Connected to {centerName}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                    edge.riskLevel === 'high'
                      ? 'bg-accent-100 text-accent-700'
                      : edge.riskLevel === 'medium'
                      ? 'bg-secondary-100 text-secondary-700'
                      : 'bg-background-200 text-foreground-600'
                  }`}
                >
                  {edge.riskLevel}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {isCenter && (
        <div>
          <p className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2.5">
            Active Connections ({relatedEdges.length})
          </p>
          <div className="space-y-2">
            {relatedEdges.map((edge) => (
              <div
                key={`${edge.source}-${edge.target}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-100"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    edge.riskLevel === 'high' ? 'bg-accent-500' : 'bg-secondary-500'
                  }`}
                ></div>
                <span className="text-xs text-foreground-700 flex-1">{edge.label}</span>
                <span
                  className={`text-xs font-semibold ${
                    edge.riskLevel === 'high' ? 'text-accent-600' : 'text-secondary-600'
                  }`}
                >
                  {edge.riskLevel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}