"use client";

import { useState, useTransition } from "react";
import { toggleRevoke, deleteInvite, sendInvitationEmail } from "@/app/admin/actions";

export function InviteRowActions({
  inviteId,
  slug,
  revoked,
}: {
  inviteId: string;
  slug: string;
  revoked: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [emailNotice, setEmailNotice] = useState<string | null>(null);

  const inviteUrl =
    typeof window !== "undefined" ? `${window.location.origin}/invite/${slug}` : `/invite/${slug}`;

  function handleCopy() {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function handleToggleRevoke() {
    startTransition(() => toggleRevoke(inviteId, !revoked));
  }

  function handleDelete() {
    if (!window.confirm("هل تريد حذف هذه الدعوة نهائياً؟")) return;
    startTransition(() => deleteInvite(inviteId));
  }

  function handleSendEmail() {
    startTransition(async () => {
      const result = await sendInvitationEmail(inviteId);
      setEmailNotice(result.message);
      setTimeout(() => setEmailNotice(null), 4000);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopy}
          className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          {copied ? "تم النسخ!" : "نسخ الرابط"}
        </button>
        <button
          onClick={handleSendEmail}
          disabled={isPending}
          title="قريباً"
          className="inline-flex items-center gap-1 rounded-full border border-dashed border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-400 hover:bg-zinc-50 disabled:opacity-50"
        >
          إرسال بالبريد
          <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">
            قريباً
          </span>
        </button>
        <button
          onClick={handleToggleRevoke}
          disabled={isPending}
          className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
        >
          {revoked ? "إعادة تفعيل" : "إلغاء الدعوة"}
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          حذف
        </button>
      </div>
      {emailNotice && <p className="text-xs text-zinc-400">{emailNotice}</p>}
    </div>
  );
}
