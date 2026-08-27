import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Database,
  AlertOctagon,
  FileText,
  Users,
  PlusCircle,
  Download,
  LogOut,
  Sparkles,
  Search,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Award,
  Star,
  Activity,
  CheckCircle,
  HelpCircle,
  UserCheck,
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { AppLogo } from './AppLogo';

interface CommandMenuModalProps {
  onClose: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onNavigateTable: (tableIndex: number) => void;
  onOpenNewBeneficiary: () => void;
  onOpenSynthesisReport: () => void;
  onOpenFSEReport: () => void;
  onExportAllTables: () => void;
  onLogout: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isDestructive?: boolean;
  action: () => void;
}

interface TableShortcutItem {
  id: string;
  title: string;
  index: number;
  icon: React.ComponentType<{ className?: string }>;
}

export const CommandMenuModal: React.FC<CommandMenuModalProps> = ({
  onClose,
  onNavigateTab,
  onNavigateTable,
  onOpenNewBeneficiary,
  onOpenSynthesisReport,
  onOpenFSEReport,
  onExportAllTables,
  onLogout,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigationCommands: CommandItem[] = [
    {
      id: 'cmd-dashboard',
      title: 'Tableau de Bord & KPIs',
      description: 'Consulter les indicateurs clés de performance, taux d\'insertion, pyramide des âges et répartition territoriale.',
      icon: LayoutDashboard,
      badge: 'Principal',
      action: () => {
        onNavigateTab('dashboard');
        onClose();
      },
    },
    {
      id: 'cmd-tables',
      title: 'Les 9 Tables de Référence',
      description: 'Explorer la base de données 360° : bénéficiaires, socio-éco, freins, parcours, ateliers, stages et sorties.',
      icon: Database,
      badge: '9 Tables',
      action: () => {
        onNavigateTab('tables');
        onClose();
      },
    },
    {
      id: 'cmd-alerts',
      title: 'Centre d\'Alertes & Décrochages',
      description: 'Suivre les alertes de rupture de parcours (>30 jours sans contact) et les multi-freins critiques.',
      icon: AlertOctagon,
      badge: 'Surveillance',
      action: () => {
        onNavigateTab('alerts');
        onClose();
      },
    },
    {
      id: 'cmd-partners',
      title: 'Partenaires & Employeurs (Table 9)',
      description: 'Gérer les entreprises partenaires, SIAE, organismes de formation et associations territoriales.',
      icon: Users,
      badge: 'Réseau',
      action: () => {
        onNavigateTab('partners');
        onClose();
      },
    },
  ];

  const reportCommands: CommandItem[] = [
    {
      id: 'cmd-synthesis',
      title: 'Rapport de Synthèse Bénéficiaire (Export PDF)',
      description: 'Générer la synthèse 360° avec freins, qualité, assiduité, sorties et préconisations prête pour impression/téléchargement.',
      icon: FileSpreadsheet,
      badge: 'Nouveau',
      action: () => {
        onOpenSynthesisReport();
        onClose();
      },
    },
    {
      id: 'cmd-fse',
      title: 'Bilans FSE+ & Conseil Départemental',
      description: 'Éditer les rapports officiels de conformité européenne FSE+, retour social sur investissement (SROI) et bilans RSA.',
      icon: FileText,
      badge: 'Officiel',
      action: () => {
        onOpenFSEReport();
        onClose();
      },
    },
    {
      id: 'cmd-export-all',
      title: 'Exporter les Tables (CSV / Excel)',
      description: 'Télécharger instantanément les données des 9 tables au format CSV encodé UTF-8 BOM pour Excel.',
      icon: Download,
      badge: 'Export',
      action: () => {
        onExportAllTables();
        onClose();
      },
    },
  ];

  const tableShortcuts: TableShortcutItem[] = [
    { id: 't1', title: 'Table 1 : Identification & État Civil', index: 1, icon: UserCheck },
    { id: 't2', title: 'Table 2 : Situation Socio-Économique & Ressources', index: 2, icon: Award },
    { id: 't3', title: 'Table 3 : Diagnostic des Freins & Complexité', index: 3, icon: AlertOctagon },
    { id: 't4', title: 'Table 4 : Parcours d\'Accompagnement & Assiduité', index: 4, icon: Activity },
    { id: 't5', title: 'Table 5 : Actions, Ateliers & Rendez-vous', index: 5, icon: CheckCircle },
    { id: 't6', title: 'Table 6 : Expériences Professionnelles & PMSMP', index: 6, icon: Building2 },
    { id: 't7', title: 'Table 7 : Sorties & Résultats (Emploi durable/CDI)', index: 7, icon: ShieldCheck },
    { id: 't8', title: 'Table 8 : Évaluation & Satisfaction Bénéficiaire', index: 8, icon: Star },
    { id: 't9', title: 'Table 9 : Répertoire Partenaires & Employeurs', index: 9, icon: Users },
  ];

  const sessionCommands: CommandItem[] = [
    {
      id: 'cmd-new-beneficiary',
      title: 'Inscrire un Nouveau Bénéficiaire',
      description: 'Formulaire guidé pour intégrer une nouvelle personne dans les 9 tables du système.',
      icon: PlusCircle,
      action: () => {
        onOpenNewBeneficiary();
        onClose();
      },
    },
    {
      id: 'cmd-logout',
      title: 'Déconnexion / Écran d\'Accueil',
      description: 'Fermer la session de travail et revenir à la page d\'accueil d\'introduction NSERACC_pro.',
      icon: LogOut,
      isDestructive: true,
      action: () => {
        onLogout();
        onClose();
      },
    },
  ];

  const commandGroups = [
    {
      group: 'Pilotage & Tableaux Principaux',
      items: navigationCommands,
    },
    {
      group: 'Édition de Rapports & Exports',
      items: reportCommands,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#0F1E33] border border-white/15 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="bg-[#0B1A2C] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0B1A2C] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 p-1">
              <AppLogo size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Menu & Centre de Commandes</h2>
                <span className="bg-[#D4AF37]/15 text-[#F5D77F] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                  NSERACC_pro
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Récapitulatif de toutes les commandes et fonctionnalités de l'application
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une fonction, une table ou un rapport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-slate-400 text-xs pl-9 pr-4 py-2.5 rounded-2xl border border-white/10 focus:outline-none focus:border-[#D4AF37] transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Navigation & Commands */}
          {commandGroups.slice(0, 2).map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{group.group}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.items
                  .filter(
                    (i) =>
                      !searchTerm ||
                      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      i.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        id={`menu-${item.id}`}
                        onClick={item.action}
                        className="text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-3.5 transition-all flex flex-col justify-between group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5 font-bold text-white text-xs group-hover:text-[#F5D77F] transition-colors">
                            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#D4AF37]/20 text-[#D4AF37] transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span>{item.title}</span>
                          </div>
                          {item.badge && (
                            <span className="bg-white/10 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* Quick 9 Tables Grid */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Accès Direct aux 9 Tables</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tableShortcuts
                .filter(
                  (t) =>
                    !searchTerm ||
                    t.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((tableItem) => {
                  const Icon = tableItem.icon;
                  return (
                    <button
                      key={tableItem.id}
                      onClick={() => {
                        onNavigateTab('tables');
                        onNavigateTable(tableItem.index);
                        onClose();
                      }}
                      className="text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 rounded-xl p-2.5 transition-all flex items-center gap-2 text-xs font-medium text-slate-200 hover:text-white cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="truncate">{tableItem.title}</span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Actions & Session */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <LogOut className="w-3.5 h-3.5" />
              <span>Actions Rapides & Session</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sessionCommands.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`menu-${item.id}`}
                    onClick={item.action}
                    className={`text-left border rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer ${
                      item.isDestructive
                        ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-300'
                        : 'bg-blue-600/15 hover:bg-blue-600/25 border-blue-500/30 text-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${item.isDestructive ? 'bg-red-500/20' : 'bg-blue-600/20'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">{item.title}</div>
                        <div className="text-[11px] opacity-80">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer with Developer Notice */}
        <div className="bg-[#0B1A2C] border-t border-white/10 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>NSERACC_pro v2.6 • Système Connecté</span>
          </div>
          <div className="text-[#D4AF37] font-semibold">
            Développeur : Boniface-Gildas TEMBÉ
          </div>
        </div>

      </div>
    </div>
  );
};
