import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { IMAGE_HOTSPOTS } from '../data/witchyData';
import { BlogPost, ImageHotspot, PageRoute } from '../types';

interface HotspotStoryCardProps {
  hotspot: ImageHotspot;
  relatedPost: BlogPost | undefined;
  onSelectHotspot: (hotspot: ImageHotspot) => void;
  onOpenArticle: (postId: string) => void;
  onOpenSection: (route: PageRoute) => void;
  onDismiss: () => void;
}

export function HotspotStoryCard({
  hotspot,
  relatedPost,
  onSelectHotspot,
  onOpenArticle,
  onOpenSection,
  onDismiss
}: HotspotStoryCardProps) {
  const currentIdx = IMAGE_HOTSPOTS.findIndex((h) => h.id === hotspot.id);
  const prevHotspot =
    IMAGE_HOTSPOTS[(currentIdx - 1 + IMAGE_HOTSPOTS.length) % IMAGE_HOTSPOTS.length];
  const nextHotspot = IMAGE_HOTSPOTS[(currentIdx + 1) % IMAGE_HOTSPOTS.length];

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={hotspot.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        aria-live="polite"
        className="bg-[#FFEBF5] rounded-2xl witchy-frame p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-7 h-7 rounded-full bg-[#E9F53B] border border-[#1D1020] font-mono text-xs font-bold text-[#1D1020] flex items-center justify-center shrink-0 tabular-nums">
              {hotspot.number}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#4A1D4D] truncate">
                Hotspot {String(hotspot.number).padStart(2, '0')} of {IMAGE_HOTSPOTS.length} ·{' '}
                {hotspot.areaLabel}
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-[#1D1020] leading-snug truncate">
                {hotspot.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              aria-label="Previous hotspot"
              onClick={() => onSelectHotspot(prevHotspot)}
              className="p-1.5 rounded-lg border border-[#1D1020]/25 bg-white text-[#1D1020] hover:bg-[#FFF8FC] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              aria-label="Next hotspot"
              onClick={() => onSelectHotspot(nextHotspot)}
              className="p-1.5 rounded-lg border border-[#1D1020]/25 bg-white text-[#1D1020] hover:bg-[#FFF8FC] transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              aria-label="Close hotspot story"
              onClick={onDismiss}
              className="p-1.5 rounded-lg text-[#4A1D4D] hover:bg-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="mt-3 text-sm sm:text-[15px] text-[#1D1020]/85 leading-relaxed max-w-[65ch]">
          {hotspot.summary}
        </p>

        <p className="mt-2 text-xs text-[#4A1D4D]/90">
          <span className="font-semibold">Visual note:</span> {hotspot.designDetail}
        </p>

        <div className="mt-4 pt-4 border-t border-[#1D1020]/15 flex flex-wrap items-center justify-between gap-3">
          {relatedPost && (
            <button
              type="button"
              onClick={() => onOpenArticle(relatedPost.id)}
              className="witchy-btn-lime inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold max-w-full"
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Read Article: {relatedPost.title}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenSection(hotspot.targetRoute)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#1D1020] bg-white text-xs font-bold text-[#1D1020] hover:bg-[#FFF8FC] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Open Section</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
