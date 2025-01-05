import { defineStore } from "pinia";
// import type { Candidato, AutoridadWithCandidatura } from "~/types/candidato";
import type { Concejo } from "~/types/general";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useConcejoStore = defineStore("concejos", {
  // a function that returns a fresh state
  state: () => ({
    concejos: [] as Concejo[],
  }),
  getters: {},
  actions: {
    async fetchConcejos() {
      const config = useRuntimeConfig();

      const { data: concejos } = await useAsyncData("Concejos", async () => {
        const data = await $fetch(`${config.public.apiBackend}/api/concejo/`);
        return data as [];
      });
      if (concejos.value) this.concejos = concejos.value;
    },
  },
});
