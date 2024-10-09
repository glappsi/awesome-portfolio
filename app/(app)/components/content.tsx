import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  content: {
    render: 'html' | 'markdown';
    html?: string;
    markdown?: string;
  };
};

export async function DynamicContent({ content }: Props) {
  switch (content.render) {
    case 'html':
      return (
        <section dangerouslySetInnerHTML={{ __html: content.html! }}></section>
      );
    case 'markdown':
      return <MDXRemote source={content.markdown!} />;
    default:
      throw new Error('Unsupported render value');
  }
}
