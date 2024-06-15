import { defineStore } from "pinia";
import type { Candidato, AutoridadWithCandidatura } from "~/types/candidato";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useAutoridadStore = defineStore("autoridades", {
  // a function that returns a fresh state
  state: () => ({
    alcaldes: [] as Candidato[],
    concejales: [] as Candidato[],
    autoridades: [] as AutoridadWithCandidatura[],
    selectedConcejal: {} as Candidato,
    selectedAlcalde: {} as Candidato,
    selectedAutoridad: {} as AutoridadWithCandidatura,
  }),
  getters: {
    candidaturas(): any {
      return this.selectedAutoridad.candidatura.sort(function (a, b) {
        return Date.parse(a.fecha) - Date.parse(b.fecha);
      });
    },
  },
  actions: {
    async fetchAutoridades() {
      const config = useRuntimeConfig();

      const { data: autoridades } = await useAsyncData(
        "Autoridad",
        async () => {
          const data = await $fetch(
            `${config.public.apiBackend}/api/candidato/autoridad/`,
          );
          return data as AutoridadWithCandidatura[];
        },
      );
      if (autoridades.value) this.autoridades = autoridades.value;
    },

    async fetchAutoridadById(id: number) {
      const config = useRuntimeConfig();
      const selected = this.autoridades.find((a) => a.id === id);
      if (selected) {
        this.selectedAutoridad = selected;
      } else {
        const { data: autoridades } = await useAsyncData(
          "Autoridad",
          async () => {
            const data = await $fetch(
              `${config.public.apiBackend}/api/candidato/autoridad/${id}/`,
            );

            return data as AutoridadWithCandidatura;
          },
        );
        if (autoridades.value) this.selectedAutoridad = autoridades.value;
      }
    },
  },
});
