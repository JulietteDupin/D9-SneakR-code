'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { formatDateToMMDDYYYY } from '../../lib/utils'
import AdminNavbar from './AdminNavbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Users() {
  const [users, setUsers] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [newUser, setNewUser] = useState();
 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_USERS_ROUTE}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data)
          // setUser({
          //   firstName: data.firstname,
          //   lastName: data.lastname,
          //   email: data.email,
          //   birthdate: data.birthdate ? formatDateToMMDDYYYY(data.birthdate) : '', // Formate la date en MM/DD/YYYY
          //   password: '', // Le mot de passe est vide par défaut,
          //   size: data.size,
          //   favorite_category: data.favorite_category
          // });
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, [users]);

  const handleAddUser = async () => {  
    setUsers([...users, { id: users.length + 1, ...newUser }])
    setNewUser({ name: '', email: '', role: '' })
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_USERS_ROUTE}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data)
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };
   

  const handleUpdateUser = async () => {
    if (currentUser) {
      setUsers(users.map(user => user.id === currentUser.id ? { ...currentUser, ...newUser } : user))
      setCurrentUser(null)
      setNewUser({ name: '', email: '', role: '' })
      setIsDialogOpen(false)
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_USERS_ROUTE}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(newUser)
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data)
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };  try {
      const response = await fetch(`${import.meta.env.VITE_APP_USERS_ROUTE}/${ currentUser.id }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser)
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data)
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
 
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }



  const openEditDialog = (user) => {
    setCurrentUser(user)
    setNewUser({ name: user.name, email: user.email, role: user.isAdmin })
    setIsDialogOpen(true)
  }

  return ( 
    <div className="flex flex-col min-h-screen">
      <AdminNavbar></AdminNavbar>
      <h1 className="text-2xl font-bold mb-5">User management</h1>
      <div className="mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a user
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentUser ? 'Edit' : 'Add'} a user</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Lastname
                </Label> 
                <Input
                  id="name"
                  defaultValue={currentUser?.firstname}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={currentUser?.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  id="role"
                  defaultValue={currentUser?.isAdmin ? 1 : 0}
                  onValueChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="col-span-3"
                >
                  <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={1}>Admin</SelectItem>
                        <SelectItem value={0}>User</SelectItem>
                      </SelectContent>
                      </Select>
              </div>
            </div>
            <Button onClick={currentUser ? handleUpdateUser : handleAddUser}>
              {currentUser ? 'Edit' : 'Add'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
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
                        <AlertDialogTitle>Are you sure to want tot delete this user?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be reversed. This will delete undefinitely
                          {user.name} and delete its data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        {/* <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Delete</AlertDialogAction> */}
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