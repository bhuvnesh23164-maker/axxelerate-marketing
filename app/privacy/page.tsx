export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e3e3e3] p-10 flex flex-col items-center justify-center font-sans">
      <div className="max-w-2xl w-full bg-[#111111] p-8 rounded-2xl border border-white/10 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-gray-400 mb-4">
          We collect your name and email to provide early access to AxxelerateAI. We do not sell or share your data.
        </p>
        <p className="text-gray-400">
          Contact: <a href="mailto:contact@axxelerate.app" className="text-[#00E5FF] hover:underline">contact@axxelerate.app</a>
        </p>
      </div>
    </div>
  );
}