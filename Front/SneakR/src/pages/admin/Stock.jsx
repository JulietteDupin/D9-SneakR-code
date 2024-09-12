import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import AdminNavbar from './AdminNavbar'

export default function Stock() {
  const [sneakers, setSneakers] = useState()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentSneaker, setCurrentSneaker] = useState()
  const [newSneaker, setNewSneaker] = useState()
  const [error, setError] = useState(null);
  const fetchDataRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const sneakersPerPage = 100;

  const indexOfLastSneaker = currentPage * sneakersPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;
 // const currentSneakers = filteredSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker);

  const totalPages = Math.ceil(sneakers?.length / sneakersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const maxVisiblePages = 3;

  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);


  useEffect(() => {
    fetchDataRef.current = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_APP_PRODUCTS_ROUTE, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSneakers(data)
        } else {
            setError('Failed to fetch users');
          }
        } catch (error) {
          console.error('Error:', error);
          setError(error.message);
        }
      };
  
      fetchDataRef.current();
    }, []);

//   const handleAddSneaker = () => {
//     setSneakers([...sneakers, { id: sneakers.length + 1, ...newSneaker }])
//     setNewSneaker({ name: '', brand: '', size: '', quantity: 0, price: 0 })
//     setIsDialogOpen(false)
//   }

//   const handleUpdateSneaker = () => {
//     if (currentSneaker) {
//       setSneakers(sneakers.map(sneaker => sneaker.id === currentSneaker.id ? { ...currentSneaker, ...newSneaker } : sneaker))
//       setCurrentSneaker(null)
//       setNewSneaker({ name: '', brand: '', size: '', quantity: 0, price: 0 })
//       setIsDialogOpen(false)
//     }
//   }

//   const handleDeleteSneaker = (id) => {
//     setSneakers(sneakers.filter(sneaker => sneaker.id !== id))
//   }

  const openEditDialog = (sneaker) => {
    setCurrentSneaker(sneaker)
    setNewSneaker({ name: sneaker.name, brand: sneaker.brand, size: sneaker.size, quantity: sneaker.quantity, price: sneaker.price })
    setIsDialogOpen(true)
  }

  const getStockStatus = (quantity) => {
    if (quantity <= 5) return <Badge variant="destructive">Critical</Badge>
    if (quantity <= 10) return <Badge variant="warning">Low</Badge>
    return <Badge variant="success">Normal</Badge>
  }

  console.log(sneakers)

  return (
    <div className="flex flex-col min-h-screen">
        <AdminNavbar></AdminNavbar>
      <h1 className="text-2xl font-bold mb-5">Inventory management</h1>
      
      <div className="mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentSneaker ? 'Edit' : 'Add'} an item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Label
                </Label>
                <Input
                  id="name"
                  value={"newSneaker.name"}
                  onChange={(e) => setNewSneaker({ ...newSneaker, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Brand
                </Label>
                <Input
                  id="brand"
                  value={"newSneaker.brand"}
                  onChange={(e) => setNewSneaker({ ...newSneaker, brand: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Size
                </Label>
                <Input
                  id="size"
                  value={"newSneaker.size"}
                  onChange={(e) => setNewSneaker({ ...newSneaker, size: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={"newSneaker.quantity"}
                  onChange={(e) => setNewSneaker({ ...newSneaker, quantity: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={"newSneaker.price"}
                  onChange={(e) => setNewSneaker({ ...newSneaker, price: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            {/* <Button onClick={currentSneaker ? handleUpdateSneaker : handleAddSneaker}>
              {currentSneaker ? 'Edit' : 'Add'}
            </Button> */}
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Inventory status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sneakers?.map((sneaker) => (
            <TableRow key={sneaker.id}>
              <TableCell>{sneaker.name}</TableCell>
              <TableCell>{sneaker.brand}</TableCell>
              <TableCell>{sneaker.size}</TableCell>
              <TableCell>{sneaker.quantity}</TableCell>
              {/* <TableCell>{sneaker.price.toFixed(2)} €</TableCell> */}
              <TableCell>{getStockStatus(sneaker.quantity)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(sneaker)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to delete this item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This cannot be undone. It will delete undefinitely the item
                          {sneaker.name} from our stock.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteSneaker(sneaker.id)}>Supprimer</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}