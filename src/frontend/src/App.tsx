import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart } from 'lucide-react';

type Screen = 'error' | 'invitation';
type InvitationState = 'asking' | 'accepted';

const gradients = [
  'linear-gradient(135deg, oklch(0.95 0.05 15) 0%, oklch(0.92 0.08 25) 100%)',
  'linear-gradient(135deg, oklch(0.93 0.06 350) 0%, oklch(0.96 0.04 20) 100%)',
  'linear-gradient(135deg, oklch(0.94 0.07 10) 0%, oklch(0.91 0.09 340) 100%)',
  'linear-gradient(135deg, oklch(0.96 0.03 5) 0%, oklch(0.93 0.07 355) 100%)',
  'linear-gradient(135deg, oklch(0.92 0.08 15) 0%, oklch(0.95 0.05 345) 100%)',
];

const puppyImages = [
  '/assets/generated/puppy-happy.dim_512x512.png',
  '/assets/generated/puppy-sad-1.dim_512x512.png',
  '/assets/generated/puppy-sad-2.dim_512x512.png',
  '/assets/generated/puppy-sad-3.dim_512x512.png',
  '/assets/generated/puppy-saddest.dim_512x512.png',
];

const sadPuppyImages = [
  '/assets/generated/puppy-sad-1.dim_512x512.png',
  '/assets/generated/puppy-sad-2.dim_512x512.png',
  '/assets/generated/puppy-sad-3.dim_512x512.png',
  '/assets/generated/puppy-saddest.dim_512x512.png',
];

const happiestPuppyImage = '/assets/generated/puppy-happiest.dim_512x512.gif';

function App() {
  const [screen, setScreen] = useState<Screen>('error');
  const [invitationState, setInvitationState] = useState<InvitationState>('asking');
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showButtons, setShowButtons] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gradientIndex, setGradientIndex] = useState(0);

  const handleRefresh = () => {
    setScreen('invitation');
  };

  const handleYes = () => {
    setInvitationState('accepted');
    setShowConfetti(true);

    // Hide buttons after 1 second
    setTimeout(() => {
      setShowButtons(false);
    }, 1000);

    // Stop confetti after 10 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
  };

  const handleNo = () => {
    if (invitationState === 'accepted') return;

    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    // Change gradient
    setGradientIndex((prev) => (prev + 1) % gradients.length);

    // Calculate new random position for the No button
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const newX = Math.random() * Math.max(0, maxX);
    const newY = Math.random() * Math.max(0, maxY);

    setNoButtonPosition({ x: newX, y: newY });
  };

  // Determine which puppy image to show
  const getPuppyImage = () => {
    if (invitationState === 'accepted') {
      return happiestPuppyImage;
    }
    
    if (noClickCount === 0) {
      return puppyImages[0]; // Happy puppy
    }
    
    // Loop through sad puppy images (1+ NO clicks)
    const sadIndex = (noClickCount - 1) % sadPuppyImages.length;
    return sadPuppyImages[sadIndex];
  };

  const currentGradient = gradients[gradientIndex];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-all duration-700"
      style={{ background: currentGradient }}
    >
      {screen === 'error' && (
        <div className="text-center animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Network Error</h1>
              <p className="text-lg text-gray-600">retry again</p>
            </div>
            <Button
              onClick={handleRefresh}
              size="lg"
              className="bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Refresh
            </Button>
          </div>
        </div>
      )}

      {screen === 'invitation' && (
        <div className="text-center animate-fade-in w-full max-w-2xl mx-auto relative">
          {/* Confetti Effect */}
          {showConfetti && <ConfettiEffect />}

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Heart Shower Background (only when accepted) */}
            {invitationState === 'accepted' && <HeartShower />}

            {/* Puppy Image */}
            <div className="mb-6 relative z-10">
              <img
                src={getPuppyImage()}
                alt="Puppy"
                className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg transition-all duration-500"
                style={{ aspectRatio: '1/1' }}
              />
            </div>

            {invitationState === 'asking' && (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  Mr, Ayan Will You Like To Be My Valentine 2026 ?
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  on this 14th of feb i wanna be the 1 4 u
                </p>

                {showButtons && (
                  <div className="flex gap-4 justify-center items-center relative">
                    <Button
                      onClick={handleYes}
                      size="lg"
                      className="bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white rounded-full px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-button-fade"
                    >
                      yes
                    </Button>

                    {noClickCount === 0 ? (
                      <Button
                        onClick={handleNo}
                        size="lg"
                        variant="outline"
                        className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-full px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-button-fade"
                      >
                        no
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNo}
                        size="lg"
                        variant="outline"
                        className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-full px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-200 fixed z-50"
                        style={{
                          left: `${noButtonPosition.x}px`,
                          top: `${noButtonPosition.y}px`,
                        }}
                      >
                        no
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}

            {invitationState === 'accepted' && (
              <div className="relative z-10 animate-fade-in">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-4">
                  now u're my personal marad, no backoffing
                </div>
                <Heart className="w-16 h-16 mx-auto text-red-400 animate-pulse mt-6" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ConfettiEffect() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function HeartShower() {
  const hearts = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((i) => (
        <Heart
          key={i}
          className="heart-fall absolute text-red-300"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
            width: `${20 + Math.random() * 20}px`,
            height: `${20 + Math.random() * 20}px`,
          }}
        />
      ))}
    </div>
  );
}

export default App;
