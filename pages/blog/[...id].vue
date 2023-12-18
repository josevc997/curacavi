<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
import { sortByOrderIndex } from "~/utils/blogUtils";
// const blog = {
//     categories: ["marketing", "software"],
//     is_active: true,
//     title: "A better workflow",
//     subTitle:
//         "Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.",
//     superTitle: "Deploy faster",
//     body: [
//         {
//             tag: "paragraph",
//             content:
//                 "Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.",
//             order: 0,
//             body: [],
//         },
//         {
//             tag: "paragraph",
//             content:
//                 "Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.",
//             order: 2,
//             body: [],
//         },
//         {
//             tag: "paragraph",
//             content:
//                 "Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.",
//             order: 4,
//             body: [],
//         },
//         {
//             tag: "secondTitle",
//             content: "No server? No problem.",
//             order: 3,
//             body: [],
//         },
//         {
//             tag: "ul",
//             content: "",
//             order: 1,
//             body: [
//                 {
//                     tag: "li",
//                     content: "",
//                     order: 0,
//                     body: [
//                         {
//                             tag: "icon",
//                             content: "heroicons:cloud-arrow-up",
//                             order: 0,
//                             body: [],
//                         },
//                         {
//                             tag: "span",
//                             content:
//                                 "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
//                             order: 0,
//                             body: [
//                                 {
//                                     tag: "strong",
//                                     content: "Push to deploy.",
//                                     order: 0,
//                                     body: [],
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//                 {
//                     tag: "li",
//                     content: "",
//                     order: 1,
//                     body: [
//                         {
//                             tag: "icon",
//                             content: "heroicons:lock-closed",
//                             order: 0,
//                             body: [],
//                         },
//                         {
//                             tag: "span",
//                             content:
//                                 "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
//                             order: 0,
//                             body: [
//                                 {
//                                     tag: "strong",
//                                     content: "SSL certificates.",
//                                     order: 0,
//                                     body: [],
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//                 {
//                     tag: "li",
//                     content: "",
//                     order: 2,
//                     body: [
//                         {
//                             tag: "icon",
//                             content: "heroicons:server",
//                             order: 0,
//                             body: [],
//                         },
//                         {
//                             tag: "span",
//                             content:
//                                 "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
//                             order: 0,
//                             body: [
//                                 {
//                                     tag: "strong",
//                                     content: "Database backups.",
//                                     order: 0,
//                                     body: [],
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
//     image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80",
// };

const route = useRoute();
const blogStore = useBlogStore();
const { toTitleCase } = useTextUtils();

const blogItem = computed(() => {
    if (blogStore.selectedBlog) {
        return blogStore.selectedBlog;
    } else {
        return null;
    }
});

blogStore.fetchBlogItemById(Number(route.params.id));

watch(
    () => route.params.id,
    (newId, oldId) => {
        blogStore.fetchBlogItemById(Number(route.params.id));
    }
);
</script>
<template>
    <div class="">
        <div class="">
            <div class="relative h-80 lg:h-[400px] xl:h-[500px]">
                <img
                    class="absolute inset-0 h-full w-full bg-gray-50 object-cover rounded"
                    :src="
                        blogItem.image
                            ? blogItem.image
                            : 'https://placehold.co/600x400'
                    "
                    alt=""
                />
            </div>
        </div>
        <div>
            <div class="mx-auto pb-24 pt-16">
                <BlogSuperTitle v-if="blogItem.superTitle">
                    {{ blogItem.superTitle }}
                </BlogSuperTitle>
                <BlogMainTitle v-if="blogItem.title">
                    {{ blogItem.title }}
                </BlogMainTitle>
                <BlogSubTitle v-if="blogItem.subTitle">
                    {{ blogItem.subTitle }}
                </BlogSubTitle>
                <div
                    v-if="blogItem"
                    class="text-base leading-7 text-gray-700 space-y-8 mt-8"
                >
                    <template v-for="(item, index) in blogItem.body">
                        <p v-if="item.tag === 'paragraph'">
                            {{ item.content }}
                        </p>
                        <BlogSecondTitle v-else-if="item.tag === 'secondTitle'">
                            {{ item.content }}
                        </BlogSecondTitle>
                        <BlogUnorderedList
                            :item="item"
                            v-else-if="item.tag === 'ul'"
                        >
                            {{ item.content }}
                        </BlogUnorderedList>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
