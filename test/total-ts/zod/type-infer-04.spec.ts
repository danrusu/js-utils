// CODE
import { it } from 'vitest';
import { z } from 'zod';

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

// export for reusage
export type StarWarsPeopleResultType = z.infer<typeof StarWarsPeopleResults>;

const logStarWarsPeopleResults = (data: StarWarsPeopleResultType) => {
  data.results.forEach(person => {
    console.log(person.name);
  });
};

it('log people', () => {
  logStarWarsPeopleResults({
    results: [{ name: 'luke' }, { name: 'yoda' }],
  });
});
