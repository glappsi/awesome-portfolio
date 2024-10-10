import { Blog, BlogDto, BlogWithDetails, BlogWithDetailsDto } from '@/actions/entities/models/blog';
import { CareerStep, CareerStepDto } from '@/actions/entities/models/career-step';
import { CategoryDto } from '@/actions/entities/models/category';
import { FAQ } from '@/actions/entities/models/faq';
import { Legal, LegalDto } from '@/actions/entities/models/legal';
import { Link, LinkDto } from '@/actions/entities/models/link';
import { Profile, ProfileDto } from '@/actions/entities/models/profile';
import { Project, ProjectDto } from '@/actions/entities/models/project';
import { Skill, SkillDto } from '@/actions/entities/models/skill';
import { Testimonial, TestimonialDto } from '@/actions/entities/models/testimonial';
import { ToolDto } from '@/actions/entities/models/tool';
import { IconKeys } from '@/components/ui/icon';
import { isSandboxed, url } from '@/lib/env';
import { faker } from '@faker-js/faker';
import { Effect } from 'effect';

export const generateImage = (width: number, height: number) => ({
  url: `https://placehold.co/${width}x${height}/000000/FFFFFF/png?text=?`,
  alt: faker.lorem.words(3),
  width: width,
  height: height,
  needsLightBackground: false,
});

export const generateProfileDto = (): ProfileDto => ({
  id: 1,
  name: '<NO CONFIG>',
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  location: faker.location.city(),
  keywords: faker.helpers.multiple(() => faker.word.noun(), {
    count: 5,
  }).join(','),
  description: `Configure your profile under ${url}/admin/collections/profiles/create`,
  slug: 'sandbox',
  image: generateImage(600, 600),
  aboutMe: `I need to be configured under ${url}/admin/collections/profiles/create`
});
export const generateProfile = (): Profile => generateProfileDto();

export const generateCategoryDto = (): CategoryDto => ({
  id: faker.number.int(),
  name: faker.commerce.department(),
  displayName: faker.commerce.department()
});

export const generateToolDto = (): ToolDto => {
  const tool = faker.helpers.arrayElement([{
    name: 'nextjs',
    displayName: 'Next.js'
  }, {
    name: 'react',
    displayName: 'React'
  }, {
    name: 'angular',
    displayName: 'Angular'
  }, {
    name: 'tailwindcss',
    displayName: 'Tailwind'
  }, {
    name: 'docker',
    displayName: 'Docker'
  }, {
    name: 'mysql',
    displayName: 'MySQL'
  }, {
    name: 'vuejs',
    displayName: 'Vue'
  }, {
    name: 'flutter',
    displayName: 'Flutter'
  }, {
    name: 'dart',
    displayName: 'Dart'
  }]);

  return {
    id: faker.number.int(),
    ...tool
  }
};

export const generateCareerStepDto = (): CareerStepDto => ({
  id: faker.number.int(),
  title: faker.person.jobTitle(),
  company: faker.company.name(),
  description: faker.lorem.sentence(),
  start: faker.date.past().toISOString(),
  end: faker.datatype.boolean() ? faker.date.recent().toISOString() : null,
  projects: [
    {
      categories: faker.helpers.multiple(generateCategoryDto, {
        count: 5,
      }),
      tools: faker.helpers.multiple(generateToolDto, {
        count: 5,
      }),
    },
  ],
});
export const generateCareerStep = (): CareerStep => ({
  ...generateCareerStepDto(),
  start: faker.date.past(),
  end: faker.datatype.boolean() ? faker.date.recent() : null,
})
export const generateCareerStepDtos = () => faker.helpers.multiple(generateCareerStepDto, {
  count: 5,
});
export const generateCareerSteps = () => faker.helpers.multiple(generateCareerStep, {
  count: 5,
});

export const generateLegalDto = (type: LegalDto['type']): LegalDto => ({
  id: faker.number.int(),
  content: faker.lorem.paragraphs(),
  markdown: faker.lorem.paragraphs(3),
  html: faker.lorem.paragraphs(3, '<br>'),
  render: faker.helpers.arrayElement(['html', 'markdown']),
  type
});
export const generateLegal = (type: LegalDto['type']): Legal => generateLegalDto(type)
export const generateLegalDtos = () => ([
  generateLegalDto('imprint'),
  generateLegalDto('privacy'),
]);
export const generateLegals = () => ([
  generateLegal('imprint'),
  generateLegal('privacy'),
]);

