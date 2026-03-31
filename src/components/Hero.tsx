'use client'
import { motion } from "motion/react";


const Hero = () => {
    return (
        <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        id="hero" className="relative w-full h-screen grid justify-items-center items-center content-center gap-8 snap-start"
        >
            <h2 className="text-4xl border px-4 py-2 z-10">Application / System Engineer</h2>
            <h1 className="z-10 text-9xl">KAISHU MATSUO</h1>
            <p className="z-10 text-2xl">3DCG・Web・AI -- Blender / UE5 / Next.js / Python</p>
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: [0, -12, 0] }}
                transition={{
                    y: {
                        delay: 0.8,
                        duration: 1.2,
                        ease: "easeInOut",
                    },
                }}
                className="z-10 absolute bottom-8 grid justify-items-center items-center gap-4"
            >
                <h3>SCROLL</h3>
                <div className="w-px h-16 bg-foreground"></div>
            </motion.div>
            <div className="absolute top-0 left-0 bg-black/20 w-full h-screen border-b"></div>
        </motion.div>
    );
}

export default Hero;