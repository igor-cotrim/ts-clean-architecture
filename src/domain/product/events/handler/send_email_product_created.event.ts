import IEventHandler from "../../../@shared/events/event_handler/event-handler.interface";
import ProductCreatedEvent from "../product_created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email: ${JSON.stringify(event)}`);
  }
}
