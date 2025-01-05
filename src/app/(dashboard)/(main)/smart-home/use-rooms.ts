import { atom, useAtom } from "jotai"


const roomsAtom = atom({
    selected: 'living room',
    list: [
        {
            value: "living room",
            label: "Living room",
        },
    ]
})

export function useRooms() {
    return useAtom(roomsAtom)
}
