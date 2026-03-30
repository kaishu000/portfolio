'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const Header = () => {
    const img_size = 28
    return (
        <motion.div
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="w-full px-24 py-4 fixed flex justify-between items-center border-b z-50 bg-white/80"
        >
            <Link href="#hero"><h2 className="flex gap-4 text-2xl font-bold"><Image src="/img/icon.png" width={img_size} height={img_size} alt="icon" />M.Kaishu Portfolio</h2></Link>
            <ul className="flex justify-center items-center gap-8 font-bold">
                <li><Link href="#skills">Skills</Link></li>
                <li><Link href="#about">About</Link></li>
                <li className="border-l-2 pl-4"><a href="https://github.com/kaishu000"><Image src="/img/github-mark.png" width={img_size} height={img_size} alt="github" /></a></li>
            </ul>
        </motion.div>
    );
}

export default Header;