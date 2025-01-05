'use client'
import React from "react";
import { cn, tw } from "@/lib/utils";

import {
    PDFViewer,
    PDFViewerProps,
    PDFDownloadLink,
    PDFDownloadLinkProps
} from "@react-pdf/renderer";

const PDFDownload = React.forwardRef<PDFDownloadLink, PDFDownloadLinkProps>(
    (props, ref) => <PDFDownloadLink ref={ref} {...props} />
)

const PDFPreview = React.forwardRef<PDFViewer, PDFViewerProps>(
    ({ className, ...props }, ref) => (
        <PDFViewer
            ref={ref}
            {...props}
            style={tw(cn('w-screen h-screen', className))}
        />
    )
)

export {
    PDFPreview,
    PDFDownload,
}