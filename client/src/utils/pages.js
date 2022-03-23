export const pageCalc = (arr, currentPage, itemsOnPageCount=10) =>{
    const pagesCount=Math.ceil(arr.length/itemsOnPageCount)
    const itemsOnPage=[]

    const start= (currentPage-1)*itemsOnPageCount
    const end= arr.length>currentPage*itemsOnPageCount? currentPage*itemsOnPageCount: arr.length

    for(let i=start; i<end; i++) {
        itemsOnPage.push(arr[i])
    }

    return {pagesCount, itemsOnPage}
}
