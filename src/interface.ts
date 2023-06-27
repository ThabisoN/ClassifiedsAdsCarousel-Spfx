// create File item to work with it internally
export interface IFile {
    Id : number;
    Title: string;
    Name: string;
    Descriptions: string;
    Start_Date : Date,
    End_Date: Date
  }
  
  // create PnP JS response interface for File
/*   export interface IResponseFile {
    Length: number;
  } */
  
  // create PnP JS response interface for Item
  export interface IResponseItem {
    Id: number;
    FileLeafRef: string;
    Title: string;
    Descriptions: string;
    Start_Date : Date,
    End_Date: Date
  } 