import React, { useState } from 'react';
import {
  X,
  UserPlus,
  Briefcase,
  AlertTriangle,
  Activity,
  CheckCircle,
} from 'lucide-react';
import {
  Table1Beneficiaire,
  Table2SocioEco,
  Table3Freins,
  Table4Parcours,
  Table6ExperiencePro,
} from '../types';

interface NewBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    b: Table1Beneficiaire,
    s: Table2SocioEco,
    f: Table3Freins,
    p: Table4Parcours,
    exp: Table6ExperiencePro
  ) => void;
  nextId: string;
}

export const NewBeneficiaryModal: React.FC<NewBeneficiaryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  nextId,
}) => {
  if (!isOpen) return null;

  // Step state (1: Identité, 2: Socio-Eco & Freins, 3: Parcours & Projet)
  const [step, setStep] = useState(1);

  // Table 1
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('1994-05-12');
  const [age, setAge] = useState(32);
  const [genre, setGenre] = useState<'Femme' | 'Homme' | 'Autre'>('Femme');
  const [situationLogement, setSituationLogement] = useState('Locataire HLM');
  const [zoneGeo, setZoneGeo] = useState<'QPV' | 'ZRR' | 'Urbain standard'>('QPV');
  const [commune, setCommune] = useState('Saint-Denis');
  const [telephone, setTelephone] = useState('06 12 34 56 78');

  // Table 2
  const [niveauFormation, setNiveauFormation] = useState('Niveau 3 (CAP/BEP)');
  const [dernierDiplome, setDernierDiplome] = useState('CAP Vente');
  const [revenus, setRevenus] = useState('RSA socle (607 €)');
  const [eloignementMois, setEloignementMois] = useState(18);
  const [permisB, setPermisB] = useState(false);
  const [niveauFrancais, setNiveauFrancais] = useState('B1 (Intermédiaire)');
  const [maitriseNum, setMaitriseNum] = useState<'Autonome' | 'Basique' | 'Débutant complet'>('Basique');

  // Table 3 (Freins)
  const [freinMobilite, setFreinMobilite] = useState(true);
  const [freinLogement, setFreinLogement] = useState(false);
  const [freinGarde, setFreinGarde] = useState(false);
  const [freinLinguistique, setFreinLinguistique] = useState(false);
  const [freinNumerique, setFreinNumerique] = useState(true);
  const [freinFinancier, setFreinFinancier] = useState(true);

  // Table 4
  const [dispositif, setDispositif] = useState<'PLIE' | 'IAE (ACI/AI/EI)' | 'Mission Locale' | 'CER (Contrat Engagement Réciproque)'>('PLIE');
  const [conseiller, setConseiller] = useState('Marc Leroy');
  const [objectif, setObjectif] = useState('Retour à l\'emploi durable dans la vente ou logistique');

  // Table 6
  const [metiersCibles, setMetiersCibles] = useState('Employée commerciale, Préparatrice de commandes');
  const [competences, setCompetences] = useState('Accueil client, Caisse, Gestion des stocks');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const freinsList = [
      freinMobilite,
      freinLogement,
      freinGarde,
      freinLinguistique,
      freinNumerique,
      freinFinancier,
    ];
    const nbFreins = freinsList.filter(Boolean).length;
    const complexite = nbFreins >= 4 ? 'eleve' : nbFreins >= 2 ? 'moyen' : 'faible';

    const newB: Table1Beneficiaire = {
      id_beneficiaire: nextId,
      nom: nom || 'Dupont',
      prenom: prenom || 'Camille',
      date_naissance: dateNaissance,
      age: Number(age) || 30,
      genre: genre === 'Femme' ? 'F' : genre === 'Homme' ? 'H' : 'Autre',
      nationalite: 'Française',
      situation_matrimoniale: 'Célibataire',
      enfants_charge: 1,
      situation_logement: situationLogement === 'Sans abri' ? 'Sans abri' : situationLogement.includes('Précaire') ? 'Précaire (hébergé tiers)' : 'Stable (locataire/proprio)',
      commune,
      zone_geographique: zoneGeo === 'QPV' ? 'Quartier Prioritaire (QPV)' : zoneGeo === 'ZRR' ? 'Zone Rurale' : 'Zone Urbaine',
      telephone,
      email: `${prenom.toLowerCase() || 'camille'}.${nom.toLowerCase() || 'dupont'}@email.fr`,
      date_inscription: new Date().toISOString().split('T')[0],
    };

    const newS: Table2SocioEco = {
      id_beneficiaire: nextId,
      niveau_formation: (niveauFormation as any) || 'CAP / BEP (Niv. 3)',
      dernier_diplome: dernierDiplome,
      domaine_formation_initiale: 'Commerce / Services',
      situation_avant_entree: 'Demandeur d\'emploi longue durée (>12 mois)',
      duree_eloignement_mois: Number(eloignementMois) || 12,
      revenus_actuels: revenus,
      niveau_francais: 'Intermédiaire (B1-B2)',
      maitrise_numerique: maitriseNum === 'Autonome' ? 'Autonome / Maîtrisé (C1-C2)' : maitriseNum === 'Basique' ? 'Intermédiaire (B1-B2)' : 'Élémentaire (A1-A2)',
      permis_b: permisB,
      vehicule_personnel: false,
    };

    const newF: Table3Freins = {
      id_beneficiaire: nextId,
      frein_mobilite: freinMobilite,
      detail_mobilite: freinMobilite ? 'Pas de permis ni véhicule' : undefined,
      frein_logement: freinLogement,
      frein_sante_physique: false,
      frein_sante_mentale: false,
      frein_garde_enfants: freinGarde,
      frein_financier: freinFinancier,
      frein_judiciaire: false,
      frein_numerique: freinNumerique,
      frein_linguistique: freinLinguistique,
      nb_freins_cumules: nbFreins,
      niveau_complexite: complexite,
      freins_leves_recemment: 0,
    };

    const newP: Table4Parcours = {
      id_parcours: `PAR-${nextId.replace('BEN-', '')}`,
      id_beneficiaire: nextId,
      date_entree: new Date().toISOString().split('T')[0],
      dispositif,
      source_orientation: 'France Travail',
      conseiller_referent: conseiller,
      statut: 'actif',
      objectif_parcours: objectif,
      date_premier_rdv: new Date().toISOString().split('T')[0],
      frequence_rdv: 'Bimensuel',
      rdv_realises: 1,
      rdv_manques: 0,
      date_dernier_contact: new Date().toISOString().split('T')[0],
      jours_sans_contact: 0,
    };

    const newExp: Table6ExperiencePro = {
      id_beneficiaire: nextId,
      nb_experiences: 2,
      secteurs_activite: ['Commerce & Distribution'],
      type_contrats_anterieurs: ['CDD', 'Intérim'],
      duree_derniere_experience_mois: 8,
      competences_cles: competences.split(',').map(c => c.trim()),
      competences_transferables: ['Rigueur', 'Sens du contact'],
      metiers_cibles: metiersCibles.split(',').map(m => m.trim()),
      mobilite_rayon_km: 15,
    };

    onSave(newB, newS, newF, newP, newExp);
    onClose();
  };

  return (
    <div id="new-beneficiary-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl shadow-black/60 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 border border-white/20">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Nouveau Bénéficiaire ({nextId})</h2>
              <p className="text-xs text-slate-400">Intégration automatique dans les 9 tables de référence.</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex border-b border-white/10 bg-white/5 text-xs font-semibold">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 py-3.5 border-b-2 text-center transition-all ${
              step === 1 ? 'border-blue-400 text-blue-300 font-bold bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Identité (Table 1)
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex-1 py-3.5 border-b-2 text-center transition-all ${
              step === 2 ? 'border-blue-400 text-blue-300 font-bold bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Socio-Eco & Freins (Tables 2 & 3)
          </button>
          <button
            onClick={() => setStep(3)}
            className={`flex-1 py-3.5 border-b-2 text-center transition-all ${
              step === 3 ? 'border-blue-400 text-blue-300 font-bold bg-white/5' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Parcours & Projet (Tables 4 & 6)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Prénom</label>
                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Ex: Samira"
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Nom</label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Ex: Khelif"
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3.5">
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Âge</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md focus:outline-none focus:border-blue-400"
                  >
                    <option value="Femme" className="bg-slate-900 text-white">Femme</option>
                    <option value="Homme" className="bg-slate-900 text-white">Homme</option>
                    <option value="Autre" className="bg-slate-900 text-white">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Zone Géographique</label>
                  <select
                    value={zoneGeo}
                    onChange={(e) => setZoneGeo(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md focus:outline-none focus:border-blue-400"
                  >
                    <option value="QPV" className="bg-slate-900 text-white">QPV (Quartier Prioritaire)</option>
                    <option value="ZRR" className="bg-slate-900 text-white">ZRR (Zone Rurale)</option>
                    <option value="Urbain standard" className="bg-slate-900 text-white">Urbain Standard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Commune</label>
                  <input
                    type="text"
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Situation Logement</label>
                  <input
                    type="text"
                    value={situationLogement}
                    onChange={(e) => setSituationLogement(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 font-medium">Téléphone</label>
                <input
                  type="text"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white font-mono placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                />
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-2xl transition-all shadow-lg shadow-blue-600/30 border border-blue-400/30"
                >
                  Suivant : Socio-Éco & Freins →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Niveau de formation</label>
                  <select
                    value={niveauFormation}
                    onChange={(e) => setNiveauFormation(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md focus:outline-none focus:border-blue-400"
                  >
                    <option value="Infra-3 (Sans diplôme / Brevet)" className="bg-slate-900 text-white">Infra-3 (Sans diplôme)</option>
                    <option value="Niveau 3 (CAP/BEP)" className="bg-slate-900 text-white">Niveau 3 (CAP/BEP)</option>
                    <option value="Niveau 4 (Baccalauréat)" className="bg-slate-900 text-white">Niveau 4 (Baccalauréat)</option>
                    <option value="Niveau 5 (Bac+2)" className="bg-slate-900 text-white">Niveau 5 (Bac+2)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Revenus actuels</label>
                  <input
                    type="text"
                    value={revenus}
                    onChange={(e) => setRevenus(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                  />
                </div>
              </div>

              {/* Checkboxes for Freins (Table 3) */}
              <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3 backdrop-blur-md">
                <h4 className="font-bold text-amber-300">Diagnostic des Freins Périphériques (Table 3)</h4>
                <div className="grid grid-cols-2 gap-2.5">
                  <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={freinMobilite}
                      onChange={(e) => setFreinMobilite(e.target.checked)}
                      className="rounded-lg bg-white/10 border-white/20 text-blue-500 focus:ring-0"
                    />
                    <span>Frein Mobilité (Permis/Véhicule)</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={freinLogement}
                      onChange={(e) => setFreinLogement(e.target.checked)}
                      className="rounded-lg bg-white/10 border-white/20 text-blue-500 focus:ring-0"
                    />
                    <span>Frein Logement précaire</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={freinGarde}
                      onChange={(e) => setFreinGarde(e.target.checked)}
                      className="rounded-lg bg-white/10 border-white/20 text-blue-500 focus:ring-0"
                    />
                    <span>Frein Garde d'enfants</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={freinNumerique}
                      onChange={(e) => setFreinNumerique(e.target.checked)}
                      className="rounded-lg bg-white/10 border-white/20 text-blue-500 focus:ring-0"
                    />
                    <span>Frein Numérique / Illectronisme</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={freinLinguistique}
                      onChange={(e) => setFreinLinguistique(e.target.checked)}
                      className="rounded-lg bg-white/10 border-white/20 text-blue-500 focus:ring-0"
                    />
                    <span>Frein Linguistique (FLE requis)</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={freinFinancier}
                      onChange={(e) => setFreinFinancier(e.target.checked)}
                      className="rounded-lg bg-white/10 border-white/20 text-blue-500 focus:ring-0"
                    />
                    <span>Frein Financier / Dettes</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-white/10 hover:bg-white/20 text-slate-200 font-semibold px-5 py-2.5 rounded-2xl transition-colors border border-white/15 backdrop-blur-sm"
                >
                  ← Précédent
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-2xl transition-all shadow-lg shadow-blue-600/30 border border-blue-400/30"
                >
                  Suivant : Parcours & Projet →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Dispositif (Table 4)</label>
                  <select
                    value={dispositif}
                    onChange={(e) => setDispositif(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md focus:outline-none focus:border-blue-400"
                  >
                    <option value="PLIE" className="bg-slate-900 text-white">PLIE (Plan Local Insertion Emploi)</option>
                    <option value="IAE (ACI/AI/EI)" className="bg-slate-900 text-white">IAE (Structure Insertion)</option>
                    <option value="Mission Locale" className="bg-slate-900 text-white">Mission Locale (Jeunes)</option>
                    <option value="CER (Contrat Engagement Réciproque)" className="bg-slate-900 text-white">CER / RSA Département</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1.5 font-medium">Conseiller Référent</label>
                  <select
                    value={conseiller}
                    onChange={(e) => setConseiller(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white backdrop-blur-md focus:outline-none focus:border-blue-400"
                  >
                    <option value="Marc Leroy" className="bg-slate-900 text-white">Marc Leroy</option>
                    <option value="Céline Vasseur" className="bg-slate-900 text-white">Céline Vasseur</option>
                    <option value="Karim Bouzid" className="bg-slate-900 text-white">Karim Bouzid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 font-medium">Objectif de Parcours</label>
                <input
                  type="text"
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 font-medium">Métiers Ciblés (Table 6)</label>
                <input
                  type="text"
                  value={metiersCibles}
                  onChange={(e) => setMetiersCibles(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 font-medium">Compétences Clés</label>
                <input
                  type="text"
                  value={competences}
                  onChange={(e) => setCompetences(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                />
              </div>

              <div className="flex justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-white/10 hover:bg-white/20 text-slate-200 font-semibold px-5 py-2.5 rounded-2xl transition-colors border border-white/15 backdrop-blur-sm"
                >
                  ← Précédent
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Enregistrer le Bénéficiaire</span>
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
};
