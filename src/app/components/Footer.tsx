const Footer = () => {
    return (
        // Footer com fundo escuro e texto cinza, padding vertical
        <footer className="bg-[var(--bg-card)] text-[var(--text-primary)] py-6 mt-8 align-bottom border-t border-[var(--border-color)] transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">

                {/* Copyright */}
                <div className="text-lg font-semibold text-[var(--text-primary)]">
                    ConsultAi © {new Date().getFullYear()}
                </div>

                {/* Redes sociais */}
                <div className="flex flex-row-reverse gap-3">
                    <a
                        href="https://github.com/milysj/Full-Stack-Estude.my"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors text-[var(--text-primary)]"
                    >
                        Github
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
