'use client';

import { motion } from 'framer-motion';

export function PageWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mx-auto max-w-5xl px-4 py-8 ${className}`}
    >
      {children}
    </motion.main>
  );
}
