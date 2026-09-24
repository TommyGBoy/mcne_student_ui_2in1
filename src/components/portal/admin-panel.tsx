import { formatClock } from "@/lib/lesson-content";
import { PDF_PAGE_COUNT, useLesson } from "@/lib/lesson-store";
import { cn } from "@/lib/utils";

export function AdminDurationPanel({ compact = false }: { compact?: boolean }) {
  const courseSec = useLesson((s) => s.courseSec);
  const pdfSec = useLesson((s) => s.pdfSec);
  const videoSec = useLesson((s) => s.videoWatchedSec);
  const seen = useLesson((s) => s.seenPages.filter(Boolean).length);
  const pages = `${seen}/${PDF_PAGE_COUNT}`;

  return (
    <aside
      aria-label="管理員課程時長"
      className={cn(
        "border-b border-stroke bg-paper text-ink",
        compact ? "px-3 py-2" : "px-5 py-3",
      )}
    >
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-primary-mid">
        <span className="size-1.5 rounded-full bg-primary" aria-hidden />
        Admin 示範
      </p>
      <p className={cn("mt-1 font-semibold text-primary-dark", compact ? "text-sm" : "text-base")}>
        Course A
      </p>
      <p className={cn("tabular-nums text-ink", compact ? "text-xs" : "text-sm")}>
        total duration {formatClock(courseSec)}, page {pages}
      </p>
      <p className={cn("tabular-nums text-body", compact ? "text-xs" : "text-sm")}>
        pdf {pages} · {formatClock(pdfSec)}, video {formatClock(videoSec)}
      </p>
      <p className="mt-1 text-xs text-muted">
        總時長是學生留在本課的逗留時間，不是 PDF 與影片相加。頁面開著每秒加一，切去其他分頁就暫停。
      </p>
    </aside>
  );
}
