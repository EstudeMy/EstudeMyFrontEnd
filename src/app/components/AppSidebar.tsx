"use client";
import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Link from "next/link";
import Image from "next/image";
import { List, Book, BarChart, BookmarkFill, Envelope, BackpackFill } from "react-bootstrap-icons";

// Dados dos menus laterais (sidebar) - Movidos para fora para que AppSidebar seja puramente de apresentação
// Se você quiser que o AppSidebar seja completamente independente, os dados devem permanecer aqui.
// Para este exemplo, vou mantê-los aqui para um componente mais autocontido.
const sidebarItems = [
    {
        icon: <Book size={18} />,
        label: "Meus Cursos",
        href: "/pages/meusCursos",
    },
    { icon: <BarChart size={18} />, label: "Ranking", href: "/pages/ranking" },
    {
        icon: <BookmarkFill size={18} />,
        label: "Lições Salvas",
        href: "/pages/salvas",
    },
    {
        icon: <BackpackFill size={18} />,
        label: "Criar Trilhas",
        href: "/pages/criarTrilha",
    },
];

/**
 * Componente de Sidebar reutilizável.
 * * @param {object} props
 * @param {boolean} props.collapsed - Estado se a sidebar está recolhida (desktop).
 * @param {boolean} props.sidebarToggled - Estado se a sidebar está aberta (mobile).
 * @param {boolean} props.isMobile - Indica se o dispositivo é mobile.
 * @param {function} props.setCollapsed - Função para alternar o estado de recolhimento.
 * @param {function} props.setSidebarToggled - Função para alternar o estado de abertura (mobile).
 */
const AppSidebar = ({ collapsed, sidebarToggled, isMobile, setCollapsed, setSidebarToggled }) => {
    
    // Fecha o sidebar ao clicar em um link no mobile
    const handleSidebarLinkClick = () => {
        if (isMobile) {
            setSidebarToggled(false);
        }
    };

    return (
        <>
            {/* Botão para abrir o sidebar no mobile (Mantido no Topo/Layout para posicionamento fixo) */}
            {/* {isMobile && ( ... Botão deve ser gerenciado fora da sidebar para melhor controle de layout ... )} */}

            {/* Fundo escuro ao abrir o sidebar no mobile */}
            {isMobile && sidebarToggled && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 999,
                    }}
                    onClick={() => setSidebarToggled(false)}
                />
            )}

            {/* Sidebar lateral (menu principal) */}
            <Sidebar
                collapsed={isMobile ? false : collapsed}
                toggled={false} // Controlado manualmente via transform
                onMouseEnter={() => !isMobile && setCollapsed(false)}
                onMouseLeave={() => !isMobile && setCollapsed(true)}
                width={isMobile ? "280px" : "280px"}
                rootStyles={{
                    height: "100vh",
                    position: "fixed",
                    zIndex: 1000,
                    backgroundColor: "#007aff",
                    overflow: "hidden",
                    // Lógica para esconder/mostrar no mobile
                    transform:
                        isMobile && !sidebarToggled ? "translateX(-100%)" : "translateX(0)",
                    transition: "transform margin-left 0.3s",
                    "& > div": {
                        backgroundColor: "#007aff",
                        overflow: "hidden !important",
                        "& ul": {
                            height: "100%",
                            overflow: "hidden",
                        },
                    },
                }}
            >
                {/* Menu do sidebar */}
                <Menu
                    menuItemStyles={{
                        button: {
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                backgroundColor: "#0063cc",
                                transform: "scale(0.95)",
                            },
                        },
                    }}
                >
                    {/* Item do menu para expandir/recolher */}
                    <MenuItem
                        icon={<List className="text-white" size={20} />}
                        onClick={() => {
                            if (isMobile) {
                                setSidebarToggled(false);
                            } else {
                                setCollapsed(!collapsed);
                            }
                        }}
                        style={{
                            textAlign: "center",
                            padding: "10px 0",
                            color: "white",
                            marginBottom: "10px",
                        }}
                    >
                        {(!collapsed || isMobile) && (
                            <span className="text-white">{isMobile ? "MENU" : "MENU"}</span>
                        )}
                    </MenuItem>

                    {/* Lista dos itens do menu lateral */}
                    <div
                        style={{
                            height: "calc(100vh - 120px)",
                            overflowY: "auto",
                            scrollbarWidth: "none",
                        }}
                    >
                        {sidebarItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                icon={<div className="text-white">{item.icon}</div>}
                                component={<Link href={item.href} />}
                                onClick={handleSidebarLinkClick}
                                style={{
                                    padding: "8px 15px",
                                    color: "white",
                                }}
                            >
                                {(!collapsed || isMobile) && item.label}
                            </MenuItem>
                        ))}
                    </div>

                    {/* Item fixo no final do sidebar (ConsultAI) */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            backgroundColor: "#007aff",
                        }}
                    >
                        <MenuItem
                            icon={
                                <div className="w-6 h-6 relative">
                                    <Image
                                        width={24}
                                        height={24}
                                        src="/img/ConsultAi.png"
                                        alt="ConsultAI"
                                        className="object-contain"
                                        sizes="24px"
                                    />
                                </div>
                            }
                            component={<Link href="/pages/consultAi" />}
                            onClick={handleSidebarLinkClick}
                            style={{
                                padding: "8px 15px",
                                color: "white",
                            }}
                        >
                            {(!collapsed || isMobile) && "ConsultAI"}
                        </MenuItem>
                    </div>
                </Menu>
            </Sidebar>
        </>
    );
};

export default AppSidebar;