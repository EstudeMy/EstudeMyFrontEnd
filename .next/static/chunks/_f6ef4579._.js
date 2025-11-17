(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/components/ProtectedRoute.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Rotas públicas que não precisam de autenticação
const PUBLIC_ROUTES = [
    "/",
    "/pages/login",
    "/pages/cadastro"
];
// Rotas que não precisam de perfil criado (além das públicas)
const ROTAS_SEM_PERFIL = [
    "/pages/criarPerfil"
];
// Rotas restritas para PROFESSOR e ADMINISTRADOR (ALUNO não pode acessar)
const ROTAS_PROFESSOR = [
    "/pages/gerenciarTrilha",
    "/pages/gerenciarFases",
    "/pages/criarFase",
    "/pages/gerenciarPerguntas"
];
// Cache simples para evitar requisições duplicadas
const authCache = {
    token: null,
    isValid: null,
    perfilCriado: null,
    tipoUsuario: null,
    timestamp: 0,
    perfilCriadoTimestamp: 0
};
// Cache válido por 30 segundos
const CACHE_DURATION = 30 * 1000;
// Função helper para verificar se uma rota é pública
const isPublicRoute = (pathname)=>{
    if (!pathname) return false;
    return PUBLIC_ROUTES.some((route)=>pathname === route || pathname.startsWith(route + "/"));
};
// Função helper para verificar se uma rota não precisa de perfil criado
const isRotaSemPerfil = (pathname)=>{
    if (!pathname) return false;
    return ROTAS_SEM_PERFIL.some((route)=>pathname === route || pathname.startsWith(route + "/"));
};
// Função helper para verificar se uma rota é restrita a professores
const isRotaProfessor = (pathname)=>{
    if (!pathname) return false;
    return ROTAS_PROFESSOR.some((route)=>pathname === route || pathname.startsWith(route + "/"));
};
function ProtectedRoute(param) {
    let { children } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const checkingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false); // Evita requisições simultâneas
    // Verificar se é rota pública ANTES de definir estado inicial
    const publicRoute = isPublicRoute(pathname);
    const rotaSemPerfil = isRotaSemPerfil(pathname);
    const rotaProfessor = isRotaProfessor(pathname);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(publicRoute ? true : null // Se for pública, já começa como true
    );
    const [perfilVerificado, setPerfilVerificado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(publicRoute || rotaSemPerfil ? true : null // Se for pública ou não precisa de perfil, já começa como true
    );
    const [tipoUsuarioVerificado, setTipoUsuarioVerificado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(publicRoute || rotaSemPerfil ? true : null // Se for pública ou não precisa de perfil, já começa como true
    );
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProtectedRoute.useEffect": ()=>{
            // Verificar se pathname está definido
            if (!pathname) {
                return;
            }
            // Verificar se é rota pública DENTRO do useEffect
            const isPublic = isPublicRoute(pathname);
            // Se for rota pública, não fazer nada e garantir que está autenticado
            if (isPublic) {
                setIsAuthenticated(true);
                return;
            }
            const checkAuth = {
                "ProtectedRoute.useEffect.checkAuth": async ()=>{
                    // Evitar requisições simultâneas
                    if (checkingRef.current) {
                        return;
                    }
                    // Para rotas protegidas, verificar token
                    const token = localStorage.getItem("token");
                    if (!token) {
                        // Sem token, redirecionar para login SEM fazer requisição
                        authCache.token = null;
                        authCache.isValid = false;
                        router.push("/pages/login");
                        setIsAuthenticated(false);
                        return;
                    }
                    // Verificar cache antes de fazer requisição
                    const now = Date.now();
                    // Verificar se o perfil foi criado recentemente (invalidar cache se necessário)
                    const perfilCriadoTimestamp = localStorage.getItem("perfilCriadoTimestamp");
                    const perfilCriadoTimestampNum = perfilCriadoTimestamp ? parseInt(perfilCriadoTimestamp, 10) : 0;
                    const perfilFoiCriadoRecentemente = perfilCriadoTimestampNum > authCache.perfilCriadoTimestamp;
                    const isCacheValid = authCache.token === token && authCache.isValid === true && authCache.perfilCriado !== null && authCache.tipoUsuario !== null && now - authCache.timestamp < CACHE_DURATION && !perfilFoiCriadoRecentemente; // Invalidar cache se perfil foi criado recentemente
                    if (isCacheValid) {
                        // Cache válido, usar sem fazer requisição
                        setIsAuthenticated(true);
                        // Verificar se precisa redirecionar para criar perfil
                        const precisaPerfil = !rotaSemPerfil && !authCache.perfilCriado;
                        if (precisaPerfil) {
                            router.push("/pages/criarPerfil");
                            setPerfilVerificado(false);
                            setTipoUsuarioVerificado(false);
                            return;
                        }
                        // Verificar se é rota de professor e se o usuário é aluno (professor e administrador podem acessar)
                        if (rotaProfessor && authCache.tipoUsuario === "ALUNO") {
                            router.push("/pages/home");
                            setPerfilVerificado(true);
                            setTipoUsuarioVerificado(false);
                            return;
                        }
                        setPerfilVerificado(true);
                        setTipoUsuarioVerificado(true);
                        return;
                    }
                    // Se o perfil foi criado recentemente, atualizar o timestamp no cache
                    if (perfilFoiCriadoRecentemente) {
                        authCache.perfilCriadoTimestamp = perfilCriadoTimestampNum;
                    }
                    checkingRef.current = true;
                    // Só fazer requisição se realmente for uma rota protegida E tiver token
                    try {
                        const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                        // Verificar autenticação primeiro
                        const verifyRes = await fetch("".concat(API_URL, "/api/users/verify"), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        });
                        if (!verifyRes.ok) {
                            // Token inválido ou expirado
                            if (verifyRes.status === 401) {
                                localStorage.removeItem("token");
                                authCache.token = null;
                                authCache.isValid = false;
                                authCache.perfilCriado = null;
                                authCache.tipoUsuario = null;
                                authCache.timestamp = now;
                                router.push("/pages/login");
                                setIsAuthenticated(false);
                                setPerfilVerificado(false);
                                setTipoUsuarioVerificado(false);
                                checkingRef.current = false;
                                return;
                            }
                        }
                        // Token válido - agora verificar se o perfil foi criado
                        setIsAuthenticated(true);
                        // Se não precisa verificar perfil (página de criar perfil), permitir acesso
                        if (rotaSemPerfil) {
                            authCache.token = token;
                            authCache.isValid = true;
                            authCache.perfilCriado = true; // Não importa, não vai usar
                            authCache.timestamp = now;
                            setPerfilVerificado(true);
                            setTipoUsuarioVerificado(true);
                            checkingRef.current = false;
                            return;
                        }
                        // Buscar dados do usuário para verificar se o perfil foi criado e tipo de usuário
                        const userRes = await fetch("".concat(API_URL, "/api/users/me"), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        });
                        if (!userRes.ok) {
                            console.error("Erro ao buscar dados do usuário:", userRes.status);
                            checkingRef.current = false;
                            return;
                        }
                        const userData = await userRes.json();
                        // Verificar se o perfil foi criado (personagem e username não vazios)
                        const perfilFoiCriado = userData.personagem && userData.username && userData.personagem.trim() !== "" && userData.username.trim() !== "";
                        // Obter tipo de usuário
                        const tipoUsuario = userData.tipoUsuario || null;
                        // Atualizar cache
                        const perfilCriadoTimestamp = localStorage.getItem("perfilCriadoTimestamp");
                        const perfilCriadoTimestampNum = perfilCriadoTimestamp ? parseInt(perfilCriadoTimestamp, 10) : 0;
                        authCache.token = token;
                        authCache.isValid = true;
                        authCache.perfilCriado = perfilFoiCriado;
                        authCache.tipoUsuario = tipoUsuario;
                        authCache.timestamp = now;
                        authCache.perfilCriadoTimestamp = perfilCriadoTimestampNum;
                        // Se o perfil não foi criado, redirecionar para criar perfil
                        if (!perfilFoiCriado) {
                            router.push("/pages/criarPerfil");
                            setPerfilVerificado(false);
                            setTipoUsuarioVerificado(false);
                            checkingRef.current = false;
                            return;
                        }
                        // Verificar se é rota de professor e se o usuário é aluno (professor e administrador podem acessar)
                        if (rotaProfessor && tipoUsuario === "ALUNO") {
                            router.push("/pages/home");
                            setPerfilVerificado(true);
                            setTipoUsuarioVerificado(false);
                            checkingRef.current = false;
                            return;
                        }
                        // Perfil criado e tipo de usuário verificado, permitir acesso
                        setPerfilVerificado(true);
                        setTipoUsuarioVerificado(true);
                    } catch (error) {
                        console.error("Erro ao verificar autenticação:", error);
                        localStorage.removeItem("token");
                        authCache.token = null;
                        authCache.isValid = false;
                        authCache.perfilCriado = null;
                        authCache.tipoUsuario = null;
                        authCache.timestamp = Date.now();
                        router.push("/pages/login");
                        setIsAuthenticated(false);
                        setPerfilVerificado(false);
                        setTipoUsuarioVerificado(false);
                    } finally{
                        checkingRef.current = false;
                    }
                }
            }["ProtectedRoute.useEffect.checkAuth"];
            checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ProtectedRoute.useEffect"], [
        pathname
    ]); // router não precisa estar nas dependências
    // Mostrar loading enquanto verifica autenticação
    if (isAuthenticated === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-600",
                children: "Verificando autenticação..."
            }, void 0, false, {
                fileName: "[project]/src/app/components/ProtectedRoute.tsx",
                lineNumber: 303,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/ProtectedRoute.tsx",
            lineNumber: 302,
            columnNumber: 7
        }, this);
    }
    // Se não está autenticado e não é rota pública, não renderizar (já redirecionou)
    if (!isAuthenticated && !publicRoute) {
        return null;
    }
    // Mostrar loading enquanto verifica perfil (apenas para rotas que precisam de perfil)
    if (!publicRoute && !rotaSemPerfil && perfilVerificado === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-600",
                children: "Verificando perfil..."
            }, void 0, false, {
                fileName: "[project]/src/app/components/ProtectedRoute.tsx",
                lineNumber: 317,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/ProtectedRoute.tsx",
            lineNumber: 316,
            columnNumber: 7
        }, this);
    }
    // Se o perfil não foi verificado e não é rota pública nem rota sem perfil, não renderizar (já redirecionou)
    if (!publicRoute && !rotaSemPerfil && perfilVerificado === false) {
        return null;
    }
    // Mostrar loading enquanto verifica tipo de usuário (apenas para rotas de professor)
    if (!publicRoute && !rotaSemPerfil && rotaProfessor && tipoUsuarioVerificado === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-600",
                children: "Verificando permissões..."
            }, void 0, false, {
                fileName: "[project]/src/app/components/ProtectedRoute.tsx",
                lineNumber: 336,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/ProtectedRoute.tsx",
            lineNumber: 335,
            columnNumber: 7
        }, this);
    }
    // Se o tipo de usuário não foi verificado e é rota de professor, não renderizar (já redirecionou)
    if (!publicRoute && !rotaSemPerfil && rotaProfessor && tipoUsuarioVerificado === false) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(ProtectedRoute, "lqv9zyMMXHqgfloAqJAMUupLGZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_f6ef4579._.js.map