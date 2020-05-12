import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FileContentData } from 'src/app/common/domainobjects/gen/FileContentData';

export class FileData
{
    metaData: FileMetaData;
    contentData: FileContentData;

    constructor(untypedFileData: any) {
        if (untypedFileData != null) {
            this.metaData = untypedFileData.metaData;
            this.contentData = untypedFileData.contentData;
        }
    }

    getMetaData() {
        return this.metaData;
    }

    getContentData() {
        return this.contentData;
    }

    setMetaData(metaData: FileMetaData) {
        this.metaData = metaData;
    }

    setContentData(contentData: FileContentData) {
        this.contentData = contentData;
    }

    public equals(obj: FileData): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.metaData !== obj.metaData) { return false; }
        if (this.contentData !== obj.contentData) { return false; }

        return true;
    }
}
