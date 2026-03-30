export interface ProjectData {
    title: string;
    description: string;
    video: string;
    github: string;
    build_with: string[];
}

export const fetchProjectList = async (): Promise<ProjectData[]> => {
    const res = await fetch("/data/projectData.json");
    const data: ProjectData[] = await res.json();
    return data;
};
