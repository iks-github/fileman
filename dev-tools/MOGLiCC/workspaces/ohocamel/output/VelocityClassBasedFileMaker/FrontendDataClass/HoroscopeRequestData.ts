
export class HoroscopeRequestData
{
    name: string;
    gender: string;
    birthday: string;

    constructor(untypedHoroscopeRequestData: any) {
        if (untypedHoroscopeRequestData != null) {
            this.name = untypedHoroscopeRequestData.name;
            this.gender = untypedHoroscopeRequestData.gender;
            this.birthday = untypedHoroscopeRequestData.birthday;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'name',
           'gender',
           'birthday',
        ];
    }

    getName() {
        return this.name;
    }

    getGender() {
        return this.gender;
    }

    getBirthday() {
        return this.birthday;
    }


    setName(name: string) {
        this.name = name;
    }

    setGender(gender: string) {
        this.gender = gender;
    }

    setBirthday(birthday: string) {
        this.birthday = birthday;
    }


    public equals(obj: HoroscopeRequestData): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.name !== obj.name) { return false; }
        if (this.gender !== obj.gender) { return false; }
        if (this.birthday !== obj.birthday) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'Name: ' + this.name + '\n' +
           'Gender: ' + this.gender + '\n' +
           'Birthday: ' + this.birthday + '\n';
    }
}
