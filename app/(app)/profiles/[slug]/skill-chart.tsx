"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { countBy, filter, find, flatMap, map, orderBy, reduce, sumBy, uniq } from 'lodash';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Project } from '@/actions/entities/models/project'
import { useTranslations } from 'next-intl'
import { Tool } from '@/actions/entities/models/tool';

type Props = {
  projects: Array<Project>
}

export function SkillChart({
  projects
}: Props) {
  const t = useTranslations('ProfilePage');

  const projectsTools = filter(flatMap(projects, p => p.tools), t => !t.hideInTopSkills) as Tool[];
  const nameCounts = countBy(projectsTools, 'name');
  const sortedNames = orderBy(
    map(nameCounts, (occurrences, name) => ({ 
      name, 
      occurrences, 
      displayName: find(projectsTools, p => p.name === name)?.displayName,
      shortName: find(projectsTools, p => p.name === name)?.shortName,
      fill: `hsl(var(--color-${name}))` 
    })),
    ['occurrences'],
    ['desc']
  );
  const chartData = sortedNames.slice(0, 10);
  // const otherCount = sumBy(sortedNames.slice(4), 'occurrences');
  // if (otherCount > 0) {
  //   chartData.push({ name: 'other', occurrences: otherCount, displayName: undefined, fill: 'var(--color-other)' });
  // }

  const chartConfig = reduce(chartData, (acc, value, index) => {
    return {
      ...acc,
      [value.name]: {
        label: value.shortName || value.displayName || t(value.name),
        color: 'var(--foreground)'//`hsl(var(--chart-${index+1}))`,
      }
    }
  }, {
    occurrences: {
      label: t('projects')
    }
  }) satisfies ChartConfig;

  const allSkills = uniq(map(projectsTools, t => t.displayName));

  return (
    <div className="flex flex-col gap-4">
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 15,
          }}
        >
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />
          <XAxis dataKey="occurrences" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="occurrences" layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>

      {/* <div>
        <CardSubHeadline>{t('allSkills')}</CardSubHeadline>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((s) => (
            <Badge variant="outline">{s}</Badge>
          ))}
        </div>
      </div> */}
    </div>
  )
}
