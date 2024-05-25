import { defineStore } from "pinia";
import type { CandidaturaWithPersona } from "~/types/candidato";

export const useCandidaturaStore = defineStore("candidaturas", {
  state: () => ({
    candidaturas: [] as CandidaturaWithPersona[],
    selectedCandidatura: {} as CandidaturaWithPersona,
  }),

  getters: {},

  actions: {
    async fetchCandidaturas() {
      const client = useSupabaseClient();
      const { data: valores } = await useAsyncData("candidatura", async () => {
        const { data, error } = await client
          .from("candidatura")
          .select("*, Persona(*), pacto(*), partido(*)")
          .gte("fecha", "2021-01-01");
        if (error) throw error;
        return data as CandidaturaWithPersona[];
      });
      if (valores.value) this.candidaturas = valores.value;
    },
  },
});
