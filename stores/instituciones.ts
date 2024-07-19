import { defineStore } from "pinia";
import type { Institucion } from "~/types/institucion";

export const useInstitucionStore = defineStore("institucion", {
  state: () => ({
    institucionList: [] as Institucion[],
    selectedInstitucion: {} as Institucion,
  }),
  getters: {},
  actions: {
    async fetchInstitucionList() {
      const config = useRuntimeConfig();
      const { data: institucionListResponse } = await useAsyncData(
        "institucion",
        async () => {
          let url = `${config.public.apiBackend}/api/institucion/`;
          const data = await $fetch(url);

          return data as Institucion[];
        },
      );
      if (institucionListResponse.value) {
        this.institucionList = institucionListResponse.value;
      }
    },

    async fetchInstitucionItemById(id: number) {
      const selected = this.institucionList.find((a) => a.id === id);
      if (selected) {
        this.selectedInstitucion = selected;
      } else {
        const config = useRuntimeConfig();
        const { data: institucionItemResponse } = await useAsyncData(
          "institucion",
          async () => {
            let url = `${config.public.apiBackend}/api/institucion/${id}/`;
            const data = await $fetch(url);

            return data as Institucion;
          },
        );
        if (institucionItemResponse.value)
          this.selectedInstitucion = institucionItemResponse.value;
      }
    },
  },
});
