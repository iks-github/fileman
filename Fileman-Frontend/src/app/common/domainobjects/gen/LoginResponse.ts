
export class LoginResponse
{
    errorMessage: string;
    authToken: string;
    ok: boolean;

    constructor(untypedLoginResponse: any) {
        if (untypedLoginResponse != null) {
            this.errorMessage = untypedLoginResponse.errorMessage;
            this.authToken = untypedLoginResponse.authToken;
            this.ok = untypedLoginResponse.ok;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'errorMessage',
           'authToken',
           'ok',
        ];
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    getAuthToken() {
        return this.authToken;
    }

    getOk() {
        return this.ok;
    }


    setErrorMessage(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    setAuthToken(authToken: string) {
        this.authToken = authToken;
    }

    setOk(ok: boolean) {
        this.ok = ok;
    }


    public equals(obj: LoginResponse): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.errorMessage !== obj.errorMessage) { return false; }
        if (this.authToken !== obj.authToken) { return false; }
        if (this.ok !== obj.ok) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'ErrorMessage: ' + this.errorMessage + '\n' +
           'AuthToken: ' + this.authToken + '\n' +
           'Ok: ' + this.ok + '\n';
    }
}
