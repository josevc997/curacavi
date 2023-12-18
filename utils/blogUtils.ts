import type { BlogItem } from "~/types/blog";

const sortByOrderIndex = (itemList: BlogItem[]) => {
    return itemList.sort((a, b) => a.order - b.order);
};

export { sortByOrderIndex };
