'use client'
import { motion } from "motion/react";

const Skills = () => {
    const list=["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Python", "Flask"]
    return (
        <div id="skills" className="w-full h-screen grid justify-items-center items-center content-center gap-24 snap-start">
            <motion.h1
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-8xl font-bold"
            >
                Skills
            </motion.h1>
            <ul className="grid grid-cols-4 gap-8">
                {
                    list.map((item, id)=>(
                        <motion.li
                            key={id}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: id * 0.1 }}
                            viewport={{ once: true }}
                            className="w-48 px-4 py-2 border-2 text-2xl text-center font-bold"
                        >
                            {item}
                        </motion.li>
                    ))
                }
                <motion.li
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: list.length * 0.1 }}
                    viewport={{ once: true }}
                    className="w-48 px-4 py-2 border border-dashed text-2xl text-center"
                >
                    + New
                </motion.li>
            </ul>
        </div>
    );
}

export default Skills;
