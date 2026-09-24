import { Button } from "@/components/portal/button";
import { CORRECT, type Choice, useLesson } from "@/lib/lesson-store";
import { cn } from "@/lib/utils";

const OPTIONS: { id: Choice; text: string }[] = [
  { id: "A", text: "吸收光能進行光合作用" },
  { id: "B", text: "促進植物水分蒸散" },
  { id: "C", text: "儲存多餘糖分" },
];

export function QuizBody({ compact = false }: { compact?: boolean }) {
  const answer = useLesson((s) => s.answer);
  const submitted = useLesson((s) => s.submitted);
  const choose = useLesson((s) => s.choose);

  return (
    <div className="flex flex-col gap-3">
      <p className={cn("font-semibold text-ink", compact ? "text-sm" : "text-base")}>
        01. 根據 PDF 教材，葉綠素的主要作用為何？
      </p>
      <div className="flex flex-col gap-2" role="radiogroup" aria-label="課後測驗選項">
        {OPTIONS.map((option) => {
          const selected = answer === option.id;
          const showResult = submitted && selected;
          const correctPick = showResult && option.id === CORRECT;
          const wrongPick = showResult && option.id !== CORRECT;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={submitted}
              onClick={() => choose(option.id)}
              className={cn(
                "rounded-control border px-4 py-3 text-left text-sm disabled:cursor-default",
                selected ? "border-primary bg-tint font-semibold text-primary-dark" : "border-stroke bg-paper text-ink",
                correctPick && "border-primary",
                wrongPick && "border-stroke-strong",
              )}
            >
              {option.id}. {option.text}
            </button>
          );
        })}
      </div>
      {submitted && (
        <p className="rounded-control bg-tint px-3 py-2 text-sm text-primary-dark">
          {answer === CORRECT
            ? "答對了。葉綠素的主要作用是吸收光能，進行光合作用。"
            : "這次不對。回到教材第 1 頁：正確答案是 A，吸收光能進行光合作用。"}
        </p>
      )}
    </div>
  );
}

export function RequirementNote({ compact = false }: { compact?: boolean }) {
  const pdf = useLesson((s) => s.pdfCompleted);
  const video = useLesson((s) => s.videoCompleted);
  const answered = useLesson((s) => s.answer !== null);
  const items = [
    { label: "閱讀 PDF", done: pdf },
    { label: "觀看影片", done: video },
    { label: "選擇答案", done: answered },
  ];

  return (
    <p className={cn("text-muted", compact ? "text-xs" : "text-sm")}>
      完成
      {items.map((item, index) => (
        <span key={item.label}>
          {index === 0 ? "：" : " + "}
          <span className={item.done ? "font-medium text-primary-mid" : undefined}>{item.label}</span>
        </span>
      ))}
      ，即可解鎖「提交答案」。
    </p>
  );
}

export function SubmitHint({ compact = false }: { compact?: boolean }) {
  const submitted = useLesson((s) => s.submitted);
  if (submitted) {
    return (
      <p className={cn("text-primary-mid", compact ? "text-xs" : "text-sm")}>
        已提交。桌面與手機共用這份進度，切換版面不會重來。
      </p>
    );
  }
  return <RequirementNote compact={compact} />;
}

export function SubmitButton({ compact = false, label = "提交答案" }: { compact?: boolean; label?: string }) {
  const canSubmit = useLesson((s) => s.pdfCompleted && s.videoCompleted && s.answer !== null && !s.submitted);
  const submitted = useLesson((s) => s.submitted);
  const submit = useLesson((s) => s.submit);

  return (
    <Button
      size={compact ? "sm" : "md"}
      disabled={!canSubmit && !submitted}
      variant={submitted ? "outline" : "primary"}
      className={submitted ? "border-primary bg-tint text-primary-dark hover:bg-tint" : undefined}
      onClick={submit}
    >
      {submitted ? "已提交" : label}
    </Button>
  );
}
