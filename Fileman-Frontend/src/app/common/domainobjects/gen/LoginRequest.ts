
export class LoginRequest
{
    userId: string;
    userPw: string;
    filemanVersion: string;

    constructor(untypedLoginRequest: any) {
        if (untypedLoginRequest != null) {
            this.userId = untypedLoginRequest.userId;
            this.userPw = untypedLoginRequest.userPw;
            this.filemanVersion = untypedLoginRequest.filemanVersion;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'userId',
           'userPw',
           'filemanVersion',
        ];
    }

    getUserId() {
        return this.userId;
    }

    getUserPw() {
        return this.userPw;
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

    setFilemanVersion(filemanVersion: string) {
        this.filemanVersion = filemanVersion;
    }


    public equals(obj: LoginRequest): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.userId !== obj.userId) { return false; }
        if (this.userPw !== obj.userPw) { return false; }
        if (this.filemanVersion !== obj.filemanVersion) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'UserId: ' + this.userId + '\n' +
           'UserPw: ' + this.userPw + '\n' +
           'FilemanVersion: ' + this.filemanVersion + '\n';
    }
}
