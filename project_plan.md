# TaxGraph AI

## 1. Project Description
TaxGraph AI is a modern AI-powered government fintech platform designed for the Pakistan Federal Board of Revenue (FBR). The platform leverages Knowledge Graph AI to identify high-net-worth non-filers and under-reporting taxpayers through connected civic intelligence. Target users are FBR officials, tax analysts, and government decision-makers. Core value: broadening Pakistan's tax net through intelligent data-driven taxpayer identification and compliance scoring.

## 2. Page Structure
- `/` - Landing Page (Hero, Statistics, How It Works, Features, Footer)
- `/dashboard` - TaxGraph AI Control Center (Enterprise dashboard with sidebar, charts, alerts table)
- `/entity-resolution` - AI Entity Resolution (Cross-database identity matching with confidence scoring)
- `/knowledge-graph` - Knowledge Graph Explorer (Interactive network graph with node details panel)
- `/risk-scoring` - Tax Compliance Deviation Score Engine (Risk meter, contributing factors, AI analysis)
- `/audit-reports` - Explainable AI Audit Report (Timeline, AI findings, recommendation panel, confidence gauge)
- `/data-sources` - Data Sources Management (7 connected government repositories, quality scores, health indicators)
- `/analytics` - National Tax Intelligence Analytics (Risk heatmap, revenue recovery, income vs assets, non-filer distribution, KPI cards)

## 3. Core Features
- [x] Landing page with all 5 sections (Hero, Stats, How It Works, Features, Footer)
- [x] Enterprise dashboard with sidebar navigation and top bar (search, notifications, profile)
- [x] Dashboard KPI widget cards (Citizens Analysed, Non-Filers, High Risk, Revenue Leakage)
- [x] Charts: Compliance Score Distribution, Tax Risk by Province, Monthly Flagged Cases, Data Source Contribution
- [x] Recent Alerts table with Pakistani names, CNIC numbers, risk scores, and status filters
- [x] AI Entity Resolution page with multi-database search and match confidence visualization
- [x] Shared Control Center layout (sidebar + topbar) reused across all dashboard pages
- [x] AI Entity Resolution page with multi-database search and match confidence visualization
- [x] Shared Control Center layout (sidebar + topbar) reused across all dashboard pages
- [x] Knowledge Graph Explorer with interactive SVG network graph, zoom/pan, node detail panel
- [x] Risk Scoring Engine with circular score meter, contributing factors breakdown, AI analysis panel
  - [x] Explainable AI Audit Reports with timeline, AI findings, recommendation panel, confidence gauge
- [x] Data Sources Management with quality gauges, sync status, record counts, and health indicators
- [x] National Tax Intelligence Analytics with risk heatmap, scatter plots, donut/pie charts, bar charts, and KPI cards
- [x] Responsive design for desktop and mobile
- [x] Professional government dashboard aesthetic
- [x] Dark navy + green + gold color palette

## 4. Data Model Design
No database needed currently - using mock data for all content.

## 5. Backend / Third-party Integration Plan
- Supabase: Not needed yet (mock data phase)
- Shopify: Not needed
- Stripe: Not needed

## 6. Development Phase Plan

### Phase 1: Landing Page ✅
### Phase 2: Dashboard Interface ✅
### Phase 3: Entity Resolution Page ✅
- Goal: Build cross-database identity matching page
- Deliverable: Search section, 5-source match results, animated confidence gauge, AI analysis explanation

### Phase 4: Knowledge Graph Explorer ✅
- Goal: Interactive network graph visualization
- Deliverable: SVG graph with zoom/pan/drag, node detail panel, graph metrics cards, category filters

### Phase 5: Risk Scoring Engine ✅
- Goal: Tax compliance deviation scoring with AI analysis
- Deliverable: Circular score gauge (92/100 Critical), 5 contributing factors with progress bars, AI explanation panel

### Phase 6: Explainable AI Audit Reports ✅
- Goal: Full audit report with timeline, AI findings, and recommendations
- Deliverable: Vertical event timeline, 4 AI findings with evidence trails, confidence gauge (94%), recommendation panel with next steps

### Phase 7: Data Sources Management ✅
- Goal: Centralized data source monitoring and health dashboard
- Deliverable: 7 source cards with quality score gauges, record counts, sync timestamps, category badges, health status indicators, and aggregate metrics bar

### Phase 8: National Tax Intelligence Analytics ✅
- Goal: Comprehensive analytical dashboard with multiple chart types and geographic risk visualization
- Deliverable: 4 KPI cards, horizontal bar chart (Top Risk Cities), donut chart (Non-Filer Distribution), vertical bar chart (Revenue Recovery), scatter plot (Asset vs Income), geographic risk heatmap grid, AI insight panel

### Phase 9 (Future): Authentication & User System