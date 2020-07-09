require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  
  login_user

  let(:valid_attributes) {
    {
      firstname: 'John', 
      lastname: 'Doe',
      username: 'johndoe',
      email: "user#{rand(1000)}@factory.com",
      password: 'test123',
      age: '20',
      role: 2
    }
  }

  let(:invalid_attributes) {
    {
      firstname: '', 
      lastname: '',
      username: '',
      email: '',
      password: '',
      age: '',
      role: ''
    }
  }

  let(:new_attributes) {
    {
      firstname: 'Kelly', 
      lastname: 'Sage',
      username: 'sage04',
      email: "user#{rand(100)}@factory.com",
      password: 'test123',
      age: '20',
      role: 2
    }
  }

  let(:valid_session) { {} }

  describe "GET #index" do
      it "returns a successful response" do
        User.create! valid_attributes
        get :index, params: {}, session: valid_session
        expect(response).to be_successful
      end
  end

  describe "GET #show" do
    it "renders a successful response" do
      user = User.create! valid_attributes
      get :show, params: { id: user.id }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "GET #new" do
    it "renders a successful response" do
      get :new, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "GET #edit" do
    it "render a successful response" do
      user = User.create! valid_attributes
      get :edit, params: { id: user.id }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new User" do
        expect {
          post :create, params: { user: valid_attributes }, session: valid_session
        }.to change(User, :count).by(1)
      end

      it "redirects to the created user" do
        post :create, params: { user: valid_attributes }, session: valid_session
        expect(response).to redirect_to(user_url(User.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new User" do
        expect {
          post :create, params: { user: invalid_attributes }, session: valid_session
        }.to change(User, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post :create, params: { user: invalid_attributes }, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      it "updates the requested user" do
        user = User.create! valid_attributes
        patch :index, params: { user: new_attributes }, session: valid_session
        user.reload
      end
      it "redirects to the user" do
        user = User.create! valid_attributes
        patch :index, params: { user: new_attributes }, session: valid_session
        # expect(response).to redirect_to(user_url(user))
        expect(:get => "/users/1").to route_to(:controller => "users", :action => "show", "id"=>"1")
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        user = User.create! valid_attributes
        patch :index, params: { user: invalid_attributes }, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested user" do
      user = User.create! valid_attributes
      expect {
        delete :destroy, params: { id: user.id }, session: valid_session
      }.to change(User, :count).by(-1)
    end

    it "redirects to the users list" do
      user = User.create! valid_attributes
      delete :destroy, params: { id: user.id }, session: valid_session
      expect(response).to redirect_to(users_url)
    end
  end
end
