'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

const Slideshow = () => {
    const imgs=[
        "slide (8).png",
        "slide (2).png",
        "slide (5).png",
        "slide (6).png",
        "slide (7).png",
        "slide (10).png",
        "slide (11).png",
    ]
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % imgs.length);
                setVisible(true);
            }, 200);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="absolute top-0 left-0 w-full h-screen">
            <Image
                src={`/img/slideshow/${imgs[current]}`}
                fill
                alt=""
                loading="eager"
                className={`transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-20"}`}
            />
            <div className="bg-black/50 w-full h-screen absolute top-0 left-0"></div>
        </div>
    );
}

export default Slideshow;