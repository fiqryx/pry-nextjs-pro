'use client'
import React from "react";
import { Company } from "@/types/company";
import { useHydrateAtoms } from 'jotai/utils'
import { companyAtom, useCompany } from "../use-company";

interface Props {
    data: Company
    children: React.ReactNode
}

export function CompanyHydrator({
    data,
    children
}: Props) {
    useHydrateAtoms([[companyAtom, data]])
    const [company, setCompany] = useCompany()

    React.useEffect(() => {
        if (data.id !== company?.id) {
            setCompany(data)
        }
    }, [data])

    return children
}