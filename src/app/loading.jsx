export default function Loading() {
  return (
    <div className="min-h-[75vh] w-full flex-1 flex flex-col items-center justify-center space-y-4 px-4">
      <div className="w-12 h-12 rounded-2xl bg-[#05893E]/10 border border-[#05893E]/30 flex items-center justify-center text-2xl animate-pulse">
        🛒
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#05893E] animate-bounce"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#05893E] animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#05893E] animate-bounce [animation-delay:0.4s]"></div>
      </div>
      <p className="text-xs sm:text-sm font-semibold text-[#1D271F]/70">
        বাজার দর তথ্য লোড হচ্ছে...
      </p>
    </div>
  );
}
