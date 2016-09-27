'use strict';


/**
 * @class
 * @classdesc An abstract base class for all controllers with high level
 * interface methods which have to be implemented by the sub classes.
 */
class Controller {

    constructor(user) {
        this.user = user;
    }

}


module.exports = Controller;
