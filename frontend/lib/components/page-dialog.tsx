"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/lib/components/shadcn/ui/dialog"
import { Button } from "@/lib/components/shadcn/ui/button"
import { Page, mapPage } from "../../../backend/src/types"
import { Input } from "@/lib/components/shadcn/ui/input"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/lib/components/shadcn/ui/form"
import { useCallback, useState } from "react"
import EdiTable from "./editable"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"


export default function PageDialog({
    children,
    title,
    description,
    confirmText,
    confirmAction,
    pageObj,
    initiallyOpen, onOpenChange }: { children: React.ReactNode | undefined, title: string, description: string, confirmText: string, confirmAction: (page: Page) => void, pageObj: Page | undefined, initiallyOpen: boolean, onOpenChange: (open: boolean) => void | undefined }) {
    const [open, setOpen] = useState(initiallyOpen)
    const [page, setPage] = useState<Page | undefined>(pageObj)
    const router = useRouter()
    
    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        setOpen(false)
        if (!confirmAction) {
            return
        }
        confirmAction(mapPage(data))
        openChange(false)
    }

    const formSchema = z.object({
        title: z.string().min(1),
        path: z.string().min(1),
        content: z.array(z.object({
            name: z.string().min(1),
            content: z.string().min(1)
        }))
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: page?.title || "",
            path: page?.path || "",
            content: page?.content || [],
        },
    })

    const onContentChange = useCallback((newContent: Array<{ name: string, content: string }>) => {
        form.setValue('content', newContent)
    }, [form])

    const openChange = useCallback((open: boolean) => {
        if (!onOpenChange) {
            if (!open) {
                router.replace("/pages")
            }
        } else {
            onOpenChange!(open)
        }
    }, [setOpen])

    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <Input {...field} placeholder={page?.title || "Title"}></Input>
                                    <FormDescription>
                                        This is the title of the page.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="path"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Path</FormLabel>
                                    <Input {...field} placeholder={page?.path || "Path"}></Input>
                                    <FormDescription>
                                        This is the path of the page.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <EdiTable content={field.value || page?.content || []} onChange={(newContent) => {
                                            field.onChange(newContent);
                                            onContentChange(newContent);
                                        }}></EdiTable>
                                </FormItem>
                            )}
                        />


                        <Button type="submit">{confirmText}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}