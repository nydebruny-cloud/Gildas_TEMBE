import React, { useState, useMemo } from 'react';
import {
  initialBeneficiaires,
  initialSocioEco,
  initialFreins,
  initialParcours,
  initialActions,
  initialExperiences,
  initialSorties,
  initialSatisfactions,
  initialPartenaires,
  defaultStructureConfig,
} from './data/mockData';
import {
  Table1Beneficiaire,
  Table2SocioEco,
  Table3Freins,
  Table4Parcours,
  Table5ActionAtelier,
  Table6ExperiencePro,
  Table7SortieResultat,
  Table8Satisfaction,
  Table9Partenaire,
  FullBeneficiaryRecord,
} from './types';
import { calculateKPISnapshot } from './services/kpiCalculator';
import { Header } from './components/Header';
import { Navbar, ActiveTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { TablesExplorerView } from './components/TablesExplorerView';
import { AlertsView } from './components/AlertsView';
import { ReportsView } from './components/ReportsView';
import { PartnersView } from './components/PartnersView';
import { BeneficiaryDetailModal } from './components/BeneficiaryDetailModal';
import { NewBeneficiaryModal } from './components/NewBeneficiaryModal';
import { AppLogo } from './components/AppLogo';
import { SynthesisReportModal } from './components/SynthesisReportModal';
import { CommandMenuModal } from './components/CommandMenuModal';
import { MenuView } from './components/MenuView';
import { exportTableToCSV } from './utils/exportUtils';

export default function App() {
  // 9 Reference Tables State
  const [beneficiaires, setBeneficiaires] = useState<Table1Beneficiaire[]>(initialBeneficiaires);
  const [socioEco, setSocioEco] = useState<Table2SocioEco[]>(initialSocioEco);
  const [freins, setFreins] = useState<Table3Freins[]>(initialFreins);
  const [parcours, setParcours] = useState<Table4Parcours[]>(initialParcours);
  const [actions, setActions] = useState<Table5ActionAtelier[]>(initialActions);
  const [experiences, setExperiences] = useState<Table6ExperiencePro[]>(initialExperiences);
  const [sorties, setSorties] = useState<Table7SortieResultat[]>(initialSorties);
  const [satisfactions, setSatisfactions] = useState<Table8Satisfaction[]>(initialSatisfactions);
  const [partenaires, setPartenaires] = useState<Table9Partenaire[]>(initialPartenaires);
  const [structureConfig] = useState(defaultStructureConfig);

  // App Navigation & Modals: Start on 'menu' at app opening
  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');
  const [selectedTableTab, setSelectedTableTab] = useState<number>(1);
  const [currentPeriod, setCurrentPeriod] = useState<string>('Août 2026');
  const [selectedRecord, setSelectedRecord] = useState<FullBeneficiaryRecord | null>(null);
  const [isNewBeneficiaryOpen, setIsNewBeneficiaryOpen] = useState(false);
  const [isSynthesisModalOpen, setIsSynthesisModalOpen] = useState(false);
  const [synthesisBeneficiaryId, setSynthesisBeneficiaryId] = useState<string | undefined>(undefined);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // Dynamic Live KPI Snapshot calculation based on the 9 tables
  const kpiSnapshot = useMemo(() => {
    return calculateKPISnapshot(
      beneficiaires,
      socioEco,
      freins,
      parcours,
      actions,
      experiences,
      sorties,
      satisfactions,
      structureConfig
    );
  }, [
    beneficiaires,
    socioEco,
    freins,
    parcours,
    actions,
    experiences,
    sorties,
    satisfactions,
    structureConfig,
  ]);

  // Handler to open 360 record by ID
  const handleOpenBeneficiaryById = (id: string) => {
    const b = beneficiaires.find((item) => item.id_beneficiaire === id);
    const s = socioEco.find((item) => item.id_beneficiaire === id);
    const f = freins.find((item) => item.id_beneficiaire === id);
    const p = parcours.find((item) => item.id_beneficiaire === id);
    const exp = experiences.find((item) => item.id_beneficiaire === id);
    const bActions = actions.filter((item) => item.id_beneficiaire === id);
    const sortie = sorties.find((item) => item.id_beneficiaire === id);
    const evalData = satisfactions.find((item) => item.id_beneficiaire === id);

    if (b && s && f && p && exp) {
      setSelectedRecord({
        b,
        s,
        f,
        p,
        actions: bActions,
        exp,
        sortie,
        eval: evalData,
      });
    }
  };

  // Handler to open Synthesis Report
  const handleOpenSynthesis = (beneficiaryId?: string) => {
    setSynthesisBeneficiaryId(beneficiaryId || (beneficiaires[0]?.id_beneficiaire));
    setIsSynthesisModalOpen(true);
  };

  // Handler to save newly added beneficiary
  const handleSaveNewBeneficiary = (
    b: Table1Beneficiaire,
    s: Table2SocioEco,
    f: Table3Freins,
    p: Table4Parcours,
    exp: Table6ExperiencePro
  ) => {
    setBeneficiaires((prev) => [b, ...prev]);
    setSocioEco((prev) => [s, ...prev]);
    setFreins((prev) => [f, ...prev]);
    setParcours((prev) => [p, ...prev]);
    setExperiences((prev) => [exp, ...prev]);
  };

  // Handler to add an action to a beneficiary
  const handleAddAction = (newAction: Table5ActionAtelier) => {
    setActions((prev) => [newAction, ...prev]);
    if (selectedRecord) {
      setSelectedRecord({
        ...selectedRecord,
        actions: [newAction, ...selectedRecord.actions],
      });
    }
  };

  // Welcome Screen Overlay State
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Handler to dismiss welcome screen with 0.8s smooth transition
  const handleEnterApp = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 800);
  };

  // Handler for Logout / Return to Welcome Screen
  const handleLogout = () => {
    setIsFadingOut(false);
    setShowWelcomeScreen(true);
  };

  // Handler to export all 9 tables in sequence or key data
  const handleExportAllTables = () => {
    const dateStr = new Date().toISOString().slice(0, 10);
    exportTableToCSV(beneficiaires, `NSERACC_Table_1_Beneficiaires_${dateStr}`);
    setTimeout(() => exportTableToCSV(socioEco, `NSERACC_Table_2_SocioEco_${dateStr}`), 200);
    setTimeout(() => exportTableToCSV(freins, `NSERACC_Table_3_Freins_${dateStr}`), 400);
    setTimeout(() => exportTableToCSV(parcours, `NSERACC_Table_4_Parcours_${dateStr}`), 600);
    setTimeout(() => exportTableToCSV(sorties, `NSERACC_Table_7_Sorties_${dateStr}`), 800);
    setTimeout(() => exportTableToCSV(partenaires, `NSERACC_Table_9_Partenaires_${dateStr}`), 1000);
  };

  // Determine next beneficiary ID
  const nextId = `BEN-${String(beneficiaires.length + 1).padStart(3, '0')}`;

  return (
    <div className="min-h-screen bg-[#0B1A2C] text-slate-100 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0B1A2C] relative overflow-x-hidden">
      
      {/* 1. DYNAMIC WELCOME OVERLAY SCREEN (NSERACC_pro) */}
      {showWelcomeScreen && (
        <div
          id="welcome-overlay"
          className={`fixed inset-0 w-screen h-screen z-[99999] bg-[#0B1A2C] flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-800 ease-in-out ${
            isFadingOut
              ? 'opacity-0 -translate-y-8 pointer-events-none scale-105 filter blur-sm'
              : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionDuration: '800ms' }}
        >
          {/* Luxury background ambient radial glows */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#AA7C11]/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute top-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
            {/* Subtle background luxury grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
          </div>

          {/* TOP: Application Title */}
          <div className="w-full max-w-4xl pt-6 sm:pt-8 text-center flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider gold-gradient-text drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
              NSERACC_pro
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 tracking-widest uppercase">
              Management & Pilotage de l'Insertion Socioprofessionnelle
            </p>
          </div>

          {/* CENTER: Floating Animated Logo with Golden Emitting Halo */}
          <div className="flex flex-col items-center justify-center my-auto py-4">
            <div className="relative group">
              {/* Pulsing halo ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/40 via-[#FFE89C]/30 to-[#AA7C11]/40 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Centered Animated Logo */}
              <AppLogo
                id="logo-app"
                size={250}
                className="logo-floating relative z-10 w-48 h-48 sm:w-60 sm:h-60 max-w-[250px] drop-shadow-[0_20px_35px_rgba(212,175,55,0.35)] transition-transform duration-500 cursor-pointer"
              />
            </div>

            <div className="mt-6 text-center space-y-1">
              <span className="inline-block px-4 py-1 rounded-full text-[11px] font-medium tracking-wide bg-[#D4AF37]/15 text-[#F5D77F] border border-[#D4AF37]/30 backdrop-blur-md">
                Orientation • Suivi des 9 Tables • Certification FSE+
              </span>
            </div>
          </div>

          {/* BOTTOM: Luxury Action Button & Developer Notice */}
          <div className="w-full max-w-xl pb-6 sm:pb-10 flex flex-col items-center space-y-3">
            <button
              id="btn-welcome-enter"
              onClick={handleEnterApp}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-4.5 bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:from-[#FFE89C] hover:via-[#FFF0BD] hover:to-[#F5D77F] text-[#0B1A2C] font-bold text-sm sm:text-base rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] border border-amber-200/80 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span className="tracking-wide">Bienvenue sur NSERACC_pro. Cliquez ici pour continuer</span>
              <span className="text-xl transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </button>
            <div className="text-center space-y-1">
              <p className="text-[11px] text-slate-400 font-light">
                Accès direct au tableau de bord & aux outils de pilotage
              </p>
              <p className="text-xs text-[#D4AF37] font-semibold tracking-wide">
                Développeur : Boniface-Gildas TEMBÉ
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN APPLICATION CONTENT (Revealed after welcome screen) */}
      <main
        id="app-content"
        className={`flex-1 flex flex-col min-h-screen transition-opacity duration-700 ${
          showWelcomeScreen && !isFadingOut ? 'hidden opacity-0' : 'flex opacity-100'
        }`}
      >
        {/* Ambient Frosted Background Orbs */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Top Header */}
        <Header
          kpi={kpiSnapshot}
          currentPeriod={currentPeriod}
          onPeriodChange={setCurrentPeriod}
          onOpenNewBeneficiary={() => setIsNewBeneficiaryOpen(true)}
          onOpenReportModal={() => setActiveTab('reports')}
          onOpenSynthesisReport={() => handleOpenSynthesis()}
          onOpenMenu={() => {
            setActiveTab('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
        />

        {/* Main Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          alertCount={kpiSnapshot.alertes_sans_contact_30j}
        />

        {/* Main View Container */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* TAB 0: GENERAL MENU & COMMAND CENTER */}
          {activeTab === 'menu' && (
            <MenuView
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateTable={(tableIndex) => {
                setSelectedTableTab(tableIndex);
                setActiveTab('tables');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenNewBeneficiary={() => setIsNewBeneficiaryOpen(true)}
              onOpenSynthesisReport={() => handleOpenSynthesis()}
              onOpenFSEReport={() => setActiveTab('reports')}
              onExportAllTables={handleExportAllTables}
              onLogout={handleLogout}
              kpi={kpiSnapshot}
              totalBeneficiaires={beneficiaires.length}
              totalPartenaires={partenaires.length}
            />
          )}

          {/* TAB 1: DASHBOARD & KPIS */}
          {activeTab === 'dashboard' && (
            <DashboardView
              kpi={kpiSnapshot}
              beneficiaires={beneficiaires}
              freins={freins}
              sorties={sorties}
              currentPeriod={currentPeriod}
            />
          )}

          {/* TAB 2: 9 REFERENCE TABLES EXPLORER */}
          {activeTab === 'tables' && (
            <TablesExplorerView
              beneficiaires={beneficiaires}
              socioEco={socioEco}
              freins={freins}
              parcours={parcours}
              actions={actions}
              experiences={experiences}
              sorties={sorties}
              satisfactions={satisfactions}
              partenaires={partenaires}
              onSelectBeneficiary={(rec) => setSelectedRecord(rec)}
              onOpenSynthesisReport={(id) => handleOpenSynthesis(id)}
              initialTableIndex={selectedTableTab}
            />
          )}

          {/* TAB 3: ALERTS & DROPOUT RISK */}
          {activeTab === 'alerts' && (
            <AlertsView
              kpi={kpiSnapshot}
              beneficiaires={beneficiaires}
              freins={freins}
              parcours={parcours}
              actions={actions}
              onOpenBeneficiary={handleOpenBeneficiaryById}
            />
          )}

          {/* TAB 4: REPORTS & FSE+ BILLING */}
          {activeTab === 'reports' && (
            <ReportsView
              kpi={kpiSnapshot}
              beneficiaires={beneficiaires}
              sorties={sorties}
              currentPeriod={currentPeriod}
              onOpenSynthesisReport={() => handleOpenSynthesis()}
            />
          )}

          {/* TAB 5: PARTNERS & EMPLOYERS (TABLE 9) */}
          {activeTab === 'partners' && (
            <PartnersView
              partenaires={partenaires}
            />
          )}

        </div>

        {/* Frosted Glass Footer */}
        <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl text-xs text-slate-400 py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                <span><strong className="text-slate-200">NSERACC_pro</strong> • Management de l'Insertion & Accompagnement</span>
              </div>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="text-[#D4AF37] font-semibold">
                Développeur : Boniface-Gildas TEMBÉ
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <button
                onClick={handleLogout}
                className="text-[#D4AF37] hover:underline font-medium cursor-pointer"
              >
                Déconnexion / Accueil
              </button>
              <span>•</span>
              <button
                onClick={() => setIsMenuModalOpen(true)}
                className="text-slate-300 hover:text-white hover:underline cursor-pointer"
              >
                Menu Commandes
              </button>
              <span>•</span>
              <span>Conformité RGPD & FSE+</span>
              <span>•</span>
              <span>9 Tables Synchronisées</span>
            </div>
          </div>
        </footer>
      </main>

      {/* 360 Beneficiary Detail Modal */}
      {selectedRecord && (
        <BeneficiaryDetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onAddAction={handleAddAction}
          onOpenSynthesisReport={(id) => handleOpenSynthesis(id)}
        />
      )}

      {/* Synthesis Report Modal & PDF Downloader */}
      {isSynthesisModalOpen && (
        <SynthesisReportModal
          beneficiaires={beneficiaires}
          socioEco={socioEco}
          freins={freins}
          parcours={parcours}
          actions={actions}
          experiences={experiences}
          sorties={sorties}
          satisfactions={satisfactions}
          partenaires={partenaires}
          initialBeneficiaryId={synthesisBeneficiaryId}
          onClose={() => setIsSynthesisModalOpen(false)}
        />
      )}

      {/* Command Menu Modal */}
      {isMenuModalOpen && (
        <CommandMenuModal
          onClose={() => setIsMenuModalOpen(false)}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
          }}
          onNavigateTable={(tableIndex) => {
            setActiveTab('tables');
            setSelectedTableTab(tableIndex);
          }}
          onOpenNewBeneficiary={() => setIsNewBeneficiaryOpen(true)}
          onOpenSynthesisReport={() => handleOpenSynthesis()}
          onOpenFSEReport={() => setActiveTab('reports')}
          onExportAllTables={handleExportAllTables}
          onLogout={handleLogout}
        />
      )}

      {/* New Beneficiary Modal */}
      <NewBeneficiaryModal
        isOpen={isNewBeneficiaryOpen}
        onClose={() => setIsNewBeneficiaryOpen(false)}
        onSave={handleSaveNewBeneficiary}
        nextId={nextId}
      />

    </div>
  );
}

