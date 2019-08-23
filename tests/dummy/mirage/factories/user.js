import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  },

  emailProvider: faker.list.cycle('gmail', 'yahoo', 'hotmail'),
  email() {
    return `${this.name.toLowerCase().replace(' ', '.')}@${this.emailProvider}.com`;
  },

  bio() {
    return faker.lorem.sentence();
  },

  accept_terms() {
    return 'true';
  },

  gender() {
    return faker.list.cycle('male', 'female', 'other');
  },

  info() {
    return {
      favourite_colours: ['red', 'green'],
      birth_date: faker.date.past(),
      phone_number: faker.phone.phoneNumber(),
      address: {
        country:  faker.address.country()
      }
    };
  },
});
