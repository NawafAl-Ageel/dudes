export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-5xl animate-pulse flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="h-14 w-48 rounded-xl bg-zinc-200" />
          <div className="h-9 w-28 rounded-full bg-zinc-200" />
        </div>
        <div className="h-9 w-56 rounded-full bg-zinc-200" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="h-20 rounded-2xl bg-zinc-200" />
          <div className="h-20 rounded-2xl bg-zinc-200" />
          <div className="h-20 rounded-2xl bg-zinc-200" />
        </div>
        <div className="h-64 rounded-2xl bg-zinc-200" />
      </div>
    </div>
  );
}
