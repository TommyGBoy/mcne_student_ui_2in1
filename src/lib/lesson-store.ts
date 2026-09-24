import { create } from "zustand";
import { PDF_PAGES } from "@/lib/lesson-content";

export type MaterialTab = "pdf" | "video";
export type LayoutMode = "web" | "mobile";
export type Choice = "A" | "B" | "C";
export type Sheet = "points" | "badges" | "logout" | null;

export const VIDEO_REQUIRED_SEC = 5;
export const PDF_PAGE_COUNT = PDF_PAGES.length;
export const CORRECT: Choice = "A";

type LessonState = {
  tab: MaterialTab;
  layout: LayoutMode;
  pdfCompleted: boolean;
  pdfPage: number;
  seenPages: boolean[];
  pdfSec: number;
  pageSeconds: number[];
  courseSec: number;
  videoWatchedSec: number;
  videoCompleted: boolean;
  playing: boolean;
  answer: Choice | null;
  submitted: boolean;
  drawerOpen: boolean;
  sheet: Sheet;
  setTab: (tab: MaterialTab) => void;
  setLayout: (layout: LayoutMode) => void;
  setPdfPage: (page: number) => void;
  markPdf: () => void;
  togglePlay: () => void;
  tickSecond: () => void;
  choose: (answer: Choice) => void;
  submit: () => void;
  setDrawerOpen: (open: boolean) => void;
  setSheet: (sheet: Sheet) => void;
};

function blankPages() {
  return Array.from({ length: PDF_PAGE_COUNT }, () => 0);
}

function normalizeSeen(seenPages: boolean[] | undefined, page: number) {
  const next = Array.from({ length: PDF_PAGE_COUNT }, (_, index) => Boolean(seenPages?.[index]));
  if (page >= 0 && page < PDF_PAGE_COUNT) next[page] = true;
  return next;
}

function normalizePageSeconds(pageSeconds: number[] | undefined) {
  return Array.from({ length: PDF_PAGE_COUNT }, (_, index) => pageSeconds?.[index] ?? 0);
}

export const useLesson = create<LessonState>((set, get) => ({
  tab: "pdf",
  layout: "web",
  pdfCompleted: false,
  pdfPage: 0,
  seenPages: normalizeSeen(undefined, 0),
  pdfSec: 0,
  pageSeconds: blankPages(),
  courseSec: 0,
  videoWatchedSec: 0,
  videoCompleted: false,
  playing: false,
  answer: null,
  submitted: false,
  drawerOpen: false,
  sheet: null,
  setTab: (tab) => set({ tab, playing: tab === "video" ? get().playing : false }),
  setLayout: (layout) => set({ layout, sheet: null }),
  setPdfPage: (page) => {
    const next = Math.min(Math.max(page, 0), PDF_PAGE_COUNT - 1);
    set({ pdfPage: next, seenPages: normalizeSeen(get().seenPages, next) });
  },
  markPdf: () => set({ pdfCompleted: true }),
  togglePlay: () => {
    if (get().tab !== "video") return;
    set({ playing: !get().playing });
  },
  tickSecond: () => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
    const state = get();
    const courseSec = (state.courseSec ?? 0) + 1;
    if (state.tab === "pdf") {
      const pageSeconds = normalizePageSeconds(state.pageSeconds);
      const index = Math.min(Math.max(state.pdfPage, 0), PDF_PAGE_COUNT - 1);
      pageSeconds[index] += 1;
      set({
        courseSec,
        pdfSec: pageSeconds.reduce((sum, seconds) => sum + seconds, 0),
        pageSeconds,
        seenPages: normalizeSeen(state.seenPages, index),
      });
      return;
    }
    if (state.playing && state.tab === "video") {
      const videoWatchedSec = state.videoWatchedSec + 1;
      set({
        courseSec,
        videoWatchedSec,
        videoCompleted: state.videoCompleted || videoWatchedSec >= VIDEO_REQUIRED_SEC,
      });
      return;
    }
    set({ courseSec });
  },
  choose: (answer) => {
    if (get().submitted) return;
    set({ answer });
  },
  submit: () => {
    const { pdfCompleted, videoCompleted, answer, submitted } = get();
    if (submitted || !pdfCompleted || !videoCompleted || !answer) return;
    set({ submitted: true, sheet: null });
  },
  setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
  setSheet: (sheet) => set({ sheet }),
}));
