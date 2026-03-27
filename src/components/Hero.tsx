'use client'
import { motion } from "motion/react";
import Slideshow from "./Slideshow";
import ButtonBestShot from "./ButtonBestShot";


const Hero = () => {
    return (
        <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        id="hero" className="relative w-full h-screen grid justify-items-center items-center content-center gap-8 text-white snap-start"
        >
            <Slideshow/>
            <h2 className="text-4xl border px-4 py-2 z-10">Application / System Engineer</h2>
            <h1 className="z-10 text-9xl">KAISHU MATSUO</h1>
            <p className="z-10 text-2xl">3DCG・Web・AI -- Blender / UE5 / Next.js / Python</p>
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: -0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="z-10 absolute bottom-8 grid justify-items-center items-center gap-4 text-neutral-200"
            >
                <h3>SCROLL</h3>
                <div className="w-px h-16 bg-neutral-200"></div>
            </motion.div>
            <ButtonBestShot/>
        </motion.div>
    );
}

export default Hero;