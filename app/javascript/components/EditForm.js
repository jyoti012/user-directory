import React from "react";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
  }

  showFormErrors = () => {
    const { t } = this.props;
    return (
      <div style={{ color: "red" }}>
        {t("error.unable_to_save")}
        {Object.keys(this.props.error.errors).map((key) => (
          <ul key={key}>
            <li value={key}>
              <p>{key}</p>
              {this.props.error.errors[key].map((value, i) => (
                <p key={i}>
                  {i + 1}. {value}
                </p>
              ))}
            </li>
          </ul>
        ))}
      </div>
    );
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      username,
      age,
      attachment_url,
    } = this.props.users;
    const { t } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h4>
          {t("form.edit_user")} {t("details")}
        </h4>
        {this.props.error && this.showFormErrors()}
        <h5>{this.props.successMessage}</h5>
        <p>
          <label htmlFor="firstname">{t("form.firstname")}: </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => this.props.handleChange(e, "firstname")}
          />
        </p>
        <p>
          <label htmlFor="lastname">{t("form.lastname")}: </label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => this.props.handleChange(e, "lastname")}
          />
        </p>
        <p>
          <label htmlFor="username">{t("form.username")}: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => this.props.handleChange(e, "username")}
          />
        </p>
        <p>
          <label htmlFor="email">{t("form.email")}: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => this.props.handleChange(e, "email")}
          />
        </p>
        <p>
          <label htmlFor="age">{t("form.age")}: </label>
          <input
            type="text"
            value={age}
            onChange={(e) => this.props.handleChange(e, "age")}
          />
        </p>
        <p>
          <label htmlFor="age">{t("form.profile_picture")}: </label>
          <img src={attachment_url} width="200" height="200" />
          <br />
          <input
            name="avatar"
            ref={(field) => (this.profilePictureField = field)}
            type="file"
            multiple={false}
            accept="image/*"
            onChange={(e) => this.props.handleProfilePictureChange(e)}
          />
        </p>
        <input type="submit" value={t("form.edit")} />
      </form>
    );
  }
}

export default EditForm;
