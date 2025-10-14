import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"

export default function Page() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-xs">
        <CardContent>
            <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="email@streamly.com"
                    required
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                    <Input id="password" type="password" required />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">Login</Button>
        </CardFooter>
        </Card>
    </div>
  )
}
