
export class UserComponentState
{
    userId: number;
    contentType: string;
    layoutType: string;
    searchString: string;
    favouriteFilterActive: boolean;

    constructor(untypedUserComponentState: any) {
        if (untypedUserComponentState != null) {
            this.userId = untypedUserComponentState.userId;
            this.contentType = untypedUserComponentState.contentType;
            this.layoutType = untypedUserComponentState.layoutType;
            this.searchString = untypedUserComponentState.searchString;
            this.favouriteFilterActive = untypedUserComponentState.favouriteFilterActive;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'userId',
           'contentType',
           'layoutType',
           'searchString',
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

    getSearchString() {
        return this.searchString;
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

    setSearchString(searchString: string) {
        this.searchString = searchString;
    }

    setFavouriteFilterActive(favouriteFilterActive: boolean) {
        this.favouriteFilterActive = favouriteFilterActive;
    }


    public equals(obj: UserComponentState): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.userId !== obj.userId) { return false; }
        if (this.contentType !== obj.contentType) { return false; }
        if (this.layoutType !== obj.layoutType) { return false; }
        if (this.searchString !== obj.searchString) { return false; }
        if (this.favouriteFilterActive !== obj.favouriteFilterActive) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'UserId: ' + this.userId + '\n' +
           'ContentType: ' + this.contentType + '\n' +
           'LayoutType: ' + this.layoutType + '\n' +
           'SearchString: ' + this.searchString + '\n' +
           'FavouriteFilterActive: ' + this.favouriteFilterActive + '\n';
    }
}
