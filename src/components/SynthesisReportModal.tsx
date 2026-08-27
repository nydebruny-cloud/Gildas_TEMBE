import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  FileText,
  User,
  Calendar,
  Award,
  AlertTriangle,
  TrendingUp,
  Star,
  CheckCircle2,
  Building2,
  Share2,
  Clock,
  Sparkles,
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
import { AppLogo } from './AppLogo';
import { exportElementToPDF } from '../utils/exportUtils';

interface SynthesisReportModalProps {
  beneficiaires: Table1Beneficiaire[];
  socioEco: Table2SocioEco[];
  freins: Table3Freins[];
  parcours: Table4Parcours[];
  actions: Table5ActionAtelier[];
  experiences: Table6ExperiencePro[];
  sorties: Table7SortieResultat[];
  satisfactions: Table8Satisfaction[];
  partenaires: Table9Partenaire[];
  initialBeneficiaryId?: string;
  onClose: () => void;
}

export const SynthesisReportModal: React.FC<SynthesisReportModalProps> = ({
  beneficiaires,
  socioEco,
  freins,
  parcours,
  actions,
  experiences,
  sorties,
  satisfactions,
  partenaires,
  initialBeneficiaryId,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialBeneficiaryId || (beneficiaires.length > 0 ? beneficiaires[0].id_beneficiaire : '')
  );

  const [reportDate, setReportDate] = useState<string>(
    new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
  );

  // Retrieve individual records
  const b = beneficiaires.find((item) => item.id_beneficiaire === selectedId);
  const s = socioEco.find((item) => item.id_beneficiaire === selectedId);
  const f = freins.find((item) => item.id_beneficiaire === selectedId);
  const p = parcours.find((item) => item.id_beneficiaire === selectedId);
  const exp = experiences.find((item) => item.id_beneficiaire === selectedId);
  const bActions = actions.filter((item) => item.id_beneficiaire === selectedId);
  const sortie = sorties.find((item) => item.id_beneficiaire === selectedId);
  const evalData = satisfactions.find((item) => item.id_beneficiaire === selectedId);

  // Compute stats
  const rdvTotal = (p?.nb_rdv_realises || 0) + (p?.nb_rdv_manques || 0);
  const assiduiteRate = rdvTotal > 0 ? Math.round(((p?.nb_rdv_realises || 0) / rdvTotal) * 100) : 100;

  // Handler for PDF Download
  const handleDownloadPDF = () => {
    const filename = `Rapport_Synthese_NSERACC_${b?.nom || 'Beneficiaire'}_${b?.prenom || ''}_${new Date().toISOString().slice(0, 10)}`;
    exportElementToPDF('synthesis-printable-document', filename);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white animate-fade-in">
      <div className="bg-[#0F1E33] border border-white/15 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Top Bar (Hidden on Print) */}
        <div className="bg-[#0B1A2C] border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center p-1">
              <AppLogo size={28} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Rapport de Synthèse d'Accompagnement</span>
                <span className="bg-[#D4AF37]/20 text-[#F5D77F] text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  Édition Officielle
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Bilan exhaustif 360° du bénéficiaire conforme aux 9 tables de référence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Beneficiary Selector */}
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="bg-white/10 text-white text-xs font-medium px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:border-[#D4AF37] cursor-pointer max-w-[200px]"
            >
              {beneficiaires.map((item) => (
                <option key={item.id_beneficiaire} value={item.id_beneficiaire} className="bg-slate-900 text-white">
                  {item.nom} {item.prenom} ({item.id_beneficiaire})
                </option>
              ))}
            </select>

            {/* Download / Export PDF Button */}
            <button
              id="btn-download-pdf-synthesis"
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:from-[#FFE89C] hover:to-[#F5D77F] text-[#0B1A2C] text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/25 cursor-pointer"
              title="Télécharger ou Imprimer en PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE REPORT DOCUMENT BODY */}
        <div
          id="synthesis-printable-document"
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 print:text-black print:bg-white print:overflow-visible"
        >
          {/* 1. OFFICIAL DOCUMENT HEADER */}
          <div className="border-b-2 border-[#D4AF37]/40 pb-5 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-[#0B1A2C] border-2 border-[#D4AF37] flex items-center justify-center p-1 shadow-md">
                <AppLogo size={50} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] print:text-amber-700">
                  NSERACC_pro • Structure d'Insertion & Accompagnement
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white print:text-black mt-0.5">
                  RAPPORT DE SYNTHÈSE INDIVIDUEL
                </h1>
                <p className="text-xs text-slate-400 print:text-slate-600">
                  Bilan d'Évolution, Freins, Performance du Parcours & Préconisations
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1 text-slate-300 print:text-slate-700 bg-white/5 print:bg-slate-100 p-3 rounded-xl border border-white/10 print:border-slate-300">
              <div>
                <strong>Date du rapport :</strong>{' '}
                <span className="text-[#F5D77F] print:text-black font-semibold">{reportDate}</span>
              </div>
              <div>
                <strong>ID Dossier :</strong> <span className="font-mono">{b?.id_beneficiaire}</span>
              </div>
              <div>
                <strong>Référent :</strong> {p?.conseiller_referent || 'Conseiller Référent'}
              </div>
              <div>
                <strong>Dispositif :</strong> <span className="text-emerald-400 print:text-emerald-700 font-semibold">{p?.dispositif}</span>
              </div>
            </div>
          </div>

          {/* 2. BENEFICIARY IDENTITY & TYPE OF ACCOMPANIMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Identity Card */}
            <div className="bg-white/5 print:bg-slate-50 border border-white/10 print:border-slate-300 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] print:text-amber-800 uppercase tracking-wide">
                <User className="w-4 h-4" />
                <span>1. Identification du Bénéficiaire (Table 1 & 2)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 print:text-slate-500">Nom & Prénoms :</span>
                  <p className="font-bold text-white print:text-black text-sm">
                    {b?.nom} {b?.prenom}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-500">Âge & Genre :</span>
                  <p className="font-semibold text-slate-200 print:text-black">
                    {b?.age} ans ({b?.genre === 'F' ? 'Femme' : 'Homme'})
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-500">Commune / Résidence :</span>
                  <p className="font-medium text-slate-200 print:text-black">
                    {b?.commune} {b?.zone_geographique === 'QPV' && <span className="text-amber-400 font-bold">(QPV)</span>}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-500">Niveau de Formation :</span>
                  <p className="font-medium text-slate-200 print:text-black">
                    {s?.niveau_formation || 'Sans diplôme'}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 print:text-slate-500">Ressources & Situation :</span>
                  <p className="font-medium text-slate-200 print:text-black">
                    {s?.revenus_source} ({s?.montant_revenus_mensuels || 0} €/mois) • {b?.type_logement}
                  </p>
                </div>
              </div>
            </div>

            {/* Accompaniment Type & Target Career Card */}
            <div className="bg-white/5 print:bg-slate-50 border border-white/10 print:border-slate-300 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] print:text-amber-800 uppercase tracking-wide">
                <Award className="w-4 h-4" />
                <span>2. Type d'Accompagnement & Objectif (Table 4 & 6)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 print:text-slate-500">Dispositif mobilisé :</span>
                  <p className="font-bold text-white print:text-black">{p?.dispositif}</p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-500">Date d'Entrée :</span>
                  <p className="font-medium text-slate-200 print:text-black">{p?.date_entree_parcours}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 print:text-slate-500">Objectif Professionnel ciblé :</span>
                  <p className="font-semibold text-[#F5D77F] print:text-amber-900 bg-amber-500/10 print:bg-amber-100 p-2 rounded-lg border border-amber-500/20 print:border-amber-300 mt-0.5">
                    {p?.objectif_principal || 'Retour à l\'emploi durable'}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 print:text-slate-500">Métiers Ciblés :</span>
                  <p className="text-slate-200 print:text-black font-medium">
                    {exp?.metiers_cibles?.join(', ') || 'Polyvalence / À préciser'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* 3. FREINS IDENTIFIÉS & NIVEAU DE COMPLEXITÉ (TABLE 3) */}
          <div className="bg-white/5 print:bg-slate-50 border border-white/10 print:border-slate-300 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] print:text-amber-800 uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>3. Freins Identifiés & Niveau de Complexité (Table 3)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 print:text-slate-600">Niveau de complexité :</span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    f?.niveau_complexite === 'très complexe'
                      ? 'bg-red-500/20 text-red-300 print:bg-red-100 print:text-red-800 border border-red-500/40'
                      : f?.niveau_complexite === 'complexe'
                      ? 'bg-amber-500/20 text-amber-300 print:bg-amber-100 print:text-amber-800 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 print:bg-emerald-100 print:text-emerald-800 border border-emerald-500/40'
                  }`}
                >
                  {f?.niveau_complexite?.toUpperCase() || 'MODÉRÉ'} ({f?.nb_freins_cumules || 0} freins cumulés)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border ${f?.frein_mobilite ? 'bg-red-500/10 border-red-500/30 text-red-200 print:bg-red-50 print:text-red-900' : 'bg-white/5 border-white/5 text-slate-400 print:bg-slate-100 print:text-slate-500'}`}>
                <span className="font-semibold block">Mobilité</span>
                <span>{f?.frein_mobilite ? `⚠️ ${f?.detail_mobilite || 'Non véhiculé'}` : '✅ Autonome'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${f?.frein_logement ? 'bg-red-500/10 border-red-500/30 text-red-200 print:bg-red-50 print:text-red-900' : 'bg-white/5 border-white/5 text-slate-400 print:bg-slate-100 print:text-slate-500'}`}>
                <span className="font-semibold block">Logement</span>
                <span>{f?.frein_logement ? `⚠️ ${f?.detail_logement || 'Précaire'}` : '✅ Stable'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${f?.frein_sante_physique ? 'bg-red-500/10 border-red-500/30 text-red-200 print:bg-red-50 print:text-red-900' : 'bg-white/5 border-white/5 text-slate-400 print:bg-slate-100 print:text-slate-500'}`}>
                <span className="font-semibold block">Santé</span>
                <span>{f?.frein_sante_physique ? `⚠️ ${f?.detail_sante || 'Restrictions'}` : '✅ Aucune restriction'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${f?.frein_garde_enfants ? 'bg-red-500/10 border-red-500/30 text-red-200 print:bg-red-50 print:text-red-900' : 'bg-white/5 border-white/5 text-slate-400 print:bg-slate-100 print:text-slate-500'}`}>
                <span className="font-semibold block">Garde d'enfants</span>
                <span>{f?.frein_garde_enfants ? `⚠️ ${f?.detail_garde_enfants || 'Besoin mode de garde'}` : '✅ Pas de frein'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${f?.frein_numerique ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 print:bg-amber-50 print:text-amber-900' : 'bg-white/5 border-white/5 text-slate-400 print:bg-slate-100 print:text-slate-500'}`}>
                <span className="font-semibold block">Numérique</span>
                <span>{f?.frein_numerique ? `⚠️ ${f?.detail_numerique || 'Illectronisme'}` : '✅ Autonome'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${f?.frein_linguistique ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 print:bg-amber-50 print:text-amber-900' : 'bg-white/5 border-white/5 text-slate-400 print:bg-slate-100 print:text-slate-500'}`}>
                <span className="font-semibold block">Linguistique</span>
                <span>{f?.frein_linguistique ? `⚠️ ${f?.detail_linguistique || 'FLE nécessaire'}` : '✅ Maîtrise B2/C1'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${f?.frein_financier ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 print:bg-amber-50 print:text-amber-900' : 'bg-white/5 border-white/5 text-slate-400 print:bg-slate-100 print:text-slate-500'}`}>
                <span className="font-semibold block">Financier / Dette</span>
                <span>{f?.frein_financier ? `⚠️ ${f?.detail_financier || 'Endettement'}` : '✅ Équilibré'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${f?.frein_judiciaire ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 print:bg-amber-50 print:text-amber-900' : 'bg-white/5 border-white/5 text-slate-400 print:bg-slate-100 print:text-slate-500'}`}>
                <span className="font-semibold block">Judiciaire / Casier</span>
                <span>{f?.frein_judiciaire ? `⚠️ ${f?.detail_judiciaire || 'B2 restreint'}` : '✅ B3 vierge'}</span>
              </div>
            </div>
          </div>

          {/* 4. PERFORMANCES CONSEILLÉES, ASSIDUITÉ & QUALITÉ D'ACCOMPAGNEMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Performances Conseillées & Suivi Parcours */}
            <div className="bg-white/5 print:bg-slate-50 border border-white/10 print:border-slate-300 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] print:text-amber-800 uppercase tracking-wide">
                <TrendingUp className="w-4 h-4" />
                <span>4. Performances Conseillées & Assiduité (Table 4 & 5)</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/5 print:bg-white p-2.5 rounded-xl border border-white/5 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-500 block text-[11px]">RDV Réalisés</span>
                  <strong className="text-base text-white print:text-black font-bold">{p?.nb_rdv_realises || 0}</strong>
                </div>
                <div className="bg-white/5 print:bg-white p-2.5 rounded-xl border border-white/5 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-500 block text-[11px]">RDV Manqués</span>
                  <strong className={`text-base font-bold ${(p?.nb_rdv_manques || 0) > 1 ? 'text-red-400 print:text-red-700' : 'text-slate-200 print:text-black'}`}>
                    {p?.nb_rdv_manques || 0}
                  </strong>
                </div>
                <div className="bg-white/5 print:bg-white p-2.5 rounded-xl border border-white/5 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-500 block text-[11px]">Assiduité</span>
                  <strong className="text-base text-emerald-400 print:text-emerald-700 font-bold">{assiduiteRate}%</strong>
                </div>
              </div>

              <div className="text-xs space-y-1.5 pt-1">
                <div className="flex justify-between text-slate-300 print:text-slate-700">
                  <span>Jours écoulés sans contact :</span>
                  <span className={`font-bold ${(p?.jours_sans_contact || 0) > 30 ? 'text-red-400 print:text-red-700' : 'text-emerald-400 print:text-emerald-700'}`}>
                    {p?.jours_sans_contact || 0} jours {(p?.jours_sans_contact || 0) > 30 && '(🔴 Alerte Décrochage)'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300 print:text-slate-700">
                  <span>Ateliers & Actions suivies :</span>
                  <span className="font-semibold text-white print:text-black">{bActions.length} actions ({bActions.reduce((acc, a) => acc + (a.duree_heures || 0), 0)} heures)</span>
                </div>
              </div>
            </div>

            {/* Qualité de l'accompagnement & Typologie de Sortie */}
            <div className="bg-white/5 print:bg-slate-50 border border-white/10 print:border-slate-300 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] print:text-amber-800 uppercase tracking-wide">
                <Star className="w-4 h-4 text-amber-400" />
                <span>5. Qualité d'Accompagnement & Sortie (Table 7 & 8)</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/5 print:bg-white p-2.5 rounded-xl border border-white/5 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-500 block text-[11px]">Score Global</span>
                  <strong className="text-base text-amber-400 print:text-amber-700 font-bold">{evalData?.note_globale_sur_5 || 4.8} / 5</strong>
                </div>
                <div className="bg-white/5 print:bg-white p-2.5 rounded-xl border border-white/5 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-500 block text-[11px]">Conseiller</span>
                  <strong className="text-base text-blue-400 print:text-blue-700 font-bold">{evalData?.note_conseiller_sur_5 || 4.9} / 5</strong>
                </div>
                <div className="bg-white/5 print:bg-white p-2.5 rounded-xl border border-white/5 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-500 block text-[11px]">Progression</span>
                  <strong className="text-base text-emerald-400 print:text-emerald-700 font-bold">{evalData?.sentiment_progression || 'Forte'}</strong>
                </div>
              </div>

              <div className="bg-emerald-500/10 print:bg-emerald-50 border border-emerald-500/20 print:border-emerald-300 rounded-xl p-2.5 text-xs space-y-1">
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">Typologie de Sortie :</span>
                {sortie ? (
                  <div className="font-bold text-emerald-400 print:text-emerald-800 flex items-center justify-between">
                    <span>✅ {sortie.type_sortie} ({sortie.intitule_poste_ou_formation || 'Poste validé'})</span>
                    <span className="text-[11px] font-normal">{sortie.date_sortie}</span>
                  </div>
                ) : (
                  <span className="text-blue-300 print:text-blue-800 font-semibold">
                    ⏳ Parcours en cours de dynamisation ({p?.statut || 'Actif'})
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* 5. ACTIONS RECOMMANDÉES & TRAJECTOIRE CONSEILLÉE */}
          <div className="bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/10 to-amber-500/10 print:bg-amber-50 border border-[#D4AF37]/30 print:border-amber-400 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] print:text-amber-900 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>6. Plan d'Actions Recommandées & Préconisations Immédiates</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 print:bg-white p-3 rounded-xl border border-white/10 print:border-slate-200 space-y-1">
                <span className="font-bold text-white print:text-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  1. Levée des Freins Périphériques
                </span>
                <p className="text-slate-300 print:text-slate-700 text-[11px] leading-relaxed">
                  {f?.frein_mobilite ? 'Mobiliser le micro-crédit mobilité / aide au permis B.' : 'Validation de l\'autonomie sur les déplacements.'}{' '}
                  {f?.frein_garde_enfants && 'Prioriser la crèche à vocation d\'insertion (AVIP).'}
                </p>
              </div>

              <div className="bg-white/5 print:bg-white p-3 rounded-xl border border-white/10 print:border-slate-200 space-y-1">
                <span className="font-bold text-white print:text-black flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  2. Immersion PMSMP & Partenaires
                </span>
                <p className="text-slate-300 print:text-slate-700 text-[11px] leading-relaxed">
                  Positionnement sur stage de 70h chez un partenaire employeur (Table 9) pour valider les compétences en situation réelle.
                </p>
              </div>

              <div className="bg-white/5 print:bg-white p-3 rounded-xl border border-white/10 print:border-slate-200 space-y-1">
                <span className="font-bold text-white print:text-black flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  3. Fréquence des Entretiens
                </span>
                <p className="text-slate-300 print:text-slate-700 text-[11px] leading-relaxed">
                  {f?.niveau_complexite === 'très complexe'
                    ? 'Entretien hebdomadaire requis (J+7) avec relance SMS proactive.'
                    : 'Bilan d\'étape bimensuel avec point d\'évaluation des candidatures.'}
                </p>
              </div>
            </div>
          </div>

          {/* 6. SIGNATURES & OFFICIAL DEVELOPER NOTICE */}
          <div className="border-t border-white/10 print:border-slate-300 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 print:text-slate-600">
            <div className="space-y-0.5 text-center sm:text-left">
              <p className="font-medium text-slate-300 print:text-black">
                NSERACC_pro • Système de Management & Pilotage de l'Insertion
              </p>
              <p className="text-[11px] text-[#D4AF37] print:text-amber-800 font-semibold">
                Développeur : Boniface-Gildas TEMBÉ
              </p>
            </div>

            <div className="flex items-center gap-6 text-center text-[11px]">
              <div className="border-t border-slate-600 print:border-black pt-1 w-32">
                <span>Visa du Conseiller</span>
              </div>
              <div className="border-t border-slate-600 print:border-black pt-1 w-32">
                <span>Signature Bénéficiaire</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
