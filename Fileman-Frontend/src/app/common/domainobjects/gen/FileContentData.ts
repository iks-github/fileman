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
export class FileContentData
{
    uuid: number;
    name: string;
    content: string;
    creator: string;
    creationDate: string;

    constructor(untypedFileContentData: any) {
        if (untypedFileContentData != null) {
            this.uuid = untypedFileContentData.uuid;
            this.name = untypedFileContentData.name;
            this.content = untypedFileContentData.content;
            this.creator = untypedFileContentData.creator;
            this.creationDate = untypedFileContentData.creationDate;
        }
    }

    getUuid() {
        return this.uuid;
    }

    getName() {
        return this.name;
    }

    getContent() {
        return this.content;
    }

    getCreator() {
        return this.creator;
    }

    getCreationDate() {
        return this.creationDate;
    }

    setUuid(uuid: number) {
        this.uuid = uuid;
    }

    setName(name: string) {
        this.name = name;
    }

    setContent(content: string) {
        this.content = content;
    }

    setCreator(creator: string) {
        this.creator = creator;
    }

    setCreationDate(creationDate: string) {
        this.creationDate = creationDate;
    }

    public equals(obj: FileContentData): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.uuid !== obj.uuid) { return false; }
        if (this.name !== obj.name) { return false; }
        if (this.content !== obj.content) { return false; }
        if (this.creator !== obj.creator) { return false; }
        if (this.creationDate !== obj.creationDate) { return false; }

        return true;
    }
}