import Entity from "../../@shared/entities/entity.abstract";
import NotificationError from "../../@shared/notifications/notification.error";
import Address from "../value_objects/address";
import ICustomer from "./customer.interface";

export default class Customer extends Entity implements ICustomer {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();

    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
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
      this.notification.addError({
        context: "customer",
        message: "id is required",
      });
    }
    if (!this._name) {
      this.notification.addError({
        context: "customer",
        message: "name is required",
      });
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
