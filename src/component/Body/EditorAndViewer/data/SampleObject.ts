import { faker } from "@faker-js/faker";
export const SampleObject = `{
    "first_name":"${faker?.person.firstName()}",
    "last_name":"${faker.person.lastName()}",
    "email":"${faker.internet.email()}",
    "city":"${faker.location.city()}",
    "image":"${faker.image.avatar()}"
  }`;
export const RandomString=faker.string.alpha({ length: {min:11,max:20} })