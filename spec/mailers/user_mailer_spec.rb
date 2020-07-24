require 'rails_helper'

RSpec.describe UserMailer, :type => :mailer do
  describe 'send email on updates' do
    let(:valid_attributes) {
      {
        firstname: 'John', 
        lastname: 'Doe',
        username: 'test',
        email: 'john@gmail.com',
        age: '22',
        password: 'test123'
      }
    }
    let(:mail) { 
      value = User.create! valid_attributes
      UserMailer.with({ user: value, type: 'Created' }).user_info
    }

    it 'renders the headers' do
      expect(mail.subject).to eq('User: John Doe Created')
      expect(mail.to).to eq(['archangel.test07+test@gmail.com'])
      expect(mail.from).to eq(['archangel.test07@gmail.com'])
    end
  end
end