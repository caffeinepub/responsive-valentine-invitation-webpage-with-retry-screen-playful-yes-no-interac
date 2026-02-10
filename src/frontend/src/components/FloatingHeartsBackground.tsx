import { Heart } from 'lucide-react';

export default function FloatingHeartsBackground() {
  const hearts = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((i) => (
        <Heart
          key={i}
          className="floating-heart absolute"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${12 + Math.random() * 8}s`,
            width: `${16 + Math.random() * 16}px`,
            height: `${16 + Math.random() * 16}px`,
            opacity: 0.15 + Math.random() * 0.15,
          }}
        />
      ))}
    </div>
  );
}
