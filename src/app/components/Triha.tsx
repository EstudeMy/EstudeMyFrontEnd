"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { BookText, ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

function TooltipDescricao({
  index,
  onStart,
  isLocked,
}: {
  index: number;
  onStart: () => void;
  isLocked: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: [0.8, 1.05, 1], y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
      className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-64 bg-blue-500 rounded-2xl shadow-2xl text-white p-4 z-50"
    >
      <p className="font-bold text-lg">DESCRIÇÃO</p>
      <p className="text-sm opacity-90 mb-3">Lição {index + 1}</p>
      <button
        onClick={!isLocked ? onStart : undefined}
        disabled={isLocked}
        className={`w-full py-2 rounded-xl shadow-md font-bold transition-all 
          ${isLocked 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : "bg-white text-blue-500 hover:scale-105 active:scale-95"
          }`}
      >
        {isLocked ? "BLOQUEADO" : "COMEÇAR +10 XP"}
      </button>
    </motion.div>
  );
}

export default function Trilhas() {
  const buttons = [1, 2, 3, 4, 5];
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const [characterPos, setCharacterPos] = useState({ x: 0, y: 0 });
  const [characterFacingRight, setCharacterFacingRight] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tracksRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);

  const controls = useAnimation();

  // Função para mover o personagem
  const moveCharacter = async (index: number) => {
    const btn = buttonRefs.current[index];
    const container = tracksRef.current;
    if (!btn || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const charRect = characterRef.current?.getBoundingClientRect();

    const charW = charRect?.width ?? 40;
    const charH = charRect?.height ?? 40;

    const isLeft = index % 2 === 0;
    const margin = 6;

    // Virar personagem para o lado correto
    setCharacterFacingRight(!isLeft);

    const btnLeftRel = btnRect.left - containerRect.left;
    const btnRightRel = btnRect.right - containerRect.left;
    const btnTopRel = btnRect.top - containerRect.top;

    const x = isLeft ? btnLeftRel - charW - margin : btnRightRel + margin;
    const y = btnTopRel + btnRect.height / 2 - charH / 2;

    // animação de pulo antes de mover
    await controls.start({ y: characterPos.y - 20, transition: { duration: 0.15 } });
    await controls.start({ x, y, transition: { type: "spring", stiffness: 200, damping: 20 } });
    setCharacterPos({ x, y });
  };

  // Posição inicial no primeiro botão
  useLayoutEffect(() => {
    moveCharacter(0);
  }, []);

  // Mostrar botão voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = (index: number) => {
    setTooltipIndex(index);
    moveCharacter(index);
  };

  const handleStart = () => {
    window.location.href = "game";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-10">
      {/* Cabeçalho */}
      <div className="bg-blue-500 rounded-t-xl px-6 py-4 mb-12 shadow-md text-white w-[90%] max-w-3xl flex justify-between items-center">
        <div>
          <p className="text-sm font-bold opacity-80">SEÇÃO 1</p>
          <h2 className="text-xl font-bold">Português</h2>
        </div>
        <button className="flex items-center gap-2 border-2 border-white rounded-xl px-3 py-1 text-white font-bold transform active:translate-y-1 shadow-[0_6px_0px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0px_rgba(0,0,0,0.3)] transition-all duration-150">
          <BookText className="w-4 h-4 " />
          GUIA
        </button>
      </div>

      {/* Trilhas */}
      <div ref={tracksRef} className="relative w-full max-w-3xl flex flex-col items-center gap-12 px-6">
        {/* Personagem */}
        <motion.div
          ref={characterRef}
          animate={controls}
          initial={characterPos}
          className="absolute z-50 text-4xl pointer-events-none"
          style={{
            left: 0,
            top: 0,
            transform: characterFacingRight ? "scaleX(1)" : "scaleX(-1)",
          }}
        >
          🧑‍🚀
        </motion.div>

        {/* Overlay */}
        <AnimatePresence>
          {tooltipIndex !== null && (
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTooltipIndex(null)}
            />
          )}
        </AnimatePresence>

        {buttons.map((_, index) => {
          const isLocked = index >= buttons.length - 2;
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className={`w-full flex items-center ${
                isLeft ? "justify-start pl-56" : "justify-end pr-56"
              }`}
            >
              <div className="relative flex flex-col items-center">
                <button
                  ref={(el) => { buttonRefs.current[index] = el; }}
                  onClick={() => handleButtonClick(index)}
                  className={`w-20 h-20 shadow-[0_6px_0px_rgba(0,0,0,0.2)] flex items-center justify-center text-2xl font-bold rounded-circle
                    transform active:translate-y-1 active:shadow-[0_2px_0px_rgba(0,0,0,0.3)]
                    transition-all duration-150 ${
                      isLocked
                        ? "bg-blue-500 text-gray-400 opacity-50 cursor-pointer"
                        : "bg-blue-500 text-yellow-300 hover:scale-105"
                    }`}
                >
                  ★
                </button>

                {tooltipIndex === index && (
                  <TooltipDescricao index={index} onStart={handleStart} isLocked={isLocked} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão voltar ao topo */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
