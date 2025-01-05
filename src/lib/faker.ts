import { Faker, faker } from '@faker-js/faker';

faker.seed(12)


export type FakerOptions = {
    /**
     * The number or range of elements to generate.
     *
     * @default 3
     */
    count?: number | {
        min: number;
        max: number;
    };
    /**
     * extends customize record
     */
    extends?: (f: Faker) => Record<string, any>
}


function createFaker(extended?: (f: Faker) => Record<string, any>) {
    return () => {
        return {
            id: faker.string.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent({ days: 3 }),
            ...(extended && extended(faker))
        };
    }
}


export function createRandomMultiple(op?: FakerOptions) {
    return faker.helpers.multiple(createFaker(op?.extends), op)
}