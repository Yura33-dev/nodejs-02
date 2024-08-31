export interface IRequestedPaginationParams {
  page?: string;
  perPage?: string;
}

export interface IPaginationData {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
