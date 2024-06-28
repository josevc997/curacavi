import type { Colegio } from "./colegio";
import type { Persona } from "./candidato";

export interface BlogItem {
  id: number;
  elementos: Elemento[];
  titulo: string;
  resumen: string;
  imagen: string;
  fecha_creacion: string;
  categoria: string;
  colegio: Colegio[];
  persona: Persona[];
}

export interface Elemento {
  id: number;
  tag: string;
  contenido: string;
  prioridad: number;
  children: Elemento[];
}
