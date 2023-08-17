import { defineStore } from "pinia";
import { Candidato } from "types/candidato";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useAutoridadStore = defineStore("autoridades", {
  // a function that returns a fresh state
  state: () => ({
    alcaldes: [] as Candidato[],
    concejales: [] as Candidato[],
    selectedConcejal: {} as Candidato,
    selectedAlcalde: {} as Candidato,
  }),
  getters: {},
  actions: {
    async fetchAlcaldes() {
      const client = useSupabaseClient();
      const { data: alcaldes } = await useAsyncData("alcalde", async () => {
        const { data } = await client.from("alcalde").select("*");

        return data as Candidato[];
      });
      if (alcaldes.value) this.alcaldes = alcaldes.value;
    },

    async fetchAlcaldeById(id: number) {
      const client = useSupabaseClient();
      const selected = this.alcaldes.find((a) => a.id === id);
      if (selected) {
        this.selectedAlcalde = selected;
      } else {
        const { data: alcaldes } = await useAsyncData("alcalde", async () => {
          const { data } = await client
            .from("alcalde")
            .select("*")
            .eq("id", id);

          return data as Candidato[];
        });
        if (alcaldes.value) this.selectedAlcalde = alcaldes.value[0];
      }
    },

    async fetchConcejales() {
      const client = useSupabaseClient();
      const { data: concejales } = await useAsyncData("concejal", async () => {
        const { data } = await client.from("concejal").select("*");

        return data as Candidato[];
      });
      if (concejales.value) this.concejales = concejales.value;
    },

    async fetchConcejalById(id: number) {
      const client = useSupabaseClient();
      const selected = this.concejales.find((a) => a.id === id);
      if (selected) {
        this.selectedConcejal = selected;
      } else {
        const { data: concejales } = await useAsyncData(
          "concejal",
          async () => {
            const { data } = await client
              .from("concejal")
              .select("*")
              .eq("id", id);

            return data as Candidato[];
          }
        );
        if (concejales.value) this.selectedConcejal = concejales.value[0];
      }
    },
  },
});