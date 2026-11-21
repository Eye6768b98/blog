import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Heart,
  MessageSquare,
  Pause,
  PenLine,
  Play,
  Search,
  X
} from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { ALL_TRACKS } from '../data/witchyData';
import { BlogCategory, BlogPost, IllustrationMotif, Track } from '../types';
import { ArtworkSvg } from './ArtworkSvg';

interface BlogViewProps {
  posts: BlogPost[];
  selectedPostId: string | null;
  onSelectPost: (postId: string | null) => void;
  onOpenBio: () => void;
  onAddComment: (postId: string, author: string, body: string) => void;
  onCreatePost: (post: Omit<BlogPost, 'id' | 'slug' | 'comments'>) => void;
  playingTrackId: string | null;
  isPlaying: boolean;
  onToggleTrack: (track: Track) => void;
}

const CATEGORIES: BlogCategory[] = [
  'All',
  'Songwriting',
  'Behind the EP',
  'Studio Gear',
  'Tour Diary'
];

export function BlogView({
  posts,
  selectedPostId,
  onSelectPost,
  onOpenBio,
  onAddComment,
  onCreatePost,
  playingTrackId,
  isPlaying,
  onToggleTrack
}: BlogViewProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(['post-1']);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    'post-1': 42,
    'post-2': 28,
    'post-3': 35,
    'post-4': 31,
    'post-5': 24,
    'post-6': 19
  });

  // Comment composer state
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentBody, setCommentBody] = useState('');

  // New Post composer state
  const [isComposing, setIsComposing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Exclude<BlogCategory, 'All'>>('Songwriting');
  const [newAuthor, setNewAuthor] = useState('Mina Bell');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newMotif, setNewMotif] = useState<IllustrationMotif>('music-box');

  const toggleSave = (id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleLike = (id: string) => {
    const alreadyLiked = Boolean(likedIds[id]);
    setLikedIds((prev) => ({ ...prev, [id]: !alreadyLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 12) + (alreadyLiked ? -1 : 1))
    }));
  };

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeCategory !== 'All' && post.category !== activeCategory) return false;
      if (onlySaved && !savedIds.includes(post.id)) return false;
      if (!query) return true;
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      );
    });
  }, [posts, activeCategory, onlySaved, savedIds, searchQuery]);

  const activePost = useMemo(
    () => (selectedPostId ? posts.find((p) => p.id === selectedPostId) ?? null : null),
    [posts, selectedPostId]
  );

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!activePost || !commentAuthor.trim() || !commentBody.trim()) return;
    onAddComment(activePost.id, commentAuthor.trim(), commentBody.trim());
    setCommentAuthor('');
    setCommentBody('');
  };

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    const paragraphs = newBody
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const wordCount = newBody.trim().split(/\s+/).length;
    const readMinutes = Math.max(1, Math.ceil(wordCount / 180));

    onCreatePost({
      title: newTitle.trim(),
      category: newCategory,
      date: today,
      readTime: `${readMinutes} min read`,
      author: newAuthor.trim() || 'Mina Bell',
      excerpt: newExcerpt.trim() || paragraphs[0]?.slice(0, 140) || newTitle.trim(),
      motif: newMotif,
      pullQuote: paragraphs[0]?.slice(0, 110) || newTitle.trim(),
      paragraphs: paragraphs.length > 0 ? paragraphs : [newBody.trim()]
    });

    setNewTitle('');
    setNewExcerpt('');
    setNewBody('');
    setIsComposing(false);
  };

  // ARTICLE DETAIL VIEW
  if (activePost) {
    const activeIndex = posts.findIndex((p) => p.id === activePost.id);
    const prevPost = activeIndex > 0 ? posts[activeIndex - 1] : null;
    const nextPost = activeIndex >= 0 && activeIndex < posts.length - 1 ? posts[activeIndex + 1] : null;
    const linkedTrack = activePost.linkedTrackId
      ? ALL_TRACKS.find((t) => t.id === activePost.linkedTrackId) ?? null
      : null;
    const isTrackActive = linkedTrack && playingTrackId === linkedTrack.id && isPlaying;
    const isSaved = savedIds.includes(activePost.id);
    const isLiked = Boolean(likedIds[activePost.id]);

    return (
      <article className="bg-white rounded-2xl witchy-frame p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#1D1020]/15">
          <button
            type="button"
            onClick={() => onSelectPost(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A1D4D] hover:text-[#1D1020] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Posts</span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => toggleLike(activePost.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1D1020] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                isLiked ? 'bg-[#FFD1E8] text-[#1D1020]' : 'bg-white text-[#1D1020] hover:bg-[#FFF0F7]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#4A1D4D] text-[#4A1D4D]' : ''}`} />
              <span className="tabular-nums">{likeCounts[activePost.id] ?? 18}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleSave(activePost.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1D1020] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                isSaved ? 'bg-[#E9F53B] text-[#1D1020]' : 'bg-white text-[#1D1020] hover:bg-[#FFF0F7]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#1D1020]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Clean unboxed editorial metadata */}
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4A1D4D]">
            <span>{activePost.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activePost.date}</span>
            <span aria-hidden="true">·</span>
            <span>{activePost.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>By {activePost.author}</span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020] leading-tight">
            {activePost.title}
          </h1>

          <p className="mt-3 text-base text-[#1D1020]/75 leading-relaxed max-w-[65ch]">
            {activePost.excerpt}
          </p>
        </header>

        {/* Illustrated cover panel */}
        <div className="mt-6 rounded-xl border border-[#1D1020] bg-[#FFEBF5] p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-36 h-28 shrink-0">
            <ArtworkSvg motif={activePost.motif} />
          </div>
          {linkedTrack ? (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#4A1D4D]">Companion Studio Recording</p>
              <p className="mt-1 text-base font-bold text-[#1D1020] truncate">{linkedTrack.title}</p>
              <p className="mt-1 text-xs text-[#1D1020]/70">{linkedTrack.story}</p>
              <button
                type="button"
                onClick={() => onToggleTrack(linkedTrack)}
                className="mt-3 witchy-btn-lime inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0"
              >
                {isTrackActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTrackActive ? 'Pause Track' : 'Play Studio Track'}</span>
                <span className="font-mono tabular-nums opacity-75">{linkedTrack.duration}</span>
              </button>
            </div>
          ) : (
            <p className="text-sm text-[#1D1020]/80 italic max-w-[50ch]">
              “{activePost.pullQuote}”
            </p>
          )}
        </div>

        {/* Prose Body */}
        <div className="mt-7 space-y-5 max-w-[65ch] text-[15px] sm:text-base leading-[1.7] text-[#1D1020]/90">
          {activePost.paragraphs.map((para, idx) => (
            <div key={idx}>
              <p>{para}</p>
              {idx === 1 && (
                <blockquote className="my-6 rounded-xl border border-[#1D1020]/25 bg-[#FFF8FC] px-5 py-4 text-base font-medium text-[#4A1D4D]">
                  “{activePost.pullQuote}”
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Author Bio Box inside Article */}
        <aside className="mt-9 rounded-xl border border-[#1D1020] bg-[#FFF8FC] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-20 h-16 rounded-lg border border-[#1D1020] bg-[#FFD6EC] p-1.5 shrink-0">
            <ArtworkSvg motif="witch-hat" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A1D4D]">
              <span className="font-bold text-[#1D1020]">Written by {activePost.author}</span>
              <span aria-hidden="true">·</span>
              <span>Songwriter & Illustrator</span>
              <span aria-hidden="true">·</span>
              <span>Portland, OR</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#1D1020]/75 leading-relaxed">
              Mina Bell records cozy midnight folk songs on felt upright piano, vintage music boxes, and four-track cassette tape under Witchy Tunes.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBio}
            className="px-3.5 py-1.5 rounded-lg border border-[#1D1020] bg-[#E9F53B] text-xs font-bold text-[#1D1020] hover:bg-[#f3fc58] transition-colors whitespace-nowrap shrink-0"
          >
            Full Bio
          </button>
        </aside>

        {/* Prev / Next Navigation */}
        <div className="mt-10 pt-6 border-t border-[#1D1020]/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <button
              type="button"
              onClick={() => onSelectPost(prevPost.id)}
              className="text-left p-4 rounded-xl border border-[#1D1020]/20 hover:border-[#1D1020] hover:bg-[#FFF8FC] transition-colors"
            >
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A1D4D]">
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Post
              </span>
              <p className="mt-1 text-sm font-bold text-[#1D1020] line-clamp-1">{prevPost.title}</p>
            </button>
          ) : (
            <div />
          )}
          {nextPost && (
            <button
              type="button"
              onClick={() => onSelectPost(nextPost.id)}
              className="text-left sm:text-right p-4 rounded-xl border border-[#1D1020]/20 hover:border-[#1D1020] hover:bg-[#FFF8FC] transition-colors"
            >
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A1D4D]">
                Next Post
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <p className="mt-1 text-sm font-bold text-[#1D1020] line-clamp-1">{nextPost.title}</p>
            </button>
          )}
        </div>

        {/* Interactive Reader Comments */}
        <section className="mt-10 pt-8 border-t border-[#1D1020]/15">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#4A1D4D]" />
            <h2 className="text-lg font-bold text-[#1D1020]">
              Reader Notes ({activePost.comments.length})
            </h2>
          </div>

          <div className="mt-4 space-y-3">
            {activePost.comments.length === 0 ? (
              <p className="text-sm text-[#1D1020]/60">
                No comments yet. Share a thought below to start the conversation.
              </p>
            ) : (
              activePost.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl border border-[#1D1020]/15 bg-[#FFF8FC]"
                >
                  <div className="flex items-center gap-2 text-xs text-[#4A1D4D]">
                    <span className="font-bold text-[#1D1020]">{comment.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{comment.date}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#1D1020]/85 leading-relaxed">{comment.body}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-6 space-y-3">
            <p className="text-sm font-bold text-[#1D1020]">Leave a Comment</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder="Your name"
                className="px-3.5 py-2 text-sm rounded-lg border border-[#1D1020]/30 bg-white focus:border-[#1D1020]"
              />
            </div>
            <textarea
              required
              rows={3}
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Write your note on this post..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#1D1020]/30 bg-white focus:border-[#1D1020]"
            />
            <button
              type="submit"
              className="witchy-btn-lime px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shrink-0"
            >
              Post Comment
            </button>
          </form>
        </section>
      </article>
    );
  }

  // BLOG FEED / LIST VIEW
  const featuredPost =
    activeCategory === 'All' && !searchQuery.trim() && !onlySaved
      ? filteredPosts.find((p) => p.featured) ?? filteredPosts[0] ?? null
      : null;

  const listPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="space-y-6">
      {/* Blog Header Banner */}
      <div className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#4A1D4D]">
              Witchy Tunes Journal · Songwriting & Studio Dispatches
            </p>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
              The Coven Blog
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#1D1020]/75 max-w-[58ch]">
              Behind-the-scenes stories from our attic studio, music-box experiments, tour notes, and track breakdowns.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsComposing((prev) => !prev)}
            className="witchy-btn-lime inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap shrink-0"
          >
            {isComposing ? <X className="w-4 h-4" /> : <PenLine className="w-4 h-4" />}
            <span>{isComposing ? 'Close Editor' : 'Write Post'}</span>
          </button>
        </div>

        {/* Inline Live Blog Post Composer */}
        {isComposing && (
          <form
            onSubmit={handleCreateSubmit}
            className="mt-6 pt-6 border-t border-[#1D1020]/15 space-y-4"
          >
            <h2 className="text-base font-bold text-[#1D1020]">Publish a New Blog Entry</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Post title"
                className="sm:col-span-2 px-3.5 py-2 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as Exclude<BlogCategory, 'All'>)}
                className="px-3.5 py-2 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
              >
                <option value="Songwriting">Songwriting</option>
                <option value="Behind the EP">Behind the EP</option>
                <option value="Studio Gear">Studio Gear</option>
                <option value="Tour Diary">Tour Diary</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Author name"
                className="px-3.5 py-2 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
              />
              <select
                value={newMotif}
                onChange={(e) => setNewMotif(e.target.value as IllustrationMotif)}
                className="px-3.5 py-2 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
              >
                <option value="music-box">Cover Art: Music Box</option>
                <option value="upright-piano">Cover Art: Upright Piano</option>
                <option value="candle-tour">Cover Art: Candlelight</option>
                <option value="cassette-mix">Cover Art: Cassette Tape</option>
                <option value="lavender-vinyl">Cover Art: Lavender Vinyl</option>
              </select>
              <input
                type="text"
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                placeholder="Short summary (optional)"
                className="px-3.5 py-2 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
              />
            </div>
            <textarea
              required
              rows={4}
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Write your article paragraphs..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
            />
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsComposing(false)}
                className="px-4 py-2 text-sm font-medium text-[#1D1020]/70 hover:text-[#1D1020]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="witchy-btn-lime px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shrink-0"
              >
                Publish Post
              </button>
            </div>
          </form>
        )}

        {/* Filter & Search Toolbar */}
        <div className="mt-6 pt-5 border-t border-[#1D1020]/15 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#FFEBF5] border border-[#1D1020]/20">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#E9F53B] text-[#1D1020] border border-[#1D1020]'
                        : 'text-[#4A1D4D] hover:text-[#1D1020]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setOnlySaved((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                onlySaved
                  ? 'bg-[#B99EFF] text-[#1D1020] border-[#1D1020]'
                  : 'bg-white text-[#1D1020] border-[#1D1020]/25 hover:bg-[#FFF8FC]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-[#1D1020]' : ''}`} />
              <span>Saved ({savedIds.length})</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#4A1D4D]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, gear, or topic..."
              aria-label="Search blog posts"
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[#1D1020]/25 bg-[#FFF8FC] focus:border-[#1D1020]"
            />
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="bg-white rounded-2xl witchy-frame p-8 text-center">
          <p className="text-base font-bold text-[#1D1020]">No matching posts found</p>
          <p className="mt-1 text-sm text-[#1D1020]/70">
            Try clearing your search or switching back to all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
              setOnlySaved(false);
            }}
            className="mt-4 witchy-btn-lime px-4 py-2 rounded-lg text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Featured Post Card */}
      {featuredPost && (
        <article className="bg-white rounded-2xl witchy-frame overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-5 bg-[#FFD6EC] border-b md:border-b-0 md:border-r border-[#1D1020] p-6 flex items-center justify-center">
              <div className="w-44 h-36">
                <ArtworkSvg motif={featuredPost.motif} />
              </div>
            </div>
            <div className="md:col-span-7 p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4A1D4D]">
                  <span className="font-bold">Featured Story</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="mt-2.5 text-xl sm:text-2xl font-bold text-[#1D1020] leading-snug">
                  <button
                    type="button"
                    onClick={() => onSelectPost(featuredPost.id)}
                    className="text-left hover:text-[#4A1D4D] transition-colors"
                  >
                    {featuredPost.title}
                  </button>
                </h2>
                <p className="mt-2.5 text-sm text-[#1D1020]/75 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#1D1020]/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectPost(featuredPost.id)}
                  className="witchy-btn-lime inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-3 text-xs text-[#4A1D4D]">
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Heart className="w-3.5 h-3.5" />
                    {likeCounts[featuredPost.id] ?? 42}
                  </span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {featuredPost.comments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Article Cards Grid */}
      {listPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {listPosts.map((post) => {
            const isSaved = savedIds.includes(post.id);
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl witchy-frame p-5 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#4A1D4D]">
                      <span>{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <button
                      type="button"
                      aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
                      onClick={() => toggleSave(post.id)}
                      className="p-1.5 rounded-lg hover:bg-[#FFEBF5] transition-colors shrink-0"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-[#4A1D4D] text-[#4A1D4D]' : 'text-[#1D1020]/50'
                        }`}
                      />
                    </button>
                  </div>

                  <div
                    onClick={() => onSelectPost(post.id)}
                    className="mt-3 h-28 rounded-xl border border-[#1D1020]/20 bg-[#FFF8FC] p-3 flex items-center justify-center cursor-pointer"
                  >
                    <ArtworkSvg motif={post.motif} className="h-full w-auto" />
                  </div>

                  <h3 className="mt-3.5 text-lg font-bold text-[#1D1020] leading-snug">
                    <button
                      type="button"
                      onClick={() => onSelectPost(post.id)}
                      className="text-left hover:text-[#4A1D4D] transition-colors"
                    >
                      {post.title}
                    </button>
                  </h3>

                  <p className="mt-2 text-sm text-[#1D1020]/75 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#1D1020]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectPost(post.id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#4A1D4D] hover:text-[#1D1020] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-3 text-xs text-[#1D1020]/65 tabular-nums">
                    <span>{likeCounts[post.id] ?? 18} likes</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.comments.length} notes</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Blogger Bio Card inside Blog Feed */}
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-24 h-20 rounded-xl border border-[#1D1020] bg-[#FFD6EC] p-2 shrink-0">
            <ArtworkSvg motif="witch-hat" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4A1D4D]">
              <span className="font-bold text-[#1D1020]">About the Blogger</span>
              <span aria-hidden="true">·</span>
              <span>Mina Bell</span>
              <span aria-hidden="true">·</span>
              <span>{posts.length} Essays Published</span>
              <span aria-hidden="true">·</span>
              <span>Portland, OR</span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-[#1D1020]">
              Mina Bell — Songwriter, Tape Tinkerer & Illustrator
            </h2>
            <p className="mt-1.5 text-sm text-[#1D1020]/75 leading-relaxed max-w-[60ch]">
              Every post on the Coven Blog documents how Witchy Tunes songs are built from thrift-store music boxes, felt upright pianos, and risograph zines.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBio}
            className="witchy-btn-lime inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0"
          >
            <span>Open Full Bio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
