export type RemoteKey = 'planning' | 'userApp' | 'paymentApp';

export const MODULE_NAMES: Record<string, RemoteKey> = {
  PLANNING: 'planning',
  USER: 'userApp',
  PAYMENT: 'paymentApp',
};

type ExposedByPlanning =
  | 'Skeleton'
  | 'TripCreationPage'
  | 'TripCreationSkeleton'
  | 'TripListPage'
  | 'TripListSkeleton'
  | 'TripDetailPage'
  | 'TripDetailSkeleton';

export const EXPOSE_MODULES = {
  PLANNING: {
    SKELETON: 'Skeleton',
    TRIP_CREATION_PAGE: 'TripCreationPage',
    TRIP_CREATION_SKELETON: 'TripCreationSkeleton',
    TRIP_LIST_PAGE: 'TripListPage',
    TRIP_LIST_SKELETON: 'TripListSkeleton',
    TRIP_DETAIL_PAGE: 'TripDetailPage',
    TRIP_DETAIL_SKELETON: 'TripDetailSkeleton',
  } as Record<string, ExposedByPlanning>,
};

export type ExposedModules = ExposedByPlanning;