export const generateProjectDto = (): ProjectDto => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentences(10),
  start: faker.date.past().toISOString(),
  end: faker.datatype.boolean() ? faker.date.recent().toISOString() : null,
  published: true,
  highlight: faker.datatype.boolean(),
  type: faker.helpers.arrayElement(['profession', 'hobby']),
  badge: faker.datatype.boolean() ? generateImage(400, 100) : null,
  blog: generateBlogDto(),
  categories: faker.helpers.multiple(generateCategoryDto, {
    count: 5,
  }),
  tools: faker.helpers.multiple(generateToolDto, {
    count: 5,
  }),
});
export const generateProject = (): Project => ({
  ...generateProjectDto(),
  start: faker.date.past(),
  end: faker.datatype.boolean() ? faker.date.recent() : null,
  blog: generateBlog()
});
export const generateProjectDtos = () => faker.helpers.multiple(generateProjectDto, {
  count: 5,
});
export const generateProjects = () => faker.helpers.multiple(generateProject, {
  count: 5,
});

export const generateSkillDto = (): SkillDto => ({
  id: faker.number.int(),
  title: faker.lorem.words(2),
  type: faker.helpers.arrayElement(['profession', 'soft']),
  categories: faker.helpers.multiple(generateCategoryDto, {
    count: 5,
  }),
  tools: faker.helpers.multiple(generateToolDto, {
    count: 5,
  }),
});
export const generateSkill = (): Skill => generateSkillDto();
export const generateSkillDtos = () => faker.helpers.multiple(generateSkillDto, {
  count: 18,
});
export const generateSkills = () => faker.helpers.multiple(generateSkill, {
  count: 18,
});

export const generateTestimonialDto = (): TestimonialDto => ({
  id: faker.number.int(),
  quote: faker.lorem.sentences(4),
  author: faker.person.fullName(),
  description: faker.lorem.sentence(),
  avatar: faker.datatype.boolean() ? generateImage(400, 400) : null,
});
export const generateTestimonial = (): Testimonial => generateTestimonialDto();
export const generateTestimonialDtos = () => faker.helpers.multiple(generateTestimonialDto, {
  count: 5,
});
export const generateTestimonials = () => faker.helpers.multiple(generateTestimonial, {
  count: 5,
});

export const generateLinkDto = (): LinkDto => ({
  id: faker.number.int(),
  title: faker.lorem.words(3),
  symbol: faker.datatype.boolean() ? faker.lorem.word() : null,
  icon: faker.helpers.arrayElement(IconKeys), // Assuming IconKeys contains valid icon enums
  link: faker.internet.url(),
  showInNavigation: true,
  hideOnMobile: false,
  isExternal: true,
  download: null,
});
export const generateLink = (): Link => generateLinkDto();
export const generateLinkDtos = () => faker.helpers.multiple(generateLinkDto, {
  count: 1,
});
export const generateLinks = () => faker.helpers.multiple(generateLink, {
  count: 1,
});

export const generateBlogDto = (): BlogDto => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(),
  summary: faker.datatype.boolean() ? faker.lorem.sentences() : null,
  keywords: faker.helpers.multiple(() => faker.word.noun(), {
    count: 5,
  }).join(','),
  slug: 'mock-blog',
  author: faker.person.fullName(),
  authorImage: faker.datatype.boolean() ? generateImage(400, 400) : null,
  thumbnail: faker.datatype.boolean() ? generateImage(400, 400) : null,
  date: faker.date.past().toISOString(),
  published: true,
  views: faker.number.int(),
  type: faker.helpers.arrayElement(['tech']),
});
export const generateBlog = (): Blog => ({
  ...generateBlogDto(),
  date: faker.date.past(),
});
const generateParagraph = () => ({
  content: faker.lorem.paragraph(),
  markdown: faker.lorem.paragraph(),
  html: faker.lorem.paragraphs(1, '<br>'),
  render: faker.helpers.arrayElement(['html', 'markdown']),
});
export const generateBlogDetailDto = (): BlogWithDetailsDto => ({
  ...generateBlogDto(),
  links: [],
  gallery: faker.helpers.multiple(() => generateImage(1000, 1000), {
    count: 8,
  }),
  paragraphs: faker.helpers.multiple(generateParagraph, {
    count: 8,
  }),
});
export const generateBlogDetail = (): BlogWithDetails => ({
  ...generateBlogDetailDto(),
  ...generateBlog()
});

export const generateFAQs = () => [] as FAQ[];

export const generateCreatedMessageDto = () => 1;
export const generateCreatedMessage = () => ({ id: generateCreatedMessageDto() });

export const sandBoxPipe = <TResult>(data: () => TResult) => {
  return Effect.catchAll((error) => {
    if (isSandboxed) {
      return Effect.succeed<TResult>(data());
    }

    return Effect.fail(error); // Re-throw the error after logging
  })
}