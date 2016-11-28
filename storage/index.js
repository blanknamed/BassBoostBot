function Storage() {
    this.storage = {};
}

Storage.prototype.set = function(id, value) {
    this.storage[id] = value;
};

Storage.prototype.get = function(id) {
    return this.storage[id];
};

Storage.prototype.delete = function(id, after) {
    after = after || 0;
    setTimeout(() => {
        this.storage[id] = undefined;
    }, after)
};

module.exports.getStorage = function(name) {
    return storages[name] || createStorage(name);
}

function createStorage(name) {
    storages[name] = new Storage();
    return storages[name];
}

var storages = {};