import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Intro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 120 : 2900);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);
  return <AnimatePresence>{visible && <motion.div className="race-intro" initial={{ opacity: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: 'blur(9px)' }} transition={{ duration: reduceMotion ? 0.12 : 0.32 }} aria-label="Introducción F1 Data Garage">
    <motion.div className="intro-mark" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.42 }}>F1 DATA <span>GARAGE</span></motion.div>
    <motion.div className="start-lights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.58 }}>{[0, 1, 2, 3, 4].map((light) => <motion.i key={light} animate={{ backgroundColor: '#ff182f', boxShadow: '0 0 28px rgba(255,24,47,.96)' }} transition={{ delay: reduceMotion ? 0 : 0.72 + light * 0.2, duration: 0.09 }} />)}</motion.div>
    <motion.div className="lights-out" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 1.86, duration: 0.16 }}>LIGHTS OUT</motion.div>
    {!reduceMotion && <motion.div className="intro-speed-lines" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 0] }} transition={{ delay: 2.23, duration: 0.6 }} />}
  </motion.div>}</AnimatePresence>;
}
export default Intro;
