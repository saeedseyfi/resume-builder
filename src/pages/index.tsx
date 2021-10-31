import type { NextPage } from 'next';
import { v4 } from 'uuid';

import {
  DividerPageElement,
  ExperiencePageElement,
  HeadPageElement,
  HeadingPageElement,
  SkillPageElement,
  Templates,
  TextPageElement,
} from '~type/resume';
import { Build } from '~comp/resume/build';
import { PageElementType } from '~comp/resume/constants';
import { ResumeContextProvider } from '~ctx/resume/provider';

const templates: Templates = {
  DIVIDER: {
    id: v4(),
    spaceBottom: 1,
    spaceTop: 1,
    type: PageElementType.DIVIDER,
  } as DividerPageElement,
  EXPERIENCE: {
    id: v4(),
    location: 'Stockholm, Sweden',
    name: 'LeoVegas',
    namePrefix: 'at',
    timespan: '12/2018 - Ongoing',
    title: 'JavaScript Engineer',
    type: PageElementType.EXPERIENCE,
    url: 'https://leovegas.com',
  } as ExperiencePageElement,
  HEAD: {
    contact: [
      {
        icon: 'alternate_email',
        link: 'mailto:me@johndoe.com',
        text: 'me@johndoe.com',
      },
      {
        icon: 'call',
        link: 'tel:+17766854347',
        text: '1-776-685-4347',
      },
      {
        icon: 'place',
        text: 'Redwood City, CA',
      },
      {
        icon: 'keyboard_double_arrow_right',
        link: 'https://github.com/johndoe',
        text: 'GitHub',
      },
      {
        icon: 'keyboard_double_arrow_right',
        link: 'https://www.linkedin.com/in/johndoe',
        text: 'LinkedIn',
      },
      {
        icon: 'keyboard_double_arrow_right',
        link: 'https://stackoverflow.com/users/1/johndoe',
        text: 'StackOverflow',
      },
    ],
    id: v4(),
    lorem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    name: 'Jane Doe',
    photo: '/avatar.jpeg',
    title: 'Senior JavaScript Developer',
    type: PageElementType.HEAD,
  } as HeadPageElement,
  HEADING: {
    id: v4(),
    text: 'Summary',
    type: PageElementType.HEADING,
  } as HeadingPageElement,
  SKILL: {
    id: v4(),
    rate: 8,
    rated: true,
    subTitle: 'TypeScript/ES5/ES6+',
    title: 'JavaScript',
    type: PageElementType.SKILL,
  } as SkillPageElement,
  TEXT: {
    id: v4(),
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: PageElementType.TEXT,
  } as TextPageElement,
};

const Home: NextPage = () => {
  return (
    <ResumeContextProvider templates={templates}>
      <Build />
    </ResumeContextProvider>
  );
};

export default Home;
