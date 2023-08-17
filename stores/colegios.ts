import { defineStore } from "pinia";
// import { any } from "types/any";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useColegioStore = defineStore("colegios", {
  // a function that returns a fresh state
  state: () => ({
    colegios: [] as any[],
    // concejales: [] as any[],
    // selectedConcejal: {} as any,
    selectedColegio: {} as any,
  }),
  getters: {},
  actions: {
    async fetchColegios() {
      const client = useSupabaseClient();
      const { data: colegios } = await useAsyncData("colegio", async () => {
        const { data } = await client.from("colegio").select("*");

        return data as any[];
      });
      if (colegios.value) this.colegios = colegios.value;
    },

    async fetchColegioById(id: number) {
      const client = useSupabaseClient();
      const selected = this.colegios.find((a) => a.id === id);
      if (selected) {
        this.selectedColegio = selected;
      } else {
        const { data: colegios } = await useAsyncData("colegio", async () => {
          const { data } = await client
            .from("colegio")
            .select("*")
            .eq("id", id);

          return data as any[];
        });
        if (colegios.value) this.selectedColegio = colegios.value[0];
      }
    },
  },
});
