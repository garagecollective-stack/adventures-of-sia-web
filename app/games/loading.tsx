export default function GamesLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: '#F0EAFC' }}>
      <div className="relative">
        {/* Spinning pom flowers */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)',
                   animation: 'spinSlow 1.5s linear infinite' }}>
          🌸
        </div>
      </div>
      <p className="font-display text-[1.2rem] text-brand-violet">
        Loading the game room...
      </p>
      {/* Skeleton card row */}
      <div className="flex gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="w-32 h-36 rounded-[20px] animate-pulse"
            style={{ background: `rgba(122,92,170,${0.06 + i * 0.03})` }} />
        ))}
      </div>
    </div>
  );
}
