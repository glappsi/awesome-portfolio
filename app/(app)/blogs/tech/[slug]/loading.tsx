import { Card } from '../../../components/card';
import { Header } from './header';
import { Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function BlogLoadingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <Card 
        className="max-w-full lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:mb-20 md:mt-20 py-8"
        isFullscreen>
        <header className="mb-8 flex justify-between items-start">
          <div className="flex items-center">
            <Skeleton className="max-w-full w-[48px] h-[48px] rounded-full" />
            <div>
              <Skeleton className="max-w-full w-[124px] h-[28px] rounded" />
              <Skeleton className="max-w-full w-[70px] h-[17px] rounded" />
            </div>
          </div>
          <span
            title="View counter for this page"
            className='duration-200 hover:font-medium flex items-center gap-1 text-zinc-600 hover:text-zinc-900'
          >
            <Eye className="w-5 h-5" />{" "}
            <Skeleton className="w-[32px] h-[39px] rounded" />
          </span>
        </header>
        <div
          className="prose prose-lg prose-gray max-w-none dark:prose-invert"
        >
          <Skeleton className="mb-8 max-w-full w-[202px] h-[40px] rounded" />
          <Skeleton className="mb-14 max-w-full w-[702px] h-[160px] rounded" />
          <Skeleton className="mb-8 max-w-full w-[402px] h-[40px] rounded" />
          <Skeleton className="mb-12 max-w-full w-[702px] h-[140px] rounded" />
          <Skeleton className="mb-8 max-w-full w-[202px] h-[36px] rounded" />
          <Skeleton className="max-w-full w-[702px] h-[120px] rounded" />
        </div>
      </Card>
    </div>
  )
}