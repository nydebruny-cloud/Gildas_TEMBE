import React from 'react';
import {
  ShieldCheck,
  Building2,
  Calendar,
  AlertTriangle,
  PlusCircle,
  FileSpreadsheet,
  Menu as MenuIcon,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { KPISnapshot } from '../types';
import { AppLogo } from './AppLogo';

interface HeaderProps {
  kpi: KPISnapshot;
  currentPeriod: string;
  onPeriodChange: (period: string) => void;
  onOpenNewBeneficiary: () => void;
  onOpenReportModal: () => void;
  onOpenSynthesisReport: () => void;
  onOpenMenu: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  kpi,
  currentPeriod,
  onPeriodChange,
  onOpenNewBeneficiary,
  onOpenReportModal,
  onOpenSynthesisReport,
  onOpenMenu,
  onLogout,
}) => {
  return (
    <header id="main-header" className="bg-white/5 backdrop-blur-xl text-white border-b border-white/10 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Brand & Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-full bg-[#0B1A2C] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 overflow-hidden flex-shrink-0 p-0.5">
              <AppLogo size={40} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  NSERACC<span className="text-[#D4AF37] font-semibold">_pro</span>
                </h1>
                <span className="bg-[#D4AF37]/15 text-[#F5D77F] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 flex items-center gap-1 backdrop-blur-sm">
                  Management & Pilotage
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Management de l'Insertion & Suivi des 9 Tables (PLIE • IAE • Mission Locale • CCAS)</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Period Selector */}
            <div className="flex items-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md transition-colors">
              <Calendar className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
              <span className="text-slate-400 mr-1.5">Période:</span>
              <select
                id="period-select"
                value={currentPeriod}
                onChange={(e) => onPeriodChange(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="Août 2026" className="bg-slate-900 text-white">Août 2026 (En cours)</option>
                <option value="T3 2026 (Juillet - Septembre)" className="bg-slate-900 text-white">T3 2026 (Trimestre 3)</option>
                <option value="S1 2026 (Semestre 1)" className="bg-slate-900 text-white">S1 2026 (Semestre 1)</option>
                <option value="Année 2026 (Cumul)" className="bg-slate-900 text-white">Année 2026 (Cumul global)</option>
              </select>
            </div>

            {/* Quick KPI Badges */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-400">Actifs :</span>
                <strong className="text-white">{kpi.beneficiaires_actifs}</strong>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-slate-400">Insertion :</span>
                <strong className="text-emerald-400">{kpi.taux_insertion_global}%</strong>
              </div>

              {kpi.alertes_sans_contact_30j > 0 && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 animate-pulse backdrop-blur-md">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>{kpi.alertes_sans_contact_30j} alertes</span>
                </div>
              )}
            </div>

            {/* Main Command & Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Menu Button */}
              <button
                id="btn-open-menu"
                onClick={onOpenMenu}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold px-3 py-2 rounded-2xl transition-all flex items-center gap-1.5 backdrop-blur-md shadow-sm cursor-pointer"
                title="Ouvrir le menu complet des commandes"
              >
                <MenuIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>Menu</span>
              </button>

              {/* Synthesis Report Button */}
              <button
                id="btn-open-synthesis-header"
                onClick={onOpenSynthesisReport}
                className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#F5D77F] text-xs font-semibold px-3 py-2 rounded-2xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Rapport de synthèse & export PDF"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden md:inline">Rapport Synthèse</span>
              </button>

              {/* New Beneficiary Button */}
              <button
                id="btn-new-beneficiary"
                onClick={onOpenNewBeneficiary}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-2xl transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/25 border border-blue-400/30 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Nouveau Bénéficiaire</span>
                <span className="sm:hidden">Nouveau</span>
              </button>

              {/* Déconnexion Button */}
              <button
                id="btn-logout"
                onClick={onLogout}
                className="bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-red-200 border border-red-500/30 text-xs font-semibold px-3 py-2 rounded-2xl transition-all flex items-center gap-1.5 backdrop-blur-md shadow-sm cursor-pointer"
                title="Se déconnecter et revenir à l'interface d'accueil"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Déconnexion</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
