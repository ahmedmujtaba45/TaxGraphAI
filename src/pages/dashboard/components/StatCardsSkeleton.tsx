export default function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-5 md:p-6 rounded-xl bg-background-50 border border-background-200/60"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-background-200 animate-skeleton"></div>
            <div className="w-14 h-6 rounded-full bg-background-200 animate-skeleton"></div>
          </div>
          <div className="w-24 h-8 rounded-md bg-background-200 animate-skeleton mb-2"></div>
          <div className="w-36 h-4 rounded-md bg-background-200 animate-skeleton mb-2"></div>
          <div className="w-28 h-3 rounded-md bg-background-200 animate-skeleton"></div>
        </div>
      ))}
    </div>
  );
}