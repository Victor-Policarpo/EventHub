export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 w-full gap-3 p-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-500" />
      <span className="text-sm font-medium text-zinc-500 tracking-wide animate-pulse">
        Carregando...
      </span>
    </div>
  );
}