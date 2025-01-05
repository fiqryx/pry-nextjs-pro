'use client'

export function useInput() {
    function nextSibling(e: React.FormEvent<HTMLInputElement>) {
        const target = e.currentTarget;
        if (target.value.length === 1) {
            const nextSibling = target.nextElementSibling as HTMLInputElement;
            if (nextSibling) {
                nextSibling.focus();
            }
        }
    }

    function prevSibling(e: React.KeyboardEvent<HTMLInputElement>) {
        const target = e.currentTarget;
        if (e.key === 'Backspace' && target.value.length === 0) {
            const prevSibling = target.previousElementSibling as HTMLInputElement;
            if (prevSibling) {
                prevSibling.focus();
            }
        }
    }

    return {
        nextSibling,
        prevSibling
    }
}