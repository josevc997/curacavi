import type { Horario } from "~/types/institucion";

export function horarioToInformationCardList(horarios: Horario[]) {
  const horariosList = horarios.map((horario) => ({
    name: `${horario.sector}: ${horario.dia_inicio} - ${horario.dia_fin}`,
    value: `${horario.hora_inicio.slice(0, 5)} - ${horario.hora_fin.slice(0, 5)}`,
    type: "horario",
  }));

  return horariosList;
}
