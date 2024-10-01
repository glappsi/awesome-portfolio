import { getBlogBySlug } from '@/actions';

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({
  params
}: Props) {
  const blog = await getBlogBySlug((await params).slug);
  console.log(JSON.stringify(blog, null, 2));

  return (
    <div>
      <article className="prose">
      {blog.paragraphs.map(({ html }, index) => (
          <section
            key={index}
            dangerouslySetInnerHTML={{ __html: html }}
          ></section>
        ))}
      </article>
    </div>
  )
}