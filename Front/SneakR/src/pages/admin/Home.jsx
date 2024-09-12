import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bell, Boxes, DollarSign, LogOut, Package, UserCog, Users } from "lucide-react"
import AdminNavbar from "./AdminNavbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar></AdminNavbar>
     <main className="flex-grow p-6 bg-muted/40">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231.89 €</div>
              <p className="text-xs text-muted-foreground">+20.1% compared to last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% compared to last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits vendus</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+19% compared to last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+5 new alerts</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sales overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart className="h-[200px] w-full" />
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Low inventory alerts</CardTitle>
              <CardDescription>Sneakers with critical inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Sneaker" />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Air Max 90</p>
                    <p className="text-sm text-muted-foreground">Inventory: 5</p>
                  </div>
                  <Badge variant="destructive" className="ml-auto">Critical</Badge>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Sneaker" />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Jordan 1</p>
                    <p className="text-sm text-muted-foreground">Stock: 8</p>
                  </div>
                  <Badge variant="warning" className="ml-auto">Low</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Important customer messages</CardTitle>
              <CardDescription>Derniers messages nécessitant une attention particulière</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Client" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Jean Dupont</p>
                    <p className="text-sm text-muted-foreground">Problème avec ma commande #1234</p>
                    <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                  </div>
                  <Badge className="ml-auto">Urgent</Badge>
                </div>
                <div className="flex items-start">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Client" />
                    <AvatarFallback>MM</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Marie Martin</p>
                    <p className="text-sm text-muted-foreground">Question sur la disponibilité</p>
                    <p className="text-xs text-muted-foreground">Il y a 5 heures</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">Question</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}