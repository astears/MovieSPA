export class EditCollectionInfoDto {
  public uid: number;
  public id: number;
  public name: string;
  public description: string;

  constructor(uid: number, id: number, name: string, description: string) {
    this.uid = uid;
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
