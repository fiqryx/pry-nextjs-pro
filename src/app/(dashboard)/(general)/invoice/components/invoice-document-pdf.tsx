'use client'
import React from "react";
import { cn, tw } from "@/lib/utils";
import { useInvoice } from "../use-invoices";

import {
    Document,
    Page,
    Text,
    View,
    Svg,
    Path,
} from "@react-pdf/renderer";

export function InvoiceDocumentPDF() {
    const [invoice] = useInvoice()

    if (!invoice) {
        return null
    }

    const order = invoice.order;
    const customer = order.customer;
    const products = order.products;

    return (
        <Document>
            <Page size="A4" style={tw("p-6 flex-1 gap-10")}>
                {/* header */}
                <View
                    wrap={false}
                    style={tw('flex flex-row justify-between items-center')}
                >
                    <Text style={tw("text-2xl font-medium")}>
                        Invoice
                    </Text>
                    <Svg style={{ width: 40, height: 40 }} viewBox="0 0 24 24">
                        <Path
                            fill="none"
                            stroke="#00000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0ZM12 2v20"
                        />
                    </Svg>
                </View>

                {/* info invoiced */}
                <View style={tw('flex flex-row gap-8')}>
                    <View style={tw('flex flex-col gap-3.5')}>
                        <Text style={tw('text-sm')}>Number</Text>
                        <Text style={tw('text-sm')}>Due date</Text>
                        <Text style={tw('text-sm')}>Issue date</Text>
                        <Text style={tw('text-sm')}>Issuer VAT No</Text>
                    </View>
                    <View style={tw('flex flex-col gap-3.5')}>
                        <Text style={tw('text-sm')}>: {invoice.invoiceId}</Text>
                        <Text style={tw('text-sm')}>
                            : {invoice.dueDate.toLocaleString('en', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </Text>
                        <Text style={tw('text-sm')}>
                            : {invoice.issueDate.toLocaleString('en', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </Text>
                        <Text style={tw('text-sm')}>: {invoice.issueNo}</Text>
                    </View>
                </View>

                {/* billed to */}
                <View style={tw('flex flex-row flex-wrap gap-8')}>
                    <View style={tw('flex-1 flex-col min-w-[200pt]')}>
                        <Text style={tw("text-sm font-semibold leading-relaxed")}>
                            Pry IO
                        </Text>
                        <Text style={tw("text-sm text-gray-500")}>
                            2674 Alfred Drive{'\n'}
                            Brooklyn, New York, United States{'\n'}
                            11206{'\n'}
                            accounts@pry.io{'\n'}
                            (+1) 757 737 1980{'\n'}
                        </Text>
                    </View>
                    <View style={tw('flex-1 flex-col min-w-[200pt]')}>
                        <Text style={tw("text-sm font-semibold leading-relaxed")}>
                            Billed to
                        </Text>
                        <Text style={tw("text-sm text-gray-500")}>
                            {customer.name}{'\n'}
                            {customer.company}{'\n'}
                            {customer.address}{'\n'}
                            {customer.city}, {customer.country}{'\n'}
                            {customer.zipcode}{'\n'}
                            {invoice.issueNo}{'\n'}
                        </Text>
                    </View>
                </View>

                {/* tag */}
                <Text style={tw('text-sm font-semibold')}>
                    {`$${order.total} due ${invoice.dueDate.toLocaleString('en', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}`}
                </Text>

                {/* detail order */}
                <View style={tw('flex flex-col gap-2')}>
                    {/* table */}
                    <View style={tw('border border-gray-200 rounded-md ')}>
                        {/* table header */}
                        <View style={tw('flex flex-row flex-wrap border-b border-gray-200 bg-gray-200 p-2')}>
                            <View style={tw('text-sm w-[5%]')}>
                                <Text>#</Text>
                            </View>
                            <View style={tw('text-sm w-[45%]')}>
                                <Text>Name</Text>
                            </View>
                            <View style={tw('text-sm w-[20%]')}>
                                <Text>Unit price</Text>
                            </View>
                            <View style={tw('text-sm w-[10%]')}>
                                <Text>Qty</Text>
                            </View>
                            <View style={tw('text-sm text-right w-[20%]')}>
                                <Text>Amount</Text>
                            </View>
                        </View>

                        {/* table body */}
                        {products.map((item, idx) => (
                            <View
                                key={idx}
                                style={tw(cn('flex flex-row flex-wrap p-2', {
                                    'border-b border-gray-200': idx < products.length - 1
                                }))}
                            >
                                <View style={tw('text-sm w-[5%]')}>
                                    <Text>{idx + 1}</Text>
                                </View>
                                <View style={tw('text-sm w-[45%]')}>
                                    <Text>{item.name}</Text>
                                </View>
                                <View style={tw('text-sm w-[20%]')}>
                                    <Text>${item.price}</Text>
                                </View>
                                <View style={tw('text-sm w-[10%]')}>
                                    <Text>{item.qty}</Text>
                                </View>
                                <View style={tw('text-sm text-right w-[20%]')}>
                                    <Text>${item.price * (item.qty ?? 0)}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* summary */}
                    <View style={tw('flex flex-col items-end')}>
                        <View style={tw('flex flex-col w-[200pt] text-sm px-2 gap-2')}>
                            <View style={tw('flex flex-row justify-between gap-2')}>
                                <Text>Subtotal</Text>
                                <Text style={tw('text-right')}>
                                    ${order.subtotal}
                                </Text>
                            </View>
                            <View style={tw('flex flex-row justify-between gap-2')}>
                                <Text>Discount</Text>
                                <Text style={tw('text-right')}>
                                    {order.discount ? `$${order.discount}` : '-'}
                                </Text>
                            </View>
                            <View style={tw('flex flex-row justify-between gap-2')}>
                                <Text>Shipping</Text>
                                <Text style={tw('text-right')}>
                                    {order.shipping ? `$${order.shipping}` : '-'}
                                </Text>
                            </View>
                            <View style={tw('flex flex-row justify-between gap-2')}>
                                <Text>Tax</Text>
                                <Text style={tw('text-right')}>
                                    {order.tax ? `$${order.tax}` : '-'}
                                </Text>
                            </View>
                            <View style={tw('flex flex-row justify-between gap-2')}>
                                <Text>Total</Text>
                                <Text style={tw('text-right')}>
                                    {order.total ? `$${order.total}` : '-'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* footer */}
                <View style={tw('flex-1 flex-col justify-end')}>
                    <Text style={tw('text-sm')}>Notes</Text>
                    <Text style={tw('text-xs text-gray-500')}>
                        Please make sure you have the right bank registration number as I had issues before and make sure you cover transfer expenses.
                    </Text>
                </View>

            </Page>
        </Document>
    )
}