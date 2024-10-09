import { Blog } from '@/actions/entities/models/blog';
import { filter } from 'lodash';
import { getFAQs, getProjects } from '@/actions';

export function generateBlog(blog: Blog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.summary,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    datePublished: blog.date.toISOString(),
  };
}

export async function generateBlogs() {
  const projects = await getProjects();
  const blogProjects = filter(projects, (p) => !!p.blog);

  return blogProjects.map(({ blog }) => generateBlog(blog!));
}

export async function generateFAQs() {
  const faqs = await getFAQs();
  if (!faqs?.length) {
    return;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
