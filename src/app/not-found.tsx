import Link from 'next/link';
import PageShell from '@/components/profile/PageShell';
import SectionPanel from '@/components/dashboard/SectionPanel';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <PageShell>
      <SectionPanel label="404 NOT FOUND">
        <div className="flex flex-col items-center text-center gap-3 py-6">
          <p className="text-4xl font-black italic text-white [-webkit-text-stroke:1.5px_#3d4f97] [text-shadow:3px_3px_0px_#21242e]">
            404
          </p>
          <p className="text-xs font-bold text-[#21242e]">존재하지 않는 마이링크 페이지입니다.</p>
          <Link href="/" className={buttonVariants({ variant: 'signal' })}>
            홈으로 ▶
          </Link>
        </div>
      </SectionPanel>
    </PageShell>
  );
}
