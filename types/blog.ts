import type { Colegio } from "./colegio";
import type { Persona } from "./candidato";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface BlogItem {
  id: number;
  elementos: Elemento[];
  titulo: string;
  resumen: string;
  imagen: string;
  show_imagen: boolean;
  fecha_creacion: string;
  categoria: Categoria[];
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
