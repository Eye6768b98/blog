import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  MapPin,
  Minus,
  Music2,
  Pause,
  Play,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  X
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { ALL_TRACKS, GALLERY_ITEMS, SHOP_ITEMS, TOUR_EVENTS } from '../data/witchyData';
import { BlogPost, GalleryItem, PageRoute, ShopItem, Track } from '../types';
import { witchyAudio } from '../utils/audioEngine';
import { ArtworkSvg } from './ArtworkSvg';

interface SecondaryPagesProps {
  route: Exclude<PageRoute, 'blog'>;
  posts: BlogPost[];
  onNavigate: (route: PageRoute) => void;
  onOpenBlogPost: (postId: string) => void;
  playingTrackId: string | null;
  isPlaying: boolean;
  onToggleTrack: (track: Track) => void;
}

export function SecondaryPages({
  route,
  posts,
  onNavigate,
  onOpenBlogPost,
  playingTrackId,
  isPlaying,
  onToggleTrack
}: SecondaryPagesProps) {
  switch (route) {
    case 'homepage':
      return (
        <HomepageView
          posts={posts}
          onNavigate={onNavigate}
          onOpenBlogPost={onOpenBlogPost}
          playingTrackId={playingTrackId}
          isPlaying={isPlaying}
          onToggleTrack={onToggleTrack}
        />
      );
    case 'new-release':
      return (
        <TrackCollectionView
          title='"Spooky Lullaby" EP'
          kicker="New Release · 5 Tracks · Out Now"
          subtitle="Five cozy midnight songs recorded on a 1978 brass music box, felt upright piano, and four-track cassette."
          tracks={ALL_TRACKS.filter((t) => t.collection === 'Spooky Lullaby EP')}
          motif="lavender-vinyl"
          accentClass="bg-[#EDE5FF]"
          playingTrackId={playingTrackId}
          isPlaying={isPlaying}
          onToggleTrack={onToggleTrack}
          onReadNotes={() => onOpenBlogPost('post-1')}
        />
      );
    case 'now-playing':
      return (
        <TrackCollectionView
          title="Spooky Melodies Mix"
          kicker="Now Playing · 12 Cozy Witchy Tracks"
          subtitle="Curated instrumental chimes, warm Omnichord chords, and rain-soaked sketches for reading, studying, and dreaming."
          tracks={ALL_TRACKS.filter((t) => t.collection === 'Spooky Melodies Mix')}
          motif="cassette-mix"
          accentClass="bg-[#FFE3F1]"
          playingTrackId={playingTrackId}
          isPlaying={isPlaying}
          onToggleTrack={onToggleTrack}
          onReadNotes={() => onOpenBlogPost('post-5')}
        />
      );
    case 'about':
      return <AboutView onNavigate={onNavigate} />;
    case 'bio':
      return (
        <BioView
          posts={posts}
          onNavigate={onNavigate}
          onOpenBlogPost={onOpenBlogPost}
        />
      );
    case 'find-us':
      return <FindUsView />;
    case 'shop':
      return <ShopView />;
    case 'ai-songs':
      return <SongIdeaStudioView />;
    case 'fan-photos':
      return <GalleryView initialTab="fan" />;
    case 'art-gallery':
      return <GalleryView initialTab="art" />;
  }
}

