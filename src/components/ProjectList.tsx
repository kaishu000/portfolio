'use client'
import { useState, useEffect } from "react";
import Project from "./ProjectItem";
import { fetchProjectList, ProjectData } from "./FetchJson";

const Projects = () => {
    const [list, setList] = useState<ProjectData[]>([]);

    useEffect(() => {
        fetchProjectList().then(setList);
    }, []);

    return (
        <div>
            {
                list.map((item, id)=>(
                    <Project key={id} title={item.title} description={item.description} video={item.video} github={item.github} index={id} build_with={item.build_with}/>
                ))
            }
        </div>
    );
}

export default Projects;
