const Skills = () => {
    const list=["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Python", "Flask"]
    return (
        <div id="skills" className="w-full h-screen grid justify-items-center items-center content-center gap-24 snap-start">
            <h1 className="text-8xl font-bold">Skills</h1>
            <ul className="grid grid-cols-4 gap-8">
                {
                    list.map((item, id)=>(
                        <li key={id} className="w-48 px-4 py-2 border-2 text-2xl text-center font-bold">{item}</li>
                    ))
                }
                <li className="w-48 px-4 py-2 border border-dashed text-2xl text-center">+ New</li>
            </ul>
        </div>
    );
}

export default Skills;