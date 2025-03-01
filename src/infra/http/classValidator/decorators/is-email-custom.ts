import { registerDecorator, ValidationOptions, isEmail } from 'class-validator';
import { ExceptionMessage } from '../data/exception-message';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isEmail(value);
        },
        defaultMessage() {
          return ExceptionMessage.IsEmail(propertyName);
        },
      },
    });
  };
}
