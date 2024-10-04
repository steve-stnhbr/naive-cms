import PageDialog from "@/lib/components/page-dialog";
import Pages from "../page";
import { init } from "../../../../backend/src/main";
import { Page } from "../../../../backend/src/types";
import { redirect } from "next/navigation";
import { createPageAction } from "@/app/actions/db";

export default async function CreatePage() {
    return (
        <>
            <PageDialog
            title="Add Page"
            description="Add a new page to the website" 
            confirmText="Add" 
            confirmAction={createPageAction}
            pageObj={undefined}
            initiallyOpen={true}>
                <></>
        </PageDialog> 
        <Pages />
        </>
    )
    
    
}