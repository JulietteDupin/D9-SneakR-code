import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../tools/Navbar';
import SneakerList from '../tools/SneakerList';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import "../../css/style.css";

export default function PaymentCancel({ setSelectedSneaker }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='frame'>
        <h1>Payment error</h1>
        <button onClick="window.location.href='/products'">Return to product list</button>
    </div>
  );
}
