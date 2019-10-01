export class NewCollectionDto {

  public uid: number;
  public name: string;
  public description: string;

  constructor(uid: number, name: string, description: string) {
    this.uid = uid;
    this.name = name;
    this.description = description;
  }

}
