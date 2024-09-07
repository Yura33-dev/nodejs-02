import {
  contactType,
  IRequestedQueryParams,
} from './types/requestedQueryParams.js';

export const parseFilterParams = (
  query: IRequestedQueryParams,
): { isFavourite: boolean; type: contactType[] | false } => {
  const { isFavourite, type } = query;

  const parsedIsFavourite = parseFavourite(isFavourite);
  const parsedType = parseType(type);

  return {
    isFavourite: parsedIsFavourite,
    type: parsedType,
  };
};

const parseFavourite = (valueFromRequest: string | undefined): boolean =>
  valueFromRequest === 'true' ? true : false;

const parseType = (
  valueFromRequest: contactType | contactType[] | undefined,
): contactType[] | false => {
  const validTypes = [contactType.HOME, contactType.PERSONAL, contactType.WORK];
  const parsedFilters: contactType[] = [];

  if (Array.isArray(valueFromRequest) && valueFromRequest.length > 0) {
    valueFromRequest.forEach((value) => {
      if (validTypes.includes(value as contactType)) {
        parsedFilters.push(value);
      }
    });
  } else if (typeof valueFromRequest === 'string') {
    if (validTypes.includes(valueFromRequest as contactType)) {
      parsedFilters.push(valueFromRequest);
    } else {
      return false;
    }
  }

  return parsedFilters;
};
