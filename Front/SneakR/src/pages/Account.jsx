"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getUserIdFromToken from '../tools/handleJWT'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { formatDateToMMDDYYYY, formatDateToYYYYMMDD } from "../lib/utils"

export default function ProfileSettings() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    size: '',
    favorite_category : '',
    password: '' // Ajout du mot de passe ici
  });
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError('User not found. Please login again.');
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_USERS_ROUTE}/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser({
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            birthdate: data.birthdate ? formatDateToMMDDYYYY(data.birthdate) : '', // Formate la date en MM/DD/YYYY
            password: '', // Le mot de passe est vide par défaut,
            size: data.size,
            favorite_category: data.favorite_category
          });
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSelectChange = (name) => (value) => {
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSave = async () => {
    setEditMode(false);
    const userId = getUserIdFromToken();
    if (!userId) return;

    // Avant d'envoyer les données au backend, formate la date en YYYY-MM-DD
    const updatedUser = { 
      ...user, 
      birthdate: formatDateToYYYYMMDD(user.birthdate)
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_USERS_ROUTE}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordUpdated(true);
        console.log('Informations updated');
      } else {
        setError('Failed to update user data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center">
      <div className="container py-10 pl-10">
        <Card className="w-full border-[#c33035]">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-2 border-[#c33035]">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">Personal Info</CardTitle>
                <CardDescription className="text-lg text-[#c33035]">Update your personal details and sneaker preferences.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={user.firstName} 
                    onChange={handleChange} 
                    placeholder="John" 
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={user.lastName} 
                    onChange={handleChange} 
                    placeholder="Doe" 
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={user.email} 
                    onChange={handleChange} 
                    placeholder="john.doe@example.com" 
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birthdate</Label>
                  <Input 
                    id="birthdate" 
                    name="birthdate" 
                    value={user.birthdate} 
                    onChange={handleChange} 
                    placeholder="MM/DD/YYYY" 
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password"
                    value={user.password} 
                    onChange={handleChange} 
                    placeholder="Enter new password" 
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#c33035]">Sneaker Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="shoeSize">Shoe Size</Label>
                    <Input 
                      id="shoeSize" 
                      name="shoeSize" 
                      value={user.size} 
                      onChange={handleChange} 
                      placeholder="Enter your shoe size" 
                      disabled={!editMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favoriteBrand">Favorite Brand</Label>
                    <Select
                      onValueChange={handleSelectChange('favoriteBrand')} 
                      defaultValue={user.favorite_category}
                      disabled={!editMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select favorite brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nike">Nike</SelectItem>
                        <SelectItem value="Adidas">Adidas</SelectItem>
                        <SelectItem value="Jordan">Jordan</SelectItem>
                        <SelectItem value="Yeezy">Yeezy</SelectItem>
                        <SelectItem value="New Balance">New Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save changes</Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}