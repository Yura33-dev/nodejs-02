import { contactType, } from './types/requestedQueryParams.js';
export const parseFilterParams = (query) => {
    const { isFavourite, type } = query;
    const parsedIsFavourite = parseFavourite(isFavourite);
    const parsedType = parseType(type);
    return {
        isFavourite: parsedIsFavourite,
        type: parsedType,
    };
};
const parseFavourite = (valueFromRequest) => valueFromRequest === 'true' ? true : false;
const parseType = (valueFromRequest) => {
    const validTypes = [contactType.HOME, contactType.PERSONAL, contactType.WORK];
    const parsedFilters = [];
    if (Array.isArray(valueFromRequest) && valueFromRequest.length > 0) {
        valueFromRequest.forEach((value) => {
            if (validTypes.includes(value)) {
                parsedFilters.push(value);
            }
        });
    }
    else if (typeof valueFromRequest === 'string') {
        if (validTypes.includes(valueFromRequest)) {
            parsedFilters.push(valueFromRequest);
        }
        else {
            return false;
        }
    }
    return parsedFilters;
};
