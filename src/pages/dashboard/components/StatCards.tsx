import { useNavigate } from 'react-router-dom';
import { statsData } from '@/mocks/dashboard';

const statRoutes: Record<string, string> = {
  citizens: '/entity-resolution',
  'non-filers': '/risk-scoring',
  'high-risk': '/audit-reports',
  revenue: '/analytics',
};

export default function StatCards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
      {statsData.map((stat, idx) => (
        <button
          key={stat.id}
          onClick={() => {
            const route = statRoutes[stat.id];
            if (route) navigate(route);
          }}
          className={`p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60 hover:border-accent-200/40 hover:bg-background-100/80 active:scale-[0.98] transition-all duration-200 text-left cursor-pointer w-full animate-fade-in-up group`}
          style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'backwards' } as React.CSSProperties}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-lg bg-primary-100 group-hover:bg-primary-200 transition-colors">
              <i className={`${stat.icon} text-primary-700 text-lg`}></i>
            </div>
            <span
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                stat.changeType === 'up'
                  ? 'bg-accent-100 text-accent-700'
                  : 'bg-secondary-100 text-secondary-700'
              }`}
            >
              <i
                className={`text-xs ${
                  stat.changeType === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'
                }`}
              ></i>
              {stat.change}
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-primary-900 tracking-tight mb-1 group-hover:text-primary-800 transition-colors">
            {stat.value}
          </p>
          <p className="text-sm font-semibold text-foreground-800">{stat.label}</p>
          <p className="text-xs text-foreground-500 mt-1">{stat.description}</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-medium text-foreground-400 group-hover:text-accent-600 transition-colors">
            <span>View details</span>
            <i className="ri-arrow-right-line text-[10px] group-hover:translate-x-0.5 transition-transform"></i>
          </div>
        </button>
      ))}
    </div>
  );
}