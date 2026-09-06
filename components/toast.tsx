export default function Toast({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[var(--error)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
      {message}
    </div>
  );
}
