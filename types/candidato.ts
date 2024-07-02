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
    image: string;
  };
  partido: {
    id: number;
    created_at: string;
    codigo: string;
    nombre: string;
    image: string;
  };
  tipo_autoridad: string;
  fecha: string;
  is_active: boolean;
  is_elected: boolean;
  id_persona: number;
  votos: number;
  porcentaje: number;
}

interface RedSocial {
  url: string;
  nombre: string;
  icono: string;
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
  redes_sociales: RedSocial[];
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
  persona: Persona;
}

export interface AutoridadWithCandidatura extends Autoridad {
  Persona: Persona;
  candidatura: Candidatura[];
}

export interface CandidaturaWithPersona extends Candidatura {
  persona: Persona;
}

export interface CandidaturaWithCandidaturas extends CandidaturaWithPersona {
  candidatura_list: Candidatura[];
}

export interface SearchCandidaturaPayload {
  annio: number;
}
