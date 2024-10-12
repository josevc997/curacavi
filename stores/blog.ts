import { defineStore } from "pinia";
import type { BlogItem } from "~/types/blog";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogList: [] as BlogItem[],
    featuredBlogList: [] as BlogItem[],
    indexSectionBlogList: [] as BlogItem[],
    selectedBlog: {} as BlogItem,
  }),
  getters: {},
  actions: {
    async fetchBlogList() {
      const config = useRuntimeConfig();
      const { data: blogListResponse } = await useAsyncData(
        "noticia-list",
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

    async fetchFeaturedBlogList() {
      const config = useRuntimeConfig();
      const { data: blogListResponse } = await useAsyncData(
        "noticia-featured",
        async () => {
          let url = `${config.public.apiBackend}/api/noticia/is_featured/`;
          const data = await $fetch(url);

          return data as BlogItem[];
        },
      );
      if (blogListResponse.value) {
        this.featuredBlogList = blogListResponse.value;
      }
    },

    async fetchIndexSectionBlogList() {
      const config = useRuntimeConfig();
      const { data: blogListResponse } = await useAsyncData(
        "noticia-index-section",
        async () => {
          let url = `${config.public.apiBackend}/api/noticia/filter_by_categoria/`;
          const data = await $fetch(url);

          return data as BlogItem[];
        },
      );
      if (blogListResponse.value) {
        this.indexSectionBlogList = blogListResponse.value;
      }
    },

    async fetchBlogItemById(id: number) {
      const config = useRuntimeConfig();
      const selected = this.blogList.find((a) => a.id === id);
      if (selected) {
        this.selectedBlog = selected;
      } else {
        const config = useRuntimeConfig();
        const { data: blogItemResponse } = await useAsyncData(
          "noticia-detail",
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
