require 'rails_helper'

RSpec.describe WelcomeController, type: :controller do
  login_user

  let(:valid_session) { {} }

  describe "GET #home" do
    it "returns http success" do
      get :home, params: {}, session: valid_session
      expect(response).to have_http_status(:success)
    end
  end

end