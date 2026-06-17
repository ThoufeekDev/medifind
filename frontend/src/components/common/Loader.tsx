// components/Loader.tsx
import { motion } from "framer-motion";

const CUBIC: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={{ width: 56, height: 56, position: "relative" }}>

        {/* Outer ring */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "5px solid transparent",
            borderTopColor: "#7F77DD",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: CUBIC }}
        />

        {/* Middle ring (reverse) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "5px solid transparent",
            borderRightColor: "#1D9E75",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 0.85, repeat: Infinity, ease: CUBIC }}
        />

        {/* Inner ring */}
        <motion.div
          style={{
            position: "absolute",
            inset: 16,
            borderRadius: "50%",
            border: "5px solid transparent",
            borderBottomColor: "#D85A30",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: CUBIC }}
        />

        {/* Center dot */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#7F77DD",
            marginTop: -3,
            marginLeft: -3,
          }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />

      </div>
    </div>
  );
}