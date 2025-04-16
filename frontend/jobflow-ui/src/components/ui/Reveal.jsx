import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Reveal({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slidesControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slidesControls.start("visible");
    }
  }, [isInView, mainControls, slidesControls]);

  return (
    <div ref={ref} className="relative w-[100%] overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { x: 0 },
          visible: { x: "100%" },
        }}
        initial="hidden"
        animate={slidesControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "#edcd59",
          zIndex: 20,
        }}
      />
    </div>
  );
}
Reveal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Reveal;
