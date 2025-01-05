'use client'
import React from "react";
import { Customer } from "@/types/customer";
import { useHydrateAtoms } from 'jotai/utils'
import { customerAtom, useCustomer } from "../use-customer";

interface Props {
    data: Customer
    children: React.ReactNode
}

export function CustomerHydrator({
    data,
    children
}: Props) {
    useHydrateAtoms([[customerAtom, data]])
    const [customer, setCustomer] = useCustomer()

    React.useEffect(() => {
        if (data.id !== customer?.id) {
            setCustomer(data)
        }
    }, [data])

    return children
}