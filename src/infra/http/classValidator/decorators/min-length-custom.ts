import {
  registerDecorator,
  ValidationOptions,
  minLength,
} from 'class-validator';
import { ExceptionMessage } from '../data/exception-message';

export function MinLengthCustom(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MinLengthCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return minLength(value, min);
        },
        defaultMessage() {
          return ExceptionMessage.MinLength(min, propertyName);
        },
      },
    });
  };
}
