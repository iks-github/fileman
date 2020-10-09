import { FileGroup } from 'src/app/common/domainobjects/gen/FileGroup';

export class FileMetaData
{
    id: number;
    name: string;
    description: string;
    activeUUID: number;
    immediatelyActive: boolean;
    fileGroups: FileGroup[];
    techType: string;
    techVersion: number;
    creator: string;
    creationDate: string;
    size: number;

    constructor(untypedFileMetaData: any) {
        if (untypedFileMetaData != null) {
            this.id = untypedFileMetaData.id;
            this.name = untypedFileMetaData.name;
            this.description = untypedFileMetaData.description;
            this.activeUUID = untypedFileMetaData.activeUUID;
            this.immediatelyActive = untypedFileMetaData.immediatelyActive;
            this.fileGroups = untypedFileMetaData.fileGroups;
            this.techType = untypedFileMetaData.techType;
            this.techVersion = untypedFileMetaData.techVersion;
            this.creator = untypedFileMetaData.creator;
            this.creationDate = untypedFileMetaData.creationDate;
            this.size = untypedFileMetaData.size;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'id',
           'name',
           'description',
           'activeUUID',
           'immediatelyActive',
           'fileGroups',
           'techType',
           'techVersion',
           'creator',
           'creationDate',
           'size',
        ];
    }

    getId() {
      return this.id;
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

    getFileGroups() {
        return this.fileGroups;
    }

    getTechType() {
        return this.techType;
    }

    getTechVersion() {
        return this.techVersion;
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


    setId(id: number) {
      this.id = id;
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

    setFileGroups(fileGroups: FileGroup[]) {
      this.fileGroups = fileGroups;
    }

    setTechType(techType: string) {
        this.techType = techType;
    }

    setTechVersion(techVersion: number) {
        this.techVersion = techVersion;
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

        if (this.id !== obj.id) { return false; }
        if (this.name !== obj.name) { return false; }
        if (this.description !== obj.description) { return false; }
        if (this.activeUUID !== obj.activeUUID) { return false; }
        if (this.immediatelyActive !== obj.immediatelyActive) { return false; }
        if (this.fileGroups !== obj.fileGroups) { return false; }
        if (this.techType !== obj.techType) { return false; }
        if (this.techVersion !== obj.techVersion) { return false; }
        if (this.creator !== obj.creator) { return false; }
        if (this.creationDate !== obj.creationDate) { return false; }
        if (this.size !== obj.size) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Id: ' + this.id + '\n' +
           'Name: ' + this.name + '\n' +
           'Description: ' + this.description + '\n' +
           'ActiveUUID: ' + this.activeUUID + '\n' +
           'ImmediatelyActive: ' + this.immediatelyActive + '\n' +
           'FileGroups: ' + this.fileGroups + '\n' +
           'TechType: ' + this.techType + '\n' +
           'TechVersion: ' + this.techVersion + '\n' +
           'Creator: ' + this.creator + '\n' +
           'CreationDate: ' + this.creationDate + '\n' +
           'Size: ' + this.size + '\n';
    }
}
