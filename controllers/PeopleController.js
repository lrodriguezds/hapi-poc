const PeopleController = module.exports;

const PeopleService = require('../services/PeopleService');

PeopleController.search = (name) => {

    const result = PeopleService.search(name);
    return result;
}
