import { defineStore } from "pinia";
import type { BlogItem } from "~/types/blog";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogList: [] as BlogItem[],
    selectedBlog: {} as BlogItem,
  }),
  getters: {},
  actions: {
    async fetchBlogList() {
      const config = useRuntimeConfig();
      const { data: blogListResponse } = await useAsyncData(
        "colegio",
        async () => {
          let url = `${config.public.apiBackend}/api/noticia/`;
          const data = await $fetch(url);

          return data as BlogItem[];
        },
      );
      if (blogListResponse.value) {
        this.blogList = blogListResponse.value;
      }
    },

    async fetchBlogItemById(id: number) {
      const client = useSupabaseClient();
      const selected = this.blogList.find((a) => a.id === id);
      if (selected) {
        this.selectedBlog = selected;
      } else {
        const config = useRuntimeConfig();
        const { data: blogItemResponse } = await useAsyncData(
          "colegio",
          async () => {
            let url = `${config.public.apiBackend}/api/noticia/${id}/`;
            const data = await $fetch(url);

            return data as BlogItem;
          },
        );
        if (blogItemResponse.value) this.selectedBlog = blogItemResponse.value;
      }
    },
  },
});
