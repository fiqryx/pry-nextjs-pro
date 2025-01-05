'use client'
import React from "react";
import { Company } from "@/types/company";
import { useHydrateAtoms } from 'jotai/utils'
import {
    useCompany,
    companyAtom,
} from "../use-company";

interface Props {
    data: Company[]
    children: React.ReactNode
}

export function JobsHydrator({
    data,
    children
}: Props) {
    useHydrateAtoms([[companyAtom, data]])
    const [company, setCompany] = useCompany()

    React.useEffect(() => {
        if (data.length !== company.length) {
            setCompany(data)
        }
    }, [data])

    return children
}