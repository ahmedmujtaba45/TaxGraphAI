import { useState, useMemo, useCallback } from 'react';
import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import { videoTutorials, videoCategories, type VideoTutorial } from '@/mocks/video-tutorials';

export default function VideoTutorials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);

  const filteredVideos = useMemo(() => {
    let videos = videoTutorials;

    if (activeCategory !== 'all') {
      videos = videos.filter((v) => v.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      videos = videos.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)) ||
          v.instructor.toLowerCase().includes(q),
      );
    }

    return videos;
  }, [activeCategory, searchQuery]);

  const featuredVideos = useMemo(
    () => filteredVideos.filter((v) => v.featured),
    [filteredVideos],
  );
  const regularVideos = useMemo(
    () => filteredVideos.filter((v) => !v.featured),
    [filteredVideos],
  );

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  const handleSwitchVideo = useCallback((newVideo: VideoTutorial) => {
    setSelectedVideo(newVideo);
  }, []);

  const categoryColorMap: Record<string, string> = {
    'Getting Started': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Risk Scoring': 'bg-rose-100 text-rose-700 border-rose-200',
    'Entity Resolution': 'bg-amber-100 text-amber-700 border-amber-200',
    'Knowledge Graph': 'bg-secondary-100 text-secondary-700 border-secondary-200',
    'Audit Reports': 'bg-primary-100 text-primary-700 border-primary-200',
    'Data Sources': 'bg-accent-100 text-accent-700 border-accent-200',
    'Analytics': 'bg-sky-100 text-sky-700 border-sky-200',
  };

  return (
    <DashboardLayout activeMenu="Video Tutorials">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground-900">Video Tutorials</h1>
        <p className="text-sm text-foreground-500 mt-1">
          Watch step-by-step video guides and in-depth walkthroughs for every TaxGraph AI module.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 w-full max-w-md">
          <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search videos by title, instructor, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-background-200/70 bg-white text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-300 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-300 hover:text-foreground-500 cursor-pointer"
            >
              <i className="ri-close-circle-fill text-sm"></i>
            </button>
          )}
        </div>
        <span className="text-xs text-foreground-400 whitespace-nowrap">
          {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap mb-6">
        {videoCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-white text-foreground-600 hover:text-foreground-800 hover:bg-background-100 border border-background-200/70'
            }`}
          >
            <i className={`${cat.icon} text-sm`}></i>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mb-4">
            <i className="ri-search-line text-foreground-300 text-2xl"></i>
          </div>
          <h3 className="text-base font-heading font-bold text-foreground-900 mb-2">No videos found</h3>
          <p className="text-sm text-foreground-500 max-w-sm">
            No videos match your current search or filter criteria. Try a different search term or select another category.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-refresh-line text-sm"></i>
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <>
          {featuredVideos.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="ri-star-fill text-amber-400 text-xs"></i>
                Featured Tutorials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    categoryColorMap={categoryColorMap}
                    featured
                    onClick={() => setSelectedVideo(video)}
                  />
                ))}
              </div>
            </div>
          )}

          {regularVideos.length > 0 && (
            <div>
              {featuredVideos.length > 0 && (
                <h3 className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-3">
                  All Tutorials
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    categoryColorMap={categoryColorMap}
                    onClick={() => setSelectedVideo(video)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {selectedVideo && (
        <VideoPlayerModal
          key={selectedVideo.id}
          video={selectedVideo}
          categoryColorMap={categoryColorMap}
          onClose={() => setSelectedVideo(null)}
          onSwitchVideo={handleSwitchVideo}
        />
      )}
    </DashboardLayout>
  );
}

function VideoCard({
  video,
  categoryColorMap,
  onClick,
}: {
  video: VideoTutorial;
  categoryColorMap: Record<string, string>;
  featured?: boolean;
  onClick: () => void;
}) {
  const formatViews = (count: number): string => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <button
      onClick={onClick}
      className="text-left w-full bg-white rounded-xl border border-background-200/70 overflow-hidden hover:border-primary-200/70 hover:bg-background-50/50 transition-all duration-200 group cursor-pointer"
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <i className="ri-play-fill text-primary-600 text-xl ml-0.5"></i>
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
          {video.duration}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
              categoryColorMap[video.category] || 'bg-background-100 text-foreground-600 border-background-200'
            }`}
          >
            {video.category}
          </span>
          <span className="text-[10px] text-foreground-400 flex items-center gap-1">
            <i className="ri-eye-line text-[10px]"></i>
            {formatViews(video.viewCount)}
          </span>
        </div>
        <h4 className="text-sm font-heading font-bold text-foreground-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
          {video.title}
        </h4>
        <p className="text-xs text-foreground-500 mt-1.5 line-clamp-2">{video.description}</p>
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {video.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex px-2 py-0.5 rounded-full bg-background-100 text-[10px] text-foreground-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-background-100">
          <div className="w-6 h-6 rounded-full bg-background-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-user-line text-foreground-400 text-[10px]"></i>
          </div>
          <span className="text-[11px] text-foreground-600 font-medium line-clamp-1">{video.instructor}</span>
        </div>
      </div>
    </button>
  );
}

