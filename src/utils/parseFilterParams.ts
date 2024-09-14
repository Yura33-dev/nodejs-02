import {
  contactType,
  IRequestedQueryParams,
} from './types/requestedQueryParams.js';

export const parseFilterParams = (
  query: IRequestedQueryParams,
): { isFavourite: boolean | 'none'; type: contactType[] | false } => {
  const { isFavourite, type } = query;

  const parsedIsFavourite = parseFavourite(isFavourite);
  const parsedType = parseType(type);

  return {
    isFavourite: parsedIsFavourite,
    type: parsedType,
  };
};

const parseFavourite = (
  valueFromRequest: string | undefined,
): boolean | 'none' => {
  if (valueFromRequest === 'true') return true;
  else if (valueFromRequest === 'false') return false;
  return 'none';
};

const parseType = (
  valueFromRequest: contactType | contactType[] | undefined,
): contactType[] | false => {
  const validTypes = [contactType.HOME, contactType.PERSONAL, contactType.WORK];

  if (!valueFromRequest) return false;

  const values = Array.isArray(valueFromRequest)
    ? valueFromRequest
    : [valueFromRequest];
  const parsedFilters = values.filter((value) => validTypes.includes(value));
  return parsedFilters.length > 0 ? parsedFilters : false;
};
