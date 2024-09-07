export var contactKeys;
(function (contactKeys) {
    contactKeys["ID"] = "_id";
    contactKeys["NAME"] = "name";
    contactKeys["PHONE"] = "phoneNumber";
    contactKeys["EMAIL"] = "email";
    contactKeys["FAVOURITE"] = "isFavourite";
    contactKeys["TYPE"] = "contactType";
    contactKeys["CREATEDAT"] = "createdAt";
    contactKeys["UPDATEDAT"] = "updatedAt";
})(contactKeys || (contactKeys = {}));
export var contactType;
(function (contactType) {
    contactType["WORK"] = "work";
    contactType["HOME"] = "home";
    contactType["PERSONAL"] = "personal";
})(contactType || (contactType = {}));
export var sortOrderEnum;
(function (sortOrderEnum) {
    sortOrderEnum["ASC"] = "asc";
    sortOrderEnum["DESC"] = "desc";
})(sortOrderEnum || (sortOrderEnum = {}));
