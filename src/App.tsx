import {
  LayoutPanelLeft,
  Maximize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  X
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { BlogView } from './components/BlogView';
import { HotspotStoryCard } from './components/HotspotStoryCard';
import { InteractiveImageMap } from './components/InteractiveImageMap';
import { SecondaryPages } from './components/SecondaryPages';
import { ALL_TRACKS, IMAGE_HOTSPOTS, INITIAL_BLOG_POSTS } from './data/witchyData';
import { BlogPost, ImageHotspot, PageRoute, Track } from './types';
import { witchyAudio } from './utils/audioEngine';

const ROUTE_LABELS: Record<PageRoute, string> = {
  homepage: 'Homepage',
  blog: 'Interactive Blog',
  about: 'About',
  bio: 'Bio',
  'find-us': 'Find Us Here',
  shop: 'Shop',
  'ai-songs': 'AI Songs Studio',
  'fan-photos': 'Fan Photos & Events',
  'art-gallery': 'Art & Album Gallery',
  'new-release': 'New Release: Spooky Lullaby EP',
  'now-playing': 'Now Playing: Spooky Melodies Mix'
};

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>('blog');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('new-release-ep');
  const [layoutMode, setLayoutMode] = useState<'split' | 'full'>('split');
  const [mobileTab, setMobileTab] = useState<'map' | 'page'>('map');

  // Persisted blog posts & comments
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = window.localStorage.getItem('witchy-tunes-posts-v1');
      if (saved) {
        const parsed = JSON.parse(saved) as BlogPost[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_BLOG_POSTS;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('witchy-tunes-posts-v1', JSON.stringify(posts));
    } catch {
      // Ignore storage errors
    }
  }, [posts]);

  // Audio player state
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      witchyAudio.stop();
    };
  }, []);

  const activeHotspot = useMemo(
    () => (activeHotspotId ? IMAGE_HOTSPOTS.find((h) => h.id === activeHotspotId) ?? null : null),
    [activeHotspotId]
  );

  const relatedHotspotPost = useMemo(
    () =>
      activeHotspot
        ? posts.find((p) => p.id === activeHotspot.relatedPostId) ?? posts[0]
        : undefined,
    [activeHotspot, posts]
  );

  const handleSelectHotspot = (hotspot: ImageHotspot) => {
    setActiveHotspotId(hotspot.id);
    setActiveRoute('blog');
    setSelectedPostId(null);
    setMobileTab('page');
  };

  const handleNavigate = (route: PageRoute) => {
    setActiveRoute(route);
    if (route !== 'blog') {
      setSelectedPostId(null);
    }
    setMobileTab('page');
  };

  const handleOpenBlogPost = (postId: string) => {
    setActiveRoute('blog');
    setSelectedPostId(postId);
    setMobileTab('page');
  };

  const handleToggleTrack = (track: Track) => {
    if (activeTrack?.id === track.id && isPlaying) {
      witchyAudio.stop();
      setIsPlaying(false);
    } else {
      setActiveTrack(track);
      witchyAudio.playSequence(track.notes, track.bpm);
      setIsPlaying(true);
    }
  };

  const handleHeaderPlayMix = () => {
    const targetTrack = activeTrack ?? ALL_TRACKS.find((t) => t.id === 'mix-1') ?? ALL_TRACKS[0];
    handleToggleTrack(targetTrack);
  };

  const handleStepTrack = (direction: -1 | 1) => {
    if (!activeTrack) return;
    const idx = ALL_TRACKS.findIndex((t) => t.id === activeTrack.id);
    const nextIdx = (idx + direction + ALL_TRACKS.length) % ALL_TRACKS.length;
    const nextTrack = ALL_TRACKS[nextIdx];
    setActiveTrack(nextTrack);
    witchyAudio.playSequence(nextTrack.notes, nextTrack.bpm);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    witchyAudio.stop();
    setIsPlaying(false);
    setActiveTrack(null);
  };

  const handleAddComment = (postId: string, author: string, body: string) => {
    const date = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: `c-${Date.now()}`, author, date, body }
              ]
            }
          : post
      )
    );
  };

  const handleCreatePost = (draft: Omit<BlogPost, 'id' | 'slug' | 'comments'>) => {
    const newId = `post-${Date.now()}`;
    const slug = draft.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const created: BlogPost = {
      ...draft,
      id: newId,
      slug: slug || newId,
      comments: []
    };
    setPosts((prev) => [created, ...prev]);
    setSelectedPostId(newId);
  };

  const navGroupActive = useMemo(() => {
    if (activeRoute === 'homepage') return 'home';
    if (activeRoute === 'blog') return 'blog';
    if (activeRoute === 'new-release' || activeRoute === 'now-playing') return 'music';
    if (activeRoute === 'shop') return 'shop';
    if (activeRoute === 'fan-photos' || activeRoute === 'art-gallery') return 'gallery';
    return '';
  }, [activeRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FC] text-[#1D1020]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FFF8FC]/95 backdrop-blur-sm border-b border-[#1D1020]/15">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element brand wordmark */}
          <button
            type="button"
            onClick={() => {
              handleNavigate('homepage');
              setMobileTab('map');
            }}
            className="font-display text-xl font-bold tracking-tight text-[#4A1D4D] whitespace-nowrap shrink-0"
          >
            Witchy Tunes
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1D1020]/75">
            <button
              type="button"
              onClick={() => handleNavigate('homepage')}
              className={`hover:text-[#1D1020] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                navGroupActive === 'home'
                  ? 'border-[#4A1D4D] text-[#1D1020] font-semibold'
                  : 'border-transparent'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedPostId(null);
                handleNavigate('blog');
              }}
              className={`hover:text-[#1D1020] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                navGroupActive === 'blog'
                  ? 'border-[#4A1D4D] text-[#1D1020] font-semibold'
                  : 'border-transparent'
              }`}
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('now-playing')}
              className={`hover:text-[#1D1020] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                navGroupActive === 'music'
                  ? 'border-[#4A1D4D] text-[#1D1020] font-semibold'
                  : 'border-transparent'
              }`}
            >
              Music
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('shop')}
              className={`hover:text-[#1D1020] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                navGroupActive === 'shop'
                  ? 'border-[#4A1D4D] text-[#1D1020] font-semibold'
                  : 'border-transparent'
              }`}
            >
              Shop
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('art-gallery')}
              className={`hover:text-[#1D1020] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                navGroupActive === 'gallery'
                  ? 'border-[#4A1D4D] text-[#1D1020] font-semibold'
                  : 'border-transparent'
              }`}
            >
              Gallery
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleHeaderPlayMix}
              className="witchy-btn-lime inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Mix' : 'Play Mix'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mobile Switcher (Image Map vs Live Page) */}
        <div className="lg:hidden mb-5 flex items-center gap-1 p-1 rounded-xl bg-[#FFEBF5] border border-[#1D1020]/20">
          <button
            type="button"
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
              mobileTab === 'map'
                ? 'bg-[#E9F53B] text-[#1D1020] border border-[#1D1020]'
                : 'text-[#4A1D4D]'
            }`}
          >
            Interactive Image
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('page')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
              mobileTab === 'page'
                ? 'bg-[#E9F53B] text-[#1D1020] border border-[#1D1020]'
                : 'text-[#4A1D4D]'
            }`}
          >
            {ROUTE_LABELS[activeRoute]}
          </button>
        </div>

        <div
          className={`grid grid-cols-1 gap-8 items-start ${
            layoutMode === 'split' ? 'lg:grid-cols-12' : 'max-w-4xl mx-auto'
          }`}
        >
          {/* Left Column: Exact Unmodified Image with Zoom, Pan & Clickable Hotspots */}
          {layoutMode === 'split' && (
            <aside
              className={`lg:col-span-5 lg:sticky lg:top-24 ${
                mobileTab === 'map' ? 'block' : 'hidden lg:block'
              }`}
            >
              <InteractiveImageMap
                activeHotspotId={activeHotspotId}
                onSelectHotspot={handleSelectHotspot}
              />
            </aside>
          )}

          {/* Right Column: Visual Storytelling Spotlight + Live Blog & Pages */}
          <section
            className={`${layoutMode === 'split' ? 'lg:col-span-7' : 'w-full'} ${
              mobileTab === 'page' ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Subtle Workspace Toolbar */}
            <div className="mb-4 flex items-center justify-between gap-4 px-1">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4A1D4D] min-w-0">
                <button
                  type="button"
                  onClick={() => handleNavigate('homepage')}
                  className="hover:text-[#1D1020] whitespace-nowrap shrink-0"
                >
                  Witchy Tunes
                </button>
                <span aria-hidden="true">/</span>
                <span className="font-bold text-[#1D1020] truncate">
                  {ROUTE_LABELS[activeRoute]}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setLayoutMode((prev) => (prev === 'split' ? 'full' : 'split'))
                }
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#1D1020]/25 bg-white text-xs font-semibold text-[#1D1020] hover:bg-[#FFEBF5] transition-colors whitespace-nowrap shrink-0"
              >
                {layoutMode === 'split' ? (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand Full Page</span>
                  </>
                ) : (
                  <>
                    <LayoutPanelLeft className="w-3.5 h-3.5" />
                    <span>Show Clickable Image</span>
                  </>
                )}
              </button>
            </div>

            {activeRoute === 'blog' ? (
              <div className="space-y-6">
                {activeHotspot && !selectedPostId && (
                  <HotspotStoryCard
                    hotspot={activeHotspot}
                    relatedPost={relatedHotspotPost}
                    onSelectHotspot={handleSelectHotspot}
                    onOpenArticle={handleOpenBlogPost}
                    onOpenSection={handleNavigate}
                    onDismiss={() => setActiveHotspotId(null)}
                  />
                )}

                <BlogView
                  posts={posts}
                  selectedPostId={selectedPostId}
                  onSelectPost={setSelectedPostId}
                  onOpenBio={() => handleNavigate('bio')}
                  onAddComment={handleAddComment}
                  onCreatePost={handleCreatePost}
                  playingTrackId={activeTrack?.id ?? null}
                  isPlaying={isPlaying}
                  onToggleTrack={handleToggleTrack}
                />
              </div>
            ) : (
              <SecondaryPages
                route={activeRoute}
                posts={posts}
                onNavigate={handleNavigate}
                onOpenBlogPost={handleOpenBlogPost}
                playingTrackId={activeTrack?.id ?? null}
                isPlaying={isPlaying}
                onToggleTrack={handleToggleTrack}
              />
            )}
          </section>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="mt-12 border-t border-[#1D1020]/15 bg-[#FFEBF5]/60">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#4A1D4D]">
          <span>© 2024 Witchy Tunes · Music, Magic & Blog</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setSelectedPostId(null);
                handleNavigate('blog');
              }}
              className="hover:text-[#1D1020] font-medium"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('shop')}
              className="hover:text-[#1D1020] font-medium"
            >
              Shop
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('find-us')}
              className="hover:text-[#1D1020] font-medium"
            >
              hello@witchytunes.com
            </button>
          </div>
        </div>
      </footer>

      {/* Active Audio Mini-Player (appears only when user starts playback) */}
      {activeTrack && (
        <div className="sticky bottom-0 z-40 border-t-2 border-[#1D1020] bg-[#FFEBF5]">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Volume2 className="w-4 h-4 text-[#4A1D4D] shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-[#1D1020] truncate">
                  {activeTrack.title}
                </p>
                <p className="text-[11px] text-[#4A1D4D] truncate">
                  {activeTrack.collection} · {activeTrack.bpm} BPM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Previous track"
                onClick={() => handleStepTrack(-1)}
                className="p-1.5 rounded-lg border border-[#1D1020]/30 bg-white hover:bg-[#FFF8FC]"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                onClick={() => handleToggleTrack(activeTrack)}
                className="witchy-btn-lime p-2 rounded-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                type="button"
                aria-label="Next track"
                onClick={() => handleStepTrack(1)}
                className="p-1.5 rounded-lg border border-[#1D1020]/30 bg-white hover:bg-[#FFF8FC]"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Close player"
                onClick={handleClosePlayer}
                className="p-1.5 rounded-lg text-[#4A1D4D] hover:bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
