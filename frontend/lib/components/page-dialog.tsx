"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/lib/components/shadcn/ui/dialog"
import { Button } from "@/lib/components/shadcn/ui/button"
import { Page } from "../../../backend/src/types"
import { Input } from "@/lib/components/shadcn/ui/input"
import { useState } from "react"
import EdiTable from "./editable"

export default function PageDialog({ children, title, description, confirmText, confirmAction, pageObj }: { children: React.ReactNode, title: string, description: string, confirmText: string, confirmAction: (page: Page) => void, pageObj: Page | undefined }) {
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState<Page | undefined>(pageObj)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <Input placeholder={page?.title || "Title"}></Input>
                    <Input placeholder={page?.path || "Path"}></Input>

                    <EdiTable content={page?.content || []}></EdiTable>

                    <Button type="submit">{confirmText}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}