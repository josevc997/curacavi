import type { Image } from "./general";

export interface Institucion {
  id: number;
  redes_sociales: RedSocial[];
  nombre: string;
  direccion: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  images: Image[];
  cover_image: string;
}

interface RedSocial {
  url: string;
  nombre: string;
  icono: string;
}
