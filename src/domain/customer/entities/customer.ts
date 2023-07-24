import Address from "../value_objects/address";
import ICustomer from "./customer.interface";

export default class Customer implements ICustomer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  set address(address: Address) {
    this._address = address;
  }

  validate() {
    if (!this._id) {
      throw new Error("id is required");
    }
    if (!this._name) {
      throw new Error("name is required");
    }
  }

  changeName(name: string): void {
    this._name = name;

    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }

  changeAddress(address: Address): void {
    this._address = address;
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error("address is required");
    }

    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }
}
