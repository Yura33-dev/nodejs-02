import { contactKeys, sortOrderEnum, } from './types/requestedQueryParams.js';
const parseSortOrder = (requestedSortOrder) => {
    if (requestedSortOrder === sortOrderEnum.DESC) {
        return sortOrderEnum.DESC;
    }
    return sortOrderEnum.ASC;
};
const parseSortBy = (requestedSortBy) => {
    const formatedSortBy = requestedSortBy.toLowerCase();
    const contactKeysValues = Object.values(contactKeys);
    if (contactKeysValues.includes(formatedSortBy)) {
        return formatedSortBy;
    }
    return '_id';
};
export const parseSortParams = (query) => {
    const { sortOrder: order, sortBy } = query;
    const parsedSortOrder = parseSortOrder(order ?? sortOrderEnum.ASC);
    const parsedSortBy = parseSortBy(sortBy ?? contactKeys.ID);
    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy,
    };
};
