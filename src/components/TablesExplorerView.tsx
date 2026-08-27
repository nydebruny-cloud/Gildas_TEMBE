import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  User,
  Activity,
  AlertTriangle,
  Briefcase,
  Award,
  Star,
  Users,
  CheckCircle,
  FileSpreadsheet,
  ChevronRight,
  Sparkles,
  Download,
  FileText,
} from 'lucide-react';
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
} from '../types';
import { exportTableToCSV } from '../utils/exportUtils';

interface TablesExplorerViewProps {
  beneficiaires: Table1Beneficiaire[];
  socioEco: Table2SocioEco[];
  freins: Table3Freins[];
  parcours: Table4Parcours[];
  actions: Table5ActionAtelier[];
  experiences: Table6ExperiencePro[];
  sorties: Table7SortieResultat[];
  satisfactions: Table8Satisfaction[];
  partenaires: Table9Partenaire[];
  onSelectBeneficiary: (record: FullBeneficiaryRecord) => void;
  onOpenSynthesisReport?: (beneficiaryId?: string) => void;
  initialTableIndex?: number;
}

export const TablesExplorerView: React.FC<TablesExplorerViewProps> = ({
  beneficiaires,
  socioEco,
  freins,
  parcours,
  actions,
  experiences,
  sorties,
  satisfactions,
  partenaires,
  onSelectBeneficiary,
  onOpenSynthesisReport,
  initialTableIndex = 1,
}) => {
  const [selectedTableIndex, setSelectedTableIndex] = useState<number>(initialTableIndex);

  // Sync if initialTableIndex changes
  React.useEffect(() => {
    if (initialTableIndex) {
      setSelectedTableIndex(initialTableIndex);
    }
  }, [initialTableIndex]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDispositif, setFilterDispositif] = useState('ALL');
  const [filterStatut, setFilterStatut] = useState('ALL');

  const tablesList = [
    { index: 1, title: 'Table 1 : Identification', count: beneficiaires.length, icon: User, data: beneficiaires, prefix: 'Table_1_Identification' },
    { index: 2, title: 'Table 2 : Socio-Économique', count: socioEco.length, icon: Briefcase, data: socioEco, prefix: 'Table_2_SocioEconomique' },
    { index: 3, title: 'Table 3 : Freins Identifiés', count: freins.length, icon: AlertTriangle, data: freins, prefix: 'Table_3_Freins_Complexite' },
    { index: 4, title: 'Table 4 : Parcours d\'Accompagnement', count: parcours.length, icon: Activity, data: parcours, prefix: 'Table_4_Parcours_Accompagnement' },
    { index: 5, title: 'Table 5 : Actions & Ateliers', count: actions.length, icon: CheckCircle, data: actions, prefix: 'Table_5_Actions_Ateliers' },
    { index: 6, title: 'Table 6 : Expérience Pro', count: experiences.length, icon: Briefcase, data: experiences, prefix: 'Table_6_Experiences_Pro' },
    { index: 7, title: 'Table 7 : Sorties & Résultats', count: sorties.length, icon: Award, data: sorties, prefix: 'Table_7_Sorties_Resultats' },
    { index: 8, title: 'Table 8 : Satisfaction & Éval.', count: satisfactions.length, icon: Star, data: satisfactions, prefix: 'Table_8_Satisfaction_Evaluation' },
    { index: 9, title: 'Table 9 : Partenaires & Employeurs', count: partenaires.length, icon: Users, data: partenaires, prefix: 'Table_9_Partenaires_Employeurs' },
  ];

  // Export current table
  const handleExportCurrentTable = () => {
    const currentTable = tablesList.find(t => t.index === selectedTableIndex);
    if (!currentTable) return;
    const dateStr = new Date().toISOString().slice(0, 10);
    exportTableToCSV(currentTable.data, `NSERACC_${currentTable.prefix}_${dateStr}`);
  };

  // Helper to get composite record
  const getFullRecord = (id: string): FullBeneficiaryRecord | null => {
    const b = beneficiaires.find(item => item.id_beneficiaire === id);
    const s = socioEco.find(item => item.id_beneficiaire === id);
    const f = freins.find(item => item.id_beneficiaire === id);
    const p = parcours.find(item => item.id_beneficiaire === id);
    const exp = experiences.find(item => item.id_beneficiaire === id);
    const bActions = actions.filter(item => item.id_beneficiaire === id);
    const sortie = sorties.find(item => item.id_beneficiaire === id);
    const evalData = satisfactions.find(item => item.id_beneficiaire === id);

    if (!b || !s || !f || !p || !exp) return null;
    return { b, s, f, p, actions: bActions, exp, sortie, eval: evalData };
  };

  // Filtered beneficiaries
  const filteredBeneficiaires = beneficiaires.filter(b => {
    const p = parcours.find(item => item.id_beneficiaire === b.id_beneficiaire);
    const matchSearch =
      b.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id_beneficiaire.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.commune.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDispositif = filterDispositif === 'ALL' || p?.dispositif === filterDispositif;
    const matchStatut = filterStatut === 'ALL' || p?.statut === filterStatut;

    return matchSearch && matchDispositif && matchStatut;
  });

  return (
    <div id="tables-explorer-view" className="space-y-6 animate-fade-in">
      
      {/* Table Selector Pills */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-3.5 shadow-xl shadow-black/20">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tablesList.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTableIndex === t.index;

            return (
              <button
                key={t.index}
                id={`table-tab-${t.index}`}
                onClick={() => setSelectedTableIndex(t.index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 backdrop-blur-sm'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.title}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-blue-800 text-white' : 'bg-white/10 text-slate-300'
                }`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 shadow-xl shadow-black/20 flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            id="search-table-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, ID, ville..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>Dispositif:</span>
            <select
              id="filter-dispositif-select"
              value={filterDispositif}
              onChange={(e) => setFilterDispositif(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400 backdrop-blur-md cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-white">Tous les dispositifs</option>
              <option value="PLIE" className="bg-slate-900 text-white">PLIE</option>
              <option value="IAE (ACI/AI/EI)" className="bg-slate-900 text-white">IAE</option>
              <option value="Mission Locale" className="bg-slate-900 text-white">Mission Locale</option>
              <option value="CER (Contrat Engagement Réciproque)" className="bg-slate-900 text-white">CER / RSA</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span>Statut:</span>
            <select
              id="filter-statut-select"
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400 backdrop-blur-md cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-white">Tous statuts</option>
              <option value="actif" className="bg-slate-900 text-white">Actifs</option>
              <option value="cloture" className="bg-slate-900 text-white">Clôturés (Sorties)</option>
              <option value="suspendu" className="bg-slate-900 text-white">Suspendus</option>
            </select>
          </div>

          {/* Action: Exporter Table & Rapport de Synthèse */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <button
              id="btn-export-current-table"
              onClick={handleExportCurrentTable}
              className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Télécharger les données de cette table au format CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter Table</span>
            </button>

            {onOpenSynthesisReport && (
              <button
                id="btn-open-synthesis-from-tables"
                onClick={() => onOpenSynthesisReport()}
                className="bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F5D77F] border border-[#D4AF37]/40 px-3 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                title="Ouvrir le rapport de synthèse bénéficiaire"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Rapport de Synthèse</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Dynamic Table Content */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl shadow-black/20 overflow-hidden">
        
        {/* TABLE 1 : IDENTIFICATION */}
        {selectedTableIndex === 1 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ID & Bénéficiaire</th>
                  <th className="py-3 px-3">Âge / Genre</th>
                  <th className="py-3 px-3">Situation Familiale</th>
                  <th className="py-3 px-3">Logement</th>
                  <th className="py-3 px-3">Zone & Commune</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-4 text-right">Fiche 360°</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBeneficiaires.map((b) => {
                  const p = parcours.find(item => item.id_beneficiaire === b.id_beneficiaire);
                  const f = freins.find(item => item.id_beneficiaire === b.id_beneficiaire);

                  return (
                    <tr
                      key={b.id_beneficiaire}
                      className="hover:bg-slate-800/70 cursor-pointer transition-colors group"
                      onClick={() => {
                        const full = getFullRecord(b.id_beneficiaire);
                        if (full) onSelectBeneficiary(full);
                      }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-emerald-400 font-bold">{b.id_beneficiaire}</span>
                          <strong className="text-white group-hover:text-emerald-300 font-semibold">
                            {b.prenom} {b.nom}
                          </strong>
                          {f && f.niveau_complexite === 'eleve' && (
                            <span className="bg-rose-950 border border-rose-800 text-rose-300 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                              {f.nb_freins_cumules} freins
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span>{b.age} ans • {b.genre}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span>{b.situation_matrimoniale} ({b.enfants_charge} enf.)</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          b.situation_logement.includes('Précaire') || b.situation_logement.includes('Sans abri')
                            ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50'
                            : 'text-slate-300'
                        }`}>
                          {b.situation_logement}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-white font-medium">{b.commune}</span>
                        <span className="text-slate-400 block text-[10px]">{b.zone_geographique}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px]">
                        {b.telephone}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const full = getFullRecord(b.id_beneficiaire);
                            if (full) onSelectBeneficiary(full);
                          }}
                          className="bg-slate-800 group-hover:bg-emerald-600 text-slate-300 group-hover:text-white px-2.5 py-1 rounded text-xs font-medium transition-colors inline-flex items-center gap-1"
                        >
                          <span>Voir</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE 2 : SITUATION SOCIO-ÉCONOMIQUE */}
        {selectedTableIndex === 2 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Bénéficiaire</th>
                  <th className="py-3 px-3">Formation & Diplôme</th>
                  <th className="py-3 px-3">Situation avant entrée</th>
                  <th className="py-3 px-3">Éloignement emploi</th>
                  <th className="py-3 px-3">Revenus actuels</th>
                  <th className="py-3 px-3">Français / Numérique</th>
                  <th className="py-3 px-3">Permis / Véhicule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {socioEco.map((s) => {
                  const b = beneficiaires.find(item => item.id_beneficiaire === s.id_beneficiaire);
                  return (
                    <tr key={s.id_beneficiaire} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-semibold text-white">
                        <span className="font-mono text-emerald-400 mr-1.5">{s.id_beneficiaire}</span>
                        {b ? `${b.prenom} ${b.nom}` : ''}
                      </td>
                      <td className="py-3 px-3">
                        <strong className="text-slate-200 block">{s.niveau_formation}</strong>
                        <span className="text-[11px] text-slate-400">{s.dernier_diplome}</span>
                      </td>
                      <td className="py-3 px-3">{s.situation_avant_entree}</td>
                      <td className="py-3 px-3 font-mono font-semibold text-amber-400">
                        {s.duree_eloignement_mois} mois
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-medium">
                          {s.revenus_actuels}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="block text-[11px]">FR : {s.niveau_francais}</span>
                        <span className="block text-[11px] text-slate-400">Num : {s.maitrise_numerique}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span>{s.permis_b ? '🚗 Permis B' : '❌ Sans permis'}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE 3 : FREINS IDENTIFIÉS */}
        {selectedTableIndex === 3 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Bénéficiaire</th>
                  <th className="py-3 px-3">Cumul Freins</th>
                  <th className="py-3 px-3">Complexité</th>
                  <th className="py-3 px-3">Freins Périphériques Détectés</th>
                  <th className="py-3 px-3">Freins levés</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {freins.map((f) => {
                  const b = beneficiaires.find(item => item.id_beneficiaire === f.id_beneficiaire);
                  return (
                    <tr key={f.id_beneficiaire} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-semibold text-white">
                        <span className="font-mono text-emerald-400 mr-1.5">{f.id_beneficiaire}</span>
                        {b ? `${b.prenom} ${b.nom}` : ''}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-sm">
                        <span className={f.nb_freins_cumules >= 4 ? 'text-rose-400' : 'text-emerald-400'}>
                          {f.nb_freins_cumules} freins
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                          f.niveau_complexite === 'eleve'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : f.niveau_complexite === 'moyen'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}>
                          {f.niveau_complexite}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {f.frein_mobilite && <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-amber-300">Mobilité</span>}
                          {f.frein_logement && <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-rose-300">Logement</span>}
                          {f.frein_garde_enfants && <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-purple-300">Garde Enfants</span>}
                          {f.frein_financier && <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-teal-300">Financier</span>}
                          {f.frein_linguistique && <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-blue-300">Linguistique FLE</span>}
                          {f.frein_numerique && <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-orange-300">Numérique</span>}
                          {f.frein_judiciaire && <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-red-400">Judiciaire</span>}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">
                        +{f.freins_leves_recemment || 0}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            const full = getFullRecord(f.id_beneficiaire);
                            if (full) onSelectBeneficiary(full);
                          }}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 ml-auto"
                        >
                          <span>Fiche 360°</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE 4 : PARCOURS D'ACCOMPAGNEMENT */}
        {selectedTableIndex === 4 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ID Parcours & Bénéficiaire</th>
                  <th className="py-3 px-3">Dispositif & Source</th>
                  <th className="py-3 px-3">Conseiller Référent</th>
                  <th className="py-3 px-3">Objectif</th>
                  <th className="py-3 px-3">RDV Réalisés / Manqués</th>
                  <th className="py-3 px-3">Dernier Contact</th>
                  <th className="py-3 px-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {parcours.map((p) => {
                  const b = beneficiaires.find(item => item.id_beneficiaire === p.id_beneficiaire);
                  const isSansContactAlert = p.statut === 'actif' && p.jours_sans_contact > 30;

                  return (
                    <tr key={p.id_parcours} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-semibold text-white">
                        <span className="font-mono text-emerald-400 mr-1.5">{p.id_parcours}</span>
                        {b ? `${b.prenom} ${b.nom}` : ''}
                      </td>
                      <td className="py-3 px-3">
                        <strong className="text-slate-200 block">{p.dispositif}</strong>
                        <span className="text-[11px] text-slate-400">Origine: {p.source_orientation}</span>
                      </td>
                      <td className="py-3 px-3 font-medium text-white">{p.conseiller_referent}</td>
                      <td className="py-3 px-3 max-w-xs truncate text-slate-300">{p.objectif_parcours}</td>
                      <td className="py-3 px-3 font-mono">
                        <span className="text-emerald-400 font-bold">{p.rdv_realises}</span> / <span className="text-rose-400">{p.rdv_manques}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`block font-mono text-[11px] ${
                          isSansContactAlert ? 'text-rose-400 font-bold' : 'text-slate-300'
                        }`}>
                          {p.date_dernier_contact} ({p.jours_sans_contact}j)
                        </span>
                        {isSansContactAlert && (
                          <span className="text-[10px] text-rose-300 bg-rose-950 px-1 py-0.2 rounded border border-rose-800 font-semibold">
                            🔴 &gt; 30j sans contact
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                          p.statut === 'actif'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : p.statut === 'cloture'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {p.statut}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE 5 : ACTIONS ET ATELIERS */}
        {selectedTableIndex === 5 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Action / Atelier</th>
                  <th className="py-3 px-3">Bénéficiaire</th>
                  <th className="py-3 px-3">Prestataire</th>
                  <th className="py-3 px-3">Dates & Durée</th>
                  <th className="py-3 px-3">Présence / Abandon</th>
                  <th className="py-3 px-3">Résultat</th>
                  <th className="py-3 px-3 text-right">Coût</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {actions.map((act) => {
                  const b = beneficiaires.find(item => item.id_beneficiaire === act.id_beneficiaire);
                  return (
                    <tr key={act.id_action} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4">
                        <strong className="text-white block">{act.intitule}</strong>
                        <span className="text-[11px] text-teal-400">{act.type_action}</span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-200">
                        {b ? `${b.prenom} ${b.nom}` : act.id_beneficiaire}
                      </td>
                      <td className="py-3 px-3 text-slate-300">{act.prestataire}</td>
                      <td className="py-3 px-3 font-mono text-[11px]">
                        {act.date_debut} ({act.duree_heures}h)
                      </td>
                      <td className="py-3 px-3">
                        {act.abandon ? (
                          <span className="text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800 font-medium">
                            ⚠️ Abandon ({act.motif_abandon})
                          </span>
                        ) : act.presence_effective ? (
                          <span className="text-emerald-400 font-semibold">✅ Présence confirmée</span>
                        ) : (
                          <span className="text-amber-400">Absent</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                          act.resultat === 'reussite' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {act.resultat}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-white">
                        {act.cout_action > 0 ? `${act.cout_action} €` : 'Gratuit (Partenariat)'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE 6 : EXPÉRIENCE PRO */}
        {selectedTableIndex === 6 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Bénéficiaire</th>
                  <th className="py-3 px-3">Secteurs Antérieurs</th>
                  <th className="py-3 px-3">Compétences Clés</th>
                  <th className="py-3 px-3">Compétences Transférables</th>
                  <th className="py-3 px-3">Métiers Ciblés</th>
                  <th className="py-3 px-3">Mobilité Rayon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {experiences.map((exp) => {
                  const b = beneficiaires.find(item => item.id_beneficiaire === exp.id_beneficiaire);
                  return (
                    <tr key={exp.id_beneficiaire} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-semibold text-white">
                        <span className="font-mono text-emerald-400 mr-1.5">{exp.id_beneficiaire}</span>
                        {b ? `${b.prenom} ${b.nom}` : ''}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-slate-200">{exp.secteurs_activite.join(', ')}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-emerald-300">{exp.competences_cles.join(' • ')}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-teal-300">{exp.competences_transferables.join(' • ')}</span>
                      </td>
                      <td className="py-3 px-3">
                        <strong className="text-white">{exp.metiers_cibles.join(', ')}</strong>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-300">
                        {exp.mobilite_rayon_km} km
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE 7 : SORTIES ET RÉSULTATS */}
        {selectedTableIndex === 7 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Bénéficiaire Sortant</th>
                  <th className="py-3 px-3">Date Sortie</th>
                  <th className="py-3 px-3">Type de Sortie</th>
                  <th className="py-3 px-3">Employeur & Poste Obtenu</th>
                  <th className="py-3 px-3">Niveau Salaire</th>
                  <th className="py-3 px-3">Durée Parcours</th>
                  <th className="py-3 px-3">Suivi 6 mois</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sorties.map((s) => {
                  const b = beneficiaires.find(item => item.id_beneficiaire === s.id_beneficiaire);
                  return (
                    <tr key={s.id_beneficiaire} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-semibold text-white">
                        <span className="font-mono text-emerald-400 mr-1.5">{s.id_beneficiaire}</span>
                        {b ? `${b.prenom} ${b.nom}` : ''}
                      </td>
                      <td className="py-3 px-3 font-mono">{s.date_sortie}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          s.est_emploi_durable
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-teal-950 text-teal-300 border border-teal-800'
                        }`}>
                          ✅ {s.type_sortie}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <strong className="text-white block">{s.intitule_poste}</strong>
                        <span className="text-[11px] text-slate-400">{s.nom_entreprise}</span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-200">{s.niveau_salaire}</td>
                      <td className="py-3 px-3 font-mono">{s.duree_totale_parcours_mois} mois</td>
                      <td className="py-3 px-3">
                        {s.suivi_6_mois_en_emploi === true ? (
                          <span className="text-emerald-400 font-semibold">✅ En emploi (Pérenne)</span>
                        ) : (
                          <span className="text-slate-400">En cours</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE 8 : SATISFACTION ET ÉVALUATION */}
        {selectedTableIndex === 8 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Bénéficiaire</th>
                  <th className="py-3 px-3">Date Éval.</th>
                  <th className="py-3 px-3">Satisfaction Globale</th>
                  <th className="py-3 px-3">Accompagnement Conseiller</th>
                  <th className="py-3 px-3">Ateliers</th>
                  <th className="py-3 px-3">Recommandation</th>
                  <th className="py-3 px-4">Commentaire libre</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {satisfactions.map((sat) => {
                  const b = beneficiaires.find(item => item.id_beneficiaire === sat.id_beneficiaire);
                  return (
                    <tr key={sat.id_beneficiaire} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-semibold text-white">
                        <span className="font-mono text-emerald-400 mr-1.5">{sat.id_beneficiaire}</span>
                        {b ? `${b.prenom} ${b.nom}` : ''}
                      </td>
                      <td className="py-3 px-3 font-mono">{sat.date_evaluation}</td>
                      <td className="py-3 px-3 font-bold text-amber-400">★ {sat.satisfaction_globale} / 5</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">★ {sat.satisfaction_accompagnement_conseiller} / 5</td>
                      <td className="py-3 px-3 font-bold text-teal-400">★ {sat.satisfaction_ateliers} / 5</td>
                      <td className="py-3 px-3">
                        {sat.recommandation_dispositif ? (
                          <span className="text-emerald-400 font-semibold">Oui (100%)</span>
                        ) : (
                          <span className="text-rose-400">Non</span>
                        )}
                      </td>
                      <td className="py-3 px-4 max-w-sm italic text-slate-300">
                        "{sat.commentaires_libres}"
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLE 9 : PARTENAIRES ET EMPLOYEURS */}
        {selectedTableIndex === 9 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Structure Partenaire</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Secteur d'Activité</th>
                  <th className="py-3 px-3">Contact Référent</th>
                  <th className="py-3 px-3">Offres / Placements</th>
                  <th className="py-3 px-3">Satisfaction</th>
                  <th className="py-3 px-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {partenaires.map((part) => (
                  <tr key={part.id_partenaire} className="hover:bg-slate-800/50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-emerald-400 mr-1.5 font-bold">{part.id_partenaire}</span>
                      <strong className="text-white text-sm">{part.nom_structure}</strong>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-200 capitalize font-medium">
                        {part.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-200">{part.secteur_activite}</td>
                    <td className="py-3 px-3">
                      <strong className="text-slate-100 block">{part.contact_referent}</strong>
                      <span className="text-[11px] text-slate-400">{part.telephone}</span>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <strong className="text-emerald-400">{part.placements_realises}</strong> placés / {part.offres_proposees} offres
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-400">{part.taux_satisfaction}%</td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-400 font-semibold">✅ Actif</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
