
export class UserPreferences
{
    userId: number;
    contentType: string;
    layoutType: string;
    favouriteFilterActive: boolean;

    constructor(untypedUserPreferences: any) {
        if (untypedUserPreferences != null) {
            this.userId = untypedUserPreferences.userId;
            this.contentType = untypedUserPreferences.contentType;
            this.layoutType = untypedUserPreferences.layoutType;
            this.favouriteFilterActive = untypedUserPreferences.favouriteFilterActive;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'userId',
           'contentType',
           'layoutType',
           'favouriteFilterActive',
        ];
    }

    getUserId() {
        return this.userId;
    }

    getContentType() {
        return this.contentType;
    }

    getLayoutType() {
        return this.layoutType;
    }

    getFavouriteFilterActive() {
        return this.favouriteFilterActive;
    }


    setUserId(userId: number) {
        this.userId = userId;
    }

    setContentType(contentType: string) {
        this.contentType = contentType;
    }

    setLayoutType(layoutType: string) {
        this.layoutType = layoutType;
    }

    setFavouriteFilterActive(favouriteFilterActive: boolean) {
        this.favouriteFilterActive = favouriteFilterActive;
    }


    public equals(obj: UserPreferences): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.userId !== obj.userId) { return false; }
        if (this.contentType !== obj.contentType) { return false; }
        if (this.layoutType !== obj.layoutType) { return false; }
        if (this.favouriteFilterActive !== obj.favouriteFilterActive) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'UserId: ' + this.userId + '\n' +
           'ContentType: ' + this.contentType + '\n' +
           'LayoutType: ' + this.layoutType + '\n' +
           'FavouriteFilterActive: ' + this.favouriteFilterActive + '\n';
    }
}
