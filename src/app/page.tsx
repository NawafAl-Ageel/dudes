import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center">
      <Image src="/dudes_logo_transparent.png" alt="دودز كومباني" width={72} height={72} priority />
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          دودز كومباني
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">الدعوات</h1>
      </div>
      <p className="max-w-sm text-sm text-zinc-500">
        يتم إرسال روابط الدعوات بشكل فردي. إذا استلمت رابط دعوة، افتحه مباشرة لعرض تفاصيل
        الفعالية.
      </p>
      {process.env.NODE_ENV !== "production" && (
        <Link
          href="/invite/faisal-vip-kickoff"
          className="mt-2 rounded-full border border-dashed border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-500 hover:bg-white"
        >
          (وضع التطوير) عرض دعوة تجريبية ←
        </Link>
      )}
    </div>
  );
}
