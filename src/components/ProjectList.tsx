import Project from "./ProjectItem";

const Projects = () => {
    const list=[
        {
            title:"DevLog",
            description:"devlogはRustで構築された高性能開発ログシステムです。開発者が効率的にコーディング進捗を追跡し、技術的な洞察を記録するために設計されています。個人プロジェクトからチーム開発まで、あらゆるシーンで活躍。Rustの高速性とメモリ安全性により、最小限のリソース消費で確実な動作を実現します。シンプルで強力なインターフェースを備え、開発プロセスを系統的に管理できます。",
            video:"/video/devlog.mp4",
            github:"https://github.com/kaishu000/devlog",
            build_with:["Rust"]
        },
        {
            title:"RAG System",
            description:"RAG Systemは、外部ドキュメントを取り込みベクトル検索で関連情報を抽出し、言語モデルを用いてコンテキスト付きの自然言語応答を生成するRetrieval-Augmented Generationの実装です。文書前処理や検索精度向上、会話形式のインターフェースを備え、実用的なナレッジベース構築に焦点を当てたポートフォリオ作品で、設計方針や実装・評価の概要も示しています。",
            video:"/video/rag.mp4",
            github:"https://github.com/kaishu000/rag-system",
            build_with:["Python", "LangChain", "Chroma DB", "SQLite"]
        },
    ]
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