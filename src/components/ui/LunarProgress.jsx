"use client";

import { motion } from "framer-motion";

export default function LunarProgress({ percentage }) {
    // percentage 0 to 100
    // 0 = New Moon (Dark)
    // 50 = Full Moon (Bright)
    // 100 = New Moon again (Cycle) 
    // OR: 0 = New Moon, 100 = Full Moon? 
    // Prompt says "Lunar Progress component that takes a percentage prop and renders an SVG moon phase."
    // Let's assume 0% is empty, 100% is full for "Progress" metaphor.

    // Simple masking approach:
    // Circle with a masking rect or path moving across.

    return (
        <div className="relative w-16 h-16 flex items-center justify-center" title={`Completion: ${percentage}%`}>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                <defs>
                    <pattern id="gold-gradient" x="0" y="0" width="100%" height="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#B4941F" />
                    </pattern>
                    <mask id="moon-mask">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <motion.circle
                            cx={percentage > 50 ? 50 - (percentage - 50) * 2 : 50 + (50 - percentage) * 2}
                            cy="50"
                            r="50"
                            fill="black"
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                        />
                        {/* This is a simplifiction. A real accurate moon phase SVG is complex. 
                 For "Progress", a radial fill or simple clip is better.
                 Let's do a simple Radial Progress with Moon aesthetic. */}
                    </mask>
                </defs>

                {/* Background Circle (Dark) */}
                <circle cx="50" cy="50" r="45" fill="#022c22" stroke="#D4AF37" strokeWidth="2" />

                {/* Filled Part (Gold) - representing light */}
                {/* We can use a path that mocks the phase */}
                <motion.path
                    d={`
              M 50,5 
              A 45,45 0 ${percentage > 50 ? 1 : 0},1 50,95
              A ${Math.abs(percentage - 50) * 0.9},45 0 0,${percentage > 50 ? 0 : 1} 50,5
            `}
                    fill="#D4AF37"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
            </svg>
            <div className="absolute text-[10px] font-bold text-gold">
                {percentage}%
            </div>
        </div>
    );
}
