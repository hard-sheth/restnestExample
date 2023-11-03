export class Secrecy {
  private email: string;
  private contact: string;
  private secreatkey;
  private dontMaskDigit = 0;
  private spaceAdd = 5;
  private maskRegex = new RegExp(`.{1,${this.spaceAdd}}`, 'g');
  constructor() {}

  DecryptEmail() {}
  DecryptContact() {}
  DecryptContactArray() {}
  maskContactArray() {}
  /**
   * A function that does something.
   * @param {type} maskdomain - This will mask the domain as well default it is true but if don't wanna mask domain then pass false.
   */
  maskEmail(email, maskdomain: boolean = true) {
    this.email = email;
    const [username, domain] = this.email.split('@');
    const [nameDomain, extension] = domain.split('.');
    if (!maskdomain) {
      this.email = `${this.masking(username)}@${domain}`;
    } else {
      this.email = `${this.masking(username)}@${this.masking(
        nameDomain,
      )}.${extension}`;
    }
    return this.email;
  }
  /**
   * A function that does something.
   * @param {type} contact - Please pass contact only without prefix like +91 etc example:9876543210.
   * @param {type} dontMaskDigit - Number of digits which you don't want to mask.
   * @param {type} dontMaskDigitPlace - Place where unmasked digit appears.
   * @param {type} insertSpacing - after certain lenght insert spacing like ex:98765 43210.
   * @param {type} Someprefix - In Contact To add prefix before like +91.
   */
  maskContact(
    contact,
    dontMaskDigit?: number,
    dontMaskDigitPlace?: 'start' | 'end',
    insertSpacing?: number,
    Someprefix?: string,
  ) {
    this.contact = contact;
    if (typeof dontMaskDigit === 'number' && dontMaskDigit < 12) {
      this.dontMaskDigit = dontMaskDigit;
    }
    if (dontMaskDigitPlace === 'end') {
      this.contact = this.maskContactLastDigits();
    } else if (dontMaskDigitPlace === 'start') {
      this.contact = this.maskContactFirstDigits();
    }
    if (typeof insertSpacing === 'number' && insertSpacing <= 6) {
      this.spaceAdd = insertSpacing;
      this.contact = this.spacingAddInNumber();
    }
    if (Someprefix) {
      this.contact = `${Someprefix} ${this.contact}`;
    }
    return this.contact;
  }
  private maskContactLastDigits() {
    const lastdigits = this.contact.substring(
      this.contact.length - this.dontMaskDigit,
    );
    const maskCharacters = this.masking(
      this.contact.substring(0, this.contact.length - this.dontMaskDigit),
    );
    this.contact = `${maskCharacters}${lastdigits}`;
    return this.contact;
  }
  private maskContactFirstDigits() {
    const maskdigits = this.contact.substring(
      this.contact.length - this.dontMaskDigit,
    );
    const characters = this.contact.substring(0, this.dontMaskDigit);
    this.contact = `${characters}${maskdigits}`;
    return this.contact;
  }
  private spacingInNumber() {
    const maskdigits = this.contact
      .substring(this.contact.length - this.dontMaskDigit)
      .replace(/./g, '*');
    const characters = this.contact.substring(0, this.dontMaskDigit);
    this.contact = `${characters}${maskdigits}`;
    return this.contact;
  }
  private spacingAddInNumber() {
    this.maskRegex = new RegExp(`.{1,${this.spaceAdd}}`, 'g');
    this.contact = this.contact.match(this.maskRegex).join(' ');
    return this.contact;
  }
  masking(string) {
    return string.replace(/./g, '*');
  }
}
