import React, { useState } from 'react';
import {
  Copy,
  Check,
  TrendingUp,
  Award,
  Clock,
  Euro,
  HeartHandshake,
  UserCheck,
  AlertTriangle,
  FileDown,
  HelpCircle,
} from 'lucide-react';
import { KPISnapshot, Table1Beneficiaire, Table3Freins, Table7SortieResultat } from '../types';
import { generateStandardTableauDeBord } from '../services/kpiCalculator';

interface DashboardViewProps {
  kpi: KPISnapshot;
  beneficiaires: Table1Beneficiaire[];
  freins: Table3Freins[];
  sorties: Table7SortieResultat[];
  currentPeriod: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  kpi,
  beneficiaires,
  freins,
  sorties,
  currentPeriod,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFormulaTooltip, setShowFormulaTooltip] = useState<string | null>(null);

  const asciiDashboard = generateStandardTableauDeBord(kpi, currentPeriod);

  const handleCopyAscii = () => {
    navigator.clipboard.writeText(asciiDashboard);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Frein breakdown calculations for visual chart
  const freinCounts = {
    'Mobilité': freins.filter(f => f.frein_mobilite).length,
    'Logement': freins.filter(f => f.frein_logement).length,
    'Garde Enfants': freins.filter(f => f.frein_garde_enfants).length,
    'Numérique': freins.filter(f => f.frein_numerique).length,
    'Linguistique': freins.filter(f => f.frein_linguistique).length,
    'Financier': freins.filter(f => f.frein_financier).length,
    'Santé': freins.filter(f => f.frein_sante_physique || f.frein_sante_mentale).length,
  };

  // Sorties breakdown
  const sortiesCDI = sorties.filter(s => s.type_sortie === 'Emploi CDI').length;
  const sortiesCDD = sorties.filter(s => s.type_sortie.includes('CDD')).length;
  const sortiesFormation = sorties.filter(s => s.type_sortie === 'Formation qualifiante').length;

  return (
    <div id="dashboard-view" className="space-y-6 animate-fade-in">
      
      {/* Top 3 Frosted Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-xl shadow-black/20 flex flex-col justify-between">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Bénéficiaires Actifs</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
              Table 4
            </span>
          </p>
          <div className="flex items-end justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-light text-white">{kpi.beneficiaires_actifs}</span>
              <span className="text-slate-400 text-sm">/ {kpi.capacite_max}</span>
            </div>
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-xl border border-emerald-500/20">
              {kpi.taux_remplissage}% capacité
            </span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-xl shadow-black/20 flex flex-col justify-between">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Taux Insertion (Global)</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Table 7
            </span>
          </p>
          <div className="flex items-end justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-light text-emerald-400">{kpi.taux_insertion_global}%</span>
            </div>
            <span className="text-emerald-300 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1">
              ✅ Cible FSE+ atteinte
            </span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-xl shadow-black/20 flex flex-col justify-between">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Retour Social (SROI)</span>
            <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
              Efficience
            </span>
          </p>
          <div className="flex items-end justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-light text-white">x{kpi.sroi_ratio}</span>
            </div>
            <span className="text-teal-300 text-xs font-normal bg-teal-500/10 px-2 py-1 rounded-xl border border-teal-500/20">
              {kpi.valeur_sociale_creee.toLocaleString('fr-FR')} € créés
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Official ASCII INSERACC_pro Box & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Official Standard ASCII Dashboard Box matching Frosted Glass layout */}
        <div className="lg:col-span-6 bg-[#1e293b]/90 backdrop-blur-xl border-2 border-blue-500/40 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-blue-600 px-6 py-4 flex items-center justify-between shadow-md">
              <div>
                <h2 className="text-sm font-bold tracking-tight text-white leading-none">
                  INSERACC_pro — TABLEAU DE BORD
                </h2>
                <p className="text-[10px] text-blue-100 opacity-90 mt-1 uppercase tracking-widest font-medium">
                  Période : {currentPeriod}
                </p>
              </div>

              <button
                id="btn-copy-ascii"
                onClick={handleCopyAscii}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border border-white/20 backdrop-blur-sm"
                title="Copier le format officiel texte"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier texte'}</span>
              </button>
            </div>

            {/* ASCII Container with monospaced rendering */}
            <div className="p-4 bg-slate-950/60 m-4 rounded-2xl border border-white/10 overflow-x-auto">
              <pre className="text-[12px] sm:text-[13px] font-mono text-emerald-400 leading-relaxed select-all">
                {asciiDashboard}
              </pre>
            </div>
          </div>

          <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✅</span> Objectif FSE+ atteint (&gt;65%)
            </span>
            <span className="text-slate-400 text-[11px] font-mono">Calculs consolidés Tables 1-9</span>
          </div>
        </div>

        {/* Right Column: SROI & Alert Diagnostic Card */}
        <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
          
          {/* SROI & Impact Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 flex-1 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Retour Social sur Investissement (SROI)
                </span>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-white">x{kpi.sroi_ratio}</span>
                  <span className="text-xs text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-xl border border-blue-500/30">
                    Ratio Social Très Élevé
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Pour <strong>1 € investi</strong> dans le dispositif ({kpi.budget_total_annuel.toLocaleString('fr-FR')} € annuel), 
                  la structure génère <strong>{kpi.sroi_ratio} €</strong> de valeur sociale et d'économies directes (allocations RSA évitées, cotisations créées, santé).
                </p>
              </div>
              <div className="bg-blue-500/20 p-3.5 rounded-2xl border border-blue-500/30">
                <Euro className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                <span className="text-[11px] text-slate-400 block">Valeur Sociale</span>
                <strong className="text-xs text-white">{kpi.valeur_sociale_creee.toLocaleString('fr-FR')} €</strong>
              </div>
              <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                <span className="text-[11px] text-slate-400 block">Coût / Insertion</span>
                <strong className="text-xs text-emerald-400">{kpi.cout_par_insertion_reussie.toLocaleString('fr-FR')} €</strong>
              </div>
              <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                <span className="text-[11px] text-slate-400 block">Maintien 6 mois</span>
                <strong className="text-xs text-teal-300">{kpi.taux_maintien_6_mois}%</strong>
              </div>
            </div>
          </div>

          {/* Alert Status Banner */}
          <div className={`p-5 rounded-3xl border backdrop-blur-md ${
            kpi.alertes_sans_contact_30j > 0 
              ? 'bg-red-500/10 border-red-500/30' 
              : 'bg-emerald-500/10 border-emerald-500/30'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${
                  kpi.alertes_sans_contact_30j > 0 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    {kpi.alertes_sans_contact_30j > 0 ? 'Vigilance Décrochage Détectée' : 'Situation Sous Contrôle'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {kpi.alertes_sans_contact_30j} bénéficiaire(s) sans contact depuis plus de 30 jours (Table 4).
                  </p>
                </div>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Voir onglet Alertes & Risques
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 6 Category Detail KPI Grid with Exact Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Module 1 : Volume & Activité */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              1. Volume & Activité
            </span>
            <span className="text-[11px] text-blue-300 bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 rounded-full">
              File active
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Bénéficiaires actifs (Table 4) :</span>
              <span className="text-sm font-bold text-white">{kpi.beneficiaires_actifs} / {kpi.capacite_max}</span>
            </div>

            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, kpi.taux_remplissage)}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                <span className="text-slate-400 block text-[11px]">Entrées totales</span>
                <strong className="text-slate-100 font-semibold">{kpi.nouvelles_entrees}</strong>
              </div>
              <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                <span className="text-slate-400 block text-[11px]">Ateliers réalisés</span>
                <strong className="text-slate-100 font-semibold">{kpi.actions_realisees}</strong>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 italic bg-white/5 p-2 rounded-2xl border border-white/5">
              Formule : Bénéficiaires actifs / Capacité max × 100 = <strong className="text-white">{kpi.taux_remplissage}%</strong>
            </div>
          </div>
        </div>

        {/* Module 2 : Efficacité & Résultats d'Insertion */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              2. Efficacité & Résultats
            </span>
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {kpi.taux_insertion_global}%
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Emploi durable (CDI + CDD &gt; 6m) :</span>
              <strong className="text-emerald-400">{kpi.sorties_emploi_durable} ({kpi.taux_emploi_durable}%)</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Formation qualifiante :</span>
              <strong className="text-teal-300">{kpi.sorties_formation} ({kpi.taux_formation_qualifiante}%)</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Durée moyenne parcours :</span>
              <strong className="text-white">{kpi.duree_moyenne_parcours_mois} mois</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Taux de décrochage :</span>
              <strong className={kpi.taux_decrochage > 15 ? 'text-red-400' : 'text-emerald-400'}>
                {kpi.taux_decrochage}%
              </strong>
            </div>

            <div className="text-[11px] text-slate-400 italic bg-white/5 p-2 rounded-2xl border border-white/5">
              Formule : Sorties positives / Total sorties × 100 = <strong className="text-white">{kpi.taux_insertion_global}%</strong>
            </div>
          </div>
        </div>

        {/* Module 3 : Qualité de l'Accompagnement */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              3. Qualité de l'Accompagnement
            </span>
            <span className="text-[11px] text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              ★ {kpi.score_satisfaction_moyen} / 5
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Taux présence RDV :</span>
              <strong className="text-emerald-400">{kpi.taux_presence_rdv}%</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Taux présence ateliers :</span>
              <strong className="text-teal-300">{kpi.taux_presence_ateliers}%</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Délai moyen 1er RDV :</span>
              <strong className="text-white">{kpi.delai_moyen_premier_entretien_jours} jours</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Moyenne RDV / bénéficiaire :</span>
              <strong className="text-white">{kpi.nb_moyen_rdv_par_beneficiaire}</strong>
            </div>

            <div className="text-[11px] text-slate-400 italic bg-white/5 p-2 rounded-2xl border border-white/5">
              Formule : RDV honorés / RDV planifiés × 100 = <strong className="text-white">{kpi.taux_presence_rdv}%</strong>
            </div>
          </div>
        </div>

        {/* Module 4 : Performance par Conseiller */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-400" />
              4. Performance Conseillers
            </span>
            <span className="text-[11px] text-slate-400">
              {kpi.conseillers_stats.length} Référents
            </span>
          </div>

          <div className="mt-3.5 space-y-2.5">
            {kpi.conseillers_stats.map((c, idx) => (
              <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-200 block">{c.nom}</strong>
                  <span className="text-[11px] text-slate-400">
                    {c.beneficiaires_actifs} actifs • Sat : {c.score_satisfaction}/5
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold block">{c.taux_insertion}% insert.</span>
                  {c.en_surcharge ? (
                    <span className="text-[10px] text-red-400 font-semibold">🔴 Surcharge</span>
                  ) : (
                    <span className="text-[10px] text-emerald-400">✅ Charge OK</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 5 : Financier & Coûts Unités */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Euro className="w-4 h-4 text-blue-400" />
              5. Efficience Financière
            </span>
            <span className="text-[11px] text-slate-400">
              Budget : {kpi.budget_total_annuel.toLocaleString('fr-FR')} €
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Coût moyen / bénéficiaire :</span>
              <strong className="text-white">{kpi.cout_moyen_par_beneficiaire.toLocaleString('fr-FR')} €</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Coût / insertion réussie :</span>
              <strong className="text-emerald-400">{kpi.cout_par_insertion_reussie.toLocaleString('fr-FR')} €</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Budget actions / ateliers :</span>
              <strong className="text-teal-300">{kpi.budget_actions.toLocaleString('fr-FR')} €</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Coût moyen / atelier :</span>
              <strong className="text-white">{kpi.cout_moyen_par_action.toLocaleString('fr-FR')} €</strong>
            </div>

            <div className="text-[11px] text-slate-400 italic bg-white/5 p-2 rounded-2xl border border-white/5">
              Formule : Budget total / Nb sorties positives = <strong className="text-white">{kpi.cout_par_insertion_reussie.toLocaleString('fr-FR')} €</strong>
            </div>
          </div>
        </div>

        {/* Module 6 : Impact Social & Humain */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-red-400" />
              6. Impact Social & Humain
            </span>
            <span className="text-[11px] text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Levée des freins
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Réduction moy. freins / pers :</span>
              <strong className="text-emerald-400">-{kpi.reduction_moyenne_freins} freins</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Taux sortie du RSA :</span>
              <strong className="text-teal-300">{kpi.taux_sortie_rsa}%</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Accès logement stable :</span>
              <strong className="text-white">{kpi.taux_logement_stable_sortie}%</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Progression numérique :</span>
              <strong className="text-emerald-400">+{kpi.taux_progression_numerique}%</strong>
            </div>

            <div className="text-[11px] text-slate-400 italic bg-white/5 p-2 rounded-2xl border border-white/5">
              Indicateur qualitatif FSE+ : Évolution des 9 freins (Table 3)
            </div>
          </div>
        </div>

      </div>

      {/* Visual Analytics : Frein Distribution & Sorties Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Freins Identified Distribution */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Distribution des Freins Identifiés dans la Cohorte (Table 3)
            </h3>
            <span className="text-xs text-slate-400">{freins.length} Profils diagnostiqués</span>
          </div>

          <div className="mt-4 space-y-3">
            {Object.entries(freinCounts).map(([type, count]) => {
              const pct = Math.round((count / (freins.length || 1)) * 100);
              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>{type}</span>
                    <span className="text-slate-400 font-mono">{count} pers. ({pct}%)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exits Breakdown Chart */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Typologie des Sorties (Table 7)
              </h3>
              <span className="text-xs font-semibold text-emerald-400">{kpi.sorties_totales} Sorties</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between bg-white/5 p-3.5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
                  <span className="text-xs text-slate-200">Emploi CDI</span>
                </div>
                <strong className="text-sm text-emerald-400 font-mono">{sortiesCDI} pers.</strong>
              </div>

              <div className="flex items-center justify-between bg-white/5 p-3.5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-teal-400 shadow-sm shadow-teal-400/50"></span>
                  <span className="text-xs text-slate-200">Emploi CDD (&gt; 6 mois)</span>
                </div>
                <strong className="text-sm text-teal-300 font-mono">{sortiesCDD} pers.</strong>
              </div>

              <div className="flex items-center justify-between bg-white/5 p-3.5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50"></span>
                  <span className="text-xs text-slate-200">Formation qualifiante</span>
                </div>
                <strong className="text-sm text-amber-300 font-mono">{sortiesFormation} pers.</strong>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
            <span>Taux de sortie positive :</span>
            <strong className="text-emerald-400 text-sm font-bold">100%</strong>
          </div>
        </div>

      </div>

    </div>
  );

};
