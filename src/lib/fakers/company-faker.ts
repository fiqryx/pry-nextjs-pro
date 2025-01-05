import { z } from 'zod'
import { getJobs } from './jobs-faker';
import { createRandomMultiple } from '@/lib/faker';
import {
    Member,
    memberSchema,
    reviewSchema,
    companySchema,
    activitySchema,
} from '@/types/company';

const jobs = getJobs()

const photos = [
    '/assets/avatar-1.jpg',
    '/assets/avatar-2.jpg',
    '/assets/avatar-3.jpg',
    '/assets/avatar-4.jpg',
    '/assets/avatar-5.jpg',
    '/assets/avatar-6.jpg',
    '/assets/avatar-7.jpg',
    '/assets/avatar-8.jpg',
]

const members = z.array(memberSchema).parse(createRandomMultiple({
    count: 100,
    extends: (f) => ({
        name: f.person.fullName(),
        jobTitle: f.person.jobTitle(),
        photo: f.helpers.arrayElement(photos),
        skills: f.helpers.arrayElements([
            'Javascript',
            'Typescript',
            'Java',
            'Go',
            'Python',
            'C',
            'C++',
            'Ruby',
        ], { min: 1, max: 5 })
    })
}))

const reviews = z.array(reviewSchema).parse(createRandomMultiple({
    count: 100,
    extends: (f) => ({
        title: f.word.words({ count: { min: 3, max: 5 } }),
        user: f.person.fullName(),
        review: f.lorem.lines(),
        photo: f.helpers.arrayElement(photos),
        rate: f.number.float({ min: 1, max: 5, fractionDigits: 1 })
    })
}))

const activities = (members: Member[]) => z.array(activitySchema).parse(createRandomMultiple({
    count: 5,
    extends: (f) => ({
        activity: f.word.words({ count: { min: 3, max: 5 } }),
        member: f.helpers.arrayElement(members)
    })
}))

const companies = z.array(companySchema).parse(createRandomMultiple({
    count: 20,
    extends: (f) => {
        const fakerMembers = f.helpers.arrayElements(members, { min: 3, max: 10 })

        return {
            name: f.company.name(),
            logo: f.helpers.arrayElement([
                '/assets/logo-1.jpg',
                '/assets/logo-2.jpg',
                '/assets/logo-3.jpg',
                '/assets/logo-4.jpg',
                '/assets/logo-5.jpg',
                '/assets/logo-6.jpg',
            ]),
            slogan: f.lorem.lines(1),
            about: [f.lorem.paragraphs(3), f.lorem.paragraphs(), f.lorem.paragraphs()].join("|"),
            industry: f.company.catchPhraseNoun(),
            size: `${f.number.int({ min: 10, max: 50, multipleOf: 10 })} - ${f.number.int({ min: 50, max: 100, multipleOf: 10 })}`,
            site: f.internet.url({ appendSlash: false }),
            address: f.location.streetAddress({ useFullAddress: true }),
            city: f.location.city(),
            country: f.location.country(),
            members: fakerMembers,
            reviews: f.helpers.arrayElements(reviews, { min: 3, max: 15 }).sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            ),
            jobs: f.helpers.arrayElements(jobs, { min: 1, max: 4 }).sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            ),
            activities: activities(fakerMembers).sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            ),
            rate: f.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        }
    }
}))


export function getCompanies(limit?: number) {
    if (limit) {
        return companies.slice(0, limit)
    }
    return companies
}

export function getCompanyById(id: string) {
    if (id === '1') {
        const company = companies[0];

        company.id = id;

        return company
    }
    return companies.find(v => v.id === id)
}