import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useShellStore } from '@/store/shellStore';

export function ShellLayout() {
  const sidebarOpen = useShellStore((s) => s.sidebarOpen);
  const toggleSidebar = useShellStore((s) => s.toggleSidebar);

  return (
    <div className="shell-layout">
      <Sidebar />
      <div className="shell-main" data-sidebar-open={sidebarOpen}>
        <header className="shell-header">
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={sidebarOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="shell-header-title">Atlas AI Platform</span>
        </header>
        <main className="shell-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
