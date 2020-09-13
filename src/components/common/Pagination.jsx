import React, { useState } from 'react'
import styles from './../Users/Users.module.css'
import cn from "classnames"

const Pagination = ({totalItemsCount, pageSize, currentPage, onPaginationClick, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = []
    for(let i=1; i<=pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1) // Бет номерлерінің бөлігі
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={styles.pagination}>
            {
                portionNumber > 1 
                    && <button
                        onClick={() => {
                            setPortionNumber(portionNumber - 1)
                            onPaginationClick(leftPortionPageNumber - portionSize)
                        }}
                        style={{marginRight: `${10}px`}}
                    >Prev</button>
            }
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <button 
                            className={
                                cn({
                                    [styles.selected]: currentPage === p
                                }, styles.pageNumber)
                            }
                            key={p}
                            onClick={() => {
                                onPaginationClick(p)
                            }}
                        >{p}</button>
                    })
            }
            {
                portionCount > portionNumber 
                    && <button
                        onClick={() => {
                            setPortionNumber(portionNumber + 1)
                            onPaginationClick(rightPortionPageNumber + 1)
                        }}
                        style={{marginLeft: `${10}px`}}
                    >Next</button>
            }
        </div>
    )
}

export default Pagination