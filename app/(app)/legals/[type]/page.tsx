import { getLegalByType, getLegals } from '@/actions';
import { map } from 'lodash';
import { LegalDto } from '@/actions/entities/models/legal';
import { Card } from '../../components/card';
import { DynamicContent } from '../../components/content';

export const revalidate = 60;

export const dynamicParams = false;

export async function generateStaticParams() {
  const legals = await getLegals();

  return map(legals, (l) => ({
    type: l.type,
  }));
}

type Props = {
  params: Promise<{
    type: LegalDto['type'];
  }>;
};

export default async function LegalPage({ params }: Props) {
  const legal = await getLegalByType((await params).type);

  return (
    <div className='prose prose-lg prose-gray min-h-screen max-w-none pt-[var(--navbar-height)] dark:prose-invert'>
      <Card
        className='mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8'
        isFullscreen
      >
        <DynamicContent content={legal}></DynamicContent>
      </Card>
    </div>
  );
}
