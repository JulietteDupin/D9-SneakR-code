'use client';
import { React, useState } from 'react';
import { ShoppingCart, Star, Heart, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '../tools/Navbar';
import NotFound from '../components/NotFound';
import { useCart } from '../context/CartContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ProductPage({ sneaker }) {
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false); // Alerte pour ajout au panier

  if (!sneaker) {
    return <NotFound />;
  }

  const parsedImage = JSON.parse(sneaker.image);
  const parsedStock = JSON.parse(sneaker.stock);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full aspect-square border border-gray-200">
        <div className="h-full overflow-y-auto p-6">
          <Navbar />
          <div className='content'>
            <div className="flex flex-col lg:flex-row gap-8">
              <ProductImage src={parsedImage.small} alt={sneaker.name} />
              <div className="lg:w-1/2">
                <ProductDetails title={sneaker.name} description={sneaker.description} />
                <ProductOptions
                  color={sneaker.colorway}
                  size={sneaker.size}
                  price={sneaker.estimatedMarketValue} />
                <ProductActions
                  addToCart={addToCart}
                  product={sneaker}
                  stock={parsedStock}
                  setShowAlert={setShowAlert} // Passer l'état de l'alerte
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <Alert
          className="fixed bottom-4 right-4 w-96 bg-white shadow-lg border border-gray-300"
          variant="success">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <AlertTitle>Added to Cart</AlertTitle>
          <AlertDescription>
            The item has been added to your cart 
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

const ProductImage = ({ src, alt }) => {
  return (
    <div className="lg:w-1/2 flex items-center justify-center overflow-hidden">
      <div className="w-full h-0 pb-[100%] relative">
        <img
          src={src}
          alt={alt}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
    </div>
  );
}

const ProductDetails = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">(121 avis)</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

const ProductOptions = ({ color, size, price }) => {
  return (
    <div className="mb-6">
      <div className="mb-2">
        <span className="text-sm text-gray-600">COULEUR</span>
        <div className="text-sm font-semibold mt-1">{color}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">TAILLE</span>
        <span className="text-sm font-semibold">{size}</span>
      </div>
      <div className="text-xl font-bold mb-4">{parseFloat(price).toFixed(2)} €</div>
    </div>
  );
}

const ProductActions = ({ addToCart, product, stock, setShowAlert }) => {
  const [selectedSize, setSelectedSize] = useState('');

  const item = {
    id: product.id,
    name: product.name,
    price: product.retailPrice,
    stripe_price_id: product.stripe_price_id,
    image: JSON.parse(product.image).small,
    stock: stock,
    gender: product.gender,
    size: 0
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      const updatedItem = { ...item, size: selectedSize };
      addToCart(updatedItem);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }

  return (
    <div className="space-y-4">
      <Select onValueChange={setSelectedSize}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose your size" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(stock).map(([size, quantity]) => (
            <SelectItem key={size} value={size} disabled={quantity === 0}>
              {size} {quantity === 0 && '(Épuisé)'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button className="w-full" onClick={handleAddToCart} disabled={!selectedSize}>
        <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter au panier
      </Button>
      <Button variant="outline" className="w-full">
        <Heart className="mr-2 h-4 w-4" /> Ajouter aux favoris
      </Button>
    </div>
  );
}
