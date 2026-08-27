export type Genre = 'H' | 'F' | 'Autre';
export type SituationLogement = 'Stable (locataire/proprio)' | 'Précaire (hébergé tiers)' | 'Foyer / CHRS' | 'Sans abri';
export type NiveauFormation = 'Sans diplôme (Niv. 1-2)' | 'CAP / BEP (Niv. 3)' | 'Bac / Bac Pro (Niv. 4)' | 'Bac+2 (Niv. 5)' | 'Bac+3 et plus (Niv. 6+)';
export type SituationAvantEntree = 'RSA socle' | 'Demandeur d\'emploi longue durée (>12 mois)' | 'Jeune sans qualification' | 'Inactif / Sans ressources' | 'Sortant de détention' | 'Travailleur handicapé (RQTH)';
export type NiveauMaitrise = 'Non acquis' | 'Élémentaire (A1-A2)' | 'Intermédiaire (B1-B2)' | 'Autonome / Maîtrisé (C1-C2)';
export type NiveauComplexite = 'faible' | 'moyen' | 'eleve';
export type Dispositif = 'PLIE' | 'IAE (ACI/AI/EI)' | 'Mission Locale' | 'CER (Contrat Engagement Réciproque)' | 'CCAS / RSA' | 'France Travail Accompagnement';
export type StatutParcours = 'actif' | 'suspendu' | 'cloture';
export type ResultatAction = 'reussite' | 'echec' | 'en_cours' | 'abandonne';
export type TypeSortie = 
  | 'Emploi CDI'
  | 'Emploi CDD (> 6 mois)'
  | 'Emploi CDD (<= 6 mois)'
  | 'Intérim'
  | 'Création d\'entreprise'
  | 'Formation qualifiante'
  | 'Autre sortie positive'
  | 'Abandon / Décrochage'
  | 'Orientation vers autre structure'
  | 'Décès / Raison de force majeure';

export type TypePartenaire = 'entreprise' | 'formation' | 'association' | 'institution';

// TABLE 1 — IDENTIFICATION DU BÉNÉFICIAIRE
export interface Table1Beneficiaire {
  id_beneficiaire: string; // ex: BEN-101
  nom: string;
  prenom: string;
  date_naissance: string; // YYYY-MM-DD
  age: number;
  genre: Genre;
  nationalite: string;
  situation_matrimoniale: string; // 'Célibataire', 'Marié(e)', 'Divorcé(e)', 'Isolé(e)'
  enfants_charge: number;
  situation_logement: SituationLogement;
  zone_geographique: string; // 'Quartier Prioritaire (QPV)', 'Zone Urbaine', 'Zone Rurale'
  commune: string;
  telephone: string;
  email?: string;
  date_inscription: string;
}

// TABLE 2 — SITUATION SOCIO-ÉCONOMIQUE
export interface Table2SocioEco {
  id_beneficiaire: string;
  niveau_formation: NiveauFormation;
  dernier_diplome: string;
  domaine_formation_initiale: string;
  situation_avant_entree: SituationAvantEntree;
  duree_eloignement_mois: number;
  revenus_actuels: string; // 'RSA', 'ARE (Chômage)', 'ASS', 'AAH', 'Sans revenu', 'Garantie Jeunes / CEJ'
  niveau_francais: NiveauMaitrise;
  maitrise_numerique: NiveauMaitrise;
  permis_b: boolean;
  vehicule_personnel: boolean;
}

// TABLE 3 — FREINS IDENTIFIÉS
export interface Table3Freins {
  id_beneficiaire: string;
  frein_mobilite: boolean;
  detail_mobilite?: string;
  frein_logement: boolean;
  detail_logement?: string;
  frein_sante_physique: boolean;
  detail_sante_physique?: string;
  frein_sante_mentale: boolean;
  detail_sante_mentale?: string;
  frein_garde_enfants: boolean;
  detail_garde_enfants?: string;
  frein_financier: boolean;
  detail_financier?: string;
  frein_judiciaire: boolean;
  detail_judiciaire?: string;
  frein_numerique: boolean;
  detail_numerique?: string;
  frein_linguistique: boolean;
  detail_linguistique?: string;
  nb_freins_cumules: number;
  niveau_complexite: NiveauComplexite; // faible: 0-1, moyen: 2-3, eleve: 4+
  freins_leves_recemment?: number;
}

// TABLE 4 — PARCOURS D'ACCOMPAGNEMENT
export interface Table4Parcours {
  id_parcours: string;
  id_beneficiaire: string;
  date_entree: string;
  source_orientation: string; // 'France Travail', 'CAF', 'CCAS', 'Spontané', 'Mission Locale', 'MDS'
  dispositif: Dispositif;
  conseiller_referent: string;
  objectif_parcours: string;
  date_premier_rdv: string;
  frequence_rdv: string; // 'Hebdomadaire', 'Bimensuel', 'Mensuel'
  rdv_realises: number;
  rdv_manques: number;
  date_dernier_contact: string;
  jours_sans_contact: number;
  statut: StatutParcours;
  date_cloture?: string;
  notes_evolution?: string;
}

