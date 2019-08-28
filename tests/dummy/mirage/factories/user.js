import { Factory, faker } from 'ember-cli-mirage';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Factory.extend({
  name() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  },

  emailProvider: faker.list.cycle('gmail', 'yahoo', 'hotmail'),

  email() {
    return `${this.name.toLowerCase().replace(' ', '.')}@${this.emailProvider}.com`;
  },



  favoutite_colours() {
    var numberOfColours = getRandomInt(5);
    var colours = [];
    for (var i = 0; i < numberOfColours; i++) {
      colours.push(faker.commerce.color());
    } 
    return colours;
  },

  bio() {
    return faker.lorem.sentence();
  },

  password: faker.internet.password(),
  
  password_confirmation() {
    return this.password;
  },

  accept_terms() {
    return 'true';
  },

  // password: faker.intenet.password,

  gender: faker.list.cycle('male', 'female', 'other'),

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
