
export class FavouriteSetting
{
    id: number;
    username: string;
    filename: string;

    constructor(untypedFavouriteSetting: any) {
        if (untypedFavouriteSetting != null) {
            this.id = untypedFavouriteSetting.id;
            this.username = untypedFavouriteSetting.username;
            this.filename = untypedFavouriteSetting.filename;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'id',
           'username',
           'filename',
        ];
    }

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    getFilename() {
        return this.filename;
    }


    setId(id: number) {
        this.id = id;
    }

    setUsername(username: string) {
        this.username = username;
    }

    setFilename(filename: string) {
        this.filename = filename;
    }


    public equals(obj: FavouriteSetting): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.id !== obj.id) { return false; }
        if (this.username !== obj.username) { return false; }
        if (this.filename !== obj.filename) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Id: ' + this.id + '\n' +
           'Username: ' + this.username + '\n' +
           'Filename: ' + this.filename + '\n';
    }
}
