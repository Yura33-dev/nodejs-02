export const parsePaginationParams = (query) => {
    const { page, perPage } = query;
    const parsedPage = parseNumber(page ?? '1', 1);
    const parsedPerPage = parseNumber(perPage ?? '5', 5);
    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};
const parseNumber = (numberFromRequest, defaultValue) => {
    const parsedNumber = parseInt(numberFromRequest);
    if (Number.isNaN(parsedNumber)) {
        return defaultValue;
    }
    return parsedNumber;
};
