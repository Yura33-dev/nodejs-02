export const calculatePaginationData = (totalCount, perPage, page) => {
    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = Boolean(totalPages - page);
    const hasPreviousPage = page !== 1;
    return {
        page,
        perPage,
        totalItems: totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
};
