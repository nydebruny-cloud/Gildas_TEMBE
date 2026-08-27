import React, { useState } from 'react';
import {
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
  TrendingUp,
  FolderSync,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { AppLogo } from './AppLogo';
import { KPISnapshot } from '../types';

interface MenuViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onNavigateTable: (tableIndex: number) => void;
  onOpenNewBeneficiary: () => void;
  onOpenSynthesisReport: () => void;
  onOpenFSEReport: () => void;
  onExportAllTables: () => void;
  onLogout: () => void;
  kpi: KPISnapshot;
  totalBeneficiaires: number;
  totalPartenaires: number;
}

export const MenuView: React.FC<MenuViewProps> = ({
  onNavigateTab,
  onNavigateTable,
  onOpenNewBeneficiary,
  onOpenSynthesisReport,
  onOpenFSEReport,
  onExportAllTables,
  onLogout,
  kpi,
  totalBeneficiaires,
  totalPartenaires,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigationModules = [
    {
      id: 'cmd-dashboard',
      tab: 'dashboard' as ActiveTab,
      title: 'Tableau de Bord & KPIs',
      tagline: 'Pilotage Stratégique & Indicateurs Clés',
      description: 'Suivi du taux d\'insertion (75%), taux d\'abandon, pyramide des âges et répartition géographique.',
      icon: LayoutDashboard,
      badge: 'Principal',
      accentColor: 'from-blue-600/20 via-indigo-600/10 to-transparent border-blue-500/30 text-blue-300',
      iconColor: 'text-blue-400',
    },
    {
      id: 'cmd-tables',
      tab: 'tables' as ActiveTab,
      title: 'Les 9 Tables de Référence',
      tagline: 'Base de Données Relationnelle 360°',
      description: 'Consultation & gestion des fiches d\'identification, données socio-économiques, freins, parcours et résultats.',
      icon: Database,
      badge: '9 Tables',
      accentColor: 'from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent border-[#D4AF37]/35 text-[#F5D77F]',
      iconColor: 'text-[#D4AF37]',
    },
    {
      id: 'cmd-alerts',
      tab: 'alerts' as ActiveTab,
      title: 'Centre d\'Alertes & Risques',
      tagline: 'Détection Précoce de Décrochage',
      description: 'Surveillance des bénéficiaires sans contact depuis plus de 30 jours et personnes en situation de multi-freins.',
      icon: AlertOctagon,
      badge: kpi.alertes_sans_contact_30j > 0 ? `${kpi.alertes_sans_contact_30j} Alertes` : 'Sous contrôle',
      accentColor: 'from-red-600/20 via-amber-600/10 to-transparent border-red-500/30 text-red-300',
      iconColor: 'text-red-400',
    },
    {
      id: 'cmd-partners',
      tab: 'partners' as ActiveTab,
      title: 'Partenaires & Employeurs',
      tagline: 'Réseau Territorial & Entreprises (Table 9)',
      description: 'Gestion du réseau des entreprises d\'accueil (PMSMP, embauches), SIAE, centres de formation et prescripteurs.',
      icon: Users,
      badge: `${totalPartenaires} Actifs`,
      accentColor: 'from-purple-600/20 via-pink-600/10 to-transparent border-purple-500/30 text-purple-300',
      iconColor: 'text-purple-400',
    },
  ];

  const reportTools = [
    {
      id: 'tool-synthesis',
      title: 'Rapport de Synthèse 360° (Export PDF)',
      description: 'Édition immédiate de la synthèse individuelle bénéficiaire avec date, freins, assiduité, sorties et préconisations d\'orientation.',
      icon: FileSpreadsheet,
      action: onOpenSynthesisReport,
      badge: 'PDF / Impression',
      bgClass: 'hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 border-[#D4AF37]/30 bg-[#D4AF37]/5',
      iconColor: 'text-[#D4AF37]',
    },
    {
      id: 'tool-fse',
      title: 'Bilans Officiels FSE+ & Département',
      description: 'Génération automatique des bilans annuels conformes aux normes FSE+ 2021-2027 et calcul du SROI social.',
      icon: FileText,
      action: onOpenFSEReport,
      badge: 'Réglementaire',
      bgClass: 'hover:border-blue-400/60 hover:bg-blue-500/10 border-blue-500/20 bg-white/5',
      iconColor: 'text-blue-400',
    },
    {
      id: 'tool-export-all',
      title: 'Exporter les 9 Tables (CSV / Excel)',
      description: 'Téléchargement direct de l\'intégralité des données en format CSV encodé UTF-8 BOM, entièrement compatible Microsoft Excel.',
      icon: Download,
      action: onExportAllTables,
      badge: 'Export Global',
      bgClass: 'hover:border-emerald-400/60 hover:bg-emerald-500/10 border-emerald-500/20 bg-white/5',
      iconColor: 'text-emerald-400',
    },
  ];

  const tablesRegistry = [
    { id: 1, name: 'Table 1 : Identification & État Civil', desc: 'Identité, âge, genre, commune, QPV/ZRR, prescripteur et référent.', icon: UserCheck, count: totalBeneficiaires },
    { id: 2, name: 'Table 2 : Situation Socio-Économique', desc: 'Statut RSA/ASS/AAH, niveau d\'études, RQTH, ressources mensuelles.', icon: Award, count: totalBeneficiaires },
    { id: 3, name: 'Table 3 : Diagnostic des Freins & Complexité', desc: 'Mobilité, logement, garde d\'enfants, langue, santé, multi-freins.', icon: AlertOctagon, count: totalBeneficiaires },
    { id: 4, name: 'Table 4 : Parcours & Assiduité', desc: 'Type d\'accompagnement, dates entrée/fin, assiduité, rdv réalisés.', icon: Activity, count: totalBeneficiaires },
    { id: 5, name: 'Table 5 : Actions, Ateliers & Rendez-vous', desc: 'Historique des ateliers CV, entretiens, démarches de recherche.', icon: CheckCircle, count: 'Multi-lignes' },
    { id: 6, name: 'Table 6 : Expériences Professionnelles & PMSMP', desc: 'Stages d\'immersion en entreprise, enquêtes métier et retours tuteur.', icon: Building2, count: totalBeneficiaires },
    { id: 7, name: 'Table 7 : Sorties & Résultats à 6 mois', desc: 'CDI, CDD ≥ 6 mois, formation qualifiante, création d\'entreprise.', icon: ShieldCheck, count: totalBeneficiaires },
    { id: 8, name: 'Table 8 : Évaluation & Satisfaction', desc: 'Notes de satisfaction (4.8/5), autonomie et recommandations.', icon: Star, count: totalBeneficiaires },
    { id: 9, name: 'Table 9 : Partenaires & Employeurs', desc: 'Catalogue d\'entreprises, SIAE, organismes et coordonnées.', icon: Users, count: totalPartenaires },
  ];

  // Filtered tables if user searches
  const filteredTables = tablesRegistry.filter((t) =>
    !searchTerm ||
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="menu-view" className="space-y-6">
      
      {/* 1. HERO / WELCOME BANNER OF MENU */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1A2C] via-[#10243E] to-[#0D1D30] border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0B1A2C] border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-xl shadow-[#D4AF37]/20 flex-shrink-0 p-1">
              <AppLogo size={56} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#D4AF37]/20 text-[#F5D77F] border border-[#D4AF37]/40 text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Centre de Commandes & Navigation
                </span>
                <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Système Opérationnel
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                Menu Général <span className="text-[#D4AF37]">NSERACC_pro</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Accédez rapidement à l'ensemble des 9 tables de données, aux indicateurs de pilotage, à la génération de rapports de synthèse imprimables et aux fonctions d'administration.
              </p>
            </div>
          </div>

          {/* Quick Actions in Hero */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              id="menu-hero-btn-new"
              onClick={onOpenNewBeneficiary}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 border border-blue-400/30 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Inscrire un Bénéficiaire</span>
            </button>

            <button
              id="menu-hero-btn-synthesis"
              onClick={onOpenSynthesisReport}
              className="bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:from-[#FFE89C] hover:to-[#F5D77F] text-[#0B1A2C] text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Rapport de Synthèse</span>
            </button>
          </div>
        </div>

        {/* Real-time System Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="text-[11px] text-slate-400 font-medium">Bénéficiaires Suivis</div>
            <div className="text-xl font-extrabold text-white mt-0.5">{totalBeneficiaires}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">100% conformes RGPD</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="text-[11px] text-slate-400 font-medium">Taux Sorties Positives</div>
            <div className="text-xl font-extrabold text-[#F5D77F] mt-0.5">{kpi.taux_sortie_dynamique_percent}%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Cible FSE+ : 65%</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="text-[11px] text-slate-400 font-medium">Alertes Actives</div>
            <div className="text-xl font-extrabold text-red-400 mt-0.5">{kpi.alertes_sans_contact_30j}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">&gt;30j sans contact</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="text-[11px] text-slate-400 font-medium">Réseau Partenaires</div>
            <div className="text-xl font-extrabold text-blue-400 mt-0.5">{totalPartenaires}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Entreprises & SIAE</div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH BAR FOR QUICK DISCOVERY */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex items-center gap-3 shadow-sm">
        <Search className="w-5 h-5 text-slate-400 ml-2 flex-shrink-0" />
        <input
          id="menu-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher une table, une action, un rapport (ex: Diagnostic des freins, FSE+, Assiduité, CDI...)"
          className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs text-slate-400 hover:text-white bg-white/10 px-2.5 py-1 rounded-lg cursor-pointer"
          >
            Effacer
          </button>
        )}
      </div>

      {/* 3. PRIMARY MODULES (4 PILIERS DE PILOTAGE) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <h2 className="text-base font-bold text-white tracking-wide">
              Modules Principaux de Pilotage
            </h2>
          </div>
          <span className="text-xs text-slate-400">Navigation directe</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {navigationModules
            .filter(
              (m) =>
                !searchTerm ||
                m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  id={`menu-card-${module.tab}`}
                  onClick={() => onNavigateTab(module.tab)}
                  className={`group text-left rounded-3xl p-5 bg-gradient-to-br ${module.accentColor} bg-white/5 border backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-xl shadow-md cursor-pointer flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className={`w-5 h-5 ${module.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#F5D77F] transition-colors">
                            {module.title}
                          </h3>
                          <div className="text-[11px] text-slate-400 font-medium">
                            {module.tagline}
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-slate-200">
                        {module.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {module.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-semibold text-[#D4AF37] group-hover:text-white transition-colors">
                    <span>Accéder au module</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {/* 4. DIRECT ACCESS TO THE 9 REFERENCE TABLES */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
            <h2 className="text-base font-bold text-white tracking-wide">
              Accès Direct aux 9 Tables de Référence
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('tables')}
            className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Ouvrir l'explorateur complet</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTables.map((table) => {
            const Icon = table.icon;
            return (
              <button
                key={table.id}
                id={`menu-table-btn-${table.id}`}
                onClick={() => onNavigateTable(table.id)}
                className="group text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-4 transition-all duration-200 shadow-sm hover:shadow-lg backdrop-blur-xl cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 transition-colors">
                        <Icon className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-[#F5D77F] transition-colors line-clamp-1">
                        Table {table.id}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold bg-white/10 text-slate-300 px-2 py-0.5 rounded-md">
                      {typeof table.count === 'number' ? `${table.count} fiches` : table.count}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">
                    {table.name.replace(/^Table \d+ : /, '')}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {table.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-[#D4AF37] transition-colors">
                  <span>Consulter la table</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. REPORTS, EDITIONS & EXPORTS */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h2 className="text-base font-bold text-white tracking-wide">
              Rapports, Édition & Exports
            </h2>
          </div>
          <span className="text-xs text-slate-400">Formats PDF & CSV</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {reportTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                id={`menu-tool-${tool.id}`}
                onClick={tool.action}
                className={`group text-left border rounded-2xl p-4 transition-all duration-200 shadow-sm hover:shadow-lg backdrop-blur-xl cursor-pointer flex flex-col justify-between ${tool.bgClass}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${tool.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-slate-200 border border-white/10">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-[#F5D77F] transition-colors mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                  <span>Lancer l'outil</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. BOTTOM SESSION BAR */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold">
            i
          </div>
          <div>
            <div className="font-semibold text-white">Session active et sécurisée</div>
            <div className="text-[11px] text-slate-400">Toutes les modifications sont synchronisées localement.</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="menu-btn-logout-bottom"
            onClick={onLogout}
            className="bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Fermer la session / Déconnexion</span>
          </button>
        </div>
      </div>

    </div>
  );
};
