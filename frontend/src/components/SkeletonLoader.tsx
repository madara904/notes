import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

const SkeletonLoader = () => {
  return (
        <Card className="bg-secondary capitalize shadow border">
        <CardHeader className="grid grid-cols-2">
        <CardTitle className="font-bold tracking-tight md:text-4xl text-2xl md:text-2xl w-max"><Skeleton className="h-6 w-[250px]"/></CardTitle>
        </CardHeader>
        <CardContent className="whitespace-pre">
        <div><Skeleton className="h-6 w-[250px]"/></div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 normal-case">
        <CardDescription className="py-2">
            <div><Skeleton className="h-4 w-[250px]"/></div>
            </CardDescription>
        </CardFooter>
        </Card>
  )
}

export default SkeletonLoader