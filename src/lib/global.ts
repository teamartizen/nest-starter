import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as moment from 'moment-timezone';

export const showRoutes = (app) => {
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        };
      }
    })
    .filter((item) => item !== undefined);

  console.table(availableRoutes);
};

export const isDevelopment = () => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
};

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const phoneRegex = /^\d{10}$/;
          return typeof value === 'string' && phoneRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} is not a valid phone number`;
        },
      },
    });
  };
}

export function IsZipCode(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isZipCode',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const zipRegex = /^[1-9][0-9]{5}/;
          if (!value) return true;
          return typeof value === 'string' && zipRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} is not a valid zip code`;
        },
      },
    });
  };
}

export function IsHandle(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isHandle',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const handleRegex = /^[a-z0-9_]{2,25}$/;
          return typeof value === 'string' && handleRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} is not a valid handle`;
        },
      },
    });
  };
}

export const capitalize = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeAll = (string) => {
  if (!string) return string;
  const words = string.split(' ');
  const newWords = words.map((word) => capitalize(word));
  return newWords.join(' ');
};