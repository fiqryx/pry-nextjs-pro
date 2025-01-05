'use client'
import React from "react";
import { Order } from "@/types/order";
import { useHydrateAtoms } from 'jotai/utils'
import { orderAtom, useOrder } from "../use-order";

interface Props {
    data: Order
    children: React.ReactNode
}

export function OrderHydrator({
    data,
    children
}: Props) {
    useHydrateAtoms([[orderAtom, data]])
    const [order, setOrder] = useOrder()

    React.useEffect(() => {
        if (data.id !== order?.id) {
            setOrder(data)
        }
    }, [data])

    return children
}