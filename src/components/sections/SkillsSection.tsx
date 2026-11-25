import { SKILLS_DATA } from '../../data/skills';
import { SectionHeading } from '../common/SectionHeading';
import { StaggerGroup } from '../motion/MotionPrimitives';
import { SkillCategory } from './SkillCategory';

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative z-10 scroll-mt-20 border-t border-[var(--border-subtle)] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          headingId="skills-heading"
          index="02"
          label="Skills"
          title="Foundations across languages, data, and software principles."
          subtitle="A focused toolkit built through coursework, personal experimentation, and consistent problem solving."
        />

        <StaggerGroup className="grid gap-6 md:grid-cols-2">
          {SKILLS_DATA.map((category) => (
            <SkillCategory key={category.id} category={category} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
