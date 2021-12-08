import DB from "./models/index.js";
import Sequelize from "sequelize";

const { Op } = Sequelize;

const ModelRepository = (modelname) => {
  const methods = {
    Op,
    DB,
    check: async (query) => {
      const check = await DB[modelname].findOne(query);
      return check ? true : false;
    },
    count: async (query = {}) => {
      return DB[modelname].count(query);
    },
    create: (data = {}) => {
      return DB[modelname].findOrCreate(data);
    },
    createOnly: (data = {}) => {
      return DB[modelname].create(data);
    },
    update: async (data = {}, query) => {
      return DB[modelname].update(data, query);
    },
    upsert: async (data = {}, query) => {
      const checkRecord = await methods.check(query);

      if (!checkRecord) {
        methods.create({ where: query.where, defaults: data });
        return 0;
      } else {
        methods.update(data, query);
        return 1;
      }
    },
    delete: (query) => {
      return DB[modelname].destroy(query);
    },
    findOne: (query = {}) => {
      return DB[modelname].findOne(query);
    },
    findById: (id, query = {}) => {
      return DB[modelname].findByPk(id, query);
    },
    findAll: (query) => {
      return DB[modelname].findAndCountAll({ ...query });
    },
    addAssociate: (parent, child, childModelname) => {
      return parent[`add${childModelname}`].call(parent, child);
    },
    removeAssociate: (parent, child, childModelname) => {
      return parent[`remove${childModelname}`].call(parent, child);
    },
  };

  return methods;
};

export default ModelRepository;
