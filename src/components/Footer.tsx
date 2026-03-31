'use client'
import Image from "next/image";
import { motion } from "motion/react";

const Footer = () => {
    const img_size=48
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full snap-start py-12 grid justify-items-center items-center gap-12 bg-foreground text-background"
        >
            <h2 className="font-bold text-4xl flex justify-center items-center gap-4"><Image src="/img/icon-black.png" width={img_size} height={img_size} alt="icon"/>M.Kaishu Portfolio</h2>
            <ul className="flex gap-24">
                <li>Github</li>
                <li>Instagram</li>
                <li>X</li>
                <li>Gmail</li>
            </ul>
            <p>© 2026 KaishuMatsuo.</p>
        </motion.div>
    );
}

export default Footer;
