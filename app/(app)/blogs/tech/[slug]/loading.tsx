import { Card } from '../../../components/card';
import { Header } from './header';
import { Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function BlogLoadingPage() {
  return (
    <div className='min-h-screen'>
      <Header />

      <Card
        className='mx-auto max-w-full px-4 py-8 sm:px-6 md:mt-20 lg:mb-20 lg:max-w-3xl lg:px-8'
        isFullscreen
      >
        <header className='mb-8 flex items-start justify-between'>
          <div className='flex items-center'>
            <Skeleton className='size-[48px] max-w-full rounded-full' />
            <div>
              <Skeleton className='h-[28px] w-[124px] max-w-full rounded' />
              <Skeleton className='h-[17px] w-[70px] max-w-full rounded' />
            </div>
          </div>
          <span
            title='View counter for this page'
            className='flex items-center gap-1 text-zinc-600 duration-200 hover:font-medium hover:text-zinc-900'
          >
            <Eye className='size-5' />{' '}
            <Skeleton className='h-[39px] w-[32px] rounded' />
          </span>
        </header>
        <div className='prose prose-lg prose-gray max-w-none dark:prose-invert'>
          <Skeleton className='mb-8 h-[40px] w-[202px] max-w-full rounded' />
          <Skeleton className='mb-14 h-[160px] w-[702px] max-w-full rounded' />
          <Skeleton className='mb-8 h-[40px] w-[402px] max-w-full rounded' />
          <Skeleton className='mb-12 h-[140px] w-[702px] max-w-full rounded' />
          <Skeleton className='mb-8 h-[36px] w-[202px] max-w-full rounded' />
          <Skeleton className='h-[120px] w-[702px] max-w-full rounded' />
        </div>
      </Card>
    </div>
  );
}
