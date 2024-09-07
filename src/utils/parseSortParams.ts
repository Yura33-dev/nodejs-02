import {
  contactKeys,
  IRequestedQueryParams,
  sortOrderEnum,
} from './types/requestedQueryParams.js';

const parseSortOrder = (
  requestedSortOrder: string,
): sortOrderEnum.ASC | sortOrderEnum.DESC => {
  if (requestedSortOrder === sortOrderEnum.DESC) {
    return sortOrderEnum.DESC;
  }
  return sortOrderEnum.ASC;
};

const parseSortBy = (requestedSortBy: string): string => {
  const formatedSortBy = requestedSortBy.toLowerCase();
  const contactKeysValues = Object.values(contactKeys) as string[];

  if (contactKeysValues.includes(formatedSortBy)) {
    return formatedSortBy;
  }

  return '_id';
};

export const parseSortParams = (
  query: IRequestedQueryParams,
): { sortOrder: sortOrderEnum; sortBy: string } => {
  const { sortOrder: order, sortBy } = query;

  const parsedSortOrder = parseSortOrder(order ?? sortOrderEnum.ASC);
  const parsedSortBy = parseSortBy(sortBy ?? contactKeys.ID);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
