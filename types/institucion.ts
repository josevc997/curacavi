import type { Image } from "./general";

interface Contacto {
  name: string;
  value: string;
  type: string;
}

export interface Horario {
  sector: string;
  dia_inicio: string;
  dia_fin: string;
  hora_inicio: string;
  hora_fin: string;
}

interface MapLayer {
  coordinates: [number, number][][];
  description: string;
  labelCoordinates: [number, number];
  color: string;
}

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
  contactos: Contacto[];
  horarios: Horario[];
  mapLayer: MapLayer[];
}

export interface LabelItem {
  type: string;
  properties: {
    description: string;
  };
  geometry: {
    properties: {};
    coordinates: number[];
    type: string;
  };
}

interface RedSocial {
  url: string;
  nombre: string;
  icono: string;
}
