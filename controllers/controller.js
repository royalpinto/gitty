'use strict';


/**
 * @class
 * @classdesc An abstract base class for all controllers with high level
 * interface methods which have to be implemented by the sub classes.
 * NOTE: It's just an empty base class for this demonstration.
 */
class Controller {

    // User would be the person (logged in) accessing the APIs.
    // Not getting used for this demo  as we don't have
    // authentication and authorizations.
    constructor(user) {
        this.user = user;
    }

}


module.exports = Controller;
