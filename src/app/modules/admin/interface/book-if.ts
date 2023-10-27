export interface BookIF {
    _id:string;
    bookName:string,
    authorName: string,
    price: number,
    publisherName: string,
    publicationDate: string,
    numberOfCovers: string,
    editionOfBook: string,
    description: string,
    image : File,
    bookSize: string,
    category: string,
    type: string,
    language: string,

    delivaryPrice: number,
    pdf: string,
}
