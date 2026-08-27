import React, { useState } from 'react';
import {
  X,
  User,
  AlertTriangle,
  Activity,
  Briefcase,
  Award,
  Star,
  CheckCircle,
  Plus,
  Clock,
  Calendar,
  MapPin,
  FileText,
} from 'lucide-react';
import { FullBeneficiaryRecord, Table5ActionAtelier } from '../types';

interface BeneficiaryDetailModalProps {
  record: FullBeneficiaryRecord | null;
  onClose: () => void;
  onAddAction: (action: Table5ActionAtelier) => void;
  onOpenSynthesisReport?: (beneficiaryId: string) => void;
}

export const BeneficiaryDetailModal: React.FC<BeneficiaryDetailModalProps> = ({
  record,
  onClose,
  onAddAction,
  onOpenSynthesisReport,
}) => {
  if (!record) return null;

  const { b, s, f, p, actions, exp, sortie, eval: evalData } = record;
  const [activeTab, setActiveTab] = useState<'360' | 'actions'>('360');

  // New action form state
  const [showAddActionForm, setShowAddActionForm] = useState(false);
  const [newActionIntitule, setNewActionIntitule] = useState('');
  const [newActionType, setNewActionType] = useState<any>('Atelier CV / LM');
  const [newActionPrestataire, setNewActionPrestataire] = useState('');
  const [newActionDuree, setNewActionDuree] = useState(14);
  const [newActionCout, setNewActionCout] = useState(300);

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionIntitule) return;

    const newAction: Table5ActionAtelier = {
      id_action: `ACT-${Date.now().toString().slice(-4)}`,
      id_beneficiaire: b.id_beneficiaire,
      type_action: newActionType,
      intitule: newActionIntitule,
      prestataire: newActionPrestataire || 'Partenaire Réseau',
      date_debut: new Date().toISOString().split('T')[0],
      date_fin: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      duree_heures: Number(newActionDuree) || 14,
      presence_effective: true,
      abandon: false,
      resultat: 'en_cours',
      cout_action: Number(newActionCout) || 0,
    };

    onAddAction(newAction);
    setShowAddActionForm(false);
    setNewActionIntitule('');
  };

  return (
    <div id="beneficiary-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl shadow-black/60 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 border border-white/20">
              {b.prenom[0]}{b.nom[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                  {b.id_beneficiaire}
                </span>
                <h2 className="text-lg font-bold text-white">
                  {b.prenom} {b.nom}
                </h2>
                <span className="text-xs text-slate-400">({b.age} ans • {b.commune})</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>Dispositif: <strong className="text-slate-200">{p.dispositif}</strong></span>
                <span>•</span>
                <span>Conseiller: <strong className="text-slate-200">{p.conseiller_referent}</strong></span>
                <span>•</span>
                <span>Statut: <strong className="text-emerald-400 uppercase">{p.statut}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenSynthesisReport && (
              <button
                id="btn-modal-synthesis-pdf"
                onClick={() => onOpenSynthesisReport(b.id_beneficiaire)}
                className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#F5D77F] border border-[#D4AF37]/40 text-xs font-semibold px-3 py-2 rounded-2xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Générer et exporter le rapport de synthèse en PDF"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rapport de Synthèse</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation inside modal */}
        <div className="flex border-b border-white/10 bg-white/5 px-6 gap-4 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('360')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === '360' ? 'border-blue-400 text-blue-300 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Fiche 360° (Tables 1, 2, 3, 4, 6)</span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'actions' ? 'border-blue-400 text-blue-300 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Actions & Ateliers (Table 5) ({actions.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: 360 COMPOSITE VIEW */}
          {activeTab === '360' && (
            <div className="space-y-5">
              
              {/* Freins Banner (Table 3) */}
              <div className={`p-5 rounded-3xl border backdrop-blur-md shadow-lg ${
                f.niveau_complexite === 'eleve'
                  ? 'bg-red-500/10 border-red-500/30 text-red-200'
                  : f.niveau_complexite === 'moyen'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider">
                        Table 3 : Diagnostic des Freins — Complexité {f.niveau_complexite.toUpperCase()} ({f.nb_freins_cumules} freins)
                      </h3>
                      <p className="text-xs mt-0.5 opacity-90">
                        {f.freins_leves_recemment ? `${f.freins_leves_recemment} frein(s) levé(s) au cours du parcours.` : 'Aucun frein levé pour le moment.'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-black/30 rounded-full border border-white/10">
                    Score Complexité : {f.nb_freins_cumules}/7
                  </span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {f.frein_mobilite && <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">🚗 <strong>Mobilité :</strong> {f.detail_mobilite || 'Frein actif'}</div>}
                  {f.frein_logement && <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">🏠 <strong>Logement :</strong> {f.detail_logement || 'Frein actif'}</div>}
                  {f.frein_garde_enfants && <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">👶 <strong>Garde Enfants :</strong> {f.detail_garde_enfants || 'Frein actif'}</div>}
                  {f.frein_linguistique && <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">🗣️ <strong>Linguistique FLE :</strong> {f.detail_linguistique || 'Frein actif'}</div>}
                  {f.frein_numerique && <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">💻 <strong>Numérique :</strong> {f.detail_numerique || 'Frein actif'}</div>}
                  {f.frein_financier && <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">💶 <strong>Financier :</strong> {f.detail_financier || 'Frein actif'}</div>}
                  {f.frein_judiciaire && <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">⚖️ <strong>Judiciaire :</strong> {f.detail_judiciaire || 'Frein actif'}</div>}
                </div>
              </div>

              {/* Grid 2 Columns: Socio-Eco & Expérience Pro */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Table 2: Socio-Économique */}
                <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-2.5 text-xs backdrop-blur-md">
                  <h4 className="font-bold text-slate-200 pb-2 border-b border-white/10 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    Table 2 : Situation Socio-Économique
                  </h4>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Niveau formation :</span>
                    <strong className="text-white">{s.niveau_formation}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dernier diplôme :</span>
                    <span className="text-slate-200">{s.dernier_diplome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Situation avant entrée :</span>
                    <span className="text-slate-200">{s.situation_avant_entree}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Éloignement de l'emploi :</span>
                    <strong className="text-amber-300">{s.duree_eloignement_mois} mois</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Revenus actuels :</span>
                    <span className="text-emerald-400 font-semibold">{s.revenus_actuels}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Niveau Français :</span>
                    <span className="text-white">{s.niveau_francais}</span>
                  </div>
                </div>

                {/* Table 6: Expérience Professionnelle */}
                <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-2.5 text-xs backdrop-blur-md">
                  <h4 className="font-bold text-slate-200 pb-2 border-b border-white/10 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    Table 6 : Expérience Pro & Métiers Ciblés
                  </h4>
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[11px]">Métiers Ciblés / Projet Pro :</span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.metiers_cibles.map((m, i) => (
                        <span key={i} className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-medium">
                          🎯 {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[11px]">Compétences clés :</span>
                    <p className="text-slate-200">{exp.competences_cles.join(', ')}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[11px]">Compétences transférables :</span>
                    <p className="text-teal-300">{exp.competences_transferables.join(', ')}</p>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Mobilité max :</span>
                    <strong className="text-white">{exp.mobilite_rayon_km} km</strong>
                  </div>
                </div>

              </div>

              {/* Table 4: Parcours d'Accompagnement Details */}
              <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3.5 text-xs backdrop-blur-md">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                  <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-400" />
                    Table 4 : Suivi du Parcours
                  </h4>
                  <span className="font-mono text-blue-300">{p.id_parcours}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="text-slate-400 block text-[11px]">Date Entrée</span>
                    <strong className="text-white">{p.date_entree}</strong>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="text-slate-400 block text-[11px]">RDV Réalisés</span>
                    <strong className="text-emerald-400">{p.rdv_realises}</strong>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="text-slate-400 block text-[11px]">RDV Manqués</span>
                    <strong className="text-red-400">{p.rdv_manques}</strong>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="text-slate-400 block text-[11px]">Dernier Contact</span>
                    <strong className={p.jours_sans_contact > 30 ? 'text-red-400' : 'text-slate-200'}>
                      Il y a {p.jours_sans_contact}j
                    </strong>
                  </div>
                </div>

                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 text-slate-300">
                  <strong className="text-white block mb-0.5">Objectif défini :</strong>
                  {p.objectif_parcours}
                </div>

                {p.notes_evolution && (
                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 text-slate-300">
                    <strong className="text-teal-300 block mb-0.5">Notes du conseiller référent :</strong>
                    {p.notes_evolution}
                  </div>
                )}
              </div>

              {/* Sortie / Résultat if exists (Table 7 & 8) */}
              {sortie && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-3xl text-xs space-y-2 backdrop-blur-md">
                  <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    Table 7 : Sortie Réussie — {sortie.type_sortie}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div><span className="text-slate-400">Poste :</span> <strong className="text-white">{sortie.intitule_poste}</strong></div>
                    <div><span className="text-slate-400">Entreprise :</span> <strong className="text-white">{sortie.nom_entreprise}</strong></div>
                    <div><span className="text-slate-400">Durée Parcours :</span> <strong className="text-emerald-400">{sortie.duree_totale_parcours_mois} mois</strong></div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ACTIONS & ATELIERS (TABLE 5) */}
          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Historique des Ateliers & Actions Réalisées (Table 5)
                </h4>
                <button
                  onClick={() => setShowAddActionForm(!showAddActionForm)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-2xl flex items-center gap-1.5 transition-all shadow-lg shadow-blue-600/30 border border-blue-400/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Inscrire à une action</span>
                </button>
              </div>

              {/* Add Action Form */}
              {showAddActionForm && (
                <form onSubmit={handleCreateAction} className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3.5 text-xs backdrop-blur-md">
                  <h5 className="font-bold text-blue-400">Nouvelle Inscription Atelier / Formation</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-slate-400 block mb-1">Type d'action</label>
                      <select
                        value={newActionType}
                        onChange={(e) => setNewActionType(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md"
                      >
                        <option value="Atelier CV / LM" className="bg-slate-900 text-white">Atelier CV / LM</option>
                        <option value="Simulation Entretien" className="bg-slate-900 text-white">Simulation Entretien</option>
                        <option value="Remise à niveau Français" className="bg-slate-900 text-white">Remise à niveau Français FLE</option>
                        <option value="Atelier Numérique" className="bg-slate-900 text-white">Atelier Numérique</option>
                        <option value="Stage Immersion (PMSMP)" className="bg-slate-900 text-white">Stage Immersion (PMSMP)</option>
                        <option value="Formation qualifiante" className="bg-slate-900 text-white">Formation qualifiante</option>
                        <option value="Coaching Mobilité" className="bg-slate-900 text-white">Coaching Mobilité</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Intitulé précis</label>
                      <input
                        type="text"
                        value={newActionIntitule}
                        onChange={(e) => setNewActionIntitule(e.target.value)}
                        placeholder="Ex: Stage découverte BTP 70h"
                        className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Prestataire / Partenaire</label>
                      <input
                        type="text"
                        value={newActionPrestataire}
                        onChange={(e) => setNewActionPrestataire(e.target.value)}
                        placeholder="Ex: AFPA / Entreprise Partenaire"
                        className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-slate-400 block mb-1">Durée (heures)</label>
                        <input
                          type="number"
                          value={newActionDuree}
                          onChange={(e) => setNewActionDuree(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Coût (€)</label>
                        <input
                          type="number"
                          value={newActionCout}
                          onChange={(e) => setNewActionCout(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddActionForm(false)}
                      className="px-4 py-2 bg-white/5 text-slate-300 rounded-2xl hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-500 shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all"
                    >
                      Enregistrer l'action
                    </button>
                  </div>
                </form>
              )}

              {/* Actions List */}
              <div className="space-y-2.5">
                {actions.length === 0 ? (
                  <p className="text-xs text-slate-400 italic p-5 text-center bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                    Aucune action ou atelier enregistré pour ce bénéficiaire.
                  </p>
                ) : (
                  actions.map((act) => (
                    <div key={act.id_action} className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">{act.id_action}</span>
                          <strong className="text-white text-sm">{act.intitule}</strong>
                          <span className="bg-white/10 text-teal-300 text-[10px] px-2.5 py-0.5 rounded-full font-medium border border-white/10">
                            {act.type_action}
                          </span>
                        </div>
                        <p className="text-slate-400 mt-1">
                          Prestataire : <span className="text-slate-200">{act.prestataire}</span> • Du {act.date_debut} au {act.date_fin} ({act.duree_heures}h)
                        </p>
                      </div>

                      <div className="text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase ${
                          act.resultat === 'reussite' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-slate-300 border border-white/10'
                        }`}>
                          {act.resultat}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-1 font-mono">
                          {act.cout_action > 0 ? `${act.cout_action} €` : 'Prise en charge'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between text-xs text-slate-400">
          <span>Identifiant unique : <strong className="text-blue-300 font-mono">{b.id_beneficiaire}</strong></span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-slate-200 rounded-2xl font-medium transition-colors border border-white/15 backdrop-blur-sm"
          >
            Fermer la fiche
          </button>
        </div>

      </div>
    </div>
  );
};
