import { Tenant } from './Tenant';

export class LoginRequest
{
    userId: string;
    userPw: string;
    tenant: Tenant;
    filemanVersion: string;

    constructor(untypedLoginRequest: any) {
        if (untypedLoginRequest != null) {
            this.userId = untypedLoginRequest.userId;
            this.userPw = untypedLoginRequest.userPw;
            this.tenant = untypedLoginRequest.tenant;
            this.filemanVersion = untypedLoginRequest.filemanVersion;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'userId',
           'userPw',
           'tenant',
           'filemanVersion',
        ];
    }

    getUserId() {
        return this.userId;
    }

    getUserPw() {
        return this.userPw;
    }

    getTenant() {
      return this.tenant;
    }

    getFilemanVersion() {
        return this.filemanVersion;
    }


    setUserId(userId: string) {
        this.userId = userId;
    }

    setUserPw(userPw: string) {
        this.userPw = userPw;
    }

    setTenant(tenant: Tenant) {
      this.tenant = tenant;
    }

    setFilemanVersion(filemanVersion: string) {
        this.filemanVersion = filemanVersion;
    }


    public equals(obj: LoginRequest): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.userId !== obj.userId) { return false; }
        if (this.userPw !== obj.userPw) { return false; }
        if (this.tenant !== obj.tenant) { return false; }
        if (this.filemanVersion !== obj.filemanVersion) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'UserId: ' + this.userId + '\n' +
           'UserPw: ' + this.userPw + '\n' +
           'Tenant: ' + this.tenant + '\n' +
           'FilemanVersion: ' + this.filemanVersion + '\n';
    }
}
