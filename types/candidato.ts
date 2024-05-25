export interface Candidato {
  id: number;
  name: string;
  profesion: string;
  fecha_nacimiento: string;
  descripcion: string;
  email: string;
  image: string;
  period: string;
  is_active: boolean;
  created_at: string;
}

export interface Candidatura {
  id: number;
  created_at: string;
  pacto: {
    id: number;
    created_at: string;
    codigo: string;
    nombre: string;
    partidos: string;
  };
  partido: {
    id: number;
    created_at: string;
    codigo: string;
    nombre: string;
  };
  tipo_autoridad: string;
  fecha: string;
  is_active: boolean;
  id_persona: number;
}

export interface Persona {
  id: number;
  created_at: string;
  nombre: string;
  descripcion: string | null;
  fecha_nacimiento: string;
  image: string;
  email: string;
  profesion: string | null;
}

export interface PersonaWithCandidatura extends Persona {
  candidatura: Candidatura[];
}

export interface Autoridad {
  id: number;
  created_at: string;
  descripcion: string | null;
  periodo: string;
  is_active: boolean;
  tipo_autoridad: string;
  id_persona: number;
  Persona: Persona;
}

export interface AutoridadWithCandidatura extends Autoridad {
  Persona: PersonaWithCandidatura;
}

export interface CandidaturaWithPersona extends Candidatura {
  Persona: Persona;
}
