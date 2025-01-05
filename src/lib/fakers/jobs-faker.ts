import { z } from 'zod'
import { jobsSchema } from '@/types/jobs';
import { createRandomMultiple } from '@/lib/faker';


const jobs = z.array(jobsSchema).parse(createRandomMultiple({
    count: 100,
    extends: (f) => ({
        title: f.person.jobTitle(),
        category: f.helpers.arrayElement(['freelance', 'contract', 'employee']),
        tags: f.helpers.multiple(() => f.person.jobType()),
        startDate: f.date.recent({ days: 30 }),
        endDate: f.date.soon({ days: 30 }),
        budgetMin: f.number.float({ min: 10, max: 100, multipleOf: 0.25 }),
        budgetMax: f.number.float({ min: 100, max: 200, multipleOf: 0.25 }),
        describe: f.lorem.paragraphs(),
        createdAt: f.date.recent({ days: 30 }),
    })
}))

export function getJobs(limit?: number) {
    if (limit) {
        return jobs.slice(0, limit)
    }
    return jobs
}

export function getJobsById(id: string) {
    if (id === '1') {
        id = jobs[0].id
    }
    return jobs.find(v => v.id === id)
}