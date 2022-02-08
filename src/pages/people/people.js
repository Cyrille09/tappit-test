import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Page } from '../../components/page';
import { Pagination } from '../../components/pagination/index';
import { baseURL } from '../../config/config';

function People() {
  const [people, setPeople] = useState([]);
  const peoplePerPage = 3;
  const [pageNumber, setPageNumber] = useState(0);
  const pageVisited = pageNumber * peoplePerPage;
  const [pageCount, setPageCount] = useState(0);
  let navigate = useNavigate();

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await axios(
      `${baseURL}/ceb09528-8228-4a95-b7d9-c1f945023c92`
    );

    setPeople(result.data);
    setPageCount(Math.ceil(result.data.length / peoplePerPage));
  }

  function getPersonId(id) {
    navigate(`/person/${id}`);
  }

  return (
    <Page title="People">
      <div>
        <p className="HeaderTitle">My Amazing Favourite American Sports App</p>
        <table className="table table-bordered table-hover">
          <thead className="headerTable">
            <tr>
              <th>Name</th>
              <th>Enabled</th>
              <th>Valid</th>
              <th>Authorised</th>
              <th>Palindrome</th>
              <th>Favourite Sports</th>
            </tr>
          </thead>
          <tbody>
            {people
              .slice(pageVisited, pageVisited + peoplePerPage)
              .map((person) => (
                <tr
                  key={person.personId}
                  onClick={() => {
                    getPersonId(person.personId);
                  }}
                  className="clickableList"
                >
                  <td>{`${person.firstName} ${person.lastName}`}</td>
                  <td>{`${person.isEnabled}`}</td>
                  <td>{`${person.isValid}`}</td>
                  <td>{`${person.isAuthorised}`}</td>
                  <td>{`${person.isPalindrome}`}</td>
                  <td>
                    {person.favouriteSports.map((favorite, index) => {
                      const favoriteSport =
                        person.favouriteSports.length === index + 1
                          ? `${favorite.name}`
                          : `${favorite.name}, `;
                      return favoriteSport;
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination pageCount={pageCount} changePage={changePage} />
    </Page>
  );
}

export default People;