// TABLE 5 — ACTIONS ET ATELIERS
export interface Table5ActionAtelier {
  id_action: string;
  id_beneficiaire: string;
  type_action: 'Atelier CV / LM' | 'Simulation Entretien' | 'Remise à niveau Français' | 'Atelier Numérique' | 'Stage Immersion (PMSMP)' | 'Formation qualifiante' | 'Coaching Mobilité' | 'Bilan de santé / Soutien psy';
  intitule: string;
  prestataire: string;
  date_debut: string;
  date_fin: string;
  duree_heures: number;
  presence_effective: boolean;
  abandon: boolean;
  motif_abandon?: string;
  resultat: ResultatAction;
  cout_action: number;
}

// TABLE 6 — EXPÉRIENCE PROFESSIONNELLE
export interface Table6ExperiencePro {
  id_beneficiaire: string;
  nb_experiences: number;
  secteurs_activite: string[];
  type_contrats_anterieurs: string[]; // 'CDI', 'CDD', 'Intérim', 'Saisonnier', 'Bénévolat'
  duree_derniere_experience_mois: number;
  competences_cles: string[];
  competences_transferables: string[];
  metiers_cibles: string[];
  mobilite_rayon_km: number;
}

// TABLE 7 — SORTIES ET RÉSULTATS
export interface Table7SortieResultat {
  id_beneficiaire: string;
  date_sortie: string;
  type_sortie: TypeSortie;
  secteur_activite_poste?: string;
  nom_entreprise?: string;
  intitule_poste?: string;
  niveau_salaire?: string; // 'SMIC', 'SMIC + 10-20%', '> 1800€ net'
  duree_totale_parcours_mois: number;
  suivi_6_mois_en_emploi: boolean | null; // null if not yet 6 months
  est_sortie_positive: boolean;
  est_emploi_durable: boolean; // CDI ou CDD > 6 mois
}

// TABLE 8 — SATISFACTION ET ÉVALUATION
export interface Table8Satisfaction {
  id_beneficiaire: string;
  date_evaluation: string;
  satisfaction_globale: number; // /5
  satisfaction_accompagnement_conseiller: number; // /5
  satisfaction_ateliers: number; // /5
  sentiment_progression: number; // /5
  recommandation_dispositif: boolean;
  commentaires_libres?: string;
}

// TABLE 9 — PARTENAIRES ET EMPLOYEURS
export interface Table9Partenaire {
  id_partenaire: string;
  nom_structure: string;
  type: TypePartenaire;
  secteur_activite: string;
  contact_referent: string;
  email: string;
  telephone: string;
  offres_proposees: number;
  placements_realises: number;
  taux_satisfaction: number; // %
  actif: boolean;
}

// Full Beneficiary Composite View
export interface FullBeneficiaryRecord {
  b: Table1Beneficiaire;
  s: Table2SocioEco;
  f: Table3Freins;
  p: Table4Parcours;
  actions: Table5ActionAtelier[];
  exp: Table6ExperiencePro;
  sortie?: Table7SortieResultat;
  eval?: Table8Satisfaction;
}

// KPI Snapshot & Metrics
export interface KPISnapshot {
  // Volume
  beneficiaires_actifs: number;
  nouvelles_entrees: number;
  sorties_totales: number;
  actions_realisees: number;
  capacite_max: number;
  taux_remplissage: number;

  // Efficacité
  sorties_positives: number;
  sorties_emploi_durable: number;
  sorties_formation: number;
  abandons_decrochages: number;
  taux_insertion_global: number;
  taux_emploi_durable: number;
  taux_formation_qualifiante: number;
  taux_decrochage: number;
  duree_moyenne_parcours_mois: number;
  taux_maintien_6_mois: number;

  // Qualité
  taux_presence_rdv: number;
  taux_presence_ateliers: number;
  delai_moyen_premier_entretien_jours: number;
  nb_moyen_rdv_par_beneficiaire: number;
  score_satisfaction_moyen: number;

  // Performance par Conseiller
  conseillers_stats: {
    nom: string;
    beneficiaires_actifs: number;
    taux_insertion: number;
    duree_moyenne_mois: number;
    taux_decrochage: number;
    score_satisfaction: number;
    en_surcharge: boolean;
  }[];

  // Financier
  budget_total_annuel: number;
  budget_actions: number;
  cout_moyen_par_beneficiaire: number;
  cout_par_insertion_reussie: number;
  cout_moyen_par_action: number;
  valeur_sociale_creee: number;
  sroi_ratio: number;

  // Social (Impact Humain)
  reduction_moyenne_freins: number;
  taux_sortie_rsa: number;
  taux_amelioration_formation: number;
  taux_logement_stable_sortie: number;
  taux_progression_numerique: number;

  // Alertes
  alertes_sans_contact_30j: number;
  alertes_stagnation_60j: number;
  alertes_decrochage_eleve: boolean;
  conseillers_surcharge_count: number;
}
