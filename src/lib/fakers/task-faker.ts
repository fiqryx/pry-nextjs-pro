import { z } from 'zod'
import { taskSchema, userAssigneeSchema } from '@/types/task';
import { createRandomMultiple } from '@/lib/faker';

const users = z.array(userAssigneeSchema).parse(createRandomMultiple({
    count: 100,
    extends: (f) => ({
        name: f.person.fullName(),
        image: f.helpers.arrayElement([
            '/assets/avatar-1.jpg',
            '/assets/avatar-2.jpg',
            '/assets/avatar-3.jpg',
            '/assets/avatar-4.jpg',
            '/assets/avatar-5.jpg',
            '/assets/avatar-6.jpg',
            '/assets/avatar-7.jpg',
            '/assets/avatar-8.jpg',
        ]),
    })
}))

const tasks = z.array(taskSchema).parse(createRandomMultiple({
    count: 100,
    extends: (f) => {
        const chance = f.datatype.boolean({ probability: 0.7 });
        const startDate = chance ? f.date.between({
            from: new Date(),
            to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }) : undefined;

        const endDate = startDate ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : undefined

        return {
            name: f.lorem.words({ min: 2, max: 5 }),
            type: f.helpers.arrayElement(['task', 'subtask', 'bug'] as const),
            status: f.helpers.arrayElement(['todo', 'on-progress', 'done'] as const),
            startDate,
            endDate,
            assignee: f.helpers.arrayElement(users),
            createdAt: f.date.recent({ days: 30 }),
            updatedAt: f.date.recent({ days: 7 }),
        }
    }
}));

export function getTasks(limit?: number) {
    if (limit) {
        return tasks.slice(0, limit)
    }
    return tasks
}

export function getTaskById(id: string) {
    if (id === '1') {
        id = tasks[0].id
    }
    return tasks.find(v => v.id === id)
}