export default function SparklePop() {
  const sparkles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((i) => (
        <div
          key={i}
          className="sparkle-pop absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
