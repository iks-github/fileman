import { Tenant } from 'src/app/common/domainobjects/gen/Tenant';

export class User
{
    id: number;
    name: string;
    role: string;
    tenants: Tenant[];
    password: string;
    passwordRepetition: string;
    avatar: string;

    constructor(untypedUser: any) {
        if (untypedUser != null) {
            this.id = untypedUser.id;
            this.name = untypedUser.name;
            this.role = untypedUser.role;
            this.tenants = untypedUser.tenants;
            this.password = untypedUser.password;
            this.passwordRepetition = untypedUser.passwordRepetition;
            this.avatar = untypedUser.avatar;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'id',
           'name',
           'role',
           'tenants',
           'password',
           'passwordRepetition',
           'avatar',
        ];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getRole() {
        return this.role;
    }

    getTenants() {
        return this.tenants;
    }

    getPassword() {
        return this.password;
    }

    getPasswordRepetition() {
        return this.passwordRepetition;
    }

    getAvatar() {
        return this.avatar;
    }


    setId(id: number) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setRole(role: string) {
        this.role = role;
    }

    setTenants(tenants: Tenant[]) {
        this.tenants = tenants;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setPasswordRepetition(passwordRepetition: string) {
        this.passwordRepetition = passwordRepetition;
    }

    setAvatar(avatar: string) {
        this.avatar = avatar;
    }


    public equals(obj: User): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.id !== obj.id) { return false; }
        if (this.name !== obj.name) { return false; }
        if (this.role !== obj.role) { return false; }
        if (this.tenants !== obj.tenants) { return false; }
        if (this.password !== obj.password) { return false; }
        if (this.passwordRepetition !== obj.passwordRepetition) { return false; }
        if (this.avatar !== obj.avatar) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Id: ' + this.id + '\n' +
           'Name: ' + this.name + '\n' +
           'Role: ' + this.role + '\n' +
           'Tenants: ' + this.tenants + '\n' +
           'Password: ' + this.password + '\n' +
           'PasswordRepetition: ' + this.passwordRepetition + '\n' +
           'Avatar: ' + this.avatar + '\n';
    }
}
