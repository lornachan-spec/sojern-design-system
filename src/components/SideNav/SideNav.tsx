import React, { CSSProperties, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { navPrimary, text, shadows, spacing } from '../../tokens';
import { Icon } from '../Icons';
import { NavItem } from '../NavItem';
import { Tooltip } from '../Tooltip';
import { SojernLogo, SojernMark } from './SojernLogo';
import type { IconName } from '../Icons/Icons';
import type { BadgeStage } from '../Badge';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface SideNavSubItem {
  id: string;
  label: string;
  /** Optional release-stage badge shown inline after the label */
  badge?: BadgeStage;
}

export interface SideNavItem {
  id: string;
  label: string;
  icon: IconName;
  subItems?: SideNavSubItem[];
  /** Optional release-stage badge shown inline after the label */
  badge?: BadgeStage;
}

export interface SideNavProps {
  /** Top section — primary navigation items */
  topItems: SideNavItem[];
  /** Bottom section — utility items (Help, Account, etc.) */
  bottomItems: SideNavItem[];
  /** Currently active item id (top-level or sub-item) */
  activeId?: string;
  /** Called when a nav item or sub-item is clicked */
  onNavigate?: (id: string) => void;
  /**
   * Controlled collapsed state.
   * If omitted, the component manages its own collapsed state internally.
   */
  collapsed?: boolean;
  /** Called when the collapse toggle is clicked (use with controlled `collapsed`) */
  onCollapseToggle?: () => void;
  /** Logo element shown in expanded state. Defaults to Sojern wordmark. */
  logo?: React.ReactNode;
  /** Icon/mark shown in collapsed state. Defaults to Sojern compass mark. */
  logoMark?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const EXPANDED_WIDTH = 232;
const COLLAPSED_WIDTH = 52;

// -----------------------------------------------------------------------------
// Shared nav content renderer (used in both expanded and hover-drawer modes)
// -----------------------------------------------------------------------------

interface NavContentProps {
  topItems: SideNavItem[];
  bottomItems: SideNavItem[];
  activeId?: string;
  collapsed: boolean;
  expandedGroup: string | null;
  forceClosedGroup: string | null;
  onToggleGroup: (id: string) => void;
  onNavigate: (id: string) => void;
  onToggleCollapse: () => void;
  logo?: React.ReactNode;
  logoMark?: React.ReactNode;
  /** When true, renders as the hover drawer — shows >> expand button instead of << collapse */
  isHoverDrawer?: boolean;
}

function NavContent({
  topItems,
  bottomItems,
  activeId,
  collapsed,
  expandedGroup,
  forceClosedGroup,
  onToggleGroup,
  onNavigate,
  onToggleCollapse,
  logo,
  logoMark,
  isHoverDrawer = false,
}: NavContentProps) {
  const isGroupExpanded = (item: SideNavItem) => {
    if (forceClosedGroup === item.id) return false;
    return expandedGroup === item.id || (item.subItems?.some(s => s.id === activeId) ?? false);
  };

  const isParentOfActive = (item: SideNavItem) =>
    item.subItems?.some(s => s.id === activeId) ?? false;

  const logoAreaStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    paddingLeft: collapsed ? 0 : 16,
    paddingRight: collapsed ? 0 : 16,
    paddingBottom: 24,
    width: '100%',
    boxSizing: 'border-box',
  };

  const sectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  };

  const renderItem = (item: SideNavItem) => {
    const expanded = isGroupExpanded(item);
    const parentActive = isParentOfActive(item);
    const isTopActive = activeId === item.id;

    // Show orange active border on the parent when:
    // - it is the active item itself, OR
    // - it has an active sub-item but its group is collapsed (sub-items hidden), OR
    // - the whole nav is in collapsed (icon-only) mode — sub-items are never visible
    const showAsActive = isTopActive || (parentActive && (!expanded || collapsed));

    // "Active dropdown" style: has an active child AND group is expanded
    // → dark background + bold text, but NO orange border (handled via style override)
    const activeDropdownStyle =
      parentActive && !isTopActive && expanded
        ? { background: navPrimary.activeBackground }
        : undefined;

    const navItemEl = (
      <NavItem
        key={item.id}
        label={item.label}
        icon={item.icon}
        active={showAsActive}
        hasSubItems={!!item.subItems?.length}
        expanded={expanded}
        collapsed={collapsed}
        badge={!collapsed ? item.badge : undefined}
        style={activeDropdownStyle}
        onClick={() => {
          if (item.subItems?.length) onToggleGroup(item.id);
          else onNavigate(item.id);
        }}
      />
    );

    const wrappedItem = collapsed ? (
      <Tooltip key={item.id} content={item.label} position="right">
        {navItemEl}
      </Tooltip>
    ) : navItemEl;

    return (
      <React.Fragment key={item.id}>
        {wrappedItem}
        {!collapsed && expanded && item.subItems?.map(sub => (
          <NavItem
            key={sub.id}
            label={sub.label}
            isSubItem
            active={activeId === sub.id}
            badge={sub.badge}
            onClick={() => onNavigate(sub.id)}
          />
        ))}
      </React.Fragment>
    );
  };

  const renderBottomItem = (item: SideNavItem) => {
    const isActive = activeId === item.id;
    const navItemEl = (
      <NavItem
        key={item.id}
        label={item.label}
        icon={item.icon}
        active={isActive}
        collapsed={collapsed}
        onClick={() => onNavigate(item.id)}
      />
    );

    return collapsed ? (
      <Tooltip key={item.id} content={item.label} position="right">
        {navItemEl}
      </Tooltip>
    ) : navItemEl;
  };

  const defaultLogo = <SojernLogo />;
  const defaultLogoMark = <SojernMark size={20} />;

  return (
    <>
      {/* Logo + collapse toggle */}
      <div style={logoAreaStyle}>
        {collapsed ? (logoMark ?? defaultLogoMark) : (logo ?? defaultLogo)}
        {!collapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}
            aria-label={isHoverDrawer ? 'Expand navigation' : 'Collapse navigation'}
          >
            <Icon
              name={isHoverDrawer ? 'Double Chevron Right' : 'Double Chevron Left'}
              size={16}
              color={text.verticalNav}
            />
          </button>
        )}
      </div>

      {/* Top items */}
      <div style={{ ...sectionStyle, flex: 1 }}>
        {topItems.map(renderItem)}
      </div>

      {/* Bottom items — separated with extra spacing */}
      <div style={{
        ...sectionStyle,
        paddingTop: spacing.XL,
      }}>
        {bottomItems.map(renderBottomItem)}
      </div>
    </>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function SideNav({
  topItems,
  bottomItems,
  activeId,
  onNavigate,
  collapsed: collapsedProp,
  onCollapseToggle,
  logo,
  logoMark,
  className,
  style,
}: SideNavProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  // Tracks a group the user explicitly collapsed, overriding the auto-expand from activeId
  const [forceClosedGroup, setForceClosedGroup] = useState<string | null>(null);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  // Tracks drawer's viewport-relative position, kept fresh via scroll/resize listeners
  const [drawerRect, setDrawerRect] = useState<{ top: number; left: number; height: number } | null>(null);
  // Drives the CSS transition — true once the drawer DOM node has painted
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isControlled = collapsedProp !== undefined;
  const collapsed = isControlled ? collapsedProp : internalCollapsed;

  const handleToggleCollapse = () => {
    if (isControlled) onCollapseToggle?.();
    else setInternalCollapsed(c => !c);
    setHoverExpanded(false);
  };

  // Called from the hover drawer >> button — permanently expands the nav
  const handleExpandPermanently = () => {
    if (isControlled) onCollapseToggle?.();
    else setInternalCollapsed(false);
    setHoverExpanded(false);
  };

  const handleToggleGroup = (id: string) => {
    const allItems = [...topItems, ...bottomItems];
    const item = allItems.find(i => i.id === id);
    const hasActiveChild = item?.subItems?.some(s => s.id === activeId) ?? false;
    const currentlyExpanded =
      (forceClosedGroup !== id) && (expandedGroup === id || hasActiveChild);

    if (currentlyExpanded) {
      setExpandedGroup(null);
      setForceClosedGroup(id);
    } else {
      setExpandedGroup(id);
      setForceClosedGroup(null);
    }
  };

  const handleNavigate = (id: string) => {
    onNavigate?.(id);
    if (collapsed) setHoverExpanded(false);
    setExpandedGroup(null);
    // If navigating into a sub-item of the force-closed group, re-enable auto-expand
    const allItems = [...topItems, ...bottomItems];
    const parent = allItems.find(i => i.subItems?.some(s => s.id === id));
    if (parent && forceClosedGroup === parent.id) {
      setForceClosedGroup(null);
    }
  };

  // Hover expand: small delay to avoid flicker when moving between items.
  // Rect is captured here (before mount) so the portal renders at the correct
  // position on its very first frame — no snap from left:0.
  const handleMouseEnter = () => {
    if (!collapsed) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      if (navRef.current) {
        const r = navRef.current.getBoundingClientRect();
        setDrawerRect({ top: r.top, left: r.left, height: r.height });
      }
      setHoverExpanded(true);
    }, 80);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setHoverExpanded(false), 100);
  };

  // Hover drawer keeps itself alive while mouse is inside it
  const handleDrawerMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoverExpanded(true);
  };

  // Keep the drawer rect in sync with the nav's viewport position while open
  useEffect(() => {
    if (!hoverExpanded || !collapsed) {
      setDrawerVisible(false);
      return;
    }

    const updateRect = () => {
      if (navRef.current) {
        const r = navRef.current.getBoundingClientRect();
        setDrawerRect({ top: r.top, left: r.left, height: r.height });
      }
    };

    // Rect was already set in handleMouseEnter, but keep it live on scroll/resize
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);

    // Trigger fade-in after the first paint so the transition plays smoothly
    const raf = requestAnimationFrame(() => setDrawerVisible(true));

    return () => {
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
      cancelAnimationFrame(raf);
      setDrawerRect(null);
    };
  }, [hoverExpanded, collapsed]);

  // ── Styles ────────────────────────────────────────────────────────────────

  const navStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
    minHeight: '100%',
    background: navPrimary.background,
    boxShadow: 'none',
    borderRadius: 0,
    paddingTop: 16,
    paddingBottom: 16,
    boxSizing: 'border-box',
    transition: 'width 0.2s ease',
    overflowX: 'hidden',
    overflowY: 'auto',
    flexShrink: 0,
    ...style,
  };

  // The hover drawer is a fixed overlay that appears over page content.
  // Position is driven by drawerRect state (kept live via scroll/resize listeners)
  // so it never drifts when the page scrolls.
  const drawerStyle: CSSProperties = {
    position: 'fixed',
    top: drawerRect?.top ?? 0,
    left: drawerRect?.left ?? 0,
    width: EXPANDED_WIDTH,
    height: drawerRect?.height ?? '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: navPrimary.background,
    boxShadow: '4px 0 20px rgba(0,0,0,0.25)',
    borderRadius: 0,
    paddingTop: 16,
    paddingBottom: 16,
    boxSizing: 'border-box',
    zIndex: 1000,
    overflowX: 'hidden',
    overflowY: 'auto',
    // Pure opacity fade — no horizontal movement to avoid any leftward jump
    opacity: drawerVisible ? 1 : 0,
    transition: 'opacity 0.18s ease',
  };

  return (
    <>
      <nav
        ref={navRef}
        style={navStyle}
        className={className}
        role="navigation"
        aria-label="Primary navigation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavContent
          topItems={topItems}
          bottomItems={bottomItems}
          activeId={activeId}
          collapsed={collapsed}
          expandedGroup={expandedGroup}
          forceClosedGroup={forceClosedGroup}
          onToggleGroup={handleToggleGroup}
          onNavigate={handleNavigate}
          onToggleCollapse={handleToggleCollapse}
          logo={logo}
          logoMark={logoMark}
        />
      </nav>

      {/* Hover-expanded drawer — only mounts once drawerRect is known to avoid position snap */}
      {collapsed && hoverExpanded && drawerRect && typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <div
            style={drawerStyle}
            onMouseEnter={handleDrawerMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="navigation"
            aria-label="Primary navigation"
          >
            <NavContent
              topItems={topItems}
              bottomItems={bottomItems}
              activeId={activeId}
              collapsed={false}
              expandedGroup={expandedGroup}
              forceClosedGroup={forceClosedGroup}
              onToggleGroup={handleToggleGroup}
              onNavigate={handleNavigate}
              onToggleCollapse={handleExpandPermanently}
              logo={logo}
              logoMark={logoMark}
              isHoverDrawer
            />
          </div>,
          document.body,
        )
      }
    </>
  );
}
