'use client'
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { fetchProjectList, ProjectData } from "./FetchJson";

const Scene = ({ progress }: { progress: number }) => {
    const [list, setList] = useState<ProjectData[]>([]);
    const pages = list.length + 3;
    const page = Math.min(Math.floor(pages * progress), pages - 1);
    useEffect(() => {
        fetchProjectList().then(setList);
    }, []);

    return (
        <div className="w-full h-screen fixed z-0">
            <Canvas>
                <ambientLight intensity={10} />
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color='hotpink' />
                </mesh>
            </Canvas>
        </div>
    );
}

export default Scene;
