import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isEqual } from "lodash";
import { getUser, updateUser } from "../actions/users";

const EditForm = lazy(() => import("./EditForm"));

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        age: "",
        avatar: "",
        attachment_url: "",
      },
      error: "",
      successMessage: "",
    };
    this.saveUserSuccess = this.saveUserSuccess.bind(this);
  }

  handleChange = (e, field) => {
    const users = Object.assign({}, this.state.users, {
      [field]: e.target.value,
    });
    this.setState(Object.assign({}, this.state, { users }));
  };

  buildFormData() {
    let formData = new FormData();
    formData.append("user[firstname]", this.state.users.firstname);
    formData.append("user[lastname]", this.state.users.lastname);
    formData.append("user[username]", this.state.users.username);
    formData.append("user[email]", this.state.users.email);
    formData.append("user[age]", this.state.users.age);
    this.state.users.avatar
      ? formData.append("user[avatar]", this.state.users.avatar)
      : null;
    return formData;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateUser(
      this.props.users.id,
      this.buildFormData(),
      this.saveUserSuccess
    );
  };

  saveUserSuccess(res) {
    const { t } = this.props;
    if (res.status === "success") {
      this.setState({
        error: "",
        successMessage: t("form.update_success"),
      });
    } else {
      this.setState({
        error: res,
        successMessage: "",
      });
    }
  }

  handleProfilePictureChange() {
    const users = Object.assign({}, this.state.users, {
      ["avatar"]: this.profilePictureField.files[0],
    });
    this.setState(
      Object.assign({}, this.state, {
        users,
      })
    );
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.getUser(params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.users, this.state.users)) {
      this.setState({ ...this.state, users: nextProps.users });
    }
  }

  render() {

    return (
      <Suspense fallback={<h1>{this.props.t("loading")}</h1>}>
        <EditForm
          users={this.state.users}
          error={this.state.error}
          successMessage={this.state.successMessage}
          handleSubmit={this.handleSubmit.bind(this)}
          handleChange={this.handleChange}
          handleProfilePictureChange={this.handleProfilePictureChange}
          t={this.props.t}
        />
      </Suspense>
    );
  }
}

const structuredSelector = createStructuredSelector({
  users: (state) => state.users,
});

const mapDispatchToProps = { getUser, updateUser };

export default connect(structuredSelector, mapDispatchToProps)(Edit);
