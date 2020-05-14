export class Utils
{
  static sortList(list: any[]): any[] {
    list.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    return list;
  }

  static getFileExtension(filename: string): string {
    const pos = filename.lastIndexOf('.');
    if (pos === -1) {return '';}
    return filename.substring(pos + 1);
  }

}
