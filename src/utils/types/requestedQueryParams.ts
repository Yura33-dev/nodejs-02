export enum contactKeys {
  ID = '_id',
  NAME = 'name',
  PHONE = 'phoneNumber',
  EMAIL = 'email',
  FAVOURITE = 'isFavourite',
  TYPE = 'contactType',
  CREATEDAT = 'createdAt',
  UPDATEDAT = 'updatedAt',
}

export enum contactType {
  WORK = 'work',
  HOME = 'home',
  PERSONAL = 'personal',
}

export enum sortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IRequestedQueryParams {
  page?: string;
  perPage?: string;
  sortOrder?: sortOrderEnum;
  sortBy?: string;
  type?: contactType | contactType[];
  isFavourite?: string;
}
