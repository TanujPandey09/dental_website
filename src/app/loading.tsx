export default function Loading() {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-4 py-24 bg-background"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-6">
        <span
          aria-hidden="true"
          className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin"
        />
        <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
