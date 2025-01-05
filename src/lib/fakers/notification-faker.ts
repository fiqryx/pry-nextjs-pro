import { createRandomMultiple } from '@/lib/faker'
import { notificationSchema } from '@/types/notification'
import { z } from 'zod'

const notifications = z.array(notificationSchema).parse(createRandomMultiple({
    count: 10,
    extends: (f) => ({
        name: f.person.fullName(),
        date: f.date.recent({ days: 3 }),
        message: f.word.words({ count: 5 }),
        avatar: f.helpers.arrayElement([
            '/assets/avatar-1.jpg',
            '/assets/avatar-2.jpg',
            '/assets/avatar-3.jpg',
            '/assets/avatar-4.jpg',
            '/assets/avatar-5.jpg',
            '/assets/avatar-6.jpg',
            '/assets/avatar-7.jpg',
            '/assets/avatar-8.jpg',
        ]),
    }),
}))


export function getNotifications(limit?: number) {
    if (limit) {
        return notifications.slice(0, limit)
    }
    return notifications
}