import Image from "next/image";

interface Item {
    title: string, description: string, video: string, github: string, index: number, build_with:string[]
}
const Project = ({ title, description, video, github, index, build_with }: Item) => {
    const img_size = 28
    const is = index % 2 == 0 ? false : true;
    return (
        <div className="w-full h-screen flex justify-center items-center gap-8 px-24 snap-start">
            {
                is ? <div className="w-1/2 mr-8"><video src={video} loop muted autoPlay playsInline className="border pr-1">sorry, this browser is unavailable.</video></div> : <div></div>
            }
            <div className="w-1/2 aspect-video grid justify-items-start items-center">
                <div className="grid gap-8">
                    <h1 className="text-6xl font-bold">{title}</h1>
                    <p>{description}</p>
                </div>
                <hr />
                <div className="relative w-full flex justify-between items-end border-t pt-4 pr-8">
                    <div className="text-neutral-400 relative w-full grid gap-2">
                        <h2>BUILD WITH</h2>
                        <ul className="flex gap-4">
                            {
                                build_with.map((item, id)=>(
                                    <li key={id} className="border px-4">{item}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <a href={github} className="shadow-lg border flex gap-4 w-fit h-fit px-8 py-2 font-bold justify-center items-center mt-4"><Image src="/img/github-mark-white.png" width={img_size} height={img_size} alt="github" />GitHub</a>
                </div>
            </div>
            {
                is ? <div></div> : <div className="w-1/2"><video src={video} loop muted autoPlay playsInline className="border pr-1">sorry, this browser is unavailable.</video></div>
            }
        </div>
    );
}

export default Project;