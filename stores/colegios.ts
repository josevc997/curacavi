import { defineStore } from "pinia";
import type { Colegio } from "~/types/colegio";

export const useColegioStore = defineStore("colegios", {
    state: () => ({
        colegios: [] as Colegio[],
        selectedColegio: {} as Colegio,
    }),
    getters: {},
    actions: {
        async fetchColegios() {
            const client = useSupabaseClient();
            const { data: colegios } = await useAsyncData(
                "colegio",
                async () => {
                    const { data } = await client.from("colegio").select("*");

                    return data as Colegio[];
                }
            );
            if (colegios.value) this.colegios = colegios.value;
        },

        async fetchColegioById(id: number) {
            const client = useSupabaseClient();
            const selected = this.colegios.find((a) => a.id === id);
            if (selected) {
                this.selectedColegio = selected;
            } else {
                const { data: colegios } = await useAsyncData(
                    "colegio",
                    async () => {
                        const { data } = await client
                            .from("colegio")
                            .select("*")
                            .eq("id", id);

                        return data as Colegio[];
                    }
                );
                if (colegios.value) this.selectedColegio = colegios.value[0];
            }
        },
    },
});
