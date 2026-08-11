import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'

/**
 * Subtle scroll-in reveal. Animates once, never blocks reading,
 * and becomes a no-op when the OS asks for reduced motion.
 *
 * Uses LazyMotion + `m` rather than the full `motion` component — same result,
 * roughly a third of the JavaScript. Performance is a hard requirement here.
 */
export default function Reveal({ children, delay = 0, y = 18, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = m[as] || m.div

  if (reduce) return <div className={className}>{children}</div>

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionTag
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </MotionTag>
    </LazyMotion>
  )
}
