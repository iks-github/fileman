import { User } from 'src/app/common/domainobjects/gen/User';

export class Tenant
{
    id: number;
    name: string;
    users: User[];

    constructor(untypedTenant: any) {
        if (untypedTenant != null) {
            this.id = untypedTenant.id;
            this.name = untypedTenant.name;
            this.users = untypedTenant.users;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'id',
           'name',
           'users',
        ];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getUsers() {
        return this.users;
    }


    setId(id: number) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setUsers(users: User[]) {
        this.users = users;
    }


    public equals(obj: Tenant): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.id !== obj.id) { return false; }
        if (this.name !== obj.name) { return false; }
        if (this.users !== obj.users) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Id: ' + this.id + '\n' +
           'Name: ' + this.name + '\n' +
           'Users: ' + this.users + '\n';
    }
}
