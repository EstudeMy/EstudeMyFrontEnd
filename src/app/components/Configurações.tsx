"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  Lock,
  Palette,
  HelpCircle,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Globe,
  Moon,
  Sun,
  Save,
  Check,
  Settings,
  MessageSquare,
  FileText,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useLanguage } from "@/app/contexts/LanguageContext";

// ===============================
// Componente de Configurações do usuário
// ===============================
export default function Configuracoes() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    // Notificações
    emailNotifications: true,
    courseUpdates: false,
    marketingEmails: false,
    
    // Privacidade
    publicProfile: false,
    showEmail: false,
    showProgress: true,
    
    // Aparência
    theme: theme === "dark" ? "dark" : "light",
    language: language,
    
    // Segurança
    twoFactorAuth: false,
  });

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sincronizar formData.theme com o theme global e language com o language global
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      theme: theme === "dark" ? "dark" : "light",
      language: language,
    }));
  }, [theme, language]);

  // Interface TypeScript para o estado
  interface FormData {
    emailNotifications: boolean;
    courseUpdates: boolean;
    marketingEmails: boolean;
    publicProfile: boolean;
    showEmail: boolean;
    showProgress: boolean;
    theme: string;
    language: string;
    twoFactorAuth: boolean;
  }

  // Atualiza o estado quando o usuário altera inputs ou selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev: FormData) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Toggle direto para booleanos
  const handleToggle = (name: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Manipula o submit do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simula uma chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Configurações salvas:", formData);
    setIsSaving(false);
    setShowSaveSuccess(true);
    
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

  // Componente de Toggle Switch moderno
  const ToggleSwitch = ({
    name,
    checked,
    onChange,
    label,
    description,
  }: {
    name: keyof FormData;
    checked: boolean;
    onChange: () => void;
    label: string;
    description?: string;
  }) => (
    <div className="flex items-start justify-between py-4 border-b border-[var(--border-color)] last:border-b-0 transition-colors duration-300">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
        {description && (
          <p className="text-xs text-[var(--text-muted)] mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? "bg-blue-600 rounded-4" : "bg-gray-500 rounded-4"
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  // Componente de Card de Seção
  const SectionCard = ({
    icon: Icon,
    title,
    children,
  }: {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-[var(--bg-card)] rounded-xl shadow-sm border border-[var(--border-color)] overflow-hidden mb-6 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-[var(--border-color)] dark:from-blue-900/20 dark:to-indigo-900/20 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg transition-colors duration-300">
            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        </div>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );

  // Componente de Botão de Ação
  const ActionButton = ({
    icon: Icon,
    label,
    onClick,
    variant = "default",
  }: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    variant?: "default" | "danger";
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all hover:bg-[var(--bg-input)] ${
        variant === "danger"
          ? "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          : "text-[var(--text-primary)] hover:text-[var(--text-primary)]"
      }`}
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl transition-colors duration-300">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">{t("settings.title")}</h1>
        </div>
        <p className="text-[var(--text-secondary)] ml-14">
          {t("settings.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Seção: Notificações */}
        <SectionCard icon={Bell} title={t("settings.notifications")}>
          <ToggleSwitch
            name="emailNotifications"
            checked={formData.emailNotifications}
            onChange={() => handleToggle("emailNotifications")}
            label={t("settings.emailNotifications")}
            description={t("settings.emailNotificationsDesc")}
          />
          <ToggleSwitch
            name="courseUpdates"
            checked={formData.courseUpdates}
            onChange={() => handleToggle("courseUpdates")}
            label={t("settings.courseUpdates")}
            description={t("settings.courseUpdatesDesc")}
          />
          <ToggleSwitch
            name="marketingEmails"
            checked={formData.marketingEmails}
            onChange={() => handleToggle("marketingEmails")}
            label={t("settings.marketingEmails")}
            description={t("settings.marketingEmailsDesc")}
          />
        </SectionCard>

        {/* Seção: Privacidade */}
        <SectionCard icon={Shield} title={t("settings.privacy")}>
          <ToggleSwitch
            name="publicProfile"
            checked={formData.publicProfile}
            onChange={() => handleToggle("publicProfile")}
            label={t("settings.publicProfile")}
            description={t("settings.publicProfileDesc")}
          />
          <ToggleSwitch
            name="showEmail"
            checked={formData.showEmail}
            onChange={() => handleToggle("showEmail")}
            label={t("settings.showEmail")}
            description={t("settings.showEmailDesc")}
          />
          <ToggleSwitch
            name="showProgress"
            checked={formData.showProgress}
            onChange={() => handleToggle("showProgress")}
            label={t("settings.showProgress")}
            description={t("settings.showProgressDesc")}
          />
        </SectionCard>

        {/* Seção: Aparência */}
        <SectionCard icon={Palette} title={t("settings.appearance")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                {t("settings.theme")}
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setTheme("light", true);
                    setFormData((prev) => ({ ...prev, theme: "light" }));
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.theme === "light"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] hover:border-[var(--border-color)]"
                  }`}
                  style={{ 
                    backgroundColor: formData.theme === "light" ? undefined : 'var(--bg-input)',
                    borderColor: formData.theme === "light" ? undefined : 'var(--border-color)',
                    color: formData.theme === "light" ? undefined : 'var(--text-primary)'
                  }}
                >
                  <Sun className="w-5 h-5" />
                  <span className="font-medium">{t("settings.light")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTheme("dark", true);
                    setFormData((prev) => ({ ...prev, theme: "dark" }));
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.theme === "dark"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] hover:border-[var(--border-color)]"
                  }`}
                  style={{ 
                    backgroundColor: formData.theme === "dark" ? undefined : 'var(--bg-input)',
                    borderColor: formData.theme === "dark" ? undefined : 'var(--border-color)',
                    color: formData.theme === "dark" ? undefined : 'var(--text-primary)'
                  }}
                >
                  <Moon className="w-5 h-5" />
                  <span className="font-medium">{t("settings.dark")}</span>
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                {t("settings.language")}
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={(e) => {
                  const newLanguage = e.target.value as "pt-BR" | "en-US" | "es-ES";
                  setLanguage(newLanguage, true);
                  setFormData((prev) => ({ ...prev, language: newLanguage }));
                }}
                className="w-full px-4 py-3 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[var(--bg-input)] text-[var(--text-primary)] transition-colors duration-300"
                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>
        </SectionCard>

        {/* Seção: Segurança */}
        <SectionCard icon={Lock} title={t("settings.security")}>
          <ToggleSwitch
            name="twoFactorAuth"
            checked={formData.twoFactorAuth}
            onChange={() => handleToggle("twoFactorAuth")}
            label={t("settings.twoFactorAuth")}
            description={t("settings.twoFactorAuthDesc")}
          />
          <div className="pt-4 mt-4 border-t border-[var(--border-color)] transition-colors duration-300">
            <ActionButton
              icon={Lock}
              label={t("settings.changePassword")}
              onClick={() => (window.location.href = "/pages/dadosPessoais")}
            />
          </div>
        </SectionCard>

        {/* Seção: Ajuda e Suporte */}
        <SectionCard icon={HelpCircle} title={t("settings.help")}>
          <div className="space-y-2">
            <ActionButton
              icon={FileText}
              label={t("settings.faq")}
              onClick={() => (window.location.href = "/pages/faq")}
            />
            <ActionButton
              icon={MessageSquare}
              label={t("settings.contact")}
              onClick={() => (window.location.href = "/pages/faleConosco")}
            />
            <ActionButton
              icon={Mail}
              label={t("settings.feedback")}
              onClick={() => (window.location.href = "/pages/feedback")}
            />
          </div>
        </SectionCard>

        {/* Botão de Salvar */}
        <div className="sticky bottom-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-4 -mx-4 -mb-8 mt-8 shadow-lg transition-colors duration-300 rounded-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showSaveSuccess && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("settings.savedSuccess")}
                  </span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg rounded-3"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t("settings.saving")}</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{t("settings.saveChanges")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
