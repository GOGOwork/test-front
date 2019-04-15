'use strict';
module.exports = (sequelize, DataTypes) => {
    const test_table_include = sequelize.define('test_table_include', {
        includeId: {
            type: DataTypes.INTEGER(4),
            primaryKey: true,
            notNull: true,
            autoIncrement:true
        },
        testId: DataTypes.INTEGER(4),
        includeObject: DataTypes.STRING(10)
    }, {operatorsAliases: false,freezeTableName: true,timestamps: false})
    test_table_include.associate = function(models) {
        // belongsTo 為自己的foreignKey附上單一關聯 foreignKey名稱一律寫自己的
        test_table_include.belongsTo(models.test_table,{foreignKey:'testId'})
    }
    return test_table_include
};
