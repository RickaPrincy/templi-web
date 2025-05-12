import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import debounce from 'debounce';
import { AxiosError } from 'axios';
import { Pagination } from '@/providers';

type Filter = Record<string, any>;

type UseGetListOptions<T> = {
  initialFilter?: Filter;
  debounceDelay?: number;
  initialPagination?: Pagination;
  queryFn: (args: { filter: Filter; pagination: Pagination }) => Promise<T[]>;
  queryKey: UseQueryOptions['queryKey'];
  useQueryOptions?: Omit<
    UseQueryOptions<T[], AxiosError>,
    'queryKey' | 'queryFn'
  >;
};

export const useGetList = <T>({
  initialFilter = {},
  initialPagination = { page: 1, pageSize: 10 },
  debounceDelay = 500,
  useQueryOptions = {},
  queryFn,
  queryKey,
}: UseGetListOptions<T>) => {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [debouncedFilter, setDebouncedFilter] = useState<Filter>(initialFilter);

  const debouncedSetFilter = useMemo(
    () =>
      debounce((newFilter: Filter) => {
        setDebouncedFilter(newFilter);
      }, debounceDelay),
    [debounceDelay]
  );

  useEffect(() => {
    debouncedSetFilter(filter);
    setPagination((p) => ({ ...p, page: 1 }));
  }, [filter, debouncedSetFilter]);

  const { data = [], ...reactQueryResult } = useQuery<T[], AxiosError>({
    ...useQueryOptions,
    refetchOnWindowFocus: false,
    queryKey: [...queryKey, debouncedFilter, pagination],
    queryFn: () => queryFn({ pagination, filter: debouncedFilter }),
  });

  return {
    data,
    filter,
    pagination,
    setFilter,
    setPagination,
    ...reactQueryResult,
  };
};
