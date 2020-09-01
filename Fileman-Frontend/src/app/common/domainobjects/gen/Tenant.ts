
export class Tenant
{
    id: number;
    name: string;

    constructor(untypedTenant: any) {
        if (untypedTenant != null) {
            this.id = untypedTenant.id;
            this.name = untypedTenant.name;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'id',
           'name',
        ];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }


    setId(id: number) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }


    public equals(obj: Tenant): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.id !== obj.id) { return false; }
        if (this.name !== obj.name) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Id: ' + this.id + '\n' +
           'Name: ' + this.name + '\n';
    }
}
