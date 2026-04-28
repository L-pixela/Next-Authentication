'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Dropdown, Avatar, Header } from 'rsuite';
import { useSession } from 'next-auth/react';
import { useLogin } from '@/src/modules/auth/hooks';
import { MdOutlineManageAccounts, MdLockOutline, MdLogout } from 'react-icons/md';

const AppHeader = () => {
  const { data: session, status } = useSession();
  const { logout } = useLogin();

  const isLoggedIn = status === 'authenticated';

  return (
    <Header>
      <Navbar style={{ backgroundColor: '#1E1E1E', padding: '0px' }}>
        <Navbar.Brand>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="GGEAR Group" width={48} height={48} />
          </div>
        </Navbar.Brand>

        <div className="ml-auto flex items-center pr-4">
          {isLoggedIn ? (
            <Dropdown
              placement="bottomEnd"
              renderToggle={(props, ref) => (
                <div
                  {...props}
                  ref={ref}
                  className="flex items-center gap-2 cursor-pointer text-white"
                >
                  <Avatar
                    circle
                    size="sm"
                    style={{ backgroundColor: '#ED1651', cursor: 'pointer' }}
                  >
                    {session?.user?.name?.charAt(0).toUpperCase() ?? 'U'}
                  </Avatar>
                  <span className="text-sm font-medium">
                    {session?.user?.name ?? 'User'}
                  </span>
                </div>
              )}
            >
              <Dropdown.Item
                icon={<MdOutlineManageAccounts size={16} />}
                as={Link}
                href="/profile"
              >
                View Profile
              </Dropdown.Item>

              <Dropdown.Item
                icon={<MdLockOutline size={16} />}
                as={Link}
                href="/change-password"
              >
                Change Password
              </Dropdown.Item>

              <Dropdown.Separator />

              <Dropdown.Item
                icon={<MdLogout size={16} />}
                onClick={logout}
                style={{ color: '#ED1651' }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link href="/login">
              <button
                style={{
                  backgroundColor: '#ED1651',
                  border: 'none',
                  borderRadius: 6,
                  color: 'white',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </Navbar>
    </Header>
  );
};

export default AppHeader;