import { Tenant } from 'src/app/common/domainobjects/gen/Tenant';

export class FileGroup
{
    id: number;
    name: string;
    tenant: Tenant;

    constructor(untypedFileGroup: any) {
        if (untypedFileGroup != null) {
            this.id = untypedFileGroup.id;
            this.name = untypedFileGroup.name;
            this.tenant = untypedFileGroup.tenant;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'id',
           'name',
           'tenant',
        ];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getTenant() {
        return this.tenant;
    }


    setId(id: number) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setTenant(tenant: Tenant) {
        this.tenant = tenant;
    }


    public equals(obj: FileGroup): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.id !== obj.id) { return false; }
        if (this.name !== obj.name) { return false; }
        if (this.tenant !== obj.tenant) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Id: ' + this.id + '\n' +
           'Name: ' + this.name + '\n' +
           'Tenant: ' + this.tenant + '\n';
    }
}
