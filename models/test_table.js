'use strict';
module.exports = (sequelize, DataTypes) => {
    const test_table = sequelize.define('test_table', {
        testId: {
            type: DataTypes.INTEGER(4),
            primaryKey: true,
            notNull: true,
            autoIncrement:true
        },
        testName: DataTypes.STRING(5),
        testAccount: DataTypes.STRING(10),
        testMessage: DataTypes.STRING(20)
    }, {operatorsAliases: false,freezeTableName: true,timestamps: false})
    test_table.associate = function(models) {
        // hasOne 給予對象table單一關聯(對方foreignKey與test_table的primaryKey名稱不同時，依然填入對方的foreignKey)
        test_table.hasOne(models.test_table_include,{foreignKey:'testId'})
    }
    return test_table
};
