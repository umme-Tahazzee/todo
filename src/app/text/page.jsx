'use client'
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SwapLines() {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    const line1 = containerRef.current.querySelector(".line1");
    const line2 = containerRef.current.querySelector(".line2");

    tl.from(line1, { x: -50, opacity: 0, duration: 1, ease: "power3.out" }) // animate line1 in
      .to(line1, { x: 50, opacity: 0, duration: 1, ease: "power3.in", delay: 1 }) // animate line1 out
      .from(line2, { x: -50, opacity: 0, duration: 1, ease: "power3.out" }); // animate line2 in
  }, []);

  return (
    <div ref={containerRef} style={{ textAlign: "center", marginTop: "50px" }}>
      <p className="text-lg sm:text-xl mb-2 text-black line1">
        Where focus meets action.
      </p>
      <p className="text-lg sm:text-xl mb-2 text-black line2">
        Your success starts here.
      </p>
    </div>
  );
}
