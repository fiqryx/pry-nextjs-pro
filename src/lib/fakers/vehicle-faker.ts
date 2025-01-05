import { z } from 'zod'
import { createRandomMultiple } from '../faker';
import { vehicleSchema } from "@/types/vehicle";

const issues = [
    'Temperature not optimal',
    'ECU not responding',
    'Tires low air pressure'
]

const locations = [
    { region: "Malopolskie", coordinates: [19.9372, 50.0619], city: "Krakow" },
    { region: "Malopolskie", coordinates: [20.2160, 49.6218], city: "Nowy Sacz" },
    { region: "Slaskie", coordinates: [19.0258, 50.2649], city: "Katowice" },
    { region: "Slaskie", coordinates: [18.9353, 50.3116], city: "Gliwice" },
    { region: "Zachodniopomorskie", coordinates: [14.5528, 53.4285], city: "Szczecin" },
    { region: "Malopolskie", coordinates: [20.0336, 50.0647], city: "Bochnia" },
    { region: "Zachodniopomorskie", coordinates: [15.2931, 53.7512], city: "Koszalin" },
    { region: "Slaskie", coordinates: [19.4918, 50.2863], city: "Tychy" },
    { region: "Zachodniopomorskie", coordinates: [16.1610, 54.1682], city: "Kolobrzeg" },
    { region: "Malopolskie", coordinates: [20.4799, 49.9835], city: "Zakopane" },
    { region: "Slaskie", coordinates: [19.0357, 50.0145], city: "Rybnik" },
    { region: "Zachodniopomorskie", coordinates: [14.6208, 53.2590], city: "Swidwin" },
    { region: "Malopolskie", coordinates: [19.8079, 50.0586], city: "Wieliczka" },
    { region: "Slaskie", coordinates: [19.1228, 50.3431], city: "Zabrze" },
    { region: "Zachodniopomorskie", coordinates: [14.7689, 53.6572], city: "Police" },
    { region: "Malopolskie", coordinates: [20.0270, 49.8511], city: "Tarnow" },
    { region: "Slaskie", coordinates: [18.8570, 50.2945], city: "Bytom" },
    { region: "Zachodniopomorskie", coordinates: [15.2852, 54.1945], city: "Miedzyzdroje" },
    { region: "Malopolskie", coordinates: [19.8808, 49.8696], city: "Wadowice" },
    { region: "Slaskie", coordinates: [19.9353, 50.0280], city: "Chorzow" },
    { region: "Zachodniopomorskie", coordinates: [15.2001, 53.7725], city: "Drawsko Pomorskie" },
    { region: "Malopolskie", coordinates: [19.7765, 49.9694], city: "Oświęcim" },
    { region: "Slaskie", coordinates: [18.9798, 50.1450], city: "Pszczyna" },
    { region: "Zachodniopomorskie", coordinates: [15.5704, 54.0035], city: "Dziwnow" },
];

const status = [
    { status: "Delivered", timestamp: "Dec 27, 2024 2:45 PM" },
    { status: "Arrived at delivery facility", timestamp: "Dec 27, 2024 12:09 PM" },
    { status: "Out for delivery", timestamp: "Dec 27, 2024 11:18 AM" },
    { status: "Arrived at regional facility", timestamp: "Dec 27, 2024 6:45 AM" },
    { status: "Departed from facility", timestamp: "Dec 26, 2024 11:30 PM" },
    { status: "Package scanned", timestamp: "Dec 26, 2024 6:15 PM" },
    { status: "Tracking number created", timestamp: "Dec 26, 2024 2:00 PM" }
];

const vehicles = z.array(vehicleSchema).parse(createRandomMultiple({
    count: 20,
    extends: (f) => {
        const tracks = f.helpers.arrayElements(locations, { min: 8, max: 10 });

        const start = tracks[0];
        const end = tracks[tracks.length - 1];
        const issue = f.datatype.boolean(0.3);
        const statuses = status.map(v =>
            ({ ...v, timestamp: f.date.recent() })
        );

        return {
            id: '-',
            start: start.city + ', ' + start.region,
            end: end.city + ', ' + end.region,
            temp: f.number.int({ min: 5, max: !issue ? 15 : 35 }),
            issues: issue ? f.helpers.arrayElements(issues, { min: 0, max: 3 }) : [],
            location: tracks[tracks.length - 6],
            tracks: f.helpers.arrayElements(statuses, { min: 1, max: 3 })
        }
    }
})).map((v, i) =>
    ({ ...v, id: `VT-${String(i + 1).padStart(3, "0")}` })
)

export function getVehicles(limit?: number) {
    if (limit) {
        return vehicles.slice(0, limit);
    }
    return vehicles
}

export function getVehicleById(id: string) {
    if (id === '1') {
        id = vehicles[0].id;
    }
    return vehicles.find(v => v.id === id)
}