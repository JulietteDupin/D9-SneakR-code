import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

import '../../css/style.css';

export default function CategoryPage({ setSelectedSneaker }) {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [sneakers, setSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const sneakersPerPage = 100;
  const fetchDataRef = useRef();

  const indexOfLastSneaker = currentPage * sneakersPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;
  const currentSneakers = filteredSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker);

  const totalPages = Math.ceil(filteredSneakers.length / sneakersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const maxVisiblePages = 3;

  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchDataRef.current = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_APP_PRODUCTS_ROUTE, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await response.json();
        setSneakers(data);
        setFilteredSneakers(
          !gender
            ? data
            : data.filter((sneaker) => sneaker.gender.toLowerCase() === gender.toLowerCase())
        );
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      }
    };

    fetchDataRef.current();
  }, [gender]);


  return (
    <div className='frame'>
      <Navbar />
      <SneakerList
        sneakers={sneakers}
        gender={gender}
        setSelectedSneaker={setSelectedSneaker}
      />

      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => paginate(currentPage - 1)}
                aria-label="Previous"
              />
            </PaginationItem>
          )}

          {startPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => paginate(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                onClick={() => paginate(currentPage + 1)}
                aria-label="Next"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

    </div>
  );
}