/* 1. HOMEPAGE OVERVIEW */
function HomepageView({
  posts,
  onNavigate,
  onOpenBlogPost,
  playingTrackId,
  isPlaying,
  onToggleTrack
}: {
  posts: BlogPost[];
  onNavigate: (route: PageRoute) => void;
  onOpenBlogPost: (postId: string) => void;
  playingTrackId: string | null;
  isPlaying: boolean;
  onToggleTrack: (track: Track) => void;
}) {
  const leadTrack = ALL_TRACKS[0];
  const isLeadPlaying = playingTrackId === leadTrack.id && isPlaying;

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-8">
        <p className="text-xs font-semibold text-[#4A1D4D]">
          Welcome to the Coven · Music, Magic & Merch
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
          Cozy Witchy Melodies & Studio Stories
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-[#1D1020]/75 max-w-[60ch] leading-relaxed">
          Explore the interactive homepage map on the left or jump straight into the Coven Blog, stream our new EP, and browse limited lavender vinyl & tea potions.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="witchy-btn-lime inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap shrink-0"
          >
            <span>Open the Blog</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onToggleTrack(leadTrack)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1D1020] bg-[#EDE5FF] text-sm font-semibold text-[#1D1020] hover:bg-[#E2D4FF] transition-colors whitespace-nowrap shrink-0"
          >
            {isLeadPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isLeadPlaying ? 'Pause EP Title Track' : 'Play "Spooky Lullaby"'}</span>
          </button>
        </div>
      </section>

      {/* Latest Dispatches from the Blog */}
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1D1020]/15">
          <div>
            <h2 className="text-lg font-bold text-[#1D1020]">Latest from the Blog</h2>
            <p className="text-xs text-[#1D1020]/65">Songwriting diaries & gear notes</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="text-xs font-bold text-[#4A1D4D] hover:text-[#1D1020] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>View All ({posts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-4 divide-y divide-[#1D1020]/10">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="py-4 first:pt-1 last:pb-1 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A1D4D]">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-1 text-base font-bold text-[#1D1020]">
                  <button
                    type="button"
                    onClick={() => onOpenBlogPost(post.id)}
                    className="text-left hover:text-[#4A1D4D] transition-colors"
                  >
                    {post.title}
                  </button>
                </h3>
                <p className="mt-1 text-sm text-[#1D1020]/70 line-clamp-2">{post.excerpt}</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenBlogPost(post.id)}
                className="px-3 py-1.5 rounded-lg border border-[#1D1020]/25 text-xs font-semibold text-[#1D1020] hover:bg-[#FFEBF5] transition-colors whitespace-nowrap shrink-0"
              >
                Read
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Section Jumps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="text-left bg-white rounded-2xl witchy-frame p-5 hover:bg-[#FFF8FC] transition-colors"
        >
          <p className="text-xs font-semibold text-[#4A1D4D]">Merch · Vinyl · Potions</p>
          <p className="mt-1 text-lg font-bold text-[#1D1020]">Visit the Coven Shop</p>
          <p className="mt-1 text-xs text-[#1D1020]/70">
            Browse translucent lavender LPs, enamel pins, and chamomile tea tins.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('now-playing')}
          className="text-left bg-white rounded-2xl witchy-frame p-5 hover:bg-[#FFF8FC] transition-colors"
        >
          <p className="text-xs font-semibold text-[#4A1D4D]">12 Cozy Witchy Tracks</p>
          <p className="mt-1 text-lg font-bold text-[#1D1020]">Listen to Spooky Melodies</p>
          <p className="mt-1 text-xs text-[#1D1020]/70">
            Stream all twelve instrumental melodies right inside the browser.
          </p>
        </button>
      </div>
    </div>
  );
}

