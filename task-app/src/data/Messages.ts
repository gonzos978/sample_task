export class Messages {
  private msgData: string[];

  constructor() {
    this.msgData = [
      "Hope you're having a great day!",
      "You're doing awesome, keep it up!",
      "Congratulations on your success!",
      "Congratulations on your success!",
      "Stay strong, you've got this!",
      "Thinking about something cool, care to share?",
      "Just had a brilliant idea!",
      "You're shining bright today!",
      "Thanks so much, I appreciate it!",
      "Sending you positive vibes!",
      "Let's celebrate the little wins today!",
    ];
  }

  public getMessageData() {
    return this.msgData;
  }

  public getMessage(index: number) {
    return this.msgData[index];
  }
}
