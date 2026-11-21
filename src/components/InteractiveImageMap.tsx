import { Eye, EyeOff, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IMAGE_HOTSPOTS } from '../data/witchyData';
import { ImageHotspot } from '../types';

interface InteractiveImageMapProps {
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: ImageHotspot) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.2;

export function InteractiveImageMap({
  activeHotspotId,
  onSelectHotspot
}: InteractiveImageMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showPins, setShowPins] = useState(true);
  const [hoveredSpot, setHoveredSpot] = useState<ImageHotspot | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false
  });

  // Clamp pan offsets so the image never drifts outside the frame
  const clampPan = useCallback((nextX: number, nextY: number, targetZoom: number) => {
    const el = containerRef.current;
    if (!el || targetZoom <= 1) {
      return { x: 0, y: 0 };
    }
    const rect = el.getBoundingClientRect();
    const maxOffsetX = ((targetZoom - 1) * rect.width) / 2;
    const maxOffsetY = ((targetZoom - 1) * rect.height) / 2;
    return {
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, nextX)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, nextY))
    };
  }, []);

  const applyZoomAtPoint = useCallback(
    (nextZoomRaw: number, clientX?: number, clientY?: number) => {
      const el = containerRef.current;
      const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Number(nextZoomRaw.toFixed(2))));

      if (!el || nextZoom <= 1) {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        return;
      }

      if (clientX !== undefined && clientY !== undefined) {
        const rect = el.getBoundingClientRect();
        const cursorOffsetX = clientX - (rect.left + rect.width / 2);
        const cursorOffsetY = clientY - (rect.top + rect.height / 2);
        const ratio = nextZoom / zoom;
        const nextPanX = cursorOffsetX - (cursorOffsetX - pan.x) * ratio;
        const nextPanY = cursorOffsetY - (cursorOffsetY - pan.y) * ratio;
        setZoom(nextZoom);
        setPan(clampPan(nextPanX, nextPanY, nextZoom));
      } else {
        setZoom(nextZoom);
        setPan((prev) => clampPan(prev.x, prev.y, nextZoom));
      }
    },
    [clampPan, pan.x, pan.y, zoom]
  );

  // Non-passive wheel listener to zoom smoothly without scrolling the outer page
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.2 : -0.2;
      applyZoomAtPoint(zoom + delta, e.clientX, e.clientY);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [applyZoomAtPoint, zoom]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
      moved: false
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (drag.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) >= 5) {
      drag.moved = true;
      setIsDragging(true);
    }

    if (drag.moved && zoom > 1) {
      setPan(clampPan(drag.originX + dx, drag.originY + dy, zoom));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId === e.pointerId) {
      dragStateRef.current.pointerId = null;
      // Delay clearing isDragging slightly so button onClick sees whether this was a drag
      window.setTimeout(() => {
        dragStateRef.current.moved = false;
        setIsDragging(false);
      }, 0);
    }
  };

  const handleHotspotClick = (spot: ImageHotspot) => {
    if (dragStateRef.current.moved) return;
    onSelectHotspot(spot);
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Viewport Frame for the Unmodified Image + Synchronized Hotspot Layer */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={(e) => {
          if (zoom > 1) {
            handleResetView();
          } else {
            applyZoomAtPoint(2, e.clientX, e.clientY);
          }
        }}
        className={`relative w-full overflow-hidden rounded-2xl witchy-frame bg-[#FFD6EC] select-none touch-none ${
          zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
      >
        <div
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="relative w-full"
        >
          <img
            src="/assets/aistudio/Ui_design_d8527f9b.jfif"
            alt="Witchy Tunes interactive visual blog infographic"
            referrerPolicy="no-referrer"
            draggable={false}
            className="block w-full h-auto select-none pointer-events-none"
          />

          {IMAGE_HOTSPOTS.map((spot) => {
            const isActive = activeHotspotId === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                aria-label={`${spot.number}. ${spot.title}`}
                title={`${spot.number}. ${spot.title}`}
                onClick={() => handleHotspotClick(spot)}
                onMouseEnter={() => setHoveredSpot(spot)}
                onMouseLeave={() => setHoveredSpot(null)}
                style={spot.bounds}
                className={`group absolute transition-all duration-150 ${spot.shapeClass} ${
                  isActive
                    ? 'ring-3 ring-[#4A1D4D] bg-white/10 shadow-sm'
                    : 'bg-transparent hover:bg-white/15 hover:ring-3 hover:ring-[#4A1D4D]/85'
                }`}
              >
                {(showPins || isActive) && (
                  <span
                    className={`absolute -top-2 -right-1.5 w-5 h-5 rounded-full border border-[#1D1020] font-mono text-[10px] font-bold flex items-center justify-center shadow-xs transition-transform duration-150 group-hover:scale-110 tabular-nums ${
                      isActive
                        ? 'bg-[#E9F53B] text-[#1D1020]'
                        : 'bg-[#FFF8FC] text-[#4A1D4D]'
                    }`}
                  >
                    {spot.number}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Zoom, Pan & Pin Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#4A1D4D]">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            aria-label="Zoom out"
            disabled={zoom <= MIN_ZOOM}
            onClick={() => applyZoomAtPoint(zoom - 0.35)}
            className="p-1.5 rounded-lg border border-[#1D1020]/25 bg-white text-[#1D1020] hover:bg-[#FFEBF5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] font-semibold text-[#1D1020] w-11 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            disabled={zoom >= MAX_ZOOM}
            onClick={() => applyZoomAtPoint(zoom + 0.35)}
            className="p-1.5 rounded-lg border border-[#1D1020]/25 bg-white text-[#1D1020] hover:bg-[#FFEBF5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoom > 1 && (
            <button
              type="button"
              onClick={handleResetView}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-[#1D1020]/25 bg-white text-[#1D1020] font-medium hover:bg-[#FFEBF5] transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowPins((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#1D1020]/25 bg-white text-[#1D1020] font-medium hover:bg-[#FFEBF5] transition-colors whitespace-nowrap shrink-0"
        >
          {showPins ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Hide Pins</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Show Pins</span>
            </>
          )}
        </button>
      </div>

      {/* Quiet Helper / Hover Line */}
      <p className="px-1 text-xs text-[#4A1D4D]/85 truncate">
        {hoveredSpot
          ? `${hoveredSpot.number}. ${hoveredSpot.title} — Click to read story`
          : zoom > 1
            ? 'Drag to pan around details · Scroll wheel to zoom · Click any pin'
            : 'Scroll wheel to zoom · Double-click to inspect · Click any numbered pin'}
      </p>
    </div>
  );
}
