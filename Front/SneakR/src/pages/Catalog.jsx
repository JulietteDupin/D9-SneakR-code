import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../tools/Navbar';
import SneakerList from '../tools/SneakerList';
import Pagination from '../tools/Pagination';

import "../../css/style.css";
import { Button } from "../components/ui/button";

export default function Catalog({ setSelectedSneaker }) {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [error, setError] = useState(null);
  const [sneakers, setSneakers] = useState([]); // Initialize with an empty array
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const sneakersPerPage = 100;
  const fetchDataRef = useRef();
  const indexOfLastSneaker = currentPage * sneakersPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;
  const currentSneakers =  filteredSneakers ? filteredSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker) : null;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        setFilteredSneakers(!gender
          ? data
          : data.filter((sneaker) => sneaker.gender.toLowerCase() === gender.toLowerCase()));
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
        sneakers={currentSneakers}
        gender={gender || "all"}
        setSelectedSneaker={setSelectedSneaker}
      />
      <Button variant="destructive" size="lg" >HEHHHHHHPPPPPPPPPPP</Button>
      {/* <Pagination
        sneakersPerPage={sneakersPerPage}
        totalSneakers={filteredSneakers.length}
        paginate={paginate}
        currentPage={currentPage}
      /> */}
    </div>
  );
}
