import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const ZoomScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) return;

    // Create a timeline linked directly to the scrollbar movement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",      // Animation starts when the top of container hits top of viewport
        end: "+=200% top",     // Pin layout for an extra 200% of viewport height scroll distance
        scrub: 1,              // Smoothly links animation progression to scroll position (1s catch-up)
        pin: true,             // Locks the page viewport in place while animating
        anticipatePin: 1,
      }
    });

    // Complete scroll animation sequence
    tl.fromTo(
      imageRef.current,
      { scale: 0.4, borderRadius: "24px" }, // Initial zoomed out state
      { scale: 1, borderRadius: "0px", ease: "power1.inOut" } // Zooms in completely
    )
    .fromTo(
      textRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, ease: "power1.out" },
      "-=0.5" // Overlaps the text animation slightly with the image zoom
    )
    // Extra stage: Slight shrink-back effect on the whole area if you keep scrolling down
    .to([imageRef.current, textRef.current], {
      scale: 0.95,
      opacity: 0.8,
      ease: "power1.in"
    });

  }, { scope: containerRef });

  return (
    <div className="w-full bg-neutral-950 text-white selection:bg-primary">
      {/* Spacer Section to allow scrolling down to the feature */}
      <div className="h-screen w-full flex items-center justify-center border-b border-white/5">
        <p className="text-sm tracking-widest text-neutral-500 uppercase animate-bounce">
          Scroll Down ↓
        </p>
      </div>

      {/* The Animated Zoom Section Container */}
      <div 
        ref={containerRef} 
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
      >
        {/* Full Screen Image Layer */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 md:p-0">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
            alt="Space Background"
            className="w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Foreground Masking Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80" />

        {/* Content Layer (Fades and scales in over the zooming background) */}
        <div 
          ref={textRef} 
          className="relative z-10 max-w-3xl px-6 text-center space-y-4 will-change-transform"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Cinematic Experience
          </span>
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
            Scroll-Driven Fluidity
          </h2>
          <p className="text-base md:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed">
            As you scroll back up, elements return cleanly to their focal configuration. Continuous scroll management handles reverse pacing seamlessly.
          </p>
        </div>
      </div>

      {/* Another Spacer Section to confirm scroll termination out of pinning */}
      <div className="h-screen w-full flex items-center justify-center bg-neutral-950 border-t border-white/5">
        <p className="text-sm tracking-widest text-neutral-500 uppercase">
          End of Scroll Sequence
        </p>
      </div>
    </div>
  );
};