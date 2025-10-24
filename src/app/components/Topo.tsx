"use client";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap"; // Importando Form, FormControl e Button
import Link from "next/link";
import Image from "next/image";
import { List, HouseDoor, Person, Gear, Search } from "react-bootstrap-icons"; // Importando o ícone Search
import AppSidebar from "./AppSidebar"; // Certifique-se de que o caminho está correto

// Componente principal do topo/navegação
const Topo = () => {
    // ... Estados de controle existentes ...
    const [collapsed, setCollapsed] = useState(true);
    const [sidebarToggled, setSidebarToggled] = useState(false);
    const [navbarToggled, setNavbarToggled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    // NOVO: Estado para a barra de pesquisa
    const [searchTerm, setSearchTerm] = useState("");

    // Hook para detectar se está em tela mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 992);
            if (window.innerWidth >= 992) {
                setSidebarToggled(false);
            }
        };

        checkMobile();

        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Dados dos menus superiores (navbar)
    const navItems = [
        {
            href: "/pages/home",
            icon: <HouseDoor size={18} />,
            label: "Home",
        },
        { href: "/pages/perfil", icon: <Person size={18} />, label: "Perfil" },
        {
            href: "/pages/configuracoes",
            icon: <Gear size={18} />,
            label: "Configurações",
        },
    ];
    
    // NOVO: Função para lidar com a pesquisa
    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        if (searchTerm.trim() !== "") {
            // Aqui você faria a lógica de pesquisa:
            // Ex: Router.push(`/search?q=${searchTerm}`);
            console.log("Pesquisando por:", searchTerm);
            // Opcional: Limpar o campo após a pesquisa
            // setSearchTerm(""); 
        }
    };

    const contentMarginLeft = isMobile
        ? "0px"
        : collapsed
        ? "80px"
        : "280px";

    return (
        <div className="flex">
            {/* Botão para abrir o sidebar no mobile */}
            {isMobile && (
                <button
                    onClick={() => setSidebarToggled(!sidebarToggled)}
                    style={{
                        position: "fixed",
                        top: "8px",
                        left: "8px",
                        zIndex: 1100,
                        background: "#00a2ff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 8px",
                        color: "white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        transition: "margin-left 0.3s",
                        minHeight: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    aria-label="Toggle Sidebar"
                >
                    <List size={16} />
                </button>
            )}

            {/* Componente Sidebar Separado */}
            <AppSidebar
                collapsed={collapsed}
                sidebarToggled={sidebarToggled}
                isMobile={isMobile}
                setCollapsed={setCollapsed}
                setSidebarToggled={setSidebarToggled}
            />

            {/* Conteúdo principal e navbar superior */}
            <div
                style={{
                    marginLeft: contentMarginLeft, 
                    transition: "margin-left 0.3s",
                    width: `calc(100% - ${contentMarginLeft})`,
                    flexGrow: 1,
                }}
            >
                {/* Navbar superior */}
                <Navbar
                    expand="lg"
                    className="menu-central"
                    style={{
                        minHeight: isMobile ? "48px" : "auto",
                        padding: isMobile ? "4px 0" : "8px 0",
                    }}
                >
                    <Container
                        fluid
                        className="px-0"
                        style={{
                            minHeight: isMobile ? "40px" : "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {/* Logo do sistema */}
                        <Link href="/" passHref legacyBehavior>
                            <div
                                style={{
                                    marginLeft: isMobile ? "40px" : "15px",
                                    transition: "margin-left 0.3s",
                                    display: "flex",
                                    alignItems: "center",
                                    height: isMobile ? "32px" : "auto",
                                }}
                            >
                                <div
                                    style={{
                                        transform: isMobile ? "scale(0.8)" : "scale(1)",
                                        transformOrigin: "left center",
                                    }}
                                >
                                    {/* Logo */}
                                    <div className="mb-6 text-center my-1">
                                        <Image width={400} height={128} src="/svg/EstudeMyLogo.svg" alt="Logo" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Botão para abrir navbar no mobile */}
                        <Navbar.Toggle
                            aria-controls="top-navbar"
                            onClick={() => setNavbarToggled(!navbarToggled)}
                            className="border-0 me-3"
                            style={{
                                padding: isMobile ? "2px 4px" : "4px 8px",
                                fontSize: isMobile ? "0.9rem" : "1rem",
                            }}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </Navbar.Toggle>

                        {/* Itens do menu superior e Barra de Pesquisa */}
                        <Navbar.Collapse id="top-navbar" className="justify-content-end">

                            {/* NOVO: Barra de Pesquisa (Posicionada à esquerda do menu de navegação) */}
                            <Form 
                                className="d-flex my-2 my-lg-0 me-auto ms-lg-4" 
                                onSubmit={handleSearchSubmit}
                                style={{ flexGrow: isMobile ? 1 : 0.5, maxWidth: "450px" }}
                            >
                                <FormControl
                                    type="search"
                                    placeholder="Pesquisar lições, trilhas..."
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ height: isMobile ? "300px" : "38px" }}
                                />
                                <Button 
                                    variant="outline-primary" 
                                    type="submit"
                                    style={{ height: isMobile ? "32px" : "38px", padding: isMobile ? "4px 8px" : "6px 12px" }}
                                >
                                <Search size={isMobile ? 16 : 18} />
                                </Button>
                            </Form>


                            <Nav
                                as="ul"
                                className="item-menu-central"
                                style={{
                                    alignItems: "center",
                                }}
                            >
                                {/* Itens principais do menu */}
                                {navItems.map((item, index) => (
                                    <Nav.Item as="li" key={index}>
                                        <Link href={item.href} passHref legacyBehavior>
                                            <Nav.Link
                                                className="d-flex align-items-center"
                                                onClick={() => setNavbarToggled(false)}
                                                style={{
                                                    padding: isMobile ? "4px 8px" : "8px 12px",
                                                    fontSize: isMobile ? "0.85rem" : "1rem",
                                                    minHeight: isMobile ? "32px" : "auto",
                                                }}
                                            >
                                                {/* Ícone do item */}
                                                {React.cloneElement(item.icon, {
                                                    className: "me-1",
                                                    size: isMobile ? 16 : 18,
                                                })}
                                                {item.label}
                                            </Nav.Link>
                                        </Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                
                {/* Conteúdo da página */}
            </div>
        </div>
    );
};

export default Topo;