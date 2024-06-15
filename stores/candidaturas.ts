import { defineStore } from "pinia";
import type {
  CandidaturaWithPersona,
  SearchCandidaturaPayload,
} from "~/types/candidato";

export const useCandidaturaStore = defineStore("candidaturas", {
  state: () => ({
    candidaturas: [] as CandidaturaWithPersona[],
    selectedCandidatura: {} as CandidaturaWithPersona,
  }),

  getters: {},

  actions: {
    async fetchCandidaturas(payload: SearchCandidaturaPayload) {
      const config = useRuntimeConfig();
      const { data: valores } = await useAsyncData("candidatura", async () => {
        let url = `${config.public.apiBackend}/api/candidato/candidatura/`;
        if (payload) {
          url = `${config.public.apiBackend}/api/candidato/candidatura/?${new URLSearchParams(
            payload as unknown as Record<string, string>,
          )}`;
        }
        const data = await $fetch(url);
        return data as CandidaturaWithPersona[];
      });
      if (valores.value) this.candidaturas = valores.value;
    },
  },
});
