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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { User } from '../common/domainobjects/gen/User';

@Injectable({
  providedIn: 'root'
})
export class FilemanAvatarService {
  url;
  initialAvatarLoadingDone: boolean;
  avatars: Map<string, string>;

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/files';
    this.initialAvatarLoadingDone = false;
    this.avatars = new Map<string, string>();
  }

  preparePreviews(users: User[]) {
    if (this.initialAvatarLoadingDone) {
      return;
    }

    users.forEach((user: User) => {
      this.prepareAvatar(user);
    });
    this.initialAvatarLoadingDone = true;
  }

  prepareAvatar(user: User) {
    const reader = new FileReader();

    reader.onload = () => {
      this.avatars.set(user.name, reader.result as string);
      console.log("set avatar for user "+user.name);
    }

    const avatar: string = user.getAvatar();

    if (avatar != null) {
      const file = this.createBlobFromBase64Data(avatar);
      reader.readAsDataURL(file);
    }
  }

  createBlobFromBase64Data(base64Data: string) {

    var signatures = {
      R0lGODdh: "image/gif",
      R0lGODlh: "image/gif",
      iVBORw0KGgo: "image/png",
      '/9j/': "image/jpg"
    };

    let contentType: string;

    for (var s in signatures) {
      if (base64Data.indexOf(s) === 0) {
        contentType = signatures[s];
      }
    }

    if (contentType == null) {
      throw new Error("Unknown content type");
    }

    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  hasAvatar(userName: string): boolean {
    return this.avatars.has(userName);
  }

  getAvatarData(userName: string): string {
    return this.avatars.get(userName);
  }
}
