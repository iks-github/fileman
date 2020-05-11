/*
 * Copyright 2020 IKS Gesellschaft fuer Informations- und Kommunikationssysteme mbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
}