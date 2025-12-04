import React from "react";
import { Video, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * Props:
 *  - size (number) : overall scale in px (defaults to 80)
 *
 * Usage:
 *  <Logo size={96} />
 */

const Logo = ({ size = 80 }) => {
  const wrapperSize = `${size}px`;
  const iconSize = Math.round(size * 0.55);
  const usersSize = Math.round(size * 0.35);
  const titleFontSize = Math.max(14, Math.round(size * 0.28));
  const taglineFontSize = Math.max(10, Math.round(size * 0.14));

  const navigate = useNavigate()

  return (
    <motion.div onClick={()=>navigate('/')}
      className="flex items-center gap-3 select-none"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{ fontSize: titleFontSize }}
    >
      {/* Icon Circle */}
      <motion.div
        className="rounded-full p-3 flex items-center justify-center shadow-lg"
        style={{
          width: wrapperSize,
          height: wrapperSize,
          // greenish-cyan gradient background
          background: "linear-gradient(135deg, #00C48C 0%, #00E0FF 55%, #8AF6C7 100%)",
          boxShadow: "0 8px 18px rgba(0,132,96,0.18), inset 0 -6px 18px rgba(0,0,0,0.06)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Combined icon layout */}
        <div className="relative" style={{ width: iconSize, height: iconSize }}>
          <Video strokeWidth={2.2} size={iconSize} className="text-white" />
          <Users
            strokeWidth={2}
            size={usersSize}
            className="text-white absolute"
            style={{
              right: -Math.round(size * 0.06),
              bottom: -Math.round(size * 0.06),
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      </motion.div>

      {/* Text block (title + tagline) */}
      <motion.div
        className="flex flex-col leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.45 }}
      >
        {/* Title with gradient text */}
        <div
          className="font-semibold"
          style={{
            fontSize: titleFontSize,
            backgroundImage: "linear-gradient(90deg, #00FFA3 0%, #00C4FF 60%, #00FFCC 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "0.01em",
            display: "inline-block",
          }}
        >
          Inter Meet
        </div>

        {/* Tagline (shiny gray) */}
        <div
          className="mt-1"
          style={{
            fontSize: taglineFontSize,
            color: "rgba(220,220,224,0.92)",
            // faint glossy/shiny look
            textShadow: "0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.18)",
            lineHeight: 1.05,
          }}
        >
          Connect. Communicate. Grow.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Logo;
