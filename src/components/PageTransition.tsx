import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export const PageTransition = ({ children }: Props) => {
  // Automatically scroll to the top of the page whenever a new route/page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};