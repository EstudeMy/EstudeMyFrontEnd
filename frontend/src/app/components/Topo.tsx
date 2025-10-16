"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import {
  List,
  Book,
  BarChart,
  BookmarkFill,
  Envelope,
  BackpackFill,
  HouseDoor,
  Person,
  ThreeDots,
  Gear,
  Cart,
} from "react-bootstrap-icons";

// Componente principal do topo/navegação
const Topo = () => {
  // Estados para controlar o comportamento do menu lateral e navbar
  const [collapsed, setCollapsed] = useState(true); // Sidebar recolhida ou não
  const [sidebarToggled, setSidebarToggled] = useState(false); // Sidebar aberta no mobile
  const [navbarToggled, setNavbarToggled] = useState(false); // Navbar aberta no mobile
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown "Mais" visível
  const [isMobile, setIsMobile] = useState(false); // Se está em tela mobile

  // Hook para detectar se está em tela mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dados dos menus laterais (sidebar)
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
      icon: <Envelope size={18} />,
      label: "Caixa de Entrada",
      href: "/pages/mensagens",
    },
    {
      icon: <BackpackFill size={18} />,
      label: "Criar Trilhas",
      href: "/pages/criarTrilha",
    },
    {
      icon: <Cart size={18} />,
      label: "Loja",
      href: "/pages/loja",
    },
  ];

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

  // Itens do dropdown "Mais"
  const dropdownItems = [
    { href: "/pages/conta", label: "Conta" },
    { href: "/pages/calendario", label: "Calendário" },
    { href: "/pages/faleConosco", label: "Fale Conosco" },
    { href: "/pages/faq", label: "FAQ" },
    { href: "/", label: "Sair", variant: "danger" },
  ];

  // Fecha o sidebar ao clicar em um link no mobile
  const handleSidebarLinkClick = () => {
    if (isMobile) {
      setSidebarToggled(false);
    }
  };

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
        toggled={false}
        onMouseEnter={() => !isMobile && setCollapsed(false)}
        onMouseLeave={() => !isMobile && setCollapsed(true)}
        width={isMobile ? "280px" : "280px"}
        rootStyles={{
          height: "100vh",
          position: "fixed",
          zIndex: 1000,
          backgroundColor: "#007aff",
          overflow: "hidden",
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

          <div
            style={{
              marginTop: "50px",
            }}
          >
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
      {/* Conteúdo principal e navbar superior */}
      <div
        style={{
          marginLeft: isMobile ? "0px" : collapsed ? "0px" : "00px",
          transition: "margin-left 0.3s",
          width: "100%",
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
            <Link href="/">
              <div
                style={{
                  marginLeft: isMobile ? "80px" : "80px",
                  transition: "margin-left 0.3s",
                  display: "flex",
                  alignItems: "center",
                  height: isMobile ? "32px" : "auto",
                }}
              >
                <div
                  style={{
                    transform: isMobile ? "scale(0.7)" : "scale(1)",
                    transformOrigin: "left center",
                  }}
                >
                  {/* Logo */}
                  <div className="mb-6 text-center my-1">
                    <Image
                      width={350}
                      height={128}
                      src="/svg/EstudeMyLogo.svg"
                      alt="Logo"
                    />
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

            {/* Itens do menu superior */}
            <Navbar.Collapse id="top-navbar" className="justify-content-end">
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
                    <Link href={item.href}>
                      <Nav.Link
                        as="span" // Evita <a> aninhado
                        className="d-flex align-items-center"
                        onClick={() => setNavbarToggled(false)}
                        style={{
                          padding: isMobile ? "4px 8px" : "8px 12px",
                          fontSize: isMobile ? "0.85rem" : "1rem",
                          minHeight: isMobile ? "32px" : "auto",
                            cursor: "pointer",
                            overflow: "hidden",
                            
                          
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

                {/* Dropdown "Mais" (aparece só no desktop) */}
                {!isMobile && (
                  <Nav.Item as="li" className="dropdown-container">
                    <div
                      className="dropdown-toggle"
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex align-items-center nav-link2">
                        <ThreeDots className="me-2" />
                        Mais
                      </div>

                      {/* Itens do dropdown */}
                      {showDropdown && (
                        <div className="custom-dropdown">
                          {dropdownItems.map((item, index) => (
                            <Link
                              href={item.href}
                              key={index}
                              className={`dropdown-item ${
                                item.variant === "danger" ? "text-danger" : ""
                              }`}
                              onClick={() => setShowDropdown(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </Nav.Item>
                )}

                {/* Itens do dropdown "Mais" (aparecem direto no mobile) */}
                {isMobile &&
                  dropdownItems.map((item, index) => (
                    <Nav.Item as="li" key={`mobile-${index}`}>
                      <Link href={item.href}>
                        <Nav.Link
                          as="span" // Evita <a> aninhado
                          className={`d-flex align-items-center ${
                            item.variant === "danger" ? "text-danger" : ""
                          }`}
                          onClick={() => setNavbarToggled(false)}
                          style={{
                            padding: isMobile ? "4px 8px" : "8px 12px",
                            fontSize: isMobile ? "0.85rem" : "1rem",
                            minHeight: isMobile ? "32px" : "auto",
                            cursor: "pointer",
                          }}
                        >
                          {item.label}
                        </Nav.Link>
                      </Link>
                    </Nav.Item>
                  ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Topo;
