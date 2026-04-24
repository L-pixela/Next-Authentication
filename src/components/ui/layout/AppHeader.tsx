'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Button } from 'rsuite';

const AppHeader = () => {
  return (
    <>
      <Navbar style={{ backgroundColor: '#1E1E1E', padding: '0 px' }}>
        <Navbar.Brand>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="GGEAR Group" width={48} height={48} />
          </div>
        </Navbar.Brand>

        <div className="ml-auto flex items-center pr-2">
          <Link href="/login">
            <Button
              appearance="primary"
              style={{
                backgroundColor: '#ED1651',
                border: 'none',
                borderRadius: 6,
              }}
            >
              Login
            </Button>
          </Link>
        </div>
      </Navbar>
    </>
  );
};

export default AppHeader;