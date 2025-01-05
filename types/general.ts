export interface Image {
  image: string;
  name: string;
}

export interface Concejo {
  id: number;
  nombre: string;
  show_as: string;
  embed_src: string;
  image: Image;
  descripcion: string;
  fecha: string;
  tipo: string;
}
