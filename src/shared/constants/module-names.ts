export type RemoteKey = 'planning' | 'userApp' | 'paymentApp';

type ExposedByPlanning =
  | 'Skeleton'
  | 'TripCreationPage'
  | 'TripCreationSkeleton'
  | 'TripListPage'
  | 'TripListSkeleton'
  | 'TripDetailPage'
  | 'TripDetailSkeleton';

type ExposeByPayment = 'UserPaymentsPage' | 'AddCreditsPage';

type ExposedByUser =
  | 'ProfileLayout'
  | 'ProfilePage'
  | 'PasswordPage'
  | 'UserPreferencesPage';

export type ExposedModules =
  | ExposedByPlanning
  | ExposeByPayment
  | ExposedByUser;
