import {
  registerDecorator,
  ValidationOptions,
  isString,
} from 'class-validator';
import { ExceptionMessage } from '../data/exception-message';

export function IsStringCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsStringCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isString(value);
        },
        defaultMessage() {
          return ExceptionMessage.IsString(propertyName);
        },
      },
    });
  };
}
