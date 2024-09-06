import { NavRouteType } from "@/types/NavTypes";

const navRoutes: NavRouteType[] = [
  {
    label: 'Կատեգորիաներ',
    pathname: '/categories'
  },
  {
    label: 'Ապրանքներ',
    pathname: '/items'
  }
];

export default navRoutes as NavRouteType[];