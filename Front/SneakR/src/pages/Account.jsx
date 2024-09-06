"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import getUserIdFromToken from '../tools/handleJWT'

// Fonction pour formater la date au format MM/DD/YYYY
const formatDateToMMDDYYYY = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

// Fonction pour formater la date au format YYYY-MM-DD (pour l'envoi au backend)
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

export default function ProfileSettings() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '' // Ajout du mot de passe ici
  });
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError('User not found. Please login again.');
        Navigate("/login");
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
            password: '' // Le mot de passe est vide par défaut
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
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">Personal Info</CardTitle>
                <CardDescription className="text-lg">Update your personal details.</CardDescription>
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
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" className="min-h-[100px]" disabled={!editMode} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
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
  );
}
