import { useCallback, useState } from 'react';

/** When true, CTAs may use real links instead of the launching-soon modal. */
export const PORTAL_LINKS_LIVE = import.meta.env.VITE_USE_PORTAL_LINKS === 'true';

export function useLaunchSoonModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openLaunchSoon = useCallback(() => {
    if (!PORTAL_LINKS_LIVE) setIsOpen(true);
  }, []);

  const closeLaunchSoon = useCallback(() => setIsOpen(false), []);

  return { isOpen, openLaunchSoon, closeLaunchSoon };
}
