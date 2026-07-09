import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <form
        action={login}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-2 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            دودز كومباني
          </p>
          <h1 className="mt-1 text-xl font-semibold text-zinc-900">تسجيل دخول الإدارة</h1>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.
          </p>
        )}

        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          كلمة المرور
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
}
