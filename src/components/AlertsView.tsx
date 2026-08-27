import React from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  Clock,
  UserX,
  ArrowRight,
  UserCheck,
  PhoneCall,
  Calendar,
} from 'lucide-react';
import { Table1Beneficiaire, Table3Freins, Table4Parcours, Table5ActionAtelier, KPISnapshot } from '../types';

interface AlertsViewProps {
  kpi: KPISnapshot;
  beneficiaires: Table1Beneficiaire[];
  freins: Table3Freins[];
  parcours: Table4Parcours[];
  actions: Table5ActionAtelier[];
  onOpenBeneficiary: (id: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  kpi,
  beneficiaires,
  freins,
  parcours,
  actions,
  onOpenBeneficiary,
}) => {
  // Alert 1: Beneficiaries with > 30 days without contact
  const sansContact30j = parcours.filter(p => p.statut === 'actif' && p.jours_sans_contact > 30);
  
  // Alert 2: High complexity (≥ 4 cumulative freins)
  const highComplexity = freins.filter(f => f.nb_freins_cumules >= 4);

  // Alert 3: Workshop dropouts
  const dropouts = actions.filter(a => a.abandon);

  // Alert 4: Advisers near capacity
  const advisersNearCapacity = kpi.conseillers_stats.filter(c => c.beneficiaires_actifs >= 4);

  return (
    <div id="alerts-view" className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-3xl p-6 shadow-xl shadow-black/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300 shrink-0 shadow-lg shadow-red-500/10">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Centre de Vigilance & Prévention du Décrochage</h2>
              <span className="bg-red-500/20 text-red-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-red-500/30">
                {sansContact30j.length} Dossiers Prioritaires
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Détection automatisée des ruptures de parcours (Table 4), des freins cumulés critiques (Table 3) et des abandons d'ateliers (Table 5).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-red-300 bg-red-500/20 px-3 py-1.5 rounded-xl border border-red-500/30 font-medium">
            Mise à jour en temps réel
          </span>
        </div>
      </div>

      {/* Grid of Alert Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Beneficiaries > 30 Days Without Contact */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 space-y-4">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                1. Ruptures de Contact (&gt; 30 Jours Sans Nouvelle)
              </h3>
            </div>
            <span className="text-xs text-red-400 font-bold">{sansContact30j.length} Bénéficiaires</span>
          </div>

          <div className="space-y-3">
            {sansContact30j.map((p) => {
              const b = beneficiaires.find(item => item.id_beneficiaire === p.id_beneficiaire);
              const f = freins.find(item => item.id_beneficiaire === p.id_beneficiaire);

              return (
                <div
                  key={p.id_parcours}
                  className="bg-white/5 border border-red-500/30 hover:border-red-500/60 rounded-2xl p-4.5 transition-all shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">{b?.prenom} {b?.nom}</strong>
                        <span className="font-mono text-xs text-slate-400">({p.id_beneficiaire})</span>
                        <span className="bg-red-500/20 text-red-300 text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-red-500/30 font-bold">
                          🔴 {p.jours_sans_contact} jours
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Conseiller: <strong className="text-slate-200">{p.conseiller_referent}</strong> • Dispositif: <span className="text-teal-300">{p.dispositif}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenBeneficiary(p.id_beneficiaire)}
                      className="bg-white/10 hover:bg-white/20 text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1 transition-colors backdrop-blur-sm"
                    >
                      <span>Fiche 360°</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-slate-300">
                      Freins majeurs : <span className="text-amber-300">{f ? `${f.nb_freins_cumules} freins (${f.niveau_complexite})` : 'N/A'}</span>
                    </div>

                    <span className="text-slate-400 text-[11px]">Relance conseillée sous 48h</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: High Complexity & Dropouts */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Module: High Complexity (≥ 4 Freins) */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 space-y-3.5">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                2. Profils Haute Complexité (≥ 4 Freins)
              </h3>
              <span className="text-xs text-amber-400 font-mono font-bold">{highComplexity.length}</span>
            </div>

            <div className="space-y-2.5">
              {highComplexity.map((f) => {
                const b = beneficiaires.find(item => item.id_beneficiaire === f.id_beneficiaire);
                return (
                  <div key={f.id_beneficiaire} className="bg-white/5 p-3.5 rounded-2xl border border-white/5 flex items-center justify-between text-xs hover:bg-white/10 transition-colors">
                    <div>
                      <strong className="text-white">{b?.prenom} {b?.nom}</strong>
                      <span className="text-slate-400 block text-[11px]">
                        {f.nb_freins_cumules} freins cumulés (Logement, Santé, Mobilité...)
                      </span>
                    </div>
                    <button
                      onClick={() => onOpenBeneficiary(f.id_beneficiaire)}
                      className="text-blue-400 hover:text-blue-300 text-[11px] font-medium"
                    >
                      Diagnostiquer
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Module: Workshop Abandons */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 space-y-3.5">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <UserX className="w-4 h-4 text-red-400" />
                3. Abandons d'Ateliers Récents (Table 5)
              </h3>
              <span className="text-xs text-red-400 font-mono font-bold">{dropouts.length}</span>
            </div>

            <div className="space-y-2.5">
              {dropouts.map((act) => {
                const b = beneficiaires.find(item => item.id_beneficiaire === act.id_beneficiaire);
                return (
                  <div key={act.id_action} className="bg-white/5 p-3.5 rounded-2xl border border-white/5 text-xs hover:bg-white/10 transition-colors">
                    <div className="flex justify-between">
                      <strong className="text-white">{act.intitule}</strong>
                      <span className="text-red-400 font-semibold">{act.motif_abandon}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1">
                      Bénéficiaire : <span className="text-slate-200 font-medium">{b?.prenom} {b?.nom}</span> ({act.id_beneficiaire})
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
