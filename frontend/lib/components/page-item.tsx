import Link from "next/link";
import { Page } from "../../../backend/src/types";
import { Button } from "./shadcn/ui/button";

export default function PageItem({page}: { page: Page}) {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-8">
                <h2>{page.title}</h2>
                <p>{page.content.length} sections</p>
            </div>
            <div className="col-span-4">
                <Link href={`/pages/${page.id}`}>
                    <Button>Edit</Button>
                </Link>
            </div>
        </div>
    )
}