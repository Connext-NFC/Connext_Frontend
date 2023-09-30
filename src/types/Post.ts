export interface ICreatePost {
    image : FormDataEntryValue | null;
    postDescription : FormDataEntryValue | null;
}

export interface IPostInfo{
    _id : string;
    postImg : string;
    postDescription : string;
    owner : string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}