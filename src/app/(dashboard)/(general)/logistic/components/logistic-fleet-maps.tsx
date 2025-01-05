'use client'
import React from "react";
import Map from 'react-map-gl';
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

import {
    useVehicle,
    useVehicles
} from "../use-vehicles";
import {
    Marker,
    useMap,
    GeolocateControl,
    NavigationControl,
} from 'react-map-gl';

export function LogisticFleetMaps({
    ...props
}: React.ComponentProps<'div'>) {
    const { fleet_map } = useMap();
    const [vehicles] = useVehicles();

    const [selected, setSelected] = useVehicle();
    const [viewState, setViewState] = React.useState({
        zoom: 5,
        longitude: selected?.location.coordinates[0],
        latitude: selected?.location.coordinates[1],
    });


    return (
        <div {...props}>
            <Map
                {...viewState}
                id="fleet_map"
                antialias
                pitch={45}
                bearing={-17.6}
                attributionControl={false}
                mapStyle="mapbox://styles/mapbox/light-v11"
                onMove={(e) => setViewState(e.viewState)}
                mapboxAccessToken={site.mapbox.accessToken}
            >
                <GeolocateControl />
                <NavigationControl />
                {vehicles.map((item, idx) => (
                    <Marker
                        key={idx}
                        anchor="bottom"
                        longitude={item.location.coordinates[0]}
                        latitude={item.location.coordinates[1]}
                        onClick={(e) => {
                            if (selected?.id === item.id) {
                                setSelected(undefined)
                                fleet_map?.flyTo({ zoom: 5 })
                            } else {
                                setSelected(item)
                                fleet_map?.flyTo({ zoom: 15.5, center: e.target._lngLat })
                            }
                        }}
                    >
                        <img
                            alt="marker"
                            src="/assets/marker-delivery-04.png"
                            className={cn(
                                'size-10',
                                selected?.id === item.id && 'drop-shadow-[0_0_4px_hsl(var(--primary))]'
                            )}
                        />
                    </Marker>
                ))}
            </Map>
        </div>
    )
}