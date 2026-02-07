import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

export class TeacherModel extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public subject!: string;
  public bio!: string;
}

TeacherModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'Teacher',
});

export class AlumnusModel extends Model {
  public userId!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public currentGrade!: string;
  public currentRole!: string;
  public companyOrUniversity!: string;
  public bio!: string;
  public isApproved!: boolean;
}

AlumnusModel.init({
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentGrade: {
    type: DataTypes.STRING,
  },
  currentRole: {
    type: DataTypes.STRING,
  },
  companyOrUniversity: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Alumnus',
});

export class PostModel extends Model {
  public id!: string;
  public authorId!: string;
  public authorName!: string;
  public content!: string;
  public imageUrl!: string;
  public timestamp!: number;
  public likes!: string; // Stored as JSON string
}

PostModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  authorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.TEXT, // Using TEXT for base64 images
  },
  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.TEXT, // JSON string array
    defaultValue: '[]',
  },
}, {
  sequelize,
  modelName: 'Post',
});

export class CommentModel extends Model {
  public id!: string;
  public postId!: string;
  public authorId!: string;
  public authorName!: string;
  public content!: string;
  public timestamp!: number;
}

CommentModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Comment',
});

export class AnnouncementModel extends Model {
  public id!: string;
  public title!: string;
  public content!: string;
  public date!: string;
  public category!: string;
}

AnnouncementModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Announcement',
});

export class ApplicantModel extends Model {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phone!: string;
  public grade!: string;
  public previousSchool!: string;
  public gpa!: number;
  public status!: string;
  public appliedDate!: string;
}

ApplicantModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  grade: {
    type: DataTypes.STRING,
  },
  previousSchool: {
    type: DataTypes.STRING,
  },
  gpa: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  appliedDate: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Applicant',
});

export class SettingModel extends Model {
  public key!: string;
  public value!: string;
}

SettingModel.init({
  key: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Setting',
});

// Relationships
PostModel.hasMany(CommentModel, { foreignKey: 'postId', as: 'commentsList' });
CommentModel.belongsTo(PostModel, { foreignKey: 'postId' });
