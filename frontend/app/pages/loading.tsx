import PageTitle from "@/lib/components/page-title";
import { Skeleton } from "@/lib/components/shadcn/ui/skeleton";


export default function Loading() {
    <div>
        <PageTitle>Loading...</PageTitle>
        <div>
            <Skeleton></Skeleton>
        </div>
    </div>
}