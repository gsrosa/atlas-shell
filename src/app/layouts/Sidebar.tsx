import { NavLink } from 'react-router-dom';
import { getEnabledMicrofrontends } from '@/microfrontends/registry';
import { useShellStore } from '@/store/shellStore';

const navItems = [
  { to: '/', label: 'Home' },
  ...getEnabledMicrofrontends().map((mfe) => ({
    to: mfe.routePath.replace('/*', ''),
    label: mfe.navigationLabel,
  })),
];

export function Sidebar() {
  const sidebarOpen = useShellStore((s) => s.sidebarOpen);

  return (
    <aside
      className="sidebar"
      data-open={sidebarOpen}
      aria-label="Main navigation"
    >
      <div className="sidebar-header">
        <span className="sidebar-logo">Atlas AI</span>
      </div>
      <nav>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
