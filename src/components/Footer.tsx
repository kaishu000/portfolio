import Image from "next/image";

const Footer = () => {
    const img_size=48
    return (
        <div className="w-full bg-neutral-800 text-white snap-start py-12 grid justify-items-center items-center gap-12">
            <h2 className="font-bold text-4xl flex justify-center items-center gap-4"><Image src="/img/icon.png" width={img_size} height={img_size} alt="icon"/>M.Kaishu Portfolio</h2>
            <ul className="flex gap-24">
                <li>Github</li>
                <li>Instagram</li>
                <li>X</li>
                <li>Gmail</li>
            </ul>
            <p>© 2026 KaishuMatsuo.</p>
        </div>
    );
}

export default Footer;