export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string): string {
    const filteredErrors = context
      ? this.errors.filter((error) => error.context === context)
      : this.errors;

    if (filteredErrors.length === 0) {
      return "No errors found.";
    }

    return filteredErrors
      .map(({ context, message }) => `${context}: ${message}`)
      .join(", ");
  }
}
