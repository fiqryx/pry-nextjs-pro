'use client'
import React from "react";
import { Product } from "@/types/product";
import { useHydrateAtoms } from 'jotai/utils'
import { productAtom, useProduct } from "../use-product";

interface Props {
    data: Product
    children: React.ReactNode
}

export function ProductHydrator({
    data,
    children
}: Props) {
    useHydrateAtoms([[productAtom, data]])
    const [product, setProduct] = useProduct()

    React.useEffect(() => {
        if (data.id !== product?.id) {
            setProduct(data)
        }
    }, [data])

    return children
}