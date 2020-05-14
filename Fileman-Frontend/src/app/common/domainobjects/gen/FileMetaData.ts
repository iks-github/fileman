
export class FileMetaData
{
    name: string;
    description: string;
    activeUUID: number;
    immediatelyActive: boolean;
    techType: string;
    creator: string;
    creationDate: string;
    size: number;

    constructor(untypedFileMetaData: any) {
        if (untypedFileMetaData != null) {
            this.name = untypedFileMetaData.name;
            this.description = untypedFileMetaData.description;
            this.activeUUID = untypedFileMetaData.activeUUID;
            this.immediatelyActive = untypedFileMetaData.immediatelyActive;
            this.techType = untypedFileMetaData.techType;
            this.creator = untypedFileMetaData.creator;
            this.creationDate = untypedFileMetaData.creationDate;
            this.size = untypedFileMetaData.size;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'name',
           'description',
           'activeUUID',
           'immediatelyActive',
           'techType',
           'creator',
           'creationDate',
           'size',
        ];
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getActiveUUID() {
        return this.activeUUID;
    }

    getImmediatelyActive() {
        return this.immediatelyActive;
    }

    getTechType() {
        return this.techType;
    }

    getCreator() {
        return this.creator;
    }

    getCreationDate() {
        return this.creationDate;
    }

    getSize() {
        return this.size;
    }


    setName(name: string) {
        this.name = name;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setActiveUUID(activeUUID: number) {
        this.activeUUID = activeUUID;
    }

    setImmediatelyActive(immediatelyActive: boolean) {
        this.immediatelyActive = immediatelyActive;
    }

    setTechType(techType: string) {
        this.techType = techType;
    }

    setCreator(creator: string) {
        this.creator = creator;
    }

    setCreationDate(creationDate: string) {
        this.creationDate = creationDate;
    }

    setSize(size: number) {
        this.size = size;
    }


    public equals(obj: FileMetaData): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.name !== obj.name) { return false; }
        if (this.description !== obj.description) { return false; }
        if (this.activeUUID !== obj.activeUUID) { return false; }
        if (this.immediatelyActive !== obj.immediatelyActive) { return false; }
        if (this.techType !== obj.techType) { return false; }
        if (this.creator !== obj.creator) { return false; }
        if (this.creationDate !== obj.creationDate) { return false; }
        if (this.size !== obj.size) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Name: ' + this.name + '\n' +
           'Description: ' + this.description + '\n' +
           'ActiveUUID: ' + this.activeUUID + '\n' +
           'ImmediatelyActive: ' + this.immediatelyActive + '\n' +
           'TechType: ' + this.techType + '\n' +
           'Creator: ' + this.creator + '\n' +
           'CreationDate: ' + this.creationDate + '\n' +
           'Size: ' + this.size + '\n';
    }
}
