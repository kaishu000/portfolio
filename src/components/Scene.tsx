'use client'
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { fetchProjectList, ProjectData } from "./FetchJson";
import Particles from "./my_shape";

const Scene = ({ progress }: { progress: number }) => {
    const [list, setList] = useState<ProjectData[]>([]);
    const pages = list.length + 3;
    const page = Math.min(Math.floor(pages * progress), pages - 1);
    useEffect(() => {
        fetchProjectList().then(setList);
    }, []);

    return (
        <div className="w-full h-screen fixed z-0">
            <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 50] }}>
                <ambientLight intensity={10} />
                <Particles page={page} pages={pages}/>
            </Canvas>
        </div>
    );
}

export default Scene;