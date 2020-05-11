export class Filefetcher {
    files: FileMetaData[];
    doYourJob() {
        this.files = [ 
            {uuid: '12346', name: 'howto.txt', size: 1726, 
             creationDateTime: new Date(2019, 10, 4), lastModificationDateTime: new Date(2019, 11, 13)}
        ];

        return this.files; 
    }
}

export interface FileMetaData {
uuid: string;
name: string;
size: number;
creationDateTime: Date;
lastModificationDateTime: Date;
}