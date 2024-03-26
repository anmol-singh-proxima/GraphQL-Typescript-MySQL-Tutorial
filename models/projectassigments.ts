'use strict';
import { Model } from 'sequelize';

interface ProjectAssigmentsAttributes {
  ProjectId: number;
  UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectAssigments extends Model<ProjectAssigmentsAttributes> implements ProjectAssigmentsAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    ProjectId!: number;
    UserId!: string;
    static associate(models: any) {
      // define association here
    }
  }
  ProjectAssigments.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProjectAssigments',
  });
  return ProjectAssigments;
};