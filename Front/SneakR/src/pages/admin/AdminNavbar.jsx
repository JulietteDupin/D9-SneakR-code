import { Boxes, LogOut, UserCog } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const navigate = useNavigate();
    return (
        <header className="flex justify-between items-center p-4 bg-background border-b">
        <h1 className="text-2xl font-bold">Administrator dashboard</h1>
        <div className="flex space-x-2">
            <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/users")}
            >
            <UserCog className="mr-2 h-4 w-4" />
            Users
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/inventory")}
            >
            <Boxes className="mr-2 h-4 w-4" />
            Inventory
            </Button>
            <Button variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
            </Button>
        </div>
        </header>
    );
}
