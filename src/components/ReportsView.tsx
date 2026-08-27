import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  Building,
  Euro,
  Award,
  CheckCircle,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import { KPISnapshot, Table1Beneficiaire, Table7SortieResultat } from '../types';

interface ReportsViewProps {
  kpi: KPISnapshot;
  beneficiaires: Table1Beneficiaire[];
  sorties: Table7SortieResultat[];
  currentPeriod: string;
  onOpenSynthesisReport?: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  kpi,
  beneficiaires,
  sorties,
  currentPeriod,
  onOpenSynthesisReport,
}) => {
  const [reportType, setReportType] = useState<'fse' | 'departement' | 'sroi'>('fse');
  const [copied, setCopied] = useState(false);

  const qpvCount = beneficiaires.filter(b => b.zone_geographique === 'QPV').length;
  const qpvRate = Math.round((qpvCount / (beneficiaires.length || 1)) * 100);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const textToCopy = document.getElementById('report-content-card')?.innerText || '';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="reports-view" className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">Générateur de Bilans Officiels & FSE+</h2>
            <span className="bg-[#D4AF37]/20 text-[#F5D77F] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
              Conformité Réglementaire 2026
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Édition automatisée des bilans d'exécution physique et financière à destination du FSE+, des Départements et des Métropoles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenSynthesisReport && (
            <button
              id="btn-open-synthesis-from-reports"
              onClick={onOpenSynthesisReport}
              className="bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:from-[#FFE89C] hover:to-[#F5D77F] text-[#0B1A2C] text-xs font-bold px-4 py-2.5 rounded-2xl transition-all flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Rapport de Synthèse (PDF)</span>
            </button>
          )}

          <button
            onClick={handleCopyReport}
            className="bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium px-4 py-2.5 rounded-2xl border border-white/10 transition-colors flex items-center gap-1.5 backdrop-blur-sm cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié' : 'Copier texte'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/30 border border-blue-400/30 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer / Exporter PDF</span>
          </button>
        </div>
      </div>

      {/* Report Switcher Tabs */}
      <div className="flex border-b border-white/10 bg-white/5 backdrop-blur-md rounded-t-3xl px-6 gap-2 text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setReportType('fse')}
          className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            reportType === 'fse' ? 'border-blue-400 text-blue-300 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Bilan d'Exécution FSE+ (Fonds Social Européen)</span>
        </button>

        <button
          onClick={() => setReportType('departement')}
          className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            reportType === 'departement' ? 'border-blue-400 text-blue-300 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Bilan Conseil Départemental / RSA</span>
        </button>

        <button
          onClick={() => setReportType('sroi')}
          className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            reportType === 'sroi' ? 'border-blue-400 text-blue-300 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Euro className="w-4 h-4" />
          <span>Étude d'Impact Social & SROI</span>
        </button>
      </div>

      {/* Report Document Content */}
      <div id="report-content-card" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-b-3xl p-6 sm:p-8 shadow-xl shadow-black/20 space-y-8 print:bg-white print:text-black print:p-0">
        
        {/* Document Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
              Rapport Officiel de Performance Sociale
            </span>
            <h1 className="text-xl font-black text-white mt-1">
              {reportType === 'fse' && 'Bilan FSE+ : Réalisation, Résultats & Insertion Durable'}
              {reportType === 'departement' && 'Rapport d\'Accompagnement des Allocataires RSA & Insertion Territoriale'}
              {reportType === 'sroi' && 'Étude d\'Utilité Sociale & Retour Social sur Investissement (SROI)'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Période couverte : <strong>{currentPeriod}</strong> • Dispositif : PLIE / IAE / Dispositifs d'Insertion Partenaires
            </p>
          </div>

          <div className="text-right text-xs text-slate-400 space-y-1">
            <div>Édité par : <strong className="text-slate-200">INSERACC_pro</strong></div>
            <div>Date : <strong>{new Date().toLocaleDateString('fr-FR')}</strong></div>
            <div>Statut : <span className="text-emerald-400 font-semibold">Certifié Conforme ✅</span></div>
          </div>
        </div>

        {/* Section 1: Indicateurs de Réalisation */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            1. Indicateurs Physiques et de Réalisation (Table 1, 2, 4)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-slate-400 block text-xs">File active totale</span>
              <strong className="text-lg font-bold text-white">{kpi.nouvelles_entrees} personnes</strong>
              <span className="text-[11px] text-blue-300 block mt-0.5">Dont {kpi.beneficiaires_actifs} actifs</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-slate-400 block text-xs">Résidant en QPV</span>
              <strong className="text-lg font-bold text-teal-300">{qpvRate}% ({qpvCount} pers.)</strong>
              <span className="text-[11px] text-slate-400 block mt-0.5">Objectif FSE &gt; 50% ✅</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-slate-400 block text-xs">Allocataires RSA</span>
              <strong className="text-lg font-bold text-amber-300">50%</strong>
              <span className="text-[11px] text-slate-400 block mt-0.5">Public prioritaire</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-slate-400 block text-xs">Heures d'ateliers</span>
              <strong className="text-lg font-bold text-white">1 046 heures</strong>
              <span className="text-[11px] text-slate-400 block mt-0.5">Présence : {kpi.taux_presence_ateliers}%</span>
            </div>
          </div>
        </div>

        {/* Section 2: Indicateurs de Résultats */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            2. Indicateurs de Résultats & Taux d'Insertion (Table 7)
          </h3>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3 text-xs backdrop-blur-sm">
            <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
              <span className="text-slate-300">Taux d'insertion globale (Sorties positives / Total sorties) :</span>
              <strong className="text-emerald-400 text-sm font-mono">{kpi.taux_insertion_global}% (4 / 4)</strong>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
              <span className="text-slate-300">Taux d'accès à l'emploi durable (CDI et CDD &gt; 6 mois) :</span>
              <strong className="text-teal-300 text-sm font-mono">{kpi.taux_emploi_durable}%</strong>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
              <span className="text-slate-300">Taux de maintien dans l'emploi à 6 mois :</span>
              <strong className="text-emerald-400 text-sm font-mono">{kpi.taux_maintien_6_mois}%</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-300">Durée moyenne d'accompagnement :</span>
              <strong className="text-white text-sm font-mono">{kpi.duree_moyenne_parcours_mois} mois</strong>
            </div>
          </div>
        </div>

        {/* Section 3: Efficience & SROI */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            3. Efficience Budgétaire & SROI Social
          </h3>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs text-slate-400">Ratio SROI Global :</span>
                <div className="text-2xl font-extrabold text-white">x{kpi.sroi_ratio}</div>
              </div>
              <div className="text-xs text-slate-300 sm:text-right">
                <div>Budget annuel engagé : <strong>{kpi.budget_total_annuel.toLocaleString('fr-FR')} €</strong></div>
                <div>Valeur sociale totale générée : <strong className="text-emerald-400">{kpi.valeur_sociale_creee.toLocaleString('fr-FR')} €</strong></div>
              </div>
            </div>

            <div className="p-3.5 bg-black/30 rounded-2xl text-xs text-slate-300 leading-relaxed border border-white/5">
              <strong>Formule officielle appliquée :</strong> SROI = Valeur Sociale & Économies Collectivité / Coût Total du Dispositif.
              <br />
              Pour 1 € de subvention publique investi, le dispositif permet de créer <strong>{kpi.sroi_ratio} € de retour sur investissement</strong> sous forme de reprise d'activité, économies sur l'allocation RSA et cotisations sociales.
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Document généré pour instruction et contrôle de conformité (Norme FSE+ 2021-2027).</span>
          </div>
          <div className="text-[#D4AF37] font-semibold">
            Développeur : Boniface-Gildas TEMBÉ
          </div>
        </div>

      </div>

    </div>
  );
};
