
export class User
{
    id: number;
    name: string;
    role: string;
    password: string;
    passwordRepetition: string;

    constructor(untypedUser: any) {
        if (untypedUser != null) {
            this.id = untypedUser.id;
            this.name = untypedUser.name;
            this.role = untypedUser.role;
            this.password = untypedUser.password;
            this.passwordRepetition = untypedUser.passwordRepetition;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'id',
           'name',
           'role',
           'password',
           'passwordRepetition',
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

    getPassword() {
        return this.password;
    }

    getPasswordRepetition() {
        return this.passwordRepetition;
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

    setPassword(password: string) {
        this.password = password;
    }

    setPasswordRepetition(passwordRepetition: string) {
        this.passwordRepetition = passwordRepetition;
    }


    public equals(obj: User): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.id !== obj.id) { return false; }
        if (this.name !== obj.name) { return false; }
        if (this.role !== obj.role) { return false; }
        if (this.password !== obj.password) { return false; }
        if (this.passwordRepetition !== obj.passwordRepetition) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Id: ' + this.id + '\n' +
           'Name: ' + this.name + '\n' +
           'Role: ' + this.role + '\n' +
           'Password: ' + this.password + '\n' +
           'PasswordRepetition: ' + this.passwordRepetition + '\n';
    }
}
