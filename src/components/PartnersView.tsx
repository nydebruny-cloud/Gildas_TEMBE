import React, { useState } from 'react';
import {
  Users,
  Building2,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Plus,
  Search,
} from 'lucide-react';
import { Table9Partenaire } from '../types';

interface PartnersViewProps {
  partenaires: Table9Partenaire[];
}

export const PartnersView: React.FC<PartnersViewProps> = ({ partenaires }) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filtered = partenaires.filter(p => {
    const matchSearch =
      p.nom_structure.toLowerCase().includes(search.toLowerCase()) ||
      p.secteur_activite.toLowerCase().includes(search.toLowerCase()) ||
      p.contact_referent.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'ALL' || p.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div id="partners-view" className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0 shadow-lg shadow-blue-500/10">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Table 9 : Réseau des Partenaires & Employeurs</h2>
              <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-500/30">
                {partenaires.length} Partenaires Actifs
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Suivi des conventions, offres d'immersion (PMSMP), recrutements directs et satisfaction employeur.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-500/30 font-medium">
            Partenariats certifiés
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 shadow-xl shadow-black/20 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un partenaire, un secteur..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span>Type d'organisme :</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400 backdrop-blur-md cursor-pointer"
          >
            <option value="ALL" className="bg-slate-900 text-white">Tous les types</option>
            <option value="entreprise" className="bg-slate-900 text-white">Entreprises privées</option>
            <option value="siae" className="bg-slate-900 text-white">SIAE / Régies de quartier</option>
            <option value="formation" className="bg-slate-900 text-white">Organismes de formation</option>
            <option value="association" className="bg-slate-900 text-white">Associations / Ville</option>
          </select>
        </div>
      </div>

      {/* Grid of Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((part) => (
          <div
            key={part.id_partenaire}
            className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-3xl p-6 shadow-xl shadow-black/20 flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                    {part.id_partenaire}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">{part.nom_structure}</h3>
                  <span className="text-xs text-teal-300 block">{part.secteur_activite}</span>
                </div>
                <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {part.taux_satisfaction}%
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Référent : <strong className="text-white">{part.contact_referent}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{part.telephone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400">{part.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-3.5 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2.5 text-center text-xs">
                <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                  <span className="text-slate-400 block text-[11px]">Offres Proposées</span>
                  <strong className="text-white font-mono">{part.offres_proposees}</strong>
                </div>
                <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                  <span className="text-slate-400 block text-[11px]">Placements</span>
                  <strong className="text-emerald-400 font-mono">{part.placements_realises}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
