"use client";

import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"; // Ícones para navegação
import { useRef } from "react";
import { Button, Card } from "react-bootstrap";

// ===============================
// Dados do carrossel
// ===============================
const items = [
  {
    id: 1,
    title: "Português",
    image: "../img/port.png",
    description: "Substantivo",
  },
  {
    id: 2,
    title: "História",
    image: "../img/hist.png",
    description: "Nosso país",
  },
  {
    id: 3,
    title: "Banco de dados",
    image: "../img/bd.png",
    description: "Banco de dados relacional",
  },
  {
    id: 4,
    title: "Matemática",
    image: "../img/mate.png",
    description: "Logaritmo",
  },
  {
    id: 5,
    title: "Geografia",
    image: "../img/geo.png",
    description: "Paises americanos",
  },
  {
    id: 6,
    title: "Ciências",
    image: "../img/cienc.png",
    description: "Biologia",
  },
];

// ===============================
// Componente do item individual
// ===============================
function CarouselItem({ item }: { item: (typeof items)[0] }) {
  return (
    <Link href={`/pages/trilha?id=${item.id}`}>
      <Card style={{ width: "15rem" }}>
        <Card.Img
          variant="top"
          src={item.image}
          alt={item.title}
          className="mx-auto max-w-30 max-h-24 min-w-28 min-h-24 object-contain my-2 rounded-xl"
        />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <Button variant="primary">Clique para entrar</Button>
        </Card.Body>
      </Card>
    </Link>
  );
}

// ===============================
// Componente do Carrossel
// ===============================
function Carrousel() {
  // Referência do container que permite scroll horizontal
  const scrollRef = useRef<HTMLDivElement>(null);

  // Função para mover o carrossel para a esquerda com loop
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      // Se o scroll está no início (posição 0)
      if (scrollRef.current.scrollLeft === 0) {
        // Vá para o final
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: "smooth",
        });
      } else {
        // Caso contrário, apenas role para a esquerda
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    }
  };

  // Função para mover o carrossel para a direita com loop
  const handleScrollRight = () => {
    if (scrollRef.current) {
      // Verifica se o scroll chegou ao final
      // Usamos uma pequena tolerância (1px) para evitar problemas de arredondamento
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth - 1
      ) {
        // Se está no final, volte para o início
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Caso contrário, apenas role para a direita
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-xl w-full max-w-screen-xl mx-auto">
      {/* ===============================
          Barra de navegação do carrossel
          =============================== */}
      <div className="flex items-center gap-2 w-full">
        {/* Botão de scroll para a esquerda */}
        <button
          onClick={handleScrollLeft} // ATUALIZADO
          title="Scroll para a esquerda"
          className="p-3 hover:bg-sky-50 rounded"
        >
          <ChevronLeftIcon className="w-10 h-10" />
        </button>

        {/* Container com scroll horizontal */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth w-full py-2"
        >
          {items.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </div>

        {/* Botão de scroll para a direita */}
        <button
          title="Scroll para a direita"
          onClick={handleScrollRight} // ATUALIZADO
          className="p-3 hover:bg-sky-50 rounded"
        >
          <ChevronRightIcon className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}

export default Carrousel;
