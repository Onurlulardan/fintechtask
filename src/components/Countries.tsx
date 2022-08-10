import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from "./Pagination";

interface Flags {
    svg: string;
    png: string;
}

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

interface Translations {
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    hu: string;
}

interface RegionalBloc {
    acronym: string;
    name: string;
}

interface CountryType {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    subregion: string;
    region: string;
    population: number;
    latlng: number[];
    demonym: string;
    area: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    flags: Flags;
    currencies: Currency[];
    languages: Language[];
    translations: Translations;
    flag: string;
    regionalBlocs: RegionalBloc[];
    cioc: string;
    independent: boolean;
}


const Countries = () => {
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<CountryType[]>([]);
    const [updateState, setUpdateState] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] =useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(10);

    const paginationNumber = countries.length / 10;
    const indexOfLastItems = currentPage * itemPerPage;
    const indexOffirstItems = indexOfLastItems - itemPerPage;
    const currentItem = countries.slice(indexOffirstItems, indexOfLastItems);
    const currentFilteredItem = filteredCountries.slice(indexOffirstItems, indexOfLastItems);



    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }
    
    const getData = async () => {
        try {
            const { data } = await axios.get<CountryType[]>(`https://restcountries.com/v2/all`);
            setCountries(data);
        } catch {
            console.log("Ülke verisi alınırken bir hata oluştu");
        }
        
    }
    useEffect(() => {
        getData();
    }, []);

    const splitCountries = () => {
        const filteredArr =  countries.filter((item) =>  item.capital !== undefined);
        setFilteredCountries(filteredArr);
    }
    useEffect(() => {
        splitCountries();
    }, [countries]);

    const ascName = ()=> {
        setCountries(countries.sort((a,b) => a.name > b.name ? 1 : -1));
    }
    const descName = ()=> {
        setCountries(countries.sort((a,b) => a.name > b.name ? -1 : 1));
    }
    const ascRegion = ()=> {
        setCountries(countries.sort((a,b) => a.region > b.region ? 1 : -1));
    }
    const ascPopulation = ()=> {
        setCountries(countries.sort((a,b) => a.population > b.population ? -1 : 1));
    }
    const ascArea = ()=> {
        setCountries(countries.sort((a,b) => a.area > b.area ? -1 : 1));
    }


  return (
    <div className="container mt-5 mb-5">
        <div className="row justify-content-center aling-items-center">
          <div className="col-5">
            <div className="input-group flex-nowrap">
              <input type="text" onChange={(e) => {setSearchQuery(e.target.value)}} className="form-control" placeholder="Ara" aria-label="Ara" aria-describedby="addon-wrapping" />
              <span className="input-group-text" id="addon-wrapping"><i className="ri-search-line"></i></span>
            </div>
          </div>
            <div className="col-3">
                <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href={void(0)} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Ülkeleri Sırala
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item" onClick={(e) => {ascName(); setUpdateState(!updateState)}} href={void(0)}>A-Z</a></li>
                        <li><a className="dropdown-item" onClick={(e) => {descName(); setUpdateState(!updateState)}} href={void(0)}>Z-A</a></li>
                        <li><a className="dropdown-item" onClick={(e) => {ascRegion(); setUpdateState(!updateState)}} href={void(0)}>Kıtaya göre</a></li>
                        <li><a className="dropdown-item" onClick={(e) => {ascPopulation(); setUpdateState(!updateState)}} href={void(0)}>Nüfüsa göre</a></li>
                        <li><a className="dropdown-item" onClick={(e) => {ascArea(); setUpdateState(!updateState)}} href={void(0)}>Yüz ölçümüne göre</a></li>
                    </ul>
                    <button className="btn btn-danger mx-1" onClick={(e) => {getData()}} type="submit">Filtreyi temizle</button>
                </div> 
            </div>
        </div>
        <div className="row justify-content-center align-items-center">
            <div className="col-12">
            <table className="table table-bordered caption-top table-hover">
                <caption>Ülke Listesi</caption>
                {searchQuery === "" ?
                 (<thead className='table-dark'>
                    <tr>
                    <th scope="col">Ülke Adı</th>
                    <th scope="col">Başkenti</th>
                    <th scope="col">Kıta</th>
                    <th scope="col">Bayrak</th>
                    </tr>
                </thead>)
                 : (
                    <thead className='table-dark'>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Ülke Adı</th>
                    <th scope="col">Başkenti</th>
                    <th scope="col">Kıta</th>
                    <th scope="col">Bayrak</th>
                    </tr>
                </thead>
                 )}
                <tbody>
                    { searchQuery === "" ?
                     (
                        currentItem.map((country, index)=>{
                            return (
                                <tr className='tablerow' key={index}>
                                <td>{ country.name } - {country.nativeName}</td>
                                <td>{ country.capital }</td>
                                <td>{ country.region }</td>
                                <td className='d-flex justify-content-center'> <img src={country.flag} className="counrty-flag" /> </td>
                                </tr>
                            )
                        })
                     ) : 
                     (
                        filteredCountries.filter((country)=>{
                            return country.capital.toLowerCase().includes(searchQuery)
                        }).map((country, index)=>{
                            return (
                                <tr className='tablerow' key={index}>
                                <th scope="row"> {index + 1} </th>
                                <td>{ country.name } - {country.nativeName}</td>
                                <td>{ country.capital }</td>
                                <td>{ country.region }</td>
                                <td className='d-flex justify-content-center'> <img src={country.flag} className="counrty-flag" /> </td>
                                </tr>
                            )
                        })
                     )}
                    
                </tbody>
            </table>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                {searchQuery === "" ? (
                    <Pagination paginate={paginate} totalitem={paginationNumber}></Pagination>
                ) : null}
            </div>
        </div>
      </div>
   
  )
}

export default Countries