function VideoPlayerModal({
  video,
  categoryColorMap,
  onClose,
  onSwitchVideo,
}: {
  video: VideoTutorial;
  categoryColorMap: Record<string, string>;
  onClose: () => void;
  onSwitchVideo: (v: VideoTutorial) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const stepSize = 100 / (video.durationSeconds * 2);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + stepSize;
      });
    }, 500);
    (window as unknown as Record<string, unknown>).__vidInterval = interval;
  };

  const handlePause = () => {
    setIsPlaying(false);
    const interval = (window as unknown as Record<string, unknown>).__vidInterval as number | undefined;
    if (interval) clearInterval(interval);
  };

  const handleClose = () => {
    handlePause();
    setProgress(0);
    onClose();
  };

  const formatTime = (percent: number): string => {
    const totalSeconds = Math.floor((percent / 100) * video.durationSeconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (count: number): string => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
    return `${count} views`;
  };

  const nextVideos = videoTutorials
    .filter((v) => v.id !== video.id && v.category === video.category)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up flex flex-col">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-4 border-b border-background-200/70 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-background-100 flex items-center justify-center flex-shrink-0">
              <i className="ri-video-line text-foreground-600 text-base"></i>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-heading font-bold text-foreground-900 line-clamp-1">{video.title}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                    categoryColorMap[video.category] || 'bg-background-100 text-foreground-600 border-background-200'
                  }`}
                >
                  {video.category}
                </span>
                <span className="text-[10px] text-foreground-400">{video.duration}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg border border-background-200/70 flex items-center justify-center text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer flex-shrink-0 ml-3"
          >
            <i className="ri-close-line text-sm"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="relative bg-black">
            <div className="aspect-video w-full">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    onClick={handlePlay}
                    className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200 cursor-pointer"
                  >
                    <i className="ri-play-fill text-primary-600 text-2xl ml-1"></i>
                  </button>
                </div>
              )}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-white text-sm font-medium bg-black/60 px-5 py-2.5 rounded-xl backdrop-blur-sm">
                    Now Playing
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-black/90">
              <div className="flex items-center gap-3">
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:text-primary-400 transition-colors cursor-pointer flex-shrink-0"
                >
                  <i className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-lg`}></i>
                </button>
                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-white/70 text-[10px] font-mono flex-shrink-0 w-16 text-right">
                  {formatTime(progress)} / {video.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-6 lg:flex lg:gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-background-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-line text-foreground-500 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-900">{video.instructor}</p>
                  <p className="text-xs text-foreground-500">{video.instructorRole}</p>
                </div>
              </div>

              <p className="text-sm text-foreground-700 leading-relaxed mb-4">{video.description}</p>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-xs text-foreground-400 flex items-center gap-1">
                  <i className="ri-eye-line text-xs"></i>
                  {formatViews(video.viewCount)}
                </span>
                <span className="text-xs text-foreground-400 flex items-center gap-1">
                  <i className="ri-time-line text-xs"></i>
                  {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap mb-6">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-background-100 border border-background-200/70 text-xs text-foreground-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-background-200/70">
                <button className="w-9 h-9 rounded-lg border border-background-200/70 flex items-center justify-center text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer">
                  <i className="ri-thumb-up-line text-sm"></i>
                </button>
                <button className="w-9 h-9 rounded-lg border border-background-200/70 flex items-center justify-center text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer">
                  <i className="ri-share-forward-line text-sm"></i>
                </button>
                <button className="w-9 h-9 rounded-lg border border-background-200/70 flex items-center justify-center text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer">
                  <i className="ri-bookmark-line text-sm"></i>
                </button>
              </div>
            </div>

            {nextVideos.length > 0 && (
              <div className="lg:w-72 flex-shrink-0 mt-6 lg:mt-0">
                <h4 className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-3">
                  More from {video.category}
                </h4>
                <div className="space-y-3">
                  {nextVideos.map((nv) => (
                    <button
                      key={nv.id}
                      onClick={() => onSwitchVideo(nv)}
                      className="flex gap-3 text-left w-full group cursor-pointer"
                    >
                      <div className="w-28 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img src={nv.thumbnail} alt={nv.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] px-1.5 py-0.5 rounded">
                          {nv.duration}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground-800 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                          {nv.title}
                        </p>
                        <p className="text-[10px] text-foreground-400 mt-1">{nv.instructor}</p>
                        <p className="text-[10px] text-foreground-400">{formatViews(nv.viewCount)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}