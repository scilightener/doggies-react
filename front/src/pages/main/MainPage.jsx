import DogsList from './DogsList';
import PaginationBar from './PaginationBar';
import Filters from './Filters';
import { ranges } from './Filters';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import '../styles/MainPage.css';

const MainPage = () => {
  const [dogs, setDogs] = useState();
  const [dogsCount, setDogsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, _] = useState({
    "weight": ranges.weight,
    "height": ranges.height,
    "age": ranges.age,
    "name": ranges.name
  });
  const [sendRequest, setSendRequest] = useState(true);

  useEffect(() => {
    if (!sendRequest) {
      return;
    }
    const getData = async () => {
      try {
        const response = await axios.get(`https://localhost:7018/dogs?pageId=${currentPage}&pageSize=${dogsPerPage}&beginWeight=${filters.weight[0]}&endWeight=${filters.weight[1]}&beginHeight=${filters.height[0]}&endHeight=${filters.height[1]}&beginAge=${filters.age[0]}&endAge=${filters.age[1]}&beginLetter=${String.fromCharCode('A'.charCodeAt(0) + filters.name[0])}&endLetter=${String.fromCharCode('A'.charCodeAt(0) + filters.name[1])}`);
        if (response.status != 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`);
        }
        const data = response.data;
        setDogs(data.dogs);
        setDogsCount(data.count);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        setSendRequest(false)
      }
    }
    getData()
  }, [sendRequest])

  const paginate = (pageNumber, pageSize) => {
    setDogsPerPage(pageSize);
    setCurrentPage(pageNumber);
    setSendRequest(true);
  }

  const updateFilters = (filterName, minVal, maxVal) => {
    filters[filterName] = [minVal, maxVal];
  };

  const applyFilters = () => {
    setCurrentPage(1);
    setSendRequest(true);
  }

  return (
    <div className="main-page">
      <h1>Dog Breeds</h1>
      TODO: fix filters displaying
      {isLoading && <Spin key={'loadingSpin'} size="large" style={{ position: 'absolute', top: '50%' }} />}
      {dogs && <DogsList dogs={dogs} />}
      {dogs && <Filters filters={filters} onFilterChange={updateFilters} onApplyFilter={applyFilters} />}
      {dogs && <PaginationBar total={dogsCount} currentPage={currentPage} pageSize={dogsPerPage} paginate={paginate} />}
    </div>
  );
};

export default MainPage;
