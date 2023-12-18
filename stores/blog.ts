import { defineStore } from "pinia";

export const useBlogStore = defineStore("blog", {
    state: () => ({
        blogList: [] as any[],
        selectedBlog: {} as any,
    }),
    getters: {},
    actions: {
        async fetchBlogList() {
            const client = useSupabaseClient();
            const { data: blogListResponse } = await useAsyncData(
                "Blog",
                async () => {
                    const { data } = await client
                        .from("Blog")
                        .select("*, Categoria_Blog(Categoria(nombre))")
                        .eq("is_active", true);

                    return data as any;
                }
            );
            if (blogListResponse.value) this.blogList = blogListResponse.value;
        },

        async fetchBlogItemById(id: number) {
            const client = useSupabaseClient();
            const selected = this.blogList.find((a) => a.id === id);
            if (selected) {
                this.selectedBlog = selected;
            } else {
                const { data: blogItemResponse } = await useAsyncData(
                    "Blog",
                    async () => {
                        const { data } = await client
                            .from("Blog")
                            .select("*, Categoria_Blog(Categoria(nombre))")
                            .eq("is_active", true)
                            .eq("id", id);

                        return data as any;
                    }
                );
                if (blogItemResponse.value)
                    this.selectedBlog = blogItemResponse.value[0];
            }
        },
    },
});
