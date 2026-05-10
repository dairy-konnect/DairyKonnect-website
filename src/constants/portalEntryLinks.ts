/**
 * Role → marketing / product page on this site. Single source for Get started, nav
 * dashboard mega-menu, and footer dashboard links.
 */
export type PortalEntryRole = 'farmer' | 'vendor' | 'dairy';

export const PORTAL_PATHS: Record<PortalEntryRole, string> = {
  farmer: '/farmer',
  vendor: '/vendor',
  dairy: '/dairy',
};

export type PortalEntryDefinition = {
  role: PortalEntryRole;
  path: string;
  icon: string;
  nameKey: 'userTypeModal.farmer.name' | 'userTypeModal.vendor.name' | 'userTypeModal.dairy.name';
  descriptionKey: 'userTypeModal.farmer.description' | 'userTypeModal.vendor.description' | 'userTypeModal.dairy.description';
};

/** Order shown in the Get started modal (farmer-first). */
export const GET_STARTED_PORTAL_ENTRIES: readonly PortalEntryDefinition[] = [
  {
    role: 'farmer',
    path: PORTAL_PATHS.farmer,
    icon: '🐄',
    nameKey: 'userTypeModal.farmer.name',
    descriptionKey: 'userTypeModal.farmer.description',
  },
  {
    role: 'vendor',
    path: PORTAL_PATHS.vendor,
    icon: '🚚',
    nameKey: 'userTypeModal.vendor.name',
    descriptionKey: 'userTypeModal.vendor.description',
  },
  {
    role: 'dairy',
    path: PORTAL_PATHS.dairy,
    icon: '🏭',
    nameKey: 'userTypeModal.dairy.name',
    descriptionKey: 'userTypeModal.dairy.description',
  },
] as const;
