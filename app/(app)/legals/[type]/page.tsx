import { getLegalByType, getLegals } from '@/actions';
import { map } from 'lodash';
import { LegalDto } from '@/actions/entities/models/legal';
import { Card } from '../../components/card';
import { DynamicContent } from '../../components/content';

export const revalidate = 60;

export const dynamicParams = false;

export async function generateStaticParams() {
  const legals = await getLegals();

  return map(legals, l => ({
    type: l.type
  }));
}

type Props = {
  params: Promise<{
    type: LegalDto['type'];
  }>;
};

export default async function LegalPage({
  params
}: Props) {
  const legal = await getLegalByType((await params).type);

  return (
    <div className="min-h-screen pt-[var(--navbar-height)] prose prose-lg prose-gray max-w-none dark:prose-invert">
      <Card 
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        isFullscreen>
        <DynamicContent
          content={legal}
        ></DynamicContent>
      </Card>
    </div>
  )
}