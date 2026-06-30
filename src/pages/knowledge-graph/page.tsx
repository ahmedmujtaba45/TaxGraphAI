import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import CitizenSelector from '@/components/feature/CitizenSelector';
import GraphCanvas from './components/GraphCanvas';
import DetailPanel from './components/DetailPanel';
import GraphMetricsCards from './components/GraphMetricsCards';
import { CitizenProfile, defaultCitizen, getCitizenById } from '@/mocks/citizens';
import { getKnowledgeGraphData, GraphNode, filterCategories } from '@/mocks/knowledge-graph';

export default function KnowledgeGraph() {
  const [searchParams] = useSearchParams();
  const [selectedCitizen, setSelectedCitizen] = useState<CitizenProfile>(() => {
    const citizenId = searchParams.get('citizenId');
    if (citizenId) {
      const found = getCitizenById(citizenId);
      if (found) return found;
    }
    return defaultCitizen;
  });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const { graphNodes, graphEdges, graphMetrics, centerId } = getKnowledgeGraphData(selectedCitizen);

  return (
    <DashboardLayout activeMenu="Knowledge Graph">
      <div className="animate-page-enter">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold text-primary-900">
              Knowledge Graph Explorer
            </h1>
            <p className="text-sm text-foreground-500 mt-1">
              Interactive visualization of taxpayer entity connections. Click any node to explore relationships.
            </p>
          </div>
          <div className="flex-shrink-0">
            <CitizenSelector
              selectedId={selectedCitizen.id}
              onSelect={(citizen) => {
                setSelectedCitizen(citizen);
                setSelectedNode(null);
                setActiveFilter('all');
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <GraphMetricsCards metrics={graphMetrics} />

        <div className="flex flex-wrap items-center gap-2">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id);
                setSelectedNode(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-primary-800 text-background-50'
                  : 'bg-background-50 text-foreground-600 border border-background-200 hover:bg-background-100'
              }`}
            >
              <i className={`${cat.icon} text-xs`}></i>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-3">
            <GraphCanvas
              graphNodes={graphNodes}
              graphEdges={graphEdges}
              centerId={centerId}
              selectedNode={selectedNode}
              onNodeSelect={setSelectedNode}
              activeFilter={activeFilter}
            />
          </div>
          <div className="xl:col-span-1">
            {selectedNode ? (
              <DetailPanel
                node={selectedNode}
                graphEdges={graphEdges}
                centerId={centerId}
                centerName={selectedCitizen.name}
                onClose={() => setSelectedNode(null)}
              />
            ) : (
              <div className="p-5 rounded-xl bg-background-50 border border-background-200/60 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-accent-100 mb-4">
                  <i className="ri-cursor-line text-accent-600 text-2xl"></i>
                </div>
                <h3 className="text-base font-semibold text-foreground-900 mb-1">Node Inspector</h3>
                <p className="text-sm text-foreground-500 leading-relaxed max-w-xs">
                  Click on any node in the graph to view detailed information and relationship data.
                </p>
                <div className="mt-5 space-y-2 w-full">
                  <div className="flex items-center gap-2 text-xs text-foreground-500">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    Critical risk connection
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground-500">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    High risk connection
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground-500">
                    <span className="w-3 h-3 rounded-full bg-secondary-500"></span>
                    Medium risk connection
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}