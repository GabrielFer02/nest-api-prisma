import {
  registerDecorator,
  ValidationOptions,
  isNotEmpty,
} from 'class-validator';
import { ExceptionMessage } from '../data/exception-message';

export function IsNotEmptyCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmptyCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isNotEmpty(value);
        },
        defaultMessage() {
          return ExceptionMessage.IsNotEmpty(propertyName);
        },
      },
    });
  };
}
