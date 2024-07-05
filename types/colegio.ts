import type { Image } from "./general";

interface Enseñanza {
  codigo: number;
  nombre: string;
}

interface Especialidad {
  codigo: number;
  nombre: string;
}

export interface Colegio {
  id: number;
  nombre: string;
  rbd: number;
  dependencia_principal: string;
  dependencia_secundaria: string;
  latitud: number;
  longitud: number;
  has_pie: boolean;
  has_pace: boolean;
  enseñanzas: Enseñanza[];
  especialidades: Especialidad[];
  has_matricula: boolean;
  matricula_total: number;
  estado: string;
  orientacion_religiosa: string;
  orientacion_religiosa_secundaria: string;
  pago_matricula: string;
  pago_mensual: string;
  telefono: string;
  email: string;
  url: string;
  direccion: string;
  director: string;
  resumen_proyecto: string;
  politica_uniforme: string;
  nivel_minimo: string;
  nivel_maximo: string;
  promedio_alumnos_curso: number;
  cantidad_docentes: number;
  regimen: string;
  cover_image: string;
  is_active: boolean;
  images: Image[];
}
