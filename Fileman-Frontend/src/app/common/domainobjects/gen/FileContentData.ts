
export class FileContentData
{
    uuid: number;
    name: string;
    content: string;
    size: number;
    creator: string;
    creationDate: string;

    constructor(untypedFileContentData: any) {
        if (untypedFileContentData != null) {
            this.uuid = untypedFileContentData.uuid;
            this.name = untypedFileContentData.name;
            this.content = untypedFileContentData.content;
            this.size = untypedFileContentData.size;
            this.creator = untypedFileContentData.creator;
            this.creationDate = untypedFileContentData.creationDate;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'uuid',
           'name',
           'content',
           'size',
           'creator',
           'creationDate',
        ];
    }

    getUuid() {
        return this.uuid;
    }

    getName() {
        return this.name;
    }

    getContent() {
        return this.content;
    }

    getSize() {
        return this.size;
    }

    getCreator() {
        return this.creator;
    }

    getCreationDate() {
        return this.creationDate;
    }


    setUuid(uuid: number) {
        this.uuid = uuid;
    }

    setName(name: string) {
        this.name = name;
    }

    setContent(content: string) {
        this.content = content;
    }

    setSize(size: number) {
        this.size = size;
    }

    setCreator(creator: string) {
        this.creator = creator;
    }

    setCreationDate(creationDate: string) {
        this.creationDate = creationDate;
    }


    public equals(obj: FileContentData): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.uuid !== obj.uuid) { return false; }
        if (this.name !== obj.name) { return false; }
        if (this.content !== obj.content) { return false; }
        if (this.size !== obj.size) { return false; }
        if (this.creator !== obj.creator) { return false; }
        if (this.creationDate !== obj.creationDate) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Uuid: ' + this.uuid + '\n' +
           'Name: ' + this.name + '\n' +
           'Content: ' + this.content + '\n' +
           'Size: ' + this.size + '\n' +
           'Creator: ' + this.creator + '\n' +
           'CreationDate: ' + this.creationDate + '\n';
    }
}
