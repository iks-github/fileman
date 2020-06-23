
export class UserComponentState
{
    userId: number;
    layoutType: string;
    searchText: string;
    favouriteFilterOn: boolean;

    constructor(untypedUserComponentState: any) {
        if (untypedUserComponentState != null) {
            this.userId = untypedUserComponentState.userId;
            this.layoutType = untypedUserComponentState.layoutType;
            this.searchText = untypedUserComponentState.searchText;
            this.favouriteFilterOn = untypedUserComponentState.favouriteFilterOn;
        }
    }


    static getAttributeNames(): string[] {
        return [
           'userId',
           'layoutType',
           'searchText',
           'favouriteFilterOn',
        ];
    }

    getUserId() {
        return this.userId;
    }

    getLayoutType() {
        return this.layoutType;
    }

    getSearchText() {
        return this.searchText;
    }

    getFavouriteFilterOn() {
        return this.favouriteFilterOn;
    }


    setUserId(userId: number) {
        this.userId = userId;
    }

    setLayoutType(layoutType: string) {
        this.layoutType = layoutType;
    }

    setSearchText(searchText: string) {
        this.searchText = searchText;
    }

    setFavouriteFilterOn(favouriteFilterOn: boolean) {
        this.favouriteFilterOn = favouriteFilterOn;
    }


    public equals(obj: UserComponentState): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.userId !== obj.userId) { return false; }
        if (this.layoutType !== obj.layoutType) { return false; }
        if (this.searchText !== obj.searchText) { return false; }
        if (this.favouriteFilterOn !== obj.favouriteFilterOn) { return false; }

        return true;
    }

    getStringRepresentation(): string {
        return 'DETAILS:\n' +
               '------------------------------------------\n' +
           'UserId: ' + this.userId + '\n' +
           'LayoutType: ' + this.layoutType + '\n' +
           'SearchText: ' + this.searchText + '\n' +
           'FavouriteFilterOn: ' + this.favouriteFilterOn + '\n';
    }
}
