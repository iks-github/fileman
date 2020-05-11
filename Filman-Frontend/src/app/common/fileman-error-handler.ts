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
import { ErrorHandler } from '@angular/core';
import { FilemanUrlNotReachable } from './errors/fileman-url-not-reachable-error';
import { FilemanBadRequestError } from './errors/fileman-bad-request-error';

export class FilemanErrorHandler extends ErrorHandler
{
    handleError(error: any)
    {
        if (error.status === 0) {
            alert('The URL ' + error.url + ' is currently not available!');
        } else if (error.status === 500) {
            alert('The call of uri "' + error.url + '" resulted in an error on server side!');
        } else if (error.status === 400 || error instanceof FilemanBadRequestError) {
            console.log(error);
            alert('The request to uri "' + error.url + '" is invalid!');
        } else if (error.status === 404 || error instanceof FilemanUrlNotReachable) {
            alert('The ressouce with uri "' + error.url + '" is not reachable!');
        } else if (error.cause != null && (error.cause.status === 404 || error.cause instanceof FilemanUrlNotReachable)) {
            alert('The ressouce with uri "' + error.cause.url + '" is not reachable!');
        } else {
            console.log('Unexpected ERROR: ');
            console.log(error);
            alert('Unexpected Error!');
        }
    }
}