/* 2. NEW RELEASE & NOW PLAYING TRACK COLLECTIONS */
function TrackCollectionView({
  title,
  kicker,
  subtitle,
  tracks,
  motif,
  accentClass,
  playingTrackId,
  isPlaying,
  onToggleTrack,
  onReadNotes
}: {
  title: string;
  kicker: string;
  subtitle: string;
  tracks: Track[];
  motif: 'lavender-vinyl' | 'cassette-mix';
  accentClass: string;
  playingTrackId: string | null;
  isPlaying: boolean;
  onToggleTrack: (track: Track) => void;
  onReadNotes: () => void;
}) {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className={`w-36 h-28 rounded-xl border border-[#1D1020] p-3 shrink-0 ${accentClass}`}>
            <ArtworkSvg motif={motif} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#4A1D4D]">{kicker}</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
              {title}
            </h1>
            <p className="mt-2 text-sm text-[#1D1020]/75 leading-relaxed">{subtitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {tracks[0] && (
                <button
                  type="button"
                  onClick={() => onToggleTrack(tracks[0])}
                  className="witchy-btn-lime inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap shrink-0"
                >
                  {playingTrackId === tracks[0].id && isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>Play from Track 1</span>
                </button>
              )}
              <button
                type="button"
                onClick={onReadNotes}
                className="px-4 py-2 rounded-xl border border-[#1D1020]/30 text-sm font-semibold text-[#1D1020] hover:bg-[#FFEBF5] transition-colors whitespace-nowrap shrink-0"
              >
                Read Liner Notes on Blog
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl witchy-frame divide-y divide-[#1D1020]/10">
        {tracks.map((track, idx) => {
          const active = playingTrackId === track.id && isPlaying;
          return (
            <div
              key={track.id}
              className={`p-4 sm:px-6 flex items-center justify-between gap-4 transition-colors ${
                active ? 'bg-[#FFF8FC]' : 'hover:bg-[#FFF8FC]/60'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  type="button"
                  aria-label={active ? `Pause ${track.title}` : `Play ${track.title}`}
                  onClick={() => onToggleTrack(track)}
                  className={`w-9 h-9 rounded-full border border-[#1D1020] flex items-center justify-center shrink-0 transition-colors ${
                    active ? 'bg-[#E9F53B] text-[#1D1020]' : 'bg-[#FFEBF5] text-[#1D1020] hover:bg-[#E9F53B]'
                  }`}
                >
                  {active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1D1020] truncate">
                    <span className="font-mono text-xs text-[#4A1D4D] mr-2 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {track.title}
                  </p>
                  <p className="text-xs text-[#1D1020]/65 truncate">{track.story}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs text-[#4A1D4D] tabular-nums">{track.bpm} BPM</span>
                <span className="font-mono text-xs font-semibold text-[#1D1020] tabular-nums">
                  {track.duration}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

/* 3. ABOUT VIEW */
function AboutView({ onNavigate }: { onNavigate: (route: PageRoute) => void }) {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const faqs = [
    {
      q: 'What kind of music does Witchy Tunes make?',
      a: 'Warm acoustic lullabies, felt-piano sketches, and nostalgic music-box instrumentals recorded to cassette tape in our attic studio.'
    },
    {
      q: 'How often are new blog posts published?',
      a: 'We post studio diaries, gear breakdowns, and tour stories twice a month—plus track-by-track liner notes for every release.'
    },
    {
      q: 'Where do merch and vinyl orders ship from?',
      a: 'All records, zines, and botanical teas are hand-packed in Portland, Oregon using recyclable Kraft mailers.'
    }
  ];

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-8">
        <p className="text-xs font-semibold text-[#4A1D4D]">About Witchy Tunes</p>
        <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
          Songs for Rainy Afternoons & Quiet Nights
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#1D1020]/80 leading-relaxed max-w-[62ch]">
          Started in 2022 as a late-night cassette project, Witchy Tunes blends gentle folk melodies with pastel storybook art. Our blog documents every chord experiment, vintage toy instrument, and intimate bookshop listening night along the way.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="witchy-btn-lime px-4 py-2 rounded-xl text-sm font-bold"
          >
            Read the Blog
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bio')}
            className="px-4 py-2 rounded-xl border border-[#1D1020]/30 text-sm font-semibold text-[#1D1020] hover:bg-[#FFEBF5]"
          >
            Artist Bio & Gear
          </button>
        </div>
      </section>

      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <h2 className="text-lg font-bold text-[#1D1020]">Frequently Asked Questions</h2>
        <div className="mt-4 divide-y divide-[#1D1020]/10">
          {faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={item.q} className="py-3.5 first:pt-1 last:pb-1">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left font-semibold text-sm text-[#1D1020]"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#4A1D4D] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-sm text-[#1D1020]/75 leading-relaxed max-w-[60ch]">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#FFEBF5] rounded-2xl witchy-frame p-6 sm:p-7">
        <h2 className="text-lg font-bold text-[#1D1020]">Join the Postcard Club</h2>
        <p className="mt-1 text-sm text-[#1D1020]/75">
          Get notified when new songwriting essays, acoustic demos, or vinyl pressings arrive.
        </p>
        {subscribed ? (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E9F53B] border border-[#1D1020] text-sm font-bold text-[#1D1020]">
            <Check className="w-4 h-4" />
            <span>You are on the list for the next dispatch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-[#1D1020] bg-white"
            />
            <button type="submit" className="witchy-btn-lime px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap shrink-0">
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

/* 4. BIO VIEW */
function BioView({
  posts,
  onNavigate,
  onOpenBlogPost
}: {
  posts: BlogPost[];
  onNavigate: (route: PageRoute) => void;
  onOpenBlogPost: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Editorial Bio Masthead */}
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-36 h-32 rounded-xl border border-[#1D1020] bg-[#FFD6EC] p-3 shrink-0">
            <ArtworkSvg motif="witch-hat" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4A1D4D]">
              <span>Author & Artist Bio</span>
              <span aria-hidden="true">·</span>
              <span>Portland, OR</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2022</span>
            </div>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
              Mina Bell (Witchy Tunes)
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#1D1020]/80 leading-relaxed max-w-[62ch]">
              Multi-instrumentalist, illustrator, and tape-loop tinkerer based in the Pacific Northwest. Mina writes intimate midnight songs built around felt upright pianos, antique music boxes, and hand-drawn zine storytelling.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('blog')}
                className="witchy-btn-lime inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0"
              >
                <span>Read the Blog ({posts.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('new-release')}
                className="px-4 py-2 rounded-xl border border-[#1D1020]/30 text-xs font-bold text-[#1D1020] hover:bg-[#FFEBF5] transition-colors whitespace-nowrap shrink-0"
              >
                Listen to "Spooky Lullaby" EP
              </button>
            </div>
          </div>
        </div>

        {/* Clean Unboxed Bio Facts */}
        <div className="mt-6 pt-5 border-t border-[#1D1020]/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-[#4A1D4D]">Primary Focus</p>
            <p className="mt-0.5 text-sm font-bold text-[#1D1020]">Lo-Fi Folk & Lullabies</p>
          </div>
          <div>
            <p className="text-xs text-[#4A1D4D]">Recording Format</p>
            <p className="mt-0.5 text-sm font-bold text-[#1D1020]">4-Track Cassette</p>
          </div>
          <div>
            <p className="text-xs text-[#4A1D4D]">Blog Dispatches</p>
            <p className="mt-0.5 text-sm font-bold text-[#1D1020] tabular-nums">{posts.length} Published</p>
          </div>
          <div>
            <p className="text-xs text-[#4A1D4D]">Contact</p>
            <p className="mt-0.5 text-sm font-bold text-[#1D1020] truncate">hello@witchytunes.com</p>
          </div>
        </div>
      </section>

      {/* Story & Creative Timeline */}
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <h2 className="text-lg font-bold text-[#1D1020]">The Story Behind Witchy Tunes</h2>
        <div className="mt-3 space-y-3 text-sm sm:text-[15px] text-[#1D1020]/80 leading-relaxed max-w-[65ch]">
          <p>
            Witchy Tunes began on rainy Oregon evenings when Mina started trading short cassette voice memos and risograph postcards with friends. Instead of chasing glossy studio polish, every track embraces small human details—creaking piano pedals, wind-up springs, and gentle tape hiss.
          </p>
          <p>
            Through the Coven Blog, Mina shares full songwriting walkthroughs, microphone placement diagrams, and notes from quiet independent bookshop listening nights.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-[#1D1020]/15 divide-y divide-[#1D1020]/10">
          {[
            {
              year: '2022',
              title: 'First Four-Track Attic Sessions',
              detail: 'Recorded the earliest Spooky Melodies demos on a secondhand cassette deck.'
            },
            {
              year: '2023',
              title: 'Midnight Attic Bookshop Tour',
              detail: 'Played five candlelit acoustic listening evenings across the Pacific Northwest.'
            },
            {
              year: '2024',
              title: '"Spooky Lullaby" EP & Coven Blog',
              detail: 'Pressed translucent lavender 12-inch vinyl and launched the weekly studio journal.'
            }
          ].map((milestone) => (
            <div key={milestone.year} className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-[#4A1D4D] pt-0.5 tabular-nums shrink-0">
                {milestone.year}
              </span>
              <div>
                <p className="text-sm font-bold text-[#1D1020]">{milestone.title}</p>
                <p className="text-xs text-[#1D1020]/70 mt-0.5">{milestone.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Studio Instruments */}
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <h2 className="text-lg font-bold text-[#1D1020]">Studio Instruments & Setup</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: '1964 Felt Upright Piano', note: 'Damped with wool felt for intimate late-night chords.' },
            { name: '1978 Brass Music Box', note: 'Slowed to half speed through reel-to-reel tape echo.' },
            { name: 'Suzuki Omnichord OM-84', note: 'Shimmering strumplate harmonies on every chorus.' },
            { name: 'Four-Track Cassette Deck', note: 'Warm analog saturation and gentle pitch wobble.' }
          ].map((gear) => (
            <div key={gear.name} className="p-4 rounded-xl border border-[#1D1020]/20 bg-[#FFF8FC]">
              <p className="text-sm font-bold text-[#1D1020]">{gear.name}</p>
              <p className="mt-1 text-xs text-[#1D1020]/70 leading-relaxed">{gear.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts by Mina */}
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#1D1020]/15">
          <h2 className="text-lg font-bold text-[#1D1020]">Recent Posts by Mina Bell</h2>
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="text-xs font-bold text-[#4A1D4D] hover:text-[#1D1020]"
          >
            All Posts
          </button>
        </div>
        <div className="mt-3 divide-y divide-[#1D1020]/10">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs text-[#4A1D4D]">
                  {post.category} · {post.date} · {post.readTime}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenBlogPost(post.id)}
                  className="mt-0.5 text-sm font-bold text-[#1D1020] hover:text-[#4A1D4D] text-left truncate block w-full"
                >
                  {post.title}
                </button>
              </div>
              <button
                type="button"
                onClick={() => onOpenBlogPost(post.id)}
                className="px-3 py-1 rounded-lg border border-[#1D1020]/25 text-xs font-semibold hover:bg-[#FFEBF5] shrink-0"
              >
                Read
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* 5. FIND US HERE (EVENTS & CONTACT) */
function FindUsView() {
  const [rsvpIds, setRsvpIds] = useState<string[]>([]);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const toggleRsvp = (id: string) => {
    setRsvpIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleContact = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;
    setSent(true);
    setSenderName('');
    setSenderEmail('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-8">
        <p className="text-xs font-semibold text-[#4A1D4D]">Tour & Listening Rooms</p>
        <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
          Find Us Here
        </h1>
        <p className="mt-2 text-sm text-[#1D1020]/75">
          Upcoming acoustic bookshop evenings, tea house listening circles, and contact details.
        </p>

        <div className="mt-6 divide-y divide-[#1D1020]/10">
          {TOUR_EVENTS.map((ev) => {
            const going = rsvpIds.includes(ev.id);
            return (
              <div key={ev.id} className="py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#4A1D4D]">
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Calendar className="w-3.5 h-3.5" />
                      {ev.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {ev.city}
                    </span>
                  </div>
                  <p className="mt-1 text-base font-bold text-[#1D1020]">{ev.venue}</p>
                  <p className="text-xs text-[#1D1020]/70">{ev.notes}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleRsvp(ev.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border border-[#1D1020] transition-colors whitespace-nowrap shrink-0 ${
                    going ? 'bg-[#E9F53B] text-[#1D1020]' : 'bg-white text-[#1D1020] hover:bg-[#FFEBF5]'
                  }`}
                >
                  {going ? 'Reminder Saved' : 'Save Date'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <h2 className="text-lg font-bold text-[#1D1020]">Say Hello (@witchytunes)</h2>
        <p className="mt-1 text-xs text-[#1D1020]/70">
          Direct studio mailbag: hello@witchytunes.com
        </p>

        {sent ? (
          <div className="mt-4 p-4 rounded-xl bg-[#E9F53B] border border-[#1D1020] text-sm font-bold text-[#1D1020] flex items-center justify-between gap-3">
            <span>Note received. Mina & Theo reply to studio mail every Friday.</span>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-xs underline"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleContact} className="mt-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your name"
                className="px-3.5 py-2 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
              />
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="Your email"
                className="px-3.5 py-2 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
              />
            </div>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Booking inquiry, fan note, or vinyl question..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#1D1020]/30 bg-[#FFF8FC]"
            />
            <button type="submit" className="witchy-btn-lime px-4 py-2 rounded-lg text-sm font-bold">
              Send Message
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

/* 6. SHOP VIEW (MERCH, VINYL, POTIONS) */
function ShopView() {
  const [filter, setFilter] = useState<'All' | 'Vinyl' | 'Merch' | 'Potions'>('All');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkedOut, setCheckedOut] = useState(false);

  const visibleItems = SHOP_ITEMS.filter((item) => filter === 'All' || item.category === filter);

  const addToBag = (item: ShopItem) => {
    setCheckedOut(false);
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] ?? 0) + 1 }));
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[id] ?? 0) + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const cartEntries = Object.entries(cart)
    .map(([id, qty]) => {
      const item = SHOP_ITEMS.find((s) => s.id === id);
      return item ? { item, qty } : null;
    })
    .filter((x): x is { item: ShopItem; qty: number } => Boolean(x));

  const subtotal = cartEntries.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);
  const totalCount = cartEntries.reduce((sum, entry) => sum + entry.qty, 0);

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#4A1D4D]">Merch · Vinyl · Potions</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
              Witchy Tunes Shop
            </h1>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FFEBF5] border border-[#1D1020]/20">
            {(['All', 'Vinyl', 'Merch', 'Potions'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  filter === cat
                    ? 'bg-[#E9F53B] text-[#1D1020] border border-[#1D1020]'
                    : 'text-[#4A1D4D] hover:text-[#1D1020]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visibleItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl witchy-frame p-5 flex flex-col justify-between">
            <div>
              <div className="h-32 rounded-xl border border-[#1D1020]/20 bg-[#FFF8FC] p-4 flex items-center justify-center">
                <ArtworkSvg motif={item.motif} className="h-full w-auto" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h2 className="text-base font-bold text-[#1D1020]">{item.name}</h2>
                <span className="font-mono text-sm font-bold text-[#4A1D4D] tabular-nums shrink-0">
                  ${item.price}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-[#4A1D4D]">{item.detail}</p>
              <p className="mt-2 text-sm text-[#1D1020]/75 leading-relaxed">{item.description}</p>
            </div>

            <button
              type="button"
              onClick={() => addToBag(item)}
              className="mt-4 witchy-btn-lime w-full py-2 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>
        ))}
      </div>

      {/* Inline Shopping Bag */}
      <section className="bg-white rounded-2xl witchy-frame p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-[#1D1020]">
            Shopping Bag ({totalCount})
          </h2>
          <span className="font-mono text-base font-bold text-[#1D1020] tabular-nums">
            Subtotal: ${subtotal}
          </span>
        </div>

        {checkedOut ? (
          <div className="mt-4 p-4 rounded-xl bg-[#E9F53B] border border-[#1D1020] text-sm font-bold text-[#1D1020]">
            Order preview confirmed! Thank you for supporting independent music & art.
          </div>
        ) : cartEntries.length === 0 ? (
          <p className="mt-2 text-sm text-[#1D1020]/65">
            Your bag is empty. Add a vinyl record, zine, or tea tin above.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {cartEntries.map(({ item, qty }) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-2 border-b border-[#1D1020]/10"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1D1020] truncate">{item.name}</p>
                  <p className="font-mono text-xs text-[#4A1D4D] tabular-nums">
                    ${item.price} each
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => updateQty(item.id, -1)}
                    className="p-1 rounded-md border border-[#1D1020]/25 hover:bg-[#FFEBF5]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs font-bold w-5 text-center tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => updateQty(item.id, 1)}
                    className="p-1 rounded-md border border-[#1D1020]/25 hover:bg-[#FFEBF5]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => updateQty(item.id, -qty)}
                    className="p-1 rounded-md text-[#4A1D4D] hover:bg-[#FFEBF5]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                setCart({});
                setCheckedOut(true);
              }}
              className="mt-3 witchy-btn-lime px-5 py-2 rounded-xl text-sm font-bold"
            >
              Complete Preview Order (${subtotal})
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

/* 7. AI SONGS — CHORD & LYRIC IDEA STUDIO */
function SongIdeaStudioView() {
  const [mood, setMood] = useState<'Cozy Rain' | 'Midnight Attic' | 'Starlight Waltz'>('Cozy Rain');
  const [instrument, setInstrument] = useState<'Music Box' | 'Felt Piano' | 'Omnichord'>('Music Box');
  const [seedIdx, setSeedIdx] = useState(0);

  const presets: Record<
    string,
    { chords: string; freqs: number[]; bpm: number; promptLine: string }[]
  > = {
    'Cozy Rain': [
      {
        chords: 'Fmaj7 → Em7 → Dm9 → Cmaj7',
        freqs: [349.23, 440.0, 523.25, 659.25],
        bpm: 74,
        promptLine: 'Kettle humming by the windowsill while rain draws silver lines across the glass.'
      },
      {
        chords: 'Gmaj7 → F#m7 → Em9 → Dmaj7',
        freqs: [392.0, 493.88, 587.33, 739.99],
        bpm: 78,
        promptLine: 'Tucking ticket stubs inside a paperback before the streetlights flicker on.'
      }
    ],
    'Midnight Attic': [
      {
        chords: 'Am9 → Fmaj7 → Cmaj7 → G6',
        freqs: [440.0, 523.25, 659.25, 783.99],
        bpm: 68,
        promptLine: 'Dust motes turning slow in lavender lamp-glow above the wooden floorboards.'
      },
      {
        chords: 'Dm9 → Bbmaj7 → Gm7 → A7sus4',
        freqs: [293.66, 349.23, 440.0, 523.25],
        bpm: 72,
        promptLine: 'Winding up the brass key one last time before the cassette runs out of tape.'
      }
    ],
    'Starlight Waltz': [
      {
        chords: 'Cmaj7 → Am7 → Fmaj7 → G13',
        freqs: [523.25, 659.25, 783.99, 987.77],
        bpm: 86,
        promptLine: 'Three-quarter time under paper lanterns strung across the bookshop loft.'
      },
      {
        chords: 'Ebmaj7 → Cm9 → Abmaj7 → Bb6',
        freqs: [311.13, 392.0, 466.16, 587.33],
        bpm: 82,
        promptLine: 'Tracing constellations on a postcard mailed from three towns ago.'
      }
    ]
  };

  const options = presets[mood];
  const current = options[seedIdx % options.length];

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-8">
        <p className="text-xs font-semibold text-[#4A1D4D]">Create with Music Magic</p>
        <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
          Song & Chord Idea Studio
        </h1>
        <p className="mt-2 text-sm text-[#1D1020]/75 max-w-[60ch]">
          Pick a mood and studio instrument to generate a playable chord progression and lyric prompt in the Witchy Tunes style.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#4A1D4D] mb-2">Song Mood</label>
            <div className="flex flex-wrap gap-1.5">
              {(['Cozy Rain', 'Midnight Attic', 'Starlight Waltz'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#1D1020] ${
                    mood === m ? 'bg-[#E9F53B] text-[#1D1020]' : 'bg-white text-[#1D1020] hover:bg-[#FFEBF5]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A1D4D] mb-2">Lead Instrument</label>
            <div className="flex flex-wrap gap-1.5">
              {(['Music Box', 'Felt Piano', 'Omnichord'] as const).map((inst) => (
                <button
                  key={inst}
                  type="button"
                  onClick={() => setInstrument(inst)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#1D1020] ${
                    instrument === inst ? 'bg-[#B99EFF] text-[#1D1020]' : 'bg-white text-[#1D1020] hover:bg-[#FFEBF5]'
                  }`}
                >
                  {inst}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-[#1D1020] bg-[#FFEBF5] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#4A1D4D]">
            <span>{mood} · {instrument}</span>
            <span className="font-mono tabular-nums">{current.bpm} BPM</span>
          </div>
          <p className="mt-2 font-mono text-lg sm:text-xl font-bold text-[#1D1020]">
            {current.chords}
          </p>
          <p className="mt-2 text-sm text-[#1D1020]/85 italic">“{current.promptLine}”</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => witchyAudio.playChordPreview(current.freqs)}
              className="witchy-btn-lime inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
            >
              <Music2 className="w-4 h-4" />
              <span>Preview Chords</span>
            </button>
            <button
              type="button"
              onClick={() => setSeedIdx((prev) => prev + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1D1020] bg-white text-xs font-bold text-[#1D1020] hover:bg-[#FFF8FC]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Variation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* 8. GALLERY VIEW (FAN PHOTOS & ART ALBUM GALLERY) */
function GalleryView({ initialTab }: { initialTab: 'fan' | 'art' }) {
  const [tab, setTab] = useState<'fan' | 'art'>(initialTab);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const items = GALLERY_ITEMS.filter((g) => g.kind === tab);

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl witchy-frame p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#4A1D4D]">
              {tab === 'fan' ? 'Fan Photos · Events' : 'Art · Album Gallery'}
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1020]">
              {tab === 'fan' ? 'Fan Photos & Tour Moments' : 'Artwork & Album Gallery'}
            </h1>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FFEBF5] border border-[#1D1020]/20">
            <button
              type="button"
              onClick={() => setTab('fan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                tab === 'fan'
                  ? 'bg-[#E9F53B] text-[#1D1020] border border-[#1D1020]'
                  : 'text-[#4A1D4D] hover:text-[#1D1020]'
              }`}
            >
              Fan Photos
            </button>
            <button
              type="button"
              onClick={() => setTab('art')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                tab === 'art'
                  ? 'bg-[#E9F53B] text-[#1D1020] border border-[#1D1020]'
                  : 'text-[#4A1D4D] hover:text-[#1D1020]'
              }`}
            >
              Album Art
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedItem(item)}
            className="text-left bg-white rounded-2xl witchy-frame p-4 hover:-translate-y-0.5 transition-transform"
          >
            <div
              className="h-36 rounded-xl border border-[#1D1020]/20 p-4 flex items-center justify-center"
              style={{ backgroundColor: item.accentBg }}
            >
              <ArtworkSvg motif={item.motif} className="h-full w-auto" />
            </div>
            <p className="mt-3 text-xs font-medium text-[#4A1D4D]">{item.date}</p>
            <h2 className="mt-0.5 text-base font-bold text-[#1D1020]">{item.title}</h2>
            <p className="mt-1 text-xs text-[#1D1020]/70 line-clamp-2">{item.caption}</p>
          </button>
        ))}
      </div>

      {/* Clean Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          className="fixed inset-0 z-50 bg-[#1D1020]/60 p-4 flex items-center justify-center"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl witchy-frame max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold text-[#4A1D4D]">
                {selectedItem.credit} · {selectedItem.date}
              </p>
              <button
                type="button"
                aria-label="Close lightbox"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg border border-[#1D1020]/20 hover:bg-[#FFEBF5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div
              className="mt-4 h-56 rounded-xl border border-[#1D1020] p-6 flex items-center justify-center"
              style={{ backgroundColor: selectedItem.accentBg }}
            >
              <ArtworkSvg motif={selectedItem.motif} className="h-full w-auto" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#1D1020]">{selectedItem.title}</h3>
            <p className="mt-1.5 text-sm text-[#1D1020]/80 leading-relaxed">{selectedItem.caption}</p>
            <p className="mt-3 font-mono text-xs text-[#4A1D4D]">{selectedItem.specs}</p>
          </div>
        </div>
      )}
    </div>
  );
}
