'use client'
import Image from "next/image";
import { motion } from "motion/react";

const About = () => {
    return (
        <div id="about" className="snap-start w-full h-screen flex justify-center items-center p-24">
            <motion.div
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-2/3"
            >
                <h1 className="text-4xl mb-8">松尾海秀</h1>
                <p>
                    久留米工業大学 情報ネットワーク工学科で学び、現在はITエンジニアとして活動しています。<br />
                    専門は 3DCG・Web開発・AI活用の交差点。Blender / UE5 / Maya による3Dモデリング・レンダリングから、Next.js / TypeScript / Python を用いたフルスタックWeb開発、さらにLLMを組み込んだAIワークフローの設計・構築まで、幅広い領域を融合して構築できることが強みです。<br />
                    現在は ITエンジニアとして実務経験を積みながら、受託開発・制作にも対応しています。「技術的に面白いものをつくる」だけでなく、「ビジネスとして価値を届ける」ことを意識した開発を心がけています。<br />
                    趣味の旅行では国内だけでなく、イタリアをはじめ各国を渡航するなかで、グローバルな視点も磨いています。<br />
                </p>
            </motion.div>
            <motion.div
                initial={{ x: 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid justify-items-center items-center w-1/3 relative"
            >
                <div className="w-1/2 px-4 pt-4 shadow-lg border z-20 bg-background">
                    <div className="overflow-hidden relative w-full aspect-2/3 border">
                        <Image className="object-cover" src="/img/profile.png" fill sizes="(max-width: 768px) 50vw, 17vw" alt="profile" />
                    </div>
                    <h4 className="text-center py-4">2026.03.23</h4>
                </div>
                <div className="border mt-12 ml-8 w-1/2 aspect-2/3 absolute"></div>
            </motion.div>
        </div>
    );
}

export default About;
