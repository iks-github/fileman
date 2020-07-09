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

  static getFormattedDateString(nativeDateString: string): string {
    return new Date(nativeDateString).toLocaleString('de', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
  }
}
