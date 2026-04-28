import Image from 'next/image';
import { Footer } from 'rsuite';
import { colors } from '@/src/lib/theme';

const AppFooter = () => {
  return (
    <Footer style={{ backgroundColor: colors.dark }}>
      {/* Logo section */}
      <div className="flex flex-col items-center py-10 gap-3">
        <div className="flex items-center gap-4">
          <Image src="/logo-white.png" alt="GGEAR Group" width={56} height={56} />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 mx-6" />

      {/* Bottom row */}
      <div className="flex items-center justify-between px-8 py-5">
        <p className="text-slate-400 text-sm">
          © 2026 GGEAR Group. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          Powered by
          <Image src="/biz-solution.png" alt="biz solution" width={80} height={24} />
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;