# Specification

## Summary
**Goal:** Add subtle Valentine-themed visual polish animations to the invitation screen without changing existing copy, assets, or YES/NO interaction logic.

**Planned changes:**
- Add subtle, semi-transparent floating heart bubbles drifting upward behind the invitation card content (non-interactive / pointer-events disabled).
- Add a soft, gently pulsing glow/halo around the puppy image that works across all puppy states without layout shift.
- Animate the main Valentine question text with a smooth fade/slide-in on the invitation screen’s initial render only.
- Add a very soft shadow/grounding effect to the moving “no” button once it becomes the jumping/moving button.
- Add a subtle idle wiggle/bounce to the initial happy puppy state (noClickCount = 0), reduced/disabled once sad states begin.
- Add a brief sparkle “pop” effect around the puppy whenever the displayed puppy mood image changes (including switching to the accepted happiest puppy).
- Add a very gentle ambient pulse/shift animation to the existing gradient background while preserving the current NO-click gradient cycling behavior.
- Add a soft, readable glow (text-shadow) styling to the main Valentine question text.

**User-visible outcome:** The invitation screen feels more lively and polished with gentle background hearts, glows, sparkles, and subtle motion, while interactions and wording remain the same.
