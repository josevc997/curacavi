import { defineStore } from "pinia";
import type {
  CandidaturaWithCandidaturas,
  SearchCandidaturaPayload,
} from "~/types/candidato";

export const useCandidaturaStore = defineStore("candidaturas", {
  state: () => ({
    candidaturas: [] as CandidaturaWithCandidaturas[],
    updatedCandidaturas: [] as CandidaturaWithCandidaturas[],
    selectedCandidatura: {} as CandidaturaWithCandidaturas,
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
        return data as CandidaturaWithCandidaturas[];
      });
      if (valores.value) this.candidaturas = valores.value;
    },

    async fetchCandidaturaById(id: number) {
      const config = useRuntimeConfig();
      const selected = this.candidaturas.find((a) => a.id === id);
      if (selected) {
        this.selectedCandidatura = selected;
      } else {
        const { data: autoridades } = await useAsyncData(
          "Autoridad",
          async () => {
            const data = await $fetch(
              `${config.public.apiBackend}/api/candidato/candidatura/${id}/`,
            );

            return data as CandidaturaWithCandidaturas;
          },
        );
        if (autoridades.value) this.selectedCandidatura = autoridades.value;
      }
    },

    async fetchCandidaturasByIdList(idList: number[]) {
      const config = useRuntimeConfig();
      const { data: autoridades } = await useAsyncData(
        "candidaturaByIdList",
        async () => {
          let url = `${config.public.apiBackend}/api/candidato/candidatura/`;
          for (let index = 0; index < idList.length; index++) {
            const element = idList[index];
            if (index === 0) {
              url += `?id=${element}`;
            } else {
              url += `&id=${element}`;
            }
          }
          const data = await $fetch(url);

          return data as CandidaturaWithCandidaturas[];
        },
      );
      if (autoridades.value) this.candidaturas = autoridades.value;
    },

    async fetchUpdatedCandidaturas() {
      const config = useRuntimeConfig();
      const { data: autoridades } = await useAsyncData(
        "candidaturaByIdList",
        async () => {
          let url = `${config.public.apiBackend}/api/candidato/candidatura/actualizados/`;
          const data = await $fetch(url);

          return data as CandidaturaWithCandidaturas[];
        },
      );
      if (autoridades.value) this.updatedCandidaturas = autoridades.value;
    },
  },
});
