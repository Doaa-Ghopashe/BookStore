export interface Book {
    _id?:string;
    title: string;
    desc: string;
    photo: string;
    AuthorId:string;
    avgRating:number;
    shelve:string;
}