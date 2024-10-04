import { BlogWithDetails } from '@/actions/entities/models/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'

type Props = {
  paragraph: BlogWithDetails['paragraphs'][0]
}

export async function BlogParagraph({paragraph}: Props) {
  switch (paragraph.render) {
    case 'html':
      return (
        <section
          dangerouslySetInnerHTML={{ __html: paragraph.html }}
        ></section>
      );
    case 'markdown':
      return (
        <MDXRemote source={paragraph.markdown} />
      );
    default:
      throw new Error('Unsupported render value');
  }
}