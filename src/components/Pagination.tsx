import React,{ useEffect, useState } from "react";

interface IPaginationProps {
    totalitem: number,
    paginate: any,
}

const Pagination = ({totalitem, paginate}:IPaginationProps) => {
    const [currentpage, setCurrentpage] = useState<number>(0);
    const [sayı1, setSayı1] = useState(0);
    const [sayı2, setSayı2] = useState(3);
    const [sayı3, setSayı3] = useState(3);
    const [sayı4, setSayı4] = useState(6);
    const pageNumber = [];


    for (let i = 1; i <= Math.ceil(totalitem); i++) {
        pageNumber.push(i);
    }

    useEffect(()=>{
        setCurrentpage(pageNumber.length)
    },[]);

    let comp;
    if(pageNumber.length > 6){
         comp = <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center align-items-center">
          {pageNumber.includes(currentpage - 1) &&<li className="page-item"> <a className="page-link" href={void(0)} onClick={(e) => {
                    setCurrentpage(currentpage - 1);
                    paginate(currentpage - 1);
                    setSayı1(sayı1 - 1);
                    setSayı2(sayı2 - 1);
                    setSayı3(sayı3 - 1);
                    setSayı4(sayı4 - 1);
                }}>
                    Prev
                </a></li>}
          {pageNumber.slice(sayı1, sayı2).map((number) => {
                    return (
                        <li key={number} className="page-item">
                             <a className="page-link"  href={void(0)} onClick={(e) => {
                            setCurrentpage(number);                        
                            paginate(number);
                        }} > {number} </a></li>
                    )
                
            })} 
          { pageNumber.length > 6 ? (<li className="page-item disabled"><a className="page-link" aria-disabled="true" href={void(0)}>...</a></li>): ""}
          {pageNumber.slice(sayı3, sayı4).map((number) => {
                    return (
                        <li key={number} className="page-item">
                        <a className="page-link"  href={void(0)} onClick={(e) => {
                            setCurrentpage(number);                        
                            paginate(number);
                        }} > {number} </a></li>
                    )
            })} 
          {pageNumber.includes(currentpage + 1) && <li className="page-item"> <a className="page-link" href={void(0)} onClick={(e) => {
                    setCurrentpage(currentpage + 1);
                    paginate(currentpage + 1);
                    setSayı1(sayı1 + 1);
                    setSayı2(sayı2 + 1);
                    setSayı3(sayı3 + 1);
                    setSayı4(sayı4 + 1);
                }}>
                    Next
                </a></li>}
        </ul>
         </nav>
    }
    else {
        comp = <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center align-items-center">
          {pageNumber.includes(currentpage - 1) &&<li className="page-item"> <a className="page-link" href={void(0)} onClick={(e) => {
                    setCurrentpage(currentpage - 1);
                    paginate(currentpage - 1);
                    setSayı1(sayı1 - 1);
                    setSayı2(sayı2 - 1);
                    setSayı3(sayı3 - 1);
                    setSayı4(sayı4 - 1);
                }}>
                    Prev
                </a></li>}
          {pageNumber.slice(sayı1, sayı2).map((number) => {
                    return (
                        <li key={number} className="page-item">
                             <a className="page-link"  href={void(0)} onClick={(e) => {
                            setCurrentpage(number);                        
                            paginate(number);
                        }} > {number} </a></li>
                    )
                
            })} 
          {pageNumber.slice(sayı3, sayı4).map((number) => {
                    return (
                        <li key={number} className="page-item">
                        <a className="page-link"  href={void(0)} onClick={(e) => {
                            setCurrentpage(number);                        
                            paginate(number);
                        }} > {number} </a></li>
                    )
            })} 
          {pageNumber.includes(currentpage + 1) && <li className="page-item"> <a className="page-link" href={void(0)} onClick={(e) => {
                    setCurrentpage(currentpage + 1);
                    paginate(currentpage + 1);
                    setSayı1(sayı1 + 1);
                    setSayı2(sayı2 + 1);
                    setSayı3(sayı3 + 1);
                    setSayı4(sayı4 + 1);
                }}>
                    Next
                </a></li>}
        </ul>
         </nav>
    }

    return (
        <section>
           {comp}
        </section>
    )
}

export default Pagination