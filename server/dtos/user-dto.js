class UserDTO {
  /**
   * User Data Transfer Object
   * @param {Object} model - The user model object
   */
  email;
  id;
  name;
  avatar;
  role;
  isActivated;
  createdAt;
  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.avatar = model.avatar || null;
    this.role = model.role;
    this.isActivated = model.isActivated;
    this.createdAt = model.createdAt;
  }
}
export default UserDTO;