export const pageCalc = (arr, currentPage) =>{
    const pagesCount=Math.ceil(arr.length/10)
    const itemsOnPage=[]

    const start= (currentPage-1)*10
    const end= arr.length>currentPage*10? currentPage*10: arr.length

    for(let i=start; i<end; i++) {
        itemsOnPage.push(arr[i])
    }

    return {pagesCount, itemsOnPage}